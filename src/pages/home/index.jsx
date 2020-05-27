import React, { Component } from 'react'
import { connect } from 'dva'
import { Button } from 'antd';
import './styles.less'

@connect(({ home }) => {
  return {
    name: home.name,
    age: home.age,
    data: home.data
  }
})
export default class Home extends Component {

  editName = () => {
    this.props.dispatch(({
      type: 'home/editData',  //从home页面，拿editData方法
      payload: '狗蛋'         //需要修改的值传过去
    }))
  }

  getData = () => {
    this.props.dispatch(({
      type: 'home/getData',  
      payload: '狗蛋'        
    }))
  }

  concatData = () => {
    this.props.dispatch(({
      type: 'home/getSelectData'   
    }))
  }

  render() {
    const { name, age, data } = this.props

    return (
      <div className='page-home'>
        home -- {name} -{age}
        <button onClick={this.editName}>点击</button>
        <button onClick={this.getData}>获取数据</button>
        <Button onClick={this.concatData}>拼接数据</Button>
        {JSON.stringify(data)}
      </div>
    )
  }
}
