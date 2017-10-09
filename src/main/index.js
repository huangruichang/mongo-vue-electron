
const { app, BrowserWindow, ipcMain } = require('electron')
const { join } = require('path')
const os = require('os')
const MongoService = require('../../packages/mongo-service')
const error = require('./error')

function initDevTools () {
  const keyAndVersion = 'nhdogjmejiglipccpnnnanhbledajbpd/3.1.6_0'
  try {
    BrowserWindow.addDevToolsExtension(`${os.homedir()}/Library/Application Support/Google/Chrome/Default/Extensions/${keyAndVersion}`)
  } catch (ignored) {
    console.log(ignored)
  }
}

require('../renderer/index')

app.on('ready', () => {

  initDevTools()

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  })

  win.loadURL('http://localhost:3233')

})

app.on('window-all-closed', () => {
  app.quit()
})

let db, ms
const CONNECT_EVENT = 'connect'
ipcMain.on(CONNECT_EVENT, async function (event, host, port, user, password, dbName) {
  ms = new MongoService({
    host: host,
    port: port,
    user: user,
    pwd: password
  })
  try {
    db = await ms.connect(dbName)
    if (db) {
      event.sender.send(`${CONNECT_EVENT}-response`, {})
    } else {
      event.sender.send(`${CONNECT_EVENT}-response`, {
        err: error('fail')
      })
    }
  } catch (e) {
    event.sender.send(`${CONNECT_EVENT}-response`, {
      err: error(e)
    })
  }
})

const COLLECTIONS_LIST = 'collections.list'
ipcMain.on(COLLECTIONS_LIST, async function (event) {
  if (db) {
    try {
      let collections = await db.listCollections().toArray() || []
      event.sender.send(`${COLLECTIONS_LIST}-response`, {
        collections: collections
      })
    } catch (e) {
      event.sender.send(`${CONNECT_EVENT}-response`, {
        err: error(e)
      })
    }
  } else {
    event.sender.send(`${CONNECT_EVENT}-response`, {
      err: error('fail')
    })
  }
})
