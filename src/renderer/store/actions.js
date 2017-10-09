
import IPCUtil from '../utils/ipc'
import error from '../utils/error'
import * as types from './mutation-types'

const actions = {
  async connect ({ commit }, { host, port, user, password, dbName }) {
    try {
      let ipc = new IPCUtil({ channel: 'connect' })
      let { err } = await ipc.send(host, port, user, password, dbName)
      if (!err) {
        commit(types.CONNECT)
      } else {
        commit(types.FAIL, error(err))
      }
    } catch (e) {
      commit(types.FAIL, error(e))
    }
  },
  async listCollections ({ commit }) {
    try {
      let ipc = new IPCUtil({ channel: 'collections.list' })
      let { err, collections } = await ipc.send()
      if (!err) {
        commit(types.LIST_COLLECTIONS, collections || [])
      } else {
        commit(types.FAIL, error(err))
      }
    } catch (e) {
      commit(types.FAIL, error(e))
    }
  }
}

export default actions
