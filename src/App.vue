<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Route></Route>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Route from './pages/route.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    Route
  }
}
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
  overflow: hidden;
}
body {
  margin: 0;
}
#app {
  margin: 0 auto;
  max-width: 750px;
  overflow: hidden;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-size: 16px;
}

.page {
  height: 100%;
}
</style>
