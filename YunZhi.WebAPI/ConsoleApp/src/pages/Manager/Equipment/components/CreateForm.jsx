import React from 'react';
import { Modal } from 'antd';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormSwitch
} from '@ant-design/pro-form';

const CreateForm = props => {
  const { modalVisible, onCancel, onSubmit } = props;
  return (
    <Modal
      width={640}
      destroyOnClose
      title="创建经营者"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm onFinish={async value => {
        await onSubmit(value);
      }}>
        <ProFormSelect name="websiteType"
          label="平台"
          hasFeedback
          valueEnum={{
            1: '总平台',
            2: '经营者平台',
            3: '供应商平台',
          }}
          placeholder="请选择所属平台."
          rules={[{ required: true, message: '请选择所属平台!' }]} />
        <ProFormText
          name="name"
          label="名称"
          placeholder="请输入角色名称"
          rules={[{ required: true, message: '请输入角色名称！' }]}
        />
        <ProFormTextArea
          name="remark"
          label="备注"
          placeholder="请输入备注"
        />
        <ProFormSwitch name="status" label="状态" />
      </ProForm>
    </Modal>
  );
};

export default CreateForm;
