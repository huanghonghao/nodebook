import React from 'react';
import { Table, Form, Input, Button, Icon, Modal, Divider } from 'antd';

const FormItem = Form.Item;

class Index extends React.Component {
  state = {
    visible: false,
    initValue: {},
    dataSource: [
      {
        key: '1',
        name: 'John',
        address: 'New York No. 1 Lake Park',
        mail: '123@qq.com',
        tel: '123'
      },
      {
        key: '2',
        name: 'Jim',
        address: 'London No. 1 Lake Park',
        mail: '123@qq.com',
        tel: '12342'
      },
      {
        key: '3',
        name: 'Joe',
        address: 'Sidney No. 1 Lake Park',
        mail: '123@qq.com',
        tel: '12332'
      },
    ]
  };

  showAddModal = item => {
    if(item.key) {
      this.setState({ initValue: item });
    } else {
      this.setState({ initValue: {} });
    }
    // 显示添加modal
    this.setState({ visible: true });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  deleteItem = item => {
    const { dataSource } = this.state;
    this.setState({ dataSource: dataSource.filter(v => item.key !== v.key) })
  };

  handleAdd = values => {
    const { dataSource } = this.state;
    const { name, address, mail, tel } = values;

    // 添加数据
    dataSource.push({
      key: Date.now(),  // 必须提供key, 这里使用时间戳
      name,
      address,
      mail,
      tel
    });

    // 更新表格数据， 并关闭modal框
    this.setState({ dataSource, visible: false });

  };

  handleEdit = values => {
    const { dataSource } = this.state;
    const { key } = values;

    // 添加数据
    const newDataSource = dataSource.map(v => {
      // 要修改的数据
      if(v.key === key) {
        return values;
      }
      return v;
    });
    console.log(newDataSource);
    // 更新表格数据， 并关闭modal框
    this.setState({ dataSource: newDataSource, visible: false });
  };

  handleSearch = () => {
    const { dataSource } = this.state;
    const { form  } = this.props;
    const value = form.getFieldsValue();
    this.setState({ dataSource: dataSource.filter(v =>v.name === value.name || v.tel === value.tel) });
  };

  render() {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name'
      },
      {
        title: '电话',
        dataIndex: 'tel'
      },
      {
        title: '邮箱',
        dataIndex: 'mail'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '操作',
        render: item => <span>
          <Button type="danger" onClick={() => this.deleteItem(item)}>删除</Button>
          <Divider type="vertical" />
          <Button type="primary" onClick={() => this.showAddModal(item)}>修改</Button>
        </span>
      }
    ];

    const { form: { getFieldDecorator } } = this.props;
    const { dataSource, visible, initValue } = this.state;
    return (
      <div style={{ paddingTop: 20 }}>
        <Form layout='inline'>
          <FormItem label="姓名">
            {getFieldDecorator('name', {})(
              <Input />
            )}
          </FormItem>
          <FormItem label="电话">
            {getFieldDecorator('tel', {})(
              <Input />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary"onClick={this.handleSearch}>查询</Button>
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.showAddModal}>
              <Icon type="plus" />新增
            </Button>
          </FormItem>
        </Form>
        <Table dataSource={dataSource} columns={columns} />
        <MyModalForm visible={visible} onCancel={this.handleCancel} parent={this} initValue={initValue} />
      </div>
    );
  }
}

class MyModal extends React.Component {
  handleSubmit = parent => {
    const { form, initValue } = this.props;
    const values = form.getFieldsValue();
    if(Object.keys(initValue).length) {
      const editValues = {
        ...values,
        key: initValue.key
      };
      parent.handleEdit(editValues);
    } else {
      parent.handleAdd(values);
    }
  };

  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    const { form: { getFieldDecorator }, visible, onCancel, parent, initValue } = this.props;

    return (
      <Modal
        visible={visible}
        title={Object.keys(initValue).length ? '修改': '添加'}
        onOk={this.handleSubmit}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={() => this.handleSubmit(parent)}>
            提交
          </Button>,
        ]}
      >
        <Form {...formItemLayout}>
          <Form.Item label="姓名">
            {getFieldDecorator('name', {
              initialValue: initValue.name
            })(<Input />)}
          </Form.Item>
          <Form.Item label="电话">
            {getFieldDecorator('tel', {
              initialValue: initValue.tel
            })(<Input />)}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('mail', {
              initialValue: initValue.mail
            })(<Input />)}
          </Form.Item>
          <Form.Item label="地址">
            {getFieldDecorator('address', {
              initialValue: initValue.address
            })(<Input />)}
          </Form.Item>
        </Form>
      </Modal>

    );
  }
}
const MyModalForm = Form.create()(MyModal);
const IndexForm = Form.create()(Index);

export default IndexForm;
