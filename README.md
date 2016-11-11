# Angular 2

This is a basic starter project using the following technologies:
- [**Angular 2** (frontend framework)](https://angular.io/)
- [**JSPM** (package manager)](https://jspm.io)
- [**Gulp** (task runner)](http://gulpjs.com/)
- [**Sass** (CSS precompiler)](http://sass-lang.com/) 
- [**MaterializeCSS** (style& grid)](http://materializecss.com/media-css.html)
- [**Jasmine** (unit testing)](https://jasmine.github.io/)

Clone this repo for any new project you build, rather than always starting from scratch.

## Setup:

- `git clone https://bitbucket.org/blwabona/ng2.git`

You need global Gulp & JSPM:

- `npm install -g gulp jspm`
- `npm install`
- `jspm install`

## Build, Run and other commands

**NOTE:** The default commands are all for **development** and require an additional parameter `--prod` to target the production build. 
For example, to create the **distribution** (production) build in the `dist` folder, simply append `--prod` to every command (e.g. `gulp build --prod` builds the `dist` folder for the production release.
On the other hand, `gulp build` only compiles everything in the **source** or `src` folder).

Gulp tasks:

|Gulp task   | Description|
|------------|------------|
|`gulp build`|compiles the `.js` from `.ts` and the `.css` from the `.scss`|
|`gulp dev`  |continuously compiles the `.ts`, `.scss`, watches for file changes, and serves the application|
|`gulp test`| Runs unit tests|
|`gulp tdd`| **T**est **D**riven **D**evelopment: Runs `gulp dev` and with each file change unit tests are run.| 

## Project & Build Structure

1. In the `root` directory, we have the following:
    - `src/`: contains source code, config, etc.
    - `node_modules/`: contains all libraries used in this project, whether for the app or development purposes.
    - `gulpfile.js` : contains all tasks for running the project, which will be looked at in more detail later. 
    - `package.json` : contains all dependencies for the project

    ![](docs/ss_dir_root.png)

2. In the `src` directory, we have:
    - `app/`: contains all the Angular 2 application 
    - `lib/`: contains all required libraries, copied from `node_modules` in the root.

    ![](docs/ss_dir_src.png)

3. In the `src` directory, we have:
    - `api/`: contains all api related files:
        - `api.service.ts`: a wrapper around angular's *Http* service
        - `api.envs.ts` : a file containing values for different environments.
    - `.ng2/`: angular blueprints for components, services, directives, etc.
    - `.ng2.add` : shell script, to quickly generate arbitrary angular 2 files.

    ![](docs/ss_dir_app.png)

## How to extend it:

Packages are usually added via [NPM](https://www.npmjs.com/) or [JSPM](http://jspm.io/):

NPM:
- `npm install {packageName} --save`

JSPM:
- `jspm install npm:{packageName}`
- `jspm install github:{packageName}`

Since SystemJS is used for loading modules, the following is required for installed packages:

In `systemjs.config.js` in the root

1. add the npm directory to `map`:
```json
    map: {
        '{packageName}': 'node_modules/{packageName}'
    }
```
2. add it to `packages`:
```json
    packages: {
        '{packageName}' : {
            defaultExtension: 'js',
            main: 'index.js'
        }
    }
```