// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import esriLoader from 'esri-loader'
import VueQuillEditor from 'vue-quill-editor'
import './styles/quill.core.css'
import './styles/quill.snow.css'
import './styles/quill.bubble.css'
import store from './store/store.js'
Vue.prototype.$echarts = echarts
Vue.use(VueQuillEditor)
// esriLoader.loadCss('http://192.168.35.212:80/arcgis_js_v319_sdk/arcgis_js_api/library/3.19/3.19/dijit/themes/tundra/tundra.css');
// esriLoader.loadCss('http://192.168.35.212/arcgis_js_v319_sdk/arcgis_js_api/library/3.19/3.19/esri/css/esri.css');
esriLoader.loadCss('https://js.arcgis.com/3.19/dijit/themes/tundra/tundra.css')
esriLoader.loadCss('https://js.arcgis.com/3.19/esri/css/esri.css')

esriLoader.loadScript({
  dojoConfig: {
    async: true,
    packages: [{
      location: '/static',
      name: 'static'
    }]
  },
  // url:'http://192.168.35.212:80/arcgis_js_v319_sdk/arcgis_js_api/library/3.19/3.19/init.js'
  url: 'https://js.arcgis.com/3.19/init.js'
})

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
