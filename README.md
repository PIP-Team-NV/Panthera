# Panthera

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Prerequisites

npm and Angular CLI need to be installed to run this project.

1. npm: [npm](https://nodejs.org/en/)
2. Angular CLI: run `npm install -g @angular/cli` to install the Angular CLI required to run this project.

## Quick Setup

1. change directory to the `Panthera\` folder of this project.
    1.1. run `npm install -g vsts-npm-auth --registry https://registry.npmjs.com --always-auth false` 
    1.1.2 then `vsts-npm-auth -config .npmrc`
2. run `npm install` to download all the required node packages for this project.
3. then `ng serve -o` to then run the project and open a new window.

## Issues

When updating to node.js 10.8.0 you might get the following issue. `Node Sass could not find a binding for your current environment: Windows 64-bit with Node.js 10.x` To fix this run the following command `npm rebuild node-sass`.

### NPM install or npm update not working

npm ERR! ﻿{"$id":"1","innerException":null,"message":"TF400813: Resource not available for anonymous access. Client authentication required.","typeName":"Microsoft.TeamFoundation.Framework.Server.UnauthorizedRequestExcept
ion, Microsoft.TeamFoundation.Framework.Server","typeKey":"UnauthorizedRequestException","errorCode":0,"eventId":3000}

Please see the Quick Setup section.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test metadata-lib` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
