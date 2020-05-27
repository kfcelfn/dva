import { findUser } from '@/services/home'

export default {
  // 命名空间 名字唯一
  namespace: 'error',

  // 状态
  state: {
    name: 'tiezhu',
    age: 100,
    data: []
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