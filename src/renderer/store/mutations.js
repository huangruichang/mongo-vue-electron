
import * as types from './mutation-types'

const mutations = {
  [types.CONNECT] (state) {
    state.connection_init = true
  },
  [types.FAIL] (state, e) {
    state.err = e.msg
  },
  [types.LIST_COLLECTIONS] (state, collections) {
    state.collections = collections
  }
}

export default mutations
