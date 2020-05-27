import React, { Component } from 'react'
import { connect } from 'dva'
import { Table, Space, Modal, Form, Input, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

@connect(({ table }) => {
  return {
    data: table.data
  }
})

export default class Tables extends Component {
  state = {
    visible: false,
    id: '',
    confirmState: false,
    confimModal: null
  };

  shouldComponentUpdate(nextProps, nextState) {
    //当confirmState为ture并且confirmModal存在时证明用户点击了删除确认按钮
    if (nextState.confirmState && nextState.confimModal) {
      nextState.confimModal.destroy();
      this.setState({
        confirmState: false,
        confimModal: null
      })
    }
    return true
  }
  //删除
  deleteUser = id => {
    const { dispatch } = this.props
    const _this = this

    let confimModal = confirm({
      title: '确定要删除么?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        return new Promise(() => {
          dispatch(({
            type: 'table/deleteData',
            payload: id
          }))
          _this.setState({
            confimModal,
            confirmState: true, //进入页面时confirmState默认为false，只有在点击确认后，数据请求成功之前标记为true
          })
        }).catch(e => console.log(e));
      },
      onCancel() { },
    })
  }
  //添加前
  addBefore = () => {
    this.setState({
      visible: true,
      id: ''
    })
  }
  //修改前
  editBefore = id => {
    this.setState({
      visible: true,
      id
    })
  }
  //保存
  onFinish = values => {
    this.setState({ visible: false })
    const { id } = this.state

    if (!id) {
      this.props.dispatch(({
        type: 'table/addData',
        payload: values
      }))
    } else {
      values.id = id
      this.props.dispatch(({
        type: 'table/editData',
        payload: values
      }))
    }
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { data } = this.props
    const { id } = this.state

    const { Column } = Table;

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };

    return (
      <div className='page-table'>
        <Table dataSource={data} rowKey={record => record.id} >
          <Column title="编号" dataIndex="id" key="id" />
          <Column title="名字" dataIndex="name" key="name" />
          <Column title="年龄" dataIndex="age" key="age" />
          <Column title="地址" dataIndex="msg" key="msg" />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <a onClick={this.addBefore}>添加</a>
                <a onClick={() => this.editBefore(text.id)}>编辑</a>
                <a onClick={() => this.deleteUser(text.id)}>删除</a>
              </Space>
            )}
          />
        </Table>

        <Modal
          title={!id ? '添加' : '修改'}
          visible={this.state.visible}
          footer={null}
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Age"
              name="age"
              rules={[{ required: true, message: 'Please input your age!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}
