const fetch = require('node-fetch')
import constants from '../config.js'

const get = async (url) => {
  const response = await fetch(url, {
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
    return await response.json()
  }
  else{
    console.log(`Request failed - ${response.status}: ${url}`)
    return null;
  }
}


const post = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'User-Agent': 'AppSecurityScoping-tool',
      'Accept': '*/*',
      'Host': `${constants.subdomain}.saas.appdynamics.com`,
      'Connection': 'keep-alive',
      'Content-Type': 'application/json',
      'cookie': constants.cookies,
      'Cache-Control': 'no-cache'
    },
    body: JSON.stringify(body)
  });

  if(response.ok){
    return await response.json()
  }
  else{
    throw new Error(`POST request failed - ${response.statusText} ${response.status}`);
  }
}

module.exports = {
  get: async function (url) {
    return await get(url)
  },
  post: async function (url, body) {
    return await post(url, body)
  }
};
