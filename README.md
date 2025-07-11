# Introduction

A [bzBond-server](https://github.com/beezwax/bzBond/tree/main/packages/bzBond-server#bzbond-server) microbond to support automated FileMaker Migrations

# Installation

## Installation on macOS/Linux

On macOs/Linux use the following command to install this Microbond:

`/var/www/bzbond-server/bin/install-microbond.sh bzmb-fmmigratoragent https://github.com/beezwax/bzmb-fmmigratoragent`

## Installation on Windows Server

On Windows Server use the following command to install this Microbond:

`powershell -File "C:\Program Files\bzBond-server\bin\install-microbond.ps1" bzmb-fmmigratoragent https://github.com/beezwax/bzmb-fmmigratoragent`

## Installation with a proxy on macOS/Linux

On macOs/Linux use the following command to install this Microbond via a proxy:

`/var/www/bzbond-server/bin/install-microbond.sh bzmb-fmmigratoragent https://github.com/beezwax/bzmb-fmmigratoragent http://proxy.example.com:443`

## Installation with a proxy on Windows Server

On Windows Server use the following command to install this Microbond via a proxy:

`powershell -File "C:\Program Files\bzBond-server\bin\install-microbond.ps1" -Proxy http://proxy.example.com:443`

# Usage

The bzmb-fmmigratoragent Microbond provides one route

## bzmb-fmmigratoragent-getClone

In a server-side FileMaker script run `bzBondRelay` script with parameters in the following format:

```
{
  "mode": "PERFORM_JAVASCRIPT",

  "route": "bzmb-fmmigratoragent-getClone",

  "customMethod": "POST",

  "customBody": {

    // Required. The server to get a clone from
    "server": "string",

    // Required. A valid FileMaker admin API token
    "token": "string",

    // Required. The folder containing the clone file
    "folder": "<Clone_Schedule_Name>_YYYY-MM-DD_HHMM",

    // Required. The name of the database being cloned.
    "database": "<FileMaker_Filename_Withouth_Extension>"

    // Optional. The clones folder on the server. Defaults to the default for the OS
    // linux
    "clonesFolder": "/opt/FileMaker/FileMaker Server/Data/ClonesOnly/",
    // macOS
    "clonesFolder": "/Library/FileMaker\ Server/Data/ClonesOnly/",
    // windows
    "clonesFolder": "/Program Files/FileMaker/FileMaker Server/Data/ClonesOnly/",

    // Optional. True if the database is hosted in the secure folder
    // Default
    "secure": false
  }
}
```

A Base64 representation of the clone can be access via `Get ( ScriptResult )`:
`JSONGetElement ( Get ( ScriptResult ); "response.result" )`
