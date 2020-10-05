const nodeFetch = require('node-fetch')
const fetch = require('fetch-cookie')(nodeFetch)
const moment = require('moment')

const generateTimeRanges = () => {
  return {
    start : moment().valueOf(),
    end : moment().subtract(1, 'months').valueOf()
  }
}

const getServerKeys = async (SUBDOMAIN, COOKIES) => {
  console.log(`Getting server keys...`)

  const timerange = generateTimeRanges();

  const body = {"filter":{"appIds":[],"nodeIds":[],"tierIds":[],"types":["PHYSICAL","CONTAINER_AWARE"],"timeRangeStart":timerange.start,"timeRangeEnd":timerange.end},"sorter":{"field":"HEALTH","direction":"ASC"}}

  const response = await fetch(`https://${SUBDOMAIN}.saas.appdynamics.com/controller/sim/v2/user/machines/keys`, {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
      'Accept': '*/*',
      'Host': `${SUBDOMAIN}.saas.appdynamics.com`,
      'Connection': 'keep-alive',
      'Content-Type': 'application/json',
      'cookie': COOKIES,
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify(body)
  });

  const responseBody = await response.json()
  const serverKeys = responseBody.machineKeys

  return serverKeys
}

const getServerProcesses = async (SUBDOMAIN, COOKIES, key, XCSRFHEADER) => {
  console.log(`Getting processes for ${key}...`)

  console.log(COOKIES);

  const response = await fetch(`https://${SUBDOMAIN}.saas.appdynamics.com/controller/sim/v2/user/machines/746007/processes?timeRange=last_1_month.BEFORE_NOW.-1.-1.43200&limit=1000&sortBy=CLASS`, {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
      'Accept': '*/*',
      'Host': `${SUBDOMAIN}.saas.appdynamics.com`,
      'Connection': 'keep-alive',
      'cookie': COOKIES,
      'Cache-Control': 'no-cache'
    }
  });

  console.log(await response);

  // const processes = await response.json()

  // return processes
}

module.exports = {
  list: async function (accountName, COOKIES) {
    return await getServerKeys(accountName, COOKIES)
  },
  processes: async function (accountName, COOKIES, key, XCSRFHEADER) {
    return await getServerProcesses(accountName, COOKIES, key, XCSRFHEADER)
  }
};
