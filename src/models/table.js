import { findUser } from '@/services/home'

const { pathToRegexp } = require('path-to-regexp')  //路由路径正则判断

export default {
  // 命名空间 名字唯一
  namespace: 'home',

  // 状态
  state: {
    name: 'tiezhu',
    age: 100,
    data: []
  },

  //订阅  
  subscriptions: {
    //监听路由变化，就可以在这里写。 不需要去页面componentDidMount和componentWillReceiveProps 两个生命周期里去写了。
    homeData ({ history, dispatch }) {  
      // 监听 history 变化
      history.listen(({ pathname }) => {
        //pathname是当前页面的路径
        const regexp = pathToRegexp('/home/:id').test(pathname)//非动态路由使用test，动态路由使用exec
        const id = pathToRegexp('/home/:id').exec(pathname)[1] //正则取出id值
        //如果regexp为true  就渲染数据
        if (regexp) dispatch({ type: 'getSelectData' });
      });
    }
  },

  // 异步加载
  effects: {
    *getData ({ payload }, { call, put }) {
      // call 请求接口用的  yield 相当于 await 等待
      //如果需要参数，call(() => findUser(payload))
      const res = yield call(findUser) //call里面接收的是一个回调
      //put == dispatch  这里不用谢命名空间
      yield put({
        type: 'submitData', 
        payload: res.users
      })
    },
    *getSelectData (_, { call, put, select }) {
      // select 获取上一次state的数据
      const old = yield select( state => state.home.data )
      
      const res = yield call(findUser)

      yield put({
        type: 'concatData', 
        payload: [...old, ...res.users]
      })
    }
  },

  // 修改state
  reducers: {
    //拿到上面的state， action 接收页面的值
    editData (state, action) {
      return { ...state, name: action.payload }
    },
    submitData (state, action) {
      return { ...state, data: action.payload }
    },
    concatData (state, action) {
      return { ...state, data: action.payload }
    },
  }
  
}