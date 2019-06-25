import Vue from "vue";
import Vuex from "vuex";
import num from "./modules/num.js";
Vue.use(Vuex);

export default new Vuex.Store({
  modules:{//模块化管理状态
    number:num
  },
  state:{
    name:"lvhang"
  }
})
