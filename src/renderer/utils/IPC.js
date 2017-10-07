
class IPCUtil {

  constructor ({ channel }) {
    this.channel = channel
  }

  send (...args) {
    return new Promise((resolve) => {
      ipcRenderer.once(`${this.channel}-response`, (event, arg) => {
        resolve(arg)
      })
      ipcRenderer.send(this.channel, ...args)
    })
  }
}

export default IPCUtil
