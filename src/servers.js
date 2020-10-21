const fetch = require('node-fetch')
const moment = require('moment')
import constants from './constants.js'
import requests from './requests.js'
import _ from 'lodash';

const generateTimeRanges = () => {
  return {
    start : moment().valueOf(),
    end : moment().subtract(1, 'months').valueOf()
  }
}

const storeCookies = (response) => {
  const raw = response.headers.raw()['set-cookie'];
  constants.cookies = constants.cookies+';'+raw.map((entry) => {
      const parts = entry.split(';');
      const cookiePart = parts[0];
      return cookiePart;
    }).join(';');
}


const getServerKeys = async () => {
  console.log(`Getting server keys...`)

  const timerange = generateTimeRanges()

  const body = {"filter":{"appIds":[],"nodeIds":[],"tierIds":[],"types":["PHYSICAL","CONTAINER_AWARE"],"timeRangeStart":timerange.start,"timeRangeEnd":timerange.end},"sorter":{"field":"HOST_ID","direction":"ASC"}}

  const response = requests.post(`https://${constants.subdomain}.saas.appdynamics.com/controller/sim/v2/user/machines/keys`, body)

  // const response = await fetch(`https://${constants.subdomain}.saas.appdynamics.com/controller/sim/v2/user/machines/keys`, {
  //   method: 'POST',
  //   headers: {
  //     'User-Agent': 'AppSecurityScoping-tool',
  //     'Accept': '*/*',
  //     'Host': `${constants.subdomain}.saas.appdynamics.com`,
  //     'Connection': 'keep-alive',
  //     'Content-Type': 'application/json',
  //     'cookie': constants.cookies,
  //     'Cache-Control': 'no-cache'
  //   },
  //   body: JSON.stringify(body)
  // });

  //const responseBody = await response.json()
  const serverKeys = response.machineKeys

  return serverKeys
}

const getServerProcesses = async (machineId) => {
  console.log(`Getting processes for ${machineId}...`)

  const response = await fetch(`https://${constants.subdomain}.saas.appdynamics.com/controller/sim/v2/user/machines/${machineId}/processes?timeRange=last_1_month.BEFORE_NOW.-1.-1.43200&limit=1000&sortBy=CLASS`, {
    method: 'GET',
    headers: {
      'User-Agent': 'AppSecurityScoping-tool',
      'Accept': '*/*',
      'Host': `${constants.subdomain}.saas.appdynamics.com`,
      'Connection': 'keep-alive',
      'cookie': constants.cookies,
      'Cache-Control': 'no-cache'
    }
  });

  if(response.ok){
    const processes = await response.json()
    console.log(`${_.size(processes)} processes found on ${machineId}`)

    return processes
  }
  else{
    console.log(response)
    throw new Error(response.statusText);
  }
}

const getServerCPUs = async (machineId) => {
  console.log(`Getting vCPUs for ${machineId}...`)

  const response = await fetch(`https://${constants.subdomain}.saas.appdynamics.com/controller/sim/v2/user/machines/${machineId}`, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
      'Accept': '*/*',
      'Host': `${constants.subdomain}.saas.appdynamics.com`,
      'Connection': 'keep-alive',
      'cookie': constants.cookies,
      'Cache-Control': 'no-cache'
    }
  });

  if(response.ok){
    const data = await response.json()

    let vcpus = 0;

    // for (const cpu of data.cpus){
    //   console.log(`${cpu.logicalCount} vCPUs found on ${machineId}`)
    //   vcpus = vcpus + cpu.logicalCount
    // }

    if(_.size(data.cpus) == 0){
      console.log(`Unable to find vCPUs on ${machineId}`)
    }
    else{
      vcpus = vcpus + _.size(data.cpus);
      console.log(`${_.size(data.cpus)} vCPUs found on ${machineId}`)
    }

    return vcpus
  }
  else{
    console.log(`Unable to get vCPUs on ${machineId}`)
    return 0;
  }
}

module.exports = {
  list: async function () {
    return await getServerKeys()
  },
  processes: async function (machineId) {
    return await getServerProcesses(machineId)
  },
  cpus: async function (machineId){
    return await getServerCPUs(machineId)
  }
};
