let { MongoClient } = require('mongodb')

// keep it local and with no ref exposed
let configs = {}

class MongoService {
  // @param conf = ({ host, port, user, pwd })
  constructor (conf = {}) {
    this.confSym = Symbol('config symbol')
    this.db = null
    configs[this.confSym] = conf
  }

  async connect (dbName) {
    let { host, port, user, pwd } = configs[this.confSym]
    if (host == null) host = 'localhost'
    if (port == null) port = 27017
    if (pwd == null) pwd = ''

    let [enUser, enPwd] = [user, pwd].map(encodeURI)
    let url = user
      ? `mongodb://${enUser}:${enPwd}@${host}:${port}/${dbName}`
      : `mongodb://${host}:${port}/${dbName}`
    this.db = await MongoClient.connect(url)
    return this.db
  }
}

module.exports = MongoService
