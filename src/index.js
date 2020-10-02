const nodeFetch = require('node-fetch')
const fetch = require('fetch-cookie')(nodeFetch)
const { URLSearchParams } = require('url');

const USERNAME = 'lees'
const PASSWORD = 'JTVCREx1NnMuJTNEZHNaakRLOQ=='

const ACCOUNT_NAME = 'tpicap-dev'
const SUBDOMAIN = 'tpicap-dev'

let XCSRFHEADER

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
      'Accept': 'application/json, text/plain, */*',
      'Referer': `https://${SUBDOMAIN}.saas.appdynamics.com/controller/`,
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  });

  if(response.ok){
    console.log('Login successful.')
    setXCSRFHeader(response)
    return response
  }
  else{
    console.log(response)
    throw new Error(response.statusText);
  }

  console.log(response)
}

const getServerKeys = async () => {
  console.log(`Getting server keys...`)
}

const main = async () => {
  try {
    await login()

    // Get all server keys
    const serverKeys = await getServerKeys()
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
