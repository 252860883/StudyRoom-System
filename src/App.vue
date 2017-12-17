<template>
  <div id="app">
    <headers></headers>
    <router-view/>
  </div>
</template>

<script>
import headers from './components/header.vue';
export default {
  name: 'app',
  data(){
    return{

    }
  },
  components:{
    headers
  }
}
</script>

<style lang="scss">
@import './assets/common.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: '$black';
}
</style>
