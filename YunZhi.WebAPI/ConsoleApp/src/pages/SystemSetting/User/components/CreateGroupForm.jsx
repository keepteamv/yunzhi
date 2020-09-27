import React from 'react';
import { Modal } from 'antd';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormSwitch
  // eslint-disable-next-line import/no-extraneous-dependencies
} from '@ant-design/pro-form';

const CreateGroupForm = props => {
  const { modalVisible, onCancel, onSubmit } = props;
  return (
    <Modal
      destroyOnClose
      title="创建角色组"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm onFinish={async value => {
        const params = value;
        params.status = value.status ? 1 : 2;
        await onSubmit(params);
      }}>
        <ProFormText
          name="name"
          label="名称"
          placeholder="请输入角色组名称"
          rules={[{ required: true, message: '请输入角色组名称！' }]}
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

export default CreateGroupForm;
