<template>
  <section class="container">
    <!--<img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />-->
    <h1 class="title">
      Universal Vue.js Application Framework1
    </h1>
    <div>
      <at-input v-model="value" placeholder="请输入..."></at-input>
    </div>
    <nuxt-link class="button" to="/about">
      About page
    </nuxt-link>
  </section>
</template>

<style scoped>
  .title
  {
    margin: 50px 0;
  }
</style>
<script>

export default {
  components: {

  },
  data () {
    return {
      value: 'O2Team'
    }
  }
}
</script>
