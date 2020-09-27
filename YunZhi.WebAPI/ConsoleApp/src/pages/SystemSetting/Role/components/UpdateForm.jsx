import React from 'react';
import { Modal } from 'antd';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormSwitch
} from '@ant-design/pro-form';

const UpdateForm = props => {
  const { modalVisible, onCancel, onSubmit, values } = props;
  return (
    <Modal
      destroyOnClose
      title="更新角色"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm onFinish={async value => {
        // 提交
        onSubmit({
          id: values.id,
          status: value.status ? 1 : 2,
          ...value
        });
      }} initialValues={{ ...values }}>
        <ProFormText
          name="name"
          label="名称"
          placeholder="请输入角色名称"
          rules={[{ required: true, message: '请输入角色名称！' }]}
        />
        <ProFormTextArea
          name="remarks"
          label="备注"
          placeholder="请输入备注"
        />
        <ProFormSwitch name="status" label="状态" />
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
