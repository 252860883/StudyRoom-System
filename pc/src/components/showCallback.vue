<template>
<transition name="fade">
    <div class="cbShow" v-if="isShow">
        <p>{{content}}</p>
    </div>s
</transition>

</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      con: ""
    };
  },
  props: {
    content: {
      type: String
    },
    show: {
      type: Boolean
    }
  },
  created() {
    this.isShow = this.show;
    this.con = this.content;
  },
  watch: {
    show: function(n) {
      this.isShow = n;
      let self = this;
      if (n) {
        setTimeout(() => {
          self.isShow = false;
        }, 3000);
      }
    },
    content: function(n) {
      this.isShow = n;
      let self = this;
      setTimeout(() => {
        self.isShow = false;
      }, 3000);
    }
  }
};
</script>
<style lang="scss" scoped>
.cbShow {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  p {
    padding: 20px 30px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 10px;
    color: #fff;
  }
}
</style>


