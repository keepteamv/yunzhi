import React, { useState, useEffect } from 'react';
import { Modal, Spin, Transfer, Form } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import ProForm from '@ant-design/pro-form';
import { queryRoleIds, queryRoles } from '../service';

const UpdateForm = props => {
  const { modalVisible, onCancel, onSubmit, loading, record } = props;
  const [roles, setRoles] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  useEffect(() => {
    if (!isInit) {
      queryRoles().then(res => {
        setIsInit(true);
        setRoles(res.success ? res.data : []);
      });
      queryRoleIds({ userId: record.id }).then(res => {
        setTargetKeys(res.success ? res.data : []);
      });
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
              userId: record.id,
              ...value
            });
          }}
        >
          <Form.Item label="" name="roleIds">
            <Transfer
              rowKey={item => item.id}
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
              render={item => item.name}
              style={{ marginBottom: 16 }}
            />
          </Form.Item>
        </ProForm>
      </Spin>
    </Modal>
  );
};

export default UpdateForm;
