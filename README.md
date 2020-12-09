# Userscript Development

## Note: This documentation is currently a work in progress and I'll update as I have time.

## Clone
1. `git clone` the project from GitHub to where you want to start a new project.
2. `yarn install` and `yarn init` or manually update `package.json`
3. Rename `env_template.json` to `env.json` and edit with your project details.

## Workflow
- This environment has been refined over several years of iterations in my personal workflow for developing userscripts.  The main focus is to bundle the script and copy it to a remote server where it can be installed in the browser with Tampermonkey.
- The imports from `@subz390/jsutils` in `index.js` are from my personal library of userscript centric helper functions.  I am working toward publishing the library.  I use them in testing the boilerplate project.
- Create your userscript in `index.js` and add your CSS to `style.css`
- I use Yarn, if you only use NPM feel free to open an issue to discuss a PR for NPM additions to the documentation as I don't know NPM enough to write those.
- `yarn build` to build a minified version of the userscript into a folder called `userscripts`
- `yarn autobuild` does all the above and creates two scripts.  Install the loader script which sideloads the userscript without you having to continually reinstall the script in `(Grease|Tamper)monkey` and it'll use livereload to automatically do that whilst refreshing the web page.  When you're done, `yarn build` install the update and you're done.
7. `yarn source` is an option to bundle a clean source code version of the script.

## Bundling ES6 Modules from Dependencies in node_modules

This userscript development environment has been set up so it can import ES6 modules from installed dependencies into the userscript.  This is designed with an integrated development chain in mind.  Where you can set up the userscript in `autoload`, then open the library project and work on a function there.  Each time you save the library function, if you're using `yarn link` to link the library locally in the userscript `node_modules` folder it'll auto refresh and load the webpage.  So this way you can develop library functions outside of the userscript environment and get realtime feedback in the place it's being used.


## Update Dependencies and Push to GitHub

- Git commit pending changes
- `yarn test` for the tests - to see Jest working
- `yarn build` confirm minified version is working
- Open the script in the browser to confirm it working
- Archive the project in case you need to restore

- `yarn upgrade-interactive --latest` all dependencies up to date
- run the above tests again, if all works then push
- `git push origin master` push up to GitHub
- if there's issues, you have the archive to restore from
- repeat: update one package at a time, test, repeat


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