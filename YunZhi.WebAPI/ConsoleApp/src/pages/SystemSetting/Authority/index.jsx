import React, { useState, useEffect } from 'react';
import { Tree, Menu, Row, Col, message, Button, Space, Alert } from 'antd';
import { useAccess, Access } from 'umi';
import { useRequestHandle } from '@/utils/utils'
import { PageContainer } from '@ant-design/pro-layout';
import {
  ApartmentOutlined,
  SaveOutlined,
  CaretDownOutlined,
  CaretUpOutlined
} from '@ant-design/icons';
import { getMenus, getMenuIds, getRolesForAuthority, updateMenuIds } from './service';

const { SubMenu } = Menu;


const Authority = props => {
  const { path } = props.route;
  const { canOperation } = useAccess();

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [data, setData] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [roles, setRoles] = useState([]);
  const [roleId, setRoleId] = useState('');
  const [type, setType] = useState(0);
  useEffect(() => {
    if (roles.length === 0) {
      getRolesForAuthority().then(res => {
        setRoles(res.success ? res.data : []);
      })
    }
  })

  // 更新角色
  const updateRequest = useRequestHandle(updateMenuIds, () => {
    message.success('保存成功.')
  });

  return (
    <PageContainer>
      <Row style={{ padding: 20, backgroundColor: '#ffffff', marginBottom: 12 }}>
        <Col span={12}>
          <div style={{ fontSize: 16, paddingTop: 5, color: 'red' }}>注：点击左侧角色读取该角色的权限进行操作！</div>
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Access accessible={canOperation('保存')}>
            <Button type="primary" loading={updateRequest.loading} disabled={checkedKeys.length === 0 || roleId === ''} onClick={() => {
              updateRequest.run({
                id: roleId,
                menuIds: checkedKeys
              });
            }}><SaveOutlined />保存</Button>
          </Access>
        </Col>
      </Row>
      <Row gutter={18}>
        <Col span={6}>
          <Menu mode="inline" style={{ minHeight: 625 }}>
            {roles.map(p => <SubMenu key={p.websiteType} icon={<ApartmentOutlined />} title={p.websiteTypeName}>
              {p.roles.map(c => <Menu.Item key={c.roleId} onClick={() => {
                // 设置当前操作的角色ID
                setRoleId(c.roleId);
                // 如果有上次加载的类型不一致，则重新读取
                if (type !== p.websiteType) {
                  getMenus({
                    roleId: c.roleId
                  }).then(res => {
                    setData(res.success ? res.data : []);
                    setType(p.websiteType);
                  })
                }
                // 读取设置的菜单ID
                const hide = message.loading('加载中...');
                getMenuIds({
                  roleId: c.roleId
                }).then(res => {
                  setCheckedKeys(res.success ? res.data : []);
                  hide();
                })
              }}>{c.roleName}</Menu.Item>)}
            </SubMenu>)}
          </Menu>
        </Col>
        <Col span={18} style={{ backgroundColor: '#ffffff' }}>
          <Space style={{ padding: '20px 10px' }}>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setExpandedKeys(checkedKeys);
              }}
              disabled={data.length === 0 || expandedKeys.length !== 0}
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
          </Space>
          {data.length > 0 ? <Tree
            style={{ minHeight: 625 }}
            checkable
            // showLine
            selectable={false}
            expandedKeys={expandedKeys}
            onExpand={(keys) => {
              setExpandedKeys(keys);
            }}
            onCheck={(values) => {
              setCheckedKeys(values);
            }}
            checkedKeys={checkedKeys}
            treeData={data}
          /> : <Alert message="请在左侧菜单中选择一个角色进行编辑" />}
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Authority;
