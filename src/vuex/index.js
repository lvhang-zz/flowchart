import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    num:1
  },
  getters:{
    nums(state){
      return state.num + "多少钱"
    }
  },
  mutations:{
    add(state){
      state.num++
    }
  }
})
