# Angular 2

This is a basic starter project using [Angular 2](https://angular.io/), [Gulp](http://gulpjs.com/) & [Sass](http://sass-lang.com/). 

Clone this repo for any new project you build, rather than always starting from scratch.

## How to get it:

- `git clone https://bitbucket.org/blwabona/angular2.git`
- `npm install`

## Build, Run and other commands

**Note:** The default commands are for **development** and require an additional parameter `--prod` to target production. For example, to create the **distribution** build in the `dist` folder, simply append `--prod` to every command (e.g. `gulp build --prod` builds`dist` folder for the production release, whereas `gulp build` only compiles everything in the **source** or `src` folder).

- `gulp build`
- `gulp dev`

## Project & Build Structure

Here is a basic structure of the project:

![](docs/ss_dir_src.png)

In the `root` directory, we have:
- `src/`: contains source code, config, etc.
- `node_modules/`: contains all libraries used in this project, whether for the app or development purposes.
- `gulpfile.js` : contains all tasks for running the project, which will be looked at in more detail later. 
- `package.json` : contains all dependencies for the project

In the `src` directory, we have:
- `app/`: contains all the Angular 2 application 
- `lib/`: contains all required libraries, copied from `node_modules` in the root.


![](docs/ss_dir_app.png)

In the `src` directory, we have:

- `api/`: contains all api related files:
    - `api.service.ts`: a wrapper around angular's *Http* service
    - `api.envs.ts` : a file containing values for different environments.
- `.ng2/`: angular blueprints for components, services, directives, etc.
- `.ng2.add` : shell script, to quickly generate arbitrary angular 2 files.

## How to extend it:

Packages are usually added via [NPM](https://www.npmjs.com/) or [JSPM](http://jspm.io/):

- `npm install {packageName} --save`

Since SystemJS is used for loading modules, the following is required for installed packages:

In `systemjs.config.js` in the root

1. add the npm directory to `map`:
        map: {
        '{packageName}': 'node_modules/{packageName}'
        }
1. add it to `packages`:
        packages: {
            '{packageName}' : {
                defaultExtension: 'js',
                main: 'index.js'
            }
        }