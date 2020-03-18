<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: 'PingFang SC', 'STHeitiSC-Light', 'Helvetica-Light', Arial, sans-serif, 'Droid Sans Fallback'
}
html,
body {
  height: 100%;
}
#app {
  height: 100%;
}
input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset;
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}
.el-pager li {
  font-size: 16px;
}

</style>
