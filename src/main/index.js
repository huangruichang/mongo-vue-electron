
const { app, BrowserWindow, ipcMain } = require('electron')
const { join } = require('path')
const os = require('os')
const MongoService = require('../../packages/mongo-service')

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
ipcMain.on(CONNECT_EVENT, async function (event, host, port, user, password) {
  ms = new MongoService({
    host: host,
    port: port,
    user: user,
    pwd: password
  })
  try {
    db = await ms.connect()
    if (db) {
      event.sender.send(`${CONNECT_EVENT}-response`, {
        result: true
      })
    } else {
      event.sender.send(`${CONNECT_EVENT}-response`, {
        result: false
      })
    }
  } catch (e) {
    event.sender.send(`${CONNECT_EVENT}-response`, {
      result: false
    })
  }
})
