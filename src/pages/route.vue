<template>
  <div class="router">
    <Home v-if="page === 'home'" @route="route" />
    <Result v-if="page === 'result'" @route="route" />
    <Poster v-if="page === 'poster'" @route="route" />
  </div>
</template>

<script>
// import {URLParser} from '../lib.js'
import Home from './home.vue'
import Result from './result.vue'
import Poster from './poster.vue'

export default {
  components: {
    // HelloWorld
    Home,
    Result,
    Poster,
  },

  data () {
    return {
      page: ''
    }
  },

  methods: {
    route (e, page) {
      window.history.replaceState({}, "", "#" + page)
      // console.log(e, page)
      this.page = page
    }
  },

  mounted () {
    let page = 'home'
    
    if (location.hash.length > 0) {
      page = location.hash.replace('#', '')
    }

    this.page = page
  }
}
</script>

<style lang="scss" scoped>
div.router {
  height: 100%;
}
</style>