<template>
  <div id="app">
    <headers></headers>
    <router-view/>
  </div>
</template>

<script>
import headers from "./components/header.vue";
export default {
  name: "app",
  data() {
    return {
      islogin: false
    };
  },
  created() {
    if (!this.islogin) {
      // this.$router.push({ path: "/login" });
    }

  },
  watch: {
    islogin(val) {
      if (!val) {
        // this.$router.push({ path: "/login" });
      }
    }
  },
  components: {
    headers
  }
};
</script>

<style lang="scss">
@import "./assets/common.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: "$black";
}
</style>
