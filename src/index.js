import fetch from 'node-fetch'
import { URLSearchParams } from 'url'
import _ from 'lodash';
import servers from './servers.js'
import constants from './constants.js'
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

  const params = new URLSearchParams();
  params.append('userName', constants.userName);
  params.append('password', constants.password);
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

const getMatchingProcesses = async (keys, process) => {
  let serverMatches = [];

  for (const key of keys){
    const processes = await servers.processes(key.machineId);

    const javaFound = checkProcess(processes, process);

    if(javaFound){
      serverMatches.push({
        serverName: key.serverName,
        machineId: key.machineId,
        language: 'java'
      })
    }

    await new Promise(resolve => setTimeout(resolve, 300));
  }

  return serverMatches
}

const getvCPUs = async (machines) => {
  for (const machine of machines){
    const vcpus = await servers.cpus(machine.machineId)

    machine.vcpus = vcpus
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  return machines
}

const createSummary = async (machines) => {
  console.log(`${_.size(machines)} machines with Java found.`)
  console.log(`${_.sumBy(machines, function(o) { return o.vcpus; })} vCPUs across all Java machines.`)
}

const main = async () => {
  try {
    await login()

    const keys = await servers.list();
    const javaMatches = await getMatchingProcesses(keys, 'java')
    const vcpus = await getvCPUs(javaMatches)

    await saveFile(vcpus);

    const summary = await createSummary(vcpus)

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
