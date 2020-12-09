# Userscript Development

1. Note: This documentation is currently a work in progress.  I'll update as I have time.  For now here is a basic overview of the environment.
2. Basically you can just clone the project from GitHub to where you want to start a new project.  Fill out `package.json` with your project info, and then `yarn install`.
3. Rename `env_template.json` to `env.json` and edit with your project details.
4. The environment is designed around developing a userscript, so with this in mind the focus is to bundle the script and copy it to a remote server where you can load and install it as you would any other userscript.  If you want to just install from your local drive, then edit `rollup.config.js` and comment out `copyToRemote()` configurations.
5. There's imports from `@subz390/jsutils` in `index.js` from my personal library of userscript centric helper functions.  I am working toward publishing the library.  But for now you can create your userscript in `index.js` and add your CSS to `style.css` then run `yarn build` to build a minified version of the userscript into a folder called `userscripts`, it'll create one when it does that.  And then it'll send a copy to your server.
6. `yarn autobuild` does all the above and creates two scripts.  Install the loader script which sideloads the userscript without you having to continually reinstall the script in `(Grease|Tamper)monkey` and it'll use livereload to automatically do that whilst refreshing the web page.  When you're done, `yarn build` install the update and you're done.
7. `yarn source` is an option to bundle a clean source code version of the script.
8. The development environment has been set up so it can import ES6 modules from installed dependencies into the userscript.  This is designed with an integrated development chain in mind.  Where you can set up the userscript in `autoload`, then open the library project and work on a function there.  Each time you save the library, if you're using `yarn link` to link the library locally in the userscript `node_modules` folder it'll auto refresh and load the webpage.  So this way you can quickly develop library functions outside of the userscript environment and get feedback in realtime were it's going to be used.


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