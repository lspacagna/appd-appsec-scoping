import nodeFetch from 'node-fetch'
const fetch = require('fetch-cookie')(nodeFetch)
import { URLSearchParams } from 'url'
import _ from 'lodash';
import servers from './servers.js'
import fs from 'async-file'

const USERNAME = ''
const PASSWORD = ''

const ACCOUNT_NAME = ''
const SUBDOMAIN = 'tpicap-dev'

let XCSRFHEADER;

let COOKIES;

const storeCookies = (response) => {
  const raw = response.headers.raw()['set-cookie'];
  COOKIES = raw.map((entry) => {
      const parts = entry.split(';');
      const cookiePart = parts[0];
      return cookiePart;
    }).join(';');
}

const setXCSRFHeader = (response) => {
  let cookies = response.headers.get('set-cookie');
  cookies = cookies.split("X-CSRF-TOKEN=")
  cookies = cookies[1].split(";")
  XCSRFHEADER = cookies[0]
}

const login = async () => {
  console.log('Logging in...')

  const params = new URLSearchParams();
  params.append('userName', USERNAME);
  params.append('password', PASSWORD);
  params.append('accountName', ACCOUNT_NAME);

  const response = await fetch(`https://${SUBDOMAIN}.saas.appdynamics.com/controller/auth?action=login`, {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
      'Accept': '*/*',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache'
    },
    body: params
  });

  if(response.ok){
    console.log('Login successful.')
    storeCookies(response)
    return response
  }
  else{
    console.log(response)
    throw new Error(response.statusText);
  }

  console.log(response)
}

const saveFile = async (data) => {
  await fs.writeFile('data.json', JSON.stringify(data, null, 2) , 'utf-8');
}

const checkProcess = (processes, processName) => {
  let found = _.find(processes, function(o) { return o.processClass == 'java'; });

  if(_.size(found) > 0){
    return true
  }
  else{
    return false;
  }
}

const getMatchingProcesses = async () => {
  let serverMatches = [];

  const keys = JSON.parse(await fs.readFile('data.json', 'utf-8'));

  /// Loop here

  for (const key of keys){
    const processes = await servers.processes(ACCOUNT_NAME, COOKIES, key.machineId);
    console.log(processes);


    //const javaFound = checkProcess(processes, 'java');

    // if(javaFound){
    //   serverMatches.push({
    //     serverName: key.serverName,
    //     serverId: key.machineId,
    //     language: 'java'
    //   })
    // }
  }

  //console.log(serverMatches)
}

const main = async () => {
  try {
    await login()


    //Get all server keys
    // const keys = await servers.list(ACCOUNT_NAME, COOKIES);
    // console.log(`${_.size(keys)} servers found.`)
    // console.log(keys);
    //
    // await saveFile(keys);

    //await getMatchingProcesses()

    await servers.processes(ACCOUNT_NAME, COOKIES, 746007, XCSRFHEADER);
    await servers.processes(ACCOUNT_NAME, COOKIES, 746007, XCSRFHEADER);




    //const processes = await servers.processes(ACCOUNT_NAME, COOKIES, 746007);

    // const metricNames = await getMetrics()
    //
    // // Create New Metrics
    // await createMetrics(hotelList, metricNames)


  } catch (e) {
    console.error(e);
  }
}

const runLocal = async () => {
  try{
    console.log(`Starting Script...`)
    await main()
  }
  catch(e){
    console.log(e)
  }
}


runLocal()
