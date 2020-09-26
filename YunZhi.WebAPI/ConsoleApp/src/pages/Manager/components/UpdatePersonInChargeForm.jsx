import React from 'react';
import { Modal } from 'antd';
import ProForm, {
  ProFormText
} from '@ant-design/pro-form';
import pattern from '@/utils/pattern';


const UpdateForm = props => {
  const { modalVisible, onCancel, onSubmit, values } = props;
  return (
    <Modal
      destroyOnClose
      title="更新负责人"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm onFinish={async value => {
        // 提交
        onSubmit({
          id: values.id,
          ...value
        });
      }} initialValues={{ ...values }}>
        <ProFormText
          name="name"
          label="负责人姓名"
          placeholder="请输入负责人姓名"
          fieldProps={{
            allowClear: true
          }}
          rules={[{ required: true, message: '请输入负责人姓名！' }]}
        />
        <ProFormText
          name="mobilePhone"
          label="负责人手机"
          placeholder="请输入负责人手机号"
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
        <ProFormText
          name="email"
          label="负责人邮箱"
          placeholder="请输入负责人邮箱号"
          fieldProps={{
            allowClear: true
          }}
          rules={[{
            message: '请输入正确的邮箱地址！',
            type: 'email'
          }]}
        />
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
