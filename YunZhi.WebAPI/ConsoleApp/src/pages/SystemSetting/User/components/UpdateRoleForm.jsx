import React, { useState, useEffect } from 'react';
import { Modal, Spin, Transfer, Form } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import ProForm from '@ant-design/pro-form';
import { getRoles } from '../service';

const UpdateForm = props => {
  const { modalVisible, onCancel, onSubmit, loading, record } = props;
  const [roles, setRoles] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const [targetKeys, setTargetKeys] = useState([]);
  const [isInitTargetKeys, setIsInitTargetKeys] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  useEffect(() => {
    if (!isInit) {
      getRoles({
        websiteType: record.websiteType
      }).then(res => {
        setIsInit(true);
        setRoles(res.success ? res.data : []);
      })
    }
  })
  useEffect(() => {
    if (!isInitTargetKeys) {
      setIsInitTargetKeys(true);
      if (record.roleIds) {
        setTargetKeys(record.roleIds.split(','));
      }
    }
  })

  return (
    <Modal
      destroyOnClose
      title={`更新[${record.realName}]角色信息`}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Spin tip="正在处理..." spinning={loading}>
        <ProForm
          initialValues={record}
          onFinish={async value => {
            // 提交
            onSubmit({
              id: record.id,
              ...value
            });
          }}
        >
          <Form.Item label="" name="roleIds">
            <Transfer
              rowKey={item => item.roleId}
              dataSource={roles}
              titles={['未选角色', '已选角色']}
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              onChange={(tKeys) => {
                setTargetKeys(tKeys);
              }}
              onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
                setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
              }}
              render={item => item.roleName}
              style={{ marginBottom: 16 }}
            />
          </Form.Item>
        </ProForm>
      </Spin>
    </Modal>
  );
};

export default UpdateForm;
