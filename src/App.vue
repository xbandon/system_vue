<template>
  <div id="app">
    <router-view v-if="routerAlive"/>
  </div>
</template>

<script>
export default {
  //暴露 reload 方法，方便组件调用
  provide() {
    return {
      reload: this.reload,
    }
  },
  data() {
    return {routerAlive: true}
  },
  methods: {
    //重新加载的方法
    reload() {
      this.routerAlive = false
      this.$nextTick(function () {
        this.routerAlive = true
      })
    },
  },
}
</script>
