
<template>
  <div>
    <div class="title">
      mongo-vue-electron
    </div>
    <div class="flex">
      <div class="container">
        <div class="row">
          <form class="col-md-offset-6 col-md-12" action="#" onsubmit="return false;">
            <at-input v-model="host" placeholder="host"></at-input>
            <at-input v-model="port" placeholder="port"></at-input>
            <at-input v-model="user" type="text" placeholder="user"></at-input>
            <at-input v-model="password" type="password" placeholder="password"></at-input>
            <at-input v-model="dbName" type="text" placeholder="db"></at-input>
            <div class="button-group">
              <at-button v-on:click="reset">reset</at-button>
              <at-button v-on:click="confirm" type="primary">confirm</at-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

  .title {
    text-align: center;
    font-size: 32px;
    padding-top: 100px;
  }

  .flex {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 100%;
  }

  .button-group {
    margin-top: 10px;
    float: right;
  }

  .button-group button {
    margin-left: 10px;
  }

  form .at-input:not(:first-child) {
    margin-top: 10px
  }
</style>

<script>

  import { mapActions, mapMutations } from 'vuex'

  export default {
    methods: {
      ...mapActions(['connect']),
      reset () {
        this.host = ''
        this.user = ''
        this.port = ''
        this.password = ''
      },
      async confirm () {
        await this.connect({
          host: this.host,
          user: this.user,
          port: this.port,
          password: this.password,
          dbName: this.dbName
        })
      }
    },
    data () {
      return {
        host: '',
        port: '27017',
        user: '',
        password: '',
        dbName: ''
      }
    },
    mounted () {
      let thiz = this
      this.$store.watch(function (state) {
        return state.connection_init
      }, function (connection_init) {
        if (connection_init) {
          thiz.$router.push('collections')
        }
      })
    }
  }
</script>

