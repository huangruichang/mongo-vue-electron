
<template>
  <!--https://github.com/AT-UI/at-ui/pull/38-->
  <div>
    <div v-if="init && collections && collections.length > 0">
      <at-table :columns="columns" :data="collections"></at-table>
    </div>
    <div v-else-if="!init">
      loading
    </div>
    <div v-else>
      <at-table :columns="columns" :data="[]"></at-table>
    </div>
  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        collections: state => state.collections
      })
    },
    methods: {
      ...mapActions(['listCollections'])
    },
    data () {
      return {
        columns: [
          {
            title: 'name',
            key: 'name'
          }, {
            title: '',
            key: 'operation',
            render: (h, params) => {
              return h('div', [
                h('AtButton', {
                  props: {
                    size: 'small',
                    hollow: true
                  },
                  style: {
                    float: 'right'
                  },
                  on: {
                    click: () => {
                      this.$Message(params.item.name)
                    }
                  }
                }, 'view')
              ])
            }
          }
        ],
        init: false
      }
    },
    async mounted () {
      await this.listCollections()
      this.init = true
    }
  }
</script>
