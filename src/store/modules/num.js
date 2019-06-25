//num.js
const state={
  num:1
};
const getters = {
  num(state){
    return state.num + "多少钱"
  }
};
const mutations = {
  add(state,val = 1,...rootstate){
    state.num += val;
    console.log(rootstate);
  },
  minus(state,val = 1){
    state.num -= val
  }
};
const actions = {
  add(store,val){
    store.commit("add",val);
    // console.log(store.state);//当前作用域局部state
    // console.log(store.rootState);//根作用域的state
  },
  minus(store,val = 1){
    store.commit("minus",val)
  }
};
export default {
  state,
  getters,
  mutations,
  actions
}
