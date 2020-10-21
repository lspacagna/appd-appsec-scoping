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

const getServerKeys = async () => {
  console.log(`Getting server keys...`)

  const timerange = generateTimeRanges()
  const body = {"filter":{"appIds":[],"nodeIds":[],"tierIds":[],"types":["PHYSICAL","CONTAINER_AWARE"],"timeRangeStart":timerange.start,"timeRangeEnd":timerange.end},"sorter":{"field":"HOST_ID","direction":"ASC"}}
  const response = await requests.post(`https://${constants.subdomain}.saas.appdynamics.com/controller/sim/v2/user/machines/keys`, body)
  const serverKeys = response.machineKeys

  return serverKeys
}

const getServerProcesses = async (machineId) => {
  console.log(`Getting processes for ${machineId}...`)

  const response = await requests.get(`https://${constants.subdomain}.saas.appdynamics.com/controller/sim/v2/user/machines/${machineId}/processes?timeRange=last_1_month.BEFORE_NOW.-1.-1.43200&limit=1000&sortBy=CLASS`)
  //console.log(`${_.size(response)} processes found on ${machineId}`)

  return response
}

const getServerCPUs = async (machineId) => {
  console.log(`Getting vCPUs for ${machineId}...`)

  const response = await requests.get(`https://${constants.subdomain}.saas.appdynamics.com/controller/sim/v2/user/machines/${machineId}`)

  if(response !== null){
    let vcpus = 0;

    if(_.size(response.cpus) == 0){
      console.log(`Unable to find vCPUs on ${machineId}`)
    }
    else{
      vcpus = vcpus + _.size(response.cpus);
      console.log(`${_.size(response.cpus)} vCPUs found on ${machineId}`)
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
