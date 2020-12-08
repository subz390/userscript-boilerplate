import pkg from './package.json'
import env from './rollup/env.json'

// https://github.com/rollup/plugins

// bundle ES modules from node_modules
// https://github.com/rollup/plugins/tree/master/packages/node-resolve
import resolve from '@rollup/plugin-node-resolve'

// Convert CommonJS modules to ES6, so they can be included in a Rollup bundle
// https://github.com/rollup/plugins/tree/master/packages/commonjs
import commonjs from '@rollup/plugin-commonjs'

// A Rollup plugin which Converts .json files to ES6 modules.
// https://github.com/rollup/plugins/tree/master/packages/json
import json from '@rollup/plugin-json'

// https://github.com/jleeson/rollup-plugin-import-css
import css from 'rollup-plugin-import-css'

// https://github.com/thgh/rollup-plugin-livereload
import livereload from 'rollup-plugin-livereload'

// date formatting for Rollup
// used with subversion
import {dateFormat} from './rollup/dateFormat.js'

// append license and meta data to output
// https://github.com/mjeanroy/rollup-plugin-license
import license from 'rollup-plugin-license'

/**
 * @name attachHeader
 * @param {string} type (optional) `[ userscript (default) | license ]` the type of header to attach to the script output
 * @return {function} rollup-plugin-license imported function
 * @description Attach header comments to the output script file.  Use `META.js` and `HEAD.js` templates with the contents of `METAobj`.  Whist rollup-plugin-license is meant for attaching license headers, it can be used for custom comment headers such as the userscript META block.
 */
function attachHeader(type = 'userscript') {
  // extract name, email and url from the combined author string from package.json
  const pkgAuthorRegex = /^(\w+) <([\w@+\.]+)> \((https?:\/\/[/\w.]+)\)$/i
  const [, pkgAuthorName, pkgAuthorEmail, pkgAuthorUrl] = pkg.author.match(pkgAuthorRegex)

  // https://www.tampermonkey.net/documentation.php#_run_at
  // `document-start` The script will be injected as fast as possible
  // `document-body`  The script will be injected if the body element exists
  // `document-end`   The script will be injected when or after the DOMContentLoaded event was dispatched
  // `document-idle`  Tampermonkey default
  const METAobj = {
    pkgAuthorName: pkgAuthorName,
    pkgAuthorEmail: pkgAuthorEmail,
    pkgAuthorUrl: pkgAuthorUrl,
    include: env.meta.include, // @include
    require: env.meta.require, // @require
    resources: env.meta.resources, // @resource magnet https://192.168.1.20:8081/dev/userscripts/magnet.png
    grant: env.meta.grant,
    runat: env.meta.runat,
    datenow: dateFormat('yymmddHHMMss')
  }

  if (type == 'userscript') {
    return license({
      banner: {
        commentStyle: 'none', // regular | ignored | slash | none
        content: {file: `${env.sourceFolder}/META.js`},
        get data() {return METAobj}
      }
    })
  }
  else if (type == 'license') {
    return license({
      banner: {
        commentStyle: 'none', // regular | ignored | slash | none
        content: {file: `${env.sourceFolder}/HEAD.js`},
        get data() {return METAobj}
      }
    })
  }
}

// https://github.com/porsager/rollup-plugin-modify
import modify from 'rollup-plugin-modify'

/**
 * @name removeDebuggingCode
 * @return {function} rollup-plugin-modify imported function
 * @description search and replace debug definition so that Rollup will treeshake corresponding debug && * statements.
 * @summary use debugging statements in the format listed in the example below.  When debug is false, Rollup will remove (treeshake) every debug && console.log() statement from the source.
 * @example
 * const debug = true
 * debug && console.log('your debug log')
 */
function removeDebuggingCode() {
  return modify({
    find: /^([\t ]*(\/\/\ ?)?(const|let) debug = .+)/m,
    replace: (...args) => {
      // args are the captured regex matches
      // [0] whole string
      // [1] (\/\/\ ?)
      // [3] (const|let)
      return `${args[3]} debug = false`
    }
  })
}

// remove comments and empty lines
// https://github.com/aMarCruz/rollup-plugin-cleanup
import cleanup from 'rollup-plugin-cleanup'

// copy source assets to public folder
// https://github.com/vladshcherbin/rollup-plugin-copy
import copy from 'rollup-plugin-copy'

/**
 * @name copyToRemote
 * @description copy the bundled files to a remote development server for testing
 * @return {function} rollup-plugin-copy imported function
 */
function copyToRemote() {
  return copy({
    targets: [{src: `${env.userscriptFolder}/*.js`, dest: `${env.remoteFolder}/${pkg.name}`}],
    hook: 'writeBundle'
  })
}

// https://github.com/vladshcherbin/rollup-plugin-delete
import del from 'rollup-plugin-delete'

/**
 * @name clearTargetFolders
 * @return {function} rollup-plugin-delete imported function
 * @description delete matching files from target folders.  Used when switching between different output configurations, say one configuration uses many smaller files and another one combined file.
 */
function clearTargetFolders() {
  return del({
    targets: [`${env.userscriptFolder}/*.js`, `${env.remoteFolder}/${pkg.name}/*.js`],
    verbose: true,
    force: true
    // dryRun: true,
  })
}

// https://github.com/TrySound/rollup-plugin-terser
// https://github.com/terser-js/terser
// https://github.com/terser/terser#minify-options
import {terser} from 'rollup-plugin-terser'
const terserOptions = {
  compress: {passes: 2},
  // https://github.com/terser/terser#format-options
  format: {
    // beautify: true,
    comments: false, // true - all comments, false - no comments, "some"|undefined - JSDoc @license or @preserve comments
  },
  ecma: 2018, // https://www.w3schools.com/js/js_versions.asp
  warnings: 'verbose',
}


// ==============================================================================================
const baseConfig = {
  input: `${env.sourceFolder}/index.js`,
  output: {
    file: `${env.userscriptFolder}/${pkg.name}.user.js`,
    format: 'esm', // esm | iife | cjs | umd
    sourcemap: false, // 'inline' | true | false
    sourcemapExcludeSources: true
  },
  plugins: [
    json(),
    resolve(),
    commonjs(),
    css({minify: true}),
  ]
}

const loaderConfig = {
  ...baseConfig,
  input: `${env.sourceFolder}/loader.js`,
  plugins: [
    ...baseConfig.plugins,
    // add link to sideloaded script in loader.js
    modify({'<%= scriptURL %>': `${env.remoteWebURL}/${pkg.name}/${pkg.name}-sideloaded-user.js`}),
    clearTargetFolders(),
    attachHeader('userscript'),
    // https://github.com/thgh/rollup-plugin-livereload
    // load the plugin when in development mode
    // if you load it when not in development mode it'll run ok, but will give the impression that Rollup hangs when compiling a bundle
    // it's not hung or crashed, it's just livereload server keeping the command line process running
    (process.env.ROLLUP_WATCH || false) && livereload({
      // verbose: true,
      watch: env.userscriptFolder,
      // by default livereload looks for its server at the document location
      // however when developing a userscript you're most likely going to be running a script on a remote website
      // so you can tell livereload here with clientUrl where it's server is located if it's different from the document location
      clientUrl: env.liveReload.clientURL,
      port: env.liveReload.serverPort,
      // livereload HTTPS keys
      // when developing userscripts on sites that require authentication, you'll need to liveReload via HTTPS or the browser will block the script from loading
      // you can self generate SSL certificate and key from freeNAS > System > Certificates
      // build, reload, and then manually browse the livereload https clientURL and accept the key
      https: {key: env.liveReload.key, cert: env.liveReload.certificate}
    }),
  ],
  // https://rollupjs.org/guide/en/#-w--watch
  // While in watch mode, the ROLLUP_WATCH environment variable will be set to "true" by the Rollup command line interface
  // console.log(`process.env.ROLLUP_WATCH`, process.env.ROLLUP_WATCH)
  watch: {
    include: `${env.sourceFolder}/**`,
    clearScreen: false
  }
}

const sideLoadedConfig = {
  ...baseConfig,
  output: {...baseConfig.output, file: `${env.userscriptFolder}/${pkg.name}-sideloaded-user.js`},
  plugins: [
    ...baseConfig.plugins,
    // terser(terserOptions),
    // cleanup(), // remove comments and empty lines from source code
    copyToRemote()
  ]
}

const buildConfig = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    clearTargetFolders(),
    removeDebuggingCode(),
    terser(terserOptions),
    attachHeader('userscript'),
    copyToRemote()
  ]
}

const sourceConfig = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    clearTargetFolders(),
    removeDebuggingCode(),
    cleanup(), // remove comments and empty lines from source code
    attachHeader('userscript'),
    // attachHeader('license'), // or just the license header
    copyToRemote()
  ]
}


// console.log('process.env', process.env)
// console.log('process.env.BUILD_ENV ===', process.env.BUILD_ENV)

let rollupConfig
switch (process.env.BUILD_ENV) {
  case 'autobuild':
    rollupConfig = [loaderConfig, sideLoadedConfig]
    break

  case 'build':
    rollupConfig = buildConfig
    break

  case 'source':
    rollupConfig = sourceConfig
    break

  default:
    console.log('Processing default config')
    rollupConfig = baseConfig
    break
}

export default rollupConfig
