

/**
 * when sites prevent external scripts from being loaded you can temporarily override this in FireFox
 * about:config > security.csp.enable false
 */

const loadScriptDebug = false

/**
 * @name getTime
 * @param {string} style - null (default) | epoch
 * @return {number} human readable, or epoch number
 */
function getTime(style = 'default') {
  if (style === 'epoch') {
    return Date.now()
  }
  const d = new Date()
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`
}

/**
 * @name loadScript
 * @param {string} src
 * @description Asynchronously loads JavaScript into <script> tags optionally resolving a common Promise for each loaded script
 * @return {Object} promise
 * @see https://stackoverflow.com/a/46961218/11781536
 */
const loadScript = function(src) {
  // Initialize scripts queue
  if (loadScript.scripts === undefined) {
    loadScript.scripts = []
    loadScript.index = -1
    loadScript.loading = false
    loadScript.next = function() {
      if (loadScript.loading) return
      // Load the next queue item
      loadScript.loading = true
      const item = loadScript.scripts[++loadScript.index]
      loadScriptDebug && console.log(`loadScript.next: ${item.timestamp}`)
      const head = document.getElementsByTagName('head')[0]
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = item.src + '?nocache=' + getTime('epoch')
      // onload start next item in queue and then resolve this item's promise
      script.onload = () => {
        loadScript.loading = false
        loadScriptDebug && console.log(`script.onload: ${item.timestamp} ${item.src} loaded ok`)
        if (loadScript.index < loadScript.scripts.length - 1) {
          loadScript.next()
        }
        // item.resolve(item.timestamp);
      }
      head.appendChild(script)
    }
  };

  const timestamp = getTime()

  // Adding a script to the queue
  if (src) {
    loadScriptDebug && console.log(`src: ${timestamp} ${src} is being processed`)

    // Check if already added
    for (let i=0; i < loadScript.scripts.length; i++) {
      if (loadScript.scripts[i].src == src) {
        loadScriptDebug && console.log(`src: ${timestamp} script already added, returning promise`, loadScript.scripts[i].promise)
        return loadScript.scripts[i].promise
      }
    }

    // Add to the queue
    const item = {src: src, timestamp: timestamp}
    item.promise = new Promise((resolve) => {item.resolve = resolve})
    loadScriptDebug && console.log(`item: ${item.timestamp}`, item)
    loadScript.scripts.push(item)
    loadScript.next()

    loadScriptDebug && console.log(`src: ${timestamp} returning promise `, loadScript.scripts[loadScript.scripts.length - 1])
    return loadScript.scripts[loadScript.scripts.length - 1].promise
  }
  else console.error('Script source URL required')
}


// asynchronously load scripts with a Promise .then callback
// 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
// ['https://192.168.1.20:8081/dev/release/jsutils_umd.js', '<%= scriptURL %>']
//     .forEach((script) => {
//       loadScript(script)
//           .then((timestamp) => {
//             // this same resolve is called after each script has been loaded
//             loadScriptDebug && console.log(`.then: ${timestamp}`)
//             if (typeof jsutils !== undefined) {
//               loadScriptDebug && jsutils.conlog(`JSUtils ${jsutils.help}`)
//             }
//             else {
//               console.error('jsutils did not load')
//               return
//             }
//           })
//           .catch((e) => console.error(e))
//     })


// asynchronously load multiple scripts without Promise .then callback
// ['', '']
// .forEach(loadScript);


// load one script with a promise
loadScript('<%= scriptURL %>')
.then((result) => {console.log('result', result)})
.catch(e => console.error(e))
