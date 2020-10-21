# AppD Secure App Scoping Tool

## Introduction

This tool connects to AppDynamics lists all servers monitored by AppD Server Analytics, checks which servers are running the specified process, and then calculates the number of vCPUs across these servers. This value can then be used to scope the number of licences required by AppD SecureApp.

Once the process completes a file called data.json will be saved listing every server found running the specified process along with how many CPUs were found. The total number of vCPUs running the specified process will be printed to STDOUT.

Example:
```
[
  {
    "serverName": "docker-desktop",
    "machineId": 1472275,
    "language": "java",
    "vcpus": 8
  }
  ...
]
```

## Pre-requisites

1. (Optional) Homebrew - for easier installation and management on MacOS
2. Node.JS - currently targeting latest LTS version (10.16.3).

```
$ brew install node
```
3. AppDynamics controller access with monitored servers.

## Installation

### Clone package
```
$ git clone git@github.com:lspacagna/appd-appsec-scoping.git
$ cd appd-appsec-scoping
```

### Build project

```
$ npm run build
```

## Configuration

Open the the config.js file for editing. The default configuration is below

```
module.exports = {
  userName: '',
  password: '',
  accountName: '',
  subdomain: '',
  processSearchTerm: 'java',
  requestDelay: 300
};
```

Parameter | Function | Default Value
--------- | -------- | -------------
userName | user name used to access AppD controller - local login required |
password | password used to access AppD controller |
accountName | AppD controller account name |
subdomain | Subdomain to access controller xxxx.saas.appdynamics.com |
processSearchTerm | Name of process to search for on each server | java
requestDelay | No. ms delay in between each API call to prevent rate limiting | 300


## Run

```
$ npm run run
```
