
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

import createLogger from 'vuex/dist/logger'

const createStore = () => {
  return new Vuex.Store({
    state: {
      connection_init: false,
      collections: []
    },
    plugins: [createLogger()],
    mutations,
    actions
  })
}

export default createStore
