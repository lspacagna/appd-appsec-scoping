import fetch from 'node-fetch'
import { URLSearchParams } from 'url'
import _ from 'lodash';
import servers from './servers.js'
import constants from '../config.js'
import fs from 'async-file'

const storeCookies = (response) => {
  const raw = response.headers.raw()['set-cookie'];
  constants.cookies = raw.map((entry) => {
      const parts = entry.split(';');
      const cookiePart = parts[0];
      return cookiePart;
    }).join(';');
}

const login = async () => {
  console.log('Logging in...')


  // Base64 encode password
  let base64password = Buffer.from(constants.password).toString('base64');

  const params = new URLSearchParams();
  params.append('userName', constants.userName);
  params.append('password', base64password);
  params.append('accountName', constants.accountName);

  const response = await fetch(`https://${constants.subdomain}.saas.appdynamics.com/controller/auth?action=login`, {
    method: 'POST',
    headers: {
      'User-Agent': 'AppSecurityScoping-tool',
      'Accept': 'application/json, text/plain, */*',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cache-Control': 'no-cache'
    },
    body: params
  });

  if(response.ok){
    console.log('Login successful.')
    storeCookies(response)
  }
  else{
    throw new Error(`Login failed - check login details - ${response.statusText} ${response.status}`);
  }
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

const getMatchingProcesses = async (keys) => {
  let serverMatches = [];

  // loop through all server keys
  let count = 1;

  for (const key of keys){
    console.log(`[${count}/${_.size(keys)}]: Getting processes for ${key.machineId}...`)

    // get all processes for each key
    const processes = await servers.processes(key.machineId);

    // check list of processes for process search term
    const processFound = checkProcess(processes, constants.processSearchTerm);

    if(processFound){
      console.log(`'${constants.processSearchTerm}' process found on ${key.machineId}.`)

      serverMatches.push({
        serverName: key.serverName,
        machineId: key.machineId,
        language: constants.processSearchTerm
      })
    }

    count++
    // stagger requests to prevent hitting API rate limiter
    await new Promise(resolve => setTimeout(resolve, constants.requestDelay));
  }

  return serverMatches
}

const getvCPUs = async (machines) => {
  // loop through all machines running process
  let count = 1

  for (const machine of machines){
    console.log(`[${count}/${_.size(machines)}]: Getting vCPUs for ${machine.machineId}...`)
    // check how many vCPUs on this machine
    const vcpus = await servers.cpus(machine.machineId)
    // store in object for data export
    machine.vcpus = vcpus
    // stagger requests to prevent hitting API rate limiter
    await new Promise(resolve => setTimeout(resolve, constants.requestDelay));

    count++
  }

  return machines
}

const saveData = async (data) => {
  console.log(`Saving all data to 'data.json'...`)

  await fs.writeFile('data.json', JSON.stringify(data, null, 2) , 'utf-8');

  console.log(`${_.size(data)} machines with '${constants.processSearchTerm}' found.`)
  console.log(`${_.sumBy(data, function(o) { return o.vcpus; })} vCPUs across all machines running '${constants.processSearchTerm}'.`)
}

const main = async () => {
  try {
    await login()

    const keys = await servers.list();
    const processMatches = await getMatchingProcesses(keys)
    const vcpus = await getvCPUs(processMatches)

    await saveData(vcpus);

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
