const fetch = require('node-fetch')
import constants from './constants.js'


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

  return await response.json()
}

module.exports = {
  get: async function () {
    return await get()
  },
  post: async function (url, body) {
    console.log(url, body);

    return await post(url, body)
  }
};
