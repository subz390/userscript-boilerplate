# ISSUES


# PROJECT HISTORY

## 201208
- 0.7.8 fixed issue with Rollup hanging, was livereload plugin being loaded when not in development mode

## 201207
- 0.7.7 Rollup now hangs at the end of compiling the output.  Everything is compiled ok though.
- 0.7.6 remove the `output:{}` object property where the default `baseConfig` option applies.  Most configurations now output to the same `.user.js` file.  It's only the `autoload` config that outputs the `sideloaded` file to a different filename.
- 0.7.5 code tidy - create functions for common methods in each rollup config option
- 0.7.4 reconfigure `env.meta.include` to not attach `pkg.name` automatically to the `include` property.  If you want to add the package name then do it manually.  As it's possible to write multiple lines of `@include` by using `\n` at the end of each line and adding the `pkg.name` isn't practical at that point
- 0.7.3 reconfigure `source` bundle as an installable script option.  So you have an option to create minified (default) and an original source (cleaned up comments removed etc) versions
- 0.7.2 code tidy - replace `Object Assign` methods with ES6 `...baseConfig,` method
    

## 201206
- 0.7.1  `yarn upgrade-interactive --latest` update devDependencies
- 0.7.0  version bump for branch upgrade
- 0.6.13 `yarn unlink @subz390/rollup-plugin-import-css`
- 0.6.12 configure an example of randomId substitution in the stylesheet at runtime
- 0.6.11 `yarn add --dev rollup-plugin-import-css` from `https://github.com/jleeson/rollup-plugin-import-css`
       `yarn unlink 
- 0.6.10 refactor `rollup.config.js` with `env.json` variables and remove old variables.
- 0.6.9  add `env.json` and `env_template.json` to store project related configuration information, add to `.gitignore` so it's not pushed to head.

## 201117
- 0.6.8 moved `math.js` to `tests` as it doesn't relate to the project source code
- 0.6.7 use `HEAD.js` in source file instead of userscript `META`
- 0.6.6 use `rollup-plugin-cleanup` for GitHub source and `autobuild` outputs, to remove comments and empty space
- 0.6.5 add `source` output to GitHub source folder
- 0.6.4 set both `build` and `autobuild` output to end in `user.js` for a common log filtering option in browser developer tools
- 0.6.3 tidy `META.js` and now using `<%= pkg.version %>.<%= data.datenow %>` style version for the userscript ie `1.2.3.201117142202`
- 0.6.2 create a unified `METAobj` in `rollup.config.js` for use in each of the configurations for easy updates and configurations
- 0.6.1 unify script titles in `package.json` with `rollup.config.js` cleanup and refinements

## 201116
- 0.6.0 in `rollup.config.js` changed sideloaded filename name to `...sideloaded-user.js` so that you can use a common filter `user.js` in the browser developer tools for sideloaded and release versions of the script.  Until now one had to use `sideloaded` for the sideloaded script, and then `user` for the userscript.
- 0.5.9 `yarn upgrade-interactive --latest` update devDependencies

## 200921
- 0.5.8 update terser options

## 200920
- 0.5.7 update commented out `prettier` options in `rollup.config.js` and uninstall `rollup-plugin-prettier`
      if you want to enable `prettier` options then `yarn add --dev prettier rollup-plugin-prettier` and enable the comments in `rollup.config.js`

## 200918
- 0.5.6 `yarn upgrade-interactive --latest`
- 0.5.3 remove unused scripts, only using `build` === `user` and `autobuild` === `sideloaded`
- 0.5.2 `yarn add --dev rollup-plugin-livereload` and configure in `rollup.configure.js`
- 0.5.1 remove `Closure Compiler` as we're using `Terser` exclusively now
- 0.5.0 GIT REBASE for tidy up
