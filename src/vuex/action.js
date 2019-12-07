//可以绑定多个方法(mutations)
import mutations from './mutations';

export default {

  async dialog(context) {//这里的context和我们使用的$store拥有相同的对象和方法
    context.commit('add');
    console.log(mutations);
    //你还可以在这里触发其他的mutations方法
    /*模板调用
    *  <a href="javascript:;" @click="$store.dispatch('dialog')">点击</a>*/
  },

}
