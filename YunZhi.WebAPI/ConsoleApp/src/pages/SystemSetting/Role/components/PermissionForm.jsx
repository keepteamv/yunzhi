import React, { useEffect, useState } from 'react';
import { CaretUpOutlined, CaretDownOutlined, SaveOutlined } from '@ant-design/icons';
import { Modal, Tabs, Tree, Space, Button } from 'antd';
import ProForm, {
  ProFormText,
  ProFormTextArea
} from '@ant-design/pro-form';
import { getMenus, getMenuIdsByRoleId, getOperations } from '../service';

const { TabPane } = Tabs;

const PermissionForm = props => {
  const { modalVisible, onCancel, onSubmit, values } = props;

  const [menus, setMenus] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  useEffect(() => {
    if (menus.length === 0) {
      getMenus().then(res => {
        console.log(res);
        setMenus(res.success ? res.data : []);
      });
      getMenuIdsByRoleId({ roleId: values.id }).then(res => {
        setCheckedKeys(res.success ? res.data : []);
      });
    }
  })

  return (
    <Modal
      destroyOnClose
      title="权限配置"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Tabs defaultActiveKey="1">
        <TabPane tab="菜单权限" key="1">
          <Space style={{ padding: '20px 10px' }}>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setExpandedKeys(checkedKeys);
              }}
              disabled={menus.length === 0 || expandedKeys.length !== 0}
            >
              展开选中的节点<CaretDownOutlined />
            </Button>
            <Button
              size="small"
              onClick={() => {
                setExpandedKeys([]);
              }}
              disabled={expandedKeys.length === 0}
            >
              收起全部节点<CaretUpOutlined />
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                console.log(checkedKeys);
              }}
            >
              <SaveOutlined />保存
            </Button>
          </Space>
          <Tree
            style={{ minHeight: 400 }}
            checkable
            // showLine
            selectable={false}
            expandedKeys={expandedKeys}
            onExpand={(keys) => {
              setExpandedKeys(keys);
            }}
            onCheck={(value) => {
              setCheckedKeys(value);
            }}
            checkedKeys={checkedKeys}
            treeData={menus}
          />
        </TabPane>
        <TabPane tab="操作权限" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default PermissionForm;
