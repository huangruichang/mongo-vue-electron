
import * as types from './mutation-types'

const mutations = {
  testMutation (state) {
    console.log(state)
  },
  [types.CONNECT_SUCCESS] (state) {
    state.connection_init = true
  },
  [types.CONNECT_FAIL] (state) {
    state.connection_init = false
  }
}

export default mutations
