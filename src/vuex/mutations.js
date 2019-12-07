export default {
  keyzt(state){
     state.keyzt=!state.keyzt
    console.log(state.keyzt);
  },
  add(state) {
    state.count = 1000000;
    console.log(state);
  },
  reduce(state) {
    state.count -= 1;
  }
  /*模板调用
   * <button @click="$store.commit('reduce')">-</button>*/
}
