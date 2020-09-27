import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Form, Input, Switch, InputNumber, TreeSelect, Spin } from 'antd';
import ProForm, {
  ProFormText,
  ProFormSwitch
  // eslint-disable-next-line import/no-extraneous-dependencies
} from '@ant-design/pro-form';
import { queryTreeList } from '../service';

const FormItem = Form.Item;

const UpdateForm = props => {
  const { modalVisible, onCancel, onSubmit, loading, record } = props;
  const [form] = Form.useForm();
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    if (menus.length === 0) {
      queryTreeList().then(res => {
        setMenus(res.success ? res.data : []);
      })
    }
  });

  return (
    <Modal
      destroyOnClose
      title="编辑菜单"
      width={650}
      visible={modalVisible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
    >
      <ProForm
        form={form}
        initialValues={record}
        onFinish={async value => {
          const params = value;
          params.id = record.id;
          params.status = value.status ? 1 : 2;
          await onSubmit(params);
        }}
      >
        <Spin spinning={loading}>
          <Row gutter={12}>
            <Col span={12}>
              <FormItem label="所属上级" name="parentId">
                <TreeSelect
                  allowClear
                  style={{ width: '100%' }}
                  treeData={menus}
                  placeholder="请选择"
                  treeDefaultExpandAll
                />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="菜单名称" name="name"
                rules={[{ required: true, message: '请输入菜单名称！' }]}
              >
                <Input placeholder="请输入菜单名称" />
              </FormItem>
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <ProFormText
                label="跳转路径"
                name="path"
                tip="前端路由地址，如:/user"
                placeholder="请输入跳转路径！"
                rules={[{ required: true, message: '请输入跳转路径！' }]}
              />
            </Col>
            <Col span={12}>
              <ProFormSwitch
                label="操作内菜单"
                tip="为true时将不显示在左侧菜单拦"
                name="isInside"
              />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <FormItem label="排序值" name="sort"
                rules={[{
                  required: true,
                  message: '请输入排序值！'
                }]}
              >
                <InputNumber min={0} value={0} max={999} precision={0} />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="状态" name="status">
                <Switch defaultChecked />
              </FormItem>
            </Col>
          </Row>
        </Spin>
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
