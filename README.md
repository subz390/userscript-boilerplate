# Userscript Development

## This documentation is currently a work in progress and I'll update as I have time
- I use Yarn, if you only use NPM feel free to open an issue to discuss a PR for NPM additions to the documentation as I don't know NPM enough to include those
- I use VSCode in Windows 10, if you're on anything different and the instructions are different because of that, then open an issue to let me know


## Clone
1. `git clone` the project from GitHub to where you want to start a new project.
2. `yarn install` and `yarn init` or manually update `package.json`
3. Rename `env_template.json` to `env.json` and edit with your project details.

## Intended Audience
- If you have a requirement to develop large userscript projects then this environment presents a set of comfort features that'll lower the struggle bar a bit.
- Particularly where working with ES6 module imports from large libraries such as Svelte and PouchDB.
- So it's assumed you'll be advanced level in Javascript, DOM, and userscript development.
- In my comments and documentation I've aimed at prompting and referencing, rather than teaching.
- Whilst I cannot predict what everyone will know, if there's something you'd like explaining or what ever then hit me up in the discussions section.

## General Workflow
- This userscript development environment has been refined over several years of iterations in my personal workflow for developing userscripts.  The main focus is to bundle the script and copy it to a remote server where it can be installed in the browser with Tampermonkey.
- The imports from `@subz390/jsutils` in `index.js` are from my personal library of userscript centric helper functions.  I am working toward publishing the library.  I use them in testing the boilerplate project.
- Create your userscript in `index.js` and add your CSS to `style.css`
- `yarn build` to bundle non-minified and minified versions of the userscript into a folder called `userscripts`.
- `yarn autobuild` creates two scripts for side-loading.  Install the loader script which sideloads the userscript without the need to continually reinstall the script in the script manager.  Livereload automatically detects saved changes to the script prompting the web page to reload the changes.  When you're done, `yarn build` install the update and you're done.
- `yarn source` is an option to bundle a clean source code version of the script.

## Bundling ES6 Modules from Dependencies in node_modules

This userscript development environment has been set up so it can import ES6 modules from installed dependencies.  Designed with an integrated development chain in mind, you can set up the userscript in `autoload`, then open and work on a dependency project in it's own separate development environment.  Each time a dependency is saved, and you're using `yarn link` to link the library locally in the userscript `node_modules` folder it'll auto refresh and load the webpage.  So this way you can develop library functions outside of the userscript environment and get realtime feedback in the place it's being used.

What this means is I can be coding on a userscript, arrive at a situation where I found an issue or feature requirement in a library module, I don't have to shut down the userscript project, I simply open the library project, do the work on the module and dive straight back into the userscript.


## Update Dependencies and Push to GitHub

- Git commit pending changes
- `yarn test` for the tests - to see Jest working
- `yarn build` confirm minified version is working
- Open the script in the browser to confirm it working
- `yarn upgrade-interactive --latest` all dependencies up to date
- run the above tests again, if all works then push
- `git push origin master` push up to GitHub
- if there's issues, roll back to a previous commit
- `yarn init` to install previous versions
- repeat: update one package at a time, test, until you find the issue


# Commandline Scripts

The following commandline scripts are available.  Configure the scripts in `rollup.config.js`

### Jest
- `yarn test` run all Jest tests in the `./tests` folder
- `yarn test NAME` to run just that test
- `yarn test:coverage NAME` 

### build
- compiles a minified single file to `./userscripts/PROJECT.user.js`
- copies the file to the WebDAV folder

### autobuild
- compiles `loader.user.js`, `sideloaded.js` files to `./userscripts`
- copies the files to the WebDAV folder
- install the `loader.user.js` script, then as you're editing and saving the changes are recompiled automatically.
- Refresh the browser and the new version is side loaded instead of having to reinstall the script each time.

### source
- compiles a clean non minified version of the script
- keep JSDoc headers on all the functions
- debugging and all other comments removed