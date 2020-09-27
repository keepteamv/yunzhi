import React from 'react';
import { Modal, Spin, Row, Col } from 'antd';
import ProForm, {
  ProFormText
  // eslint-disable-next-line import/no-extraneous-dependencies
} from '@ant-design/pro-form';
import pattern from '@/utils/pattern';

const UpdateForm = props => {
  const { modalVisible, onCancel, onSubmit, loading, record } = props;
  return (
    <Modal
      destroyOnClose
      title="更新用户信息"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Spin tip="正在处理..." spinning={loading}>
        <ProForm
          initialValues={{
            ...record,
            password: ''
          }}
          onFinish={async value => {
            // 提交
            onSubmit({
              id: record.id,
              ...value
            });
          }}
        >
          <ProFormText
            name="userName"
            label="用户名"
            placeholder="请输入用户名"
            fieldProps={{
              allowClear: true,
              disabled: true
            }}
          />
          <Row gutter={12}>
            <Col span={12}>
              <ProFormText
                name="realName"
                label="真实姓名"
                fieldProps={{
                  allowClear: true
                }}
                placeholder="请输入真实姓名"
                rules={[{ required: true, message: '请输入真实姓名！' }]}
              />
            </Col>
            <Col span={12}>
              <ProFormText
                name="phoneNumber"
                label="手机号"
                placeholder="请输入手机号"
                fieldProps={{
                  allowClear: true,
                  maxLength: 11
                }}
                rules={[{
                  required: true,
                  message: '请输入正确的手机号！',
                  pattern: pattern.mobile
                }]}
              />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={12}>
              <ProFormText
                name="email"
                label="电子邮箱"
                placeholder="请输入电子邮箱"
                fieldProps={{
                  allowClear: true,
                  type: 'email'
                }}
                rules={[{ required: true, message: '请输入电子邮箱！' }]}
              />
            </Col>
            <Col span={12}>
              <ProFormText
                name="password"
                label="密码"
                tip="不输入则默认为不进行修改密码！"
                placeholder="请输入登录密码"
                fieldProps={{
                  allowClear: true
                }}
              />
            </Col>
          </Row>
        </ProForm>
      </Spin>
    </Modal>
  );
};

export default UpdateForm;
