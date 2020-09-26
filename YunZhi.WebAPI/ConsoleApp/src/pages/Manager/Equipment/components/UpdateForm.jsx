import React from 'react';
import { Modal } from 'antd';
import ProForm, {
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';


const UpdateForm = props => {
  const { modalVisible, onCancel, onSubmit, values } = props;
  let websiteTypeName = '总平台';
  switch (values.websiteType) {
    case 2:
      websiteTypeName = "经营者平台";
      break;
    case 3:
      websiteTypeName = "供应商平台";
      break;
    default:
      break;
  }
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
          ...value
        });
      }} initialValues={{ ...values, websiteTypeName }}>
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
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
