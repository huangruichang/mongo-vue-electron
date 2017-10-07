
import IPCUtil from '../utils/IPC'
import * as types from './mutation-types'

const actions = {
  async connect ({ commit }, { host, port, user, password }) {
    try {
      let ipc = new IPCUtil({ channel: 'connect' })
      let { result } = await ipc.send(host, port, user, password)
      if (result) {
        commit(types.CONNECT_SUCCESS)
      } else {
        commit(types.CONNECT_FAIL)
      }
    } catch (e) {
      commit(types.CONNECT_FAIL)
    }
  }
}

export default actions
