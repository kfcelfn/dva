import { findUser, add, deleteUser, updateUser } from '@/services/table'

const { pathToRegexp } = require('path-to-regexp')  //路由路径正则判断

export default {
  // 命名空间 名字唯一
  namespace: 'table',

  // 状态
  state: {
   data: []
  },

  //订阅  
  subscriptions: {
    tableData ({ history, dispatch }) {  
      history.listen(({ pathname }) => {
        const regexp = pathToRegexp('/').test(pathname)
        if (regexp) dispatch({ type: 'getData' });
      });
    }
  },

  // 异步加载
  effects: {
    *getData ({ payload }, { call, put }) {
      const res = yield call(findUser)
      yield put({
        type: 'submitData', 
        payload: res.users
      })
    },
    // 删除
    *deleteData ({ payload }, { call, put }) {
      const res = yield call(() => deleteUser({ id: payload }))
      if( res.status == 200 ) yield put({ type: 'getData'})
    },
    // 添加
    *addData ({ payload }, { call, put }) {
      const res = yield call(() => add(payload))
      if( res.status == 200 ) yield put({ type: 'getData'})
    },
    // 修改
    *editData ({ payload }, { call, put }) {
      const res = yield call(() => updateUser(payload))
      if( res.status == 200 ) yield put({ type: 'getData'})
    },
  },

  // 修改state
  reducers: {
    submitData (state, action) {
      return { ...state, data: action.payload }
    },
  }
}