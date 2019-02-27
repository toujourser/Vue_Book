// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//导入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnIHCkRmeTbM87B97c-FcwtNZUhxFP_LJonhkhhb7B2wItp3Ia',
  loading: 'http://photocdn.sohu.com/20160127/mp56791937_1453886827459_16.gif',
  attempt: 1
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
