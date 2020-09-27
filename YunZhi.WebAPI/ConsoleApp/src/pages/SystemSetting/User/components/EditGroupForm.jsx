import React, { useState, useEffect } from 'react';
import { Modal, Spin, Transfer, Form } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import ProForm from '@ant-design/pro-form';
import { queryUserGroup, queryUserGroupIds } from '../service';

const EditGroupForm = props => {
  const { modalVisible, onCancel, onSubmit, loading, record } = props;
  const [group, setGroup] = useState([]);
  const [isInit, setIsInit] = useState(false);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  useEffect(() => {
    if (!isInit) {
      queryUserGroup()
        .then(res => {
          setIsInit(true);
          setGroup(res.success ? res.data : []);
        });
      queryUserGroupIds({ userId: record.id }).then(res => {
        setTargetKeys(res.success ? res.data : []);
      });
    }
  })

  return (
    <Modal
      destroyOnClose
      title={`更新[${record.userName}]组信息`}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Spin tip="正在处理..." spinning={loading}>
        <ProForm
          onFinish={async value => {
            // 提交
            onSubmit({
              userId: record.id,
              ...value
            });
          }}
        >
          <Form.Item label="" name="userGroupIds">
            <Transfer
              rowKey={item => item.id}
              dataSource={group}
              titles={['未关联组', '已关联组']}
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

export default EditGroupForm;
