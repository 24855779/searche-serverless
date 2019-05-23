import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchList: [],
    dataList: []
  },
  actions: {
    addAction (context, payload) {
      context.commit({
        type: 'addMution',
        value: payload.value
      })
    },
    getListAC (context, payload) {
      return axios.get('https://s1vrjtq2f4.execute-api.us-east-1.amazonaws.com/beta/productList').then(res => {
        context.commit({
          type: 'getListMU',
          value: res.data.data.Items
        })
      })
    }
  },
  mutations: {
    addMution (state, payload) {
      state.searchList.push(payload.value)
    },
    getListMU (state, payload) {
      state.dataList = payload.value
    }
  }
})


// 商品列表页接口：
// https://s1vrjtq2f4.execute-api.us-east-1.amazonaws.com/beta/productList

// 商品详情页接口，传递商品的主键pid：
// https://bxyb0axi90.execute-api.us-east-1.amazonaws.com/beta/getProductDetail?pid=10
