# Userscript Development

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