import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Row, Col, Tag, Tooltip, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { useAccess, Access } from 'umi';
import { useMount } from '@umijs/hooks';
import { useRequestHandle } from '@/utils/utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import ProList from '@ant-design/pro-list';
import CreateForm from './components/CreateForm';
import CreateGroupForm from './components/CreateGroupForm';
import UpdateForm from './components/UpdateForm';
import UpdateGroupForm from './components/UpdateGroupForm';
import UpdateRoleForm from './components/UpdateRoleForm';
import EditGroupForm from './components/EditGroupForm';
import { query, update, add, updateRole, queryUserGroup, editGroup, updateGroup, addGroup } from './service';

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [createGroupModalVisible, handleGroupModalVisible] = useState(false);
  // 更新基础信息
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  // 更新用户组
  const [updateGroupModalVisible, handleUpdateGroupModalVisible] = useState(false);
  const [updateGroupFormValues, setUpdateGroupFormValues] = useState({});
  // 更新角色信息
  const [updateRoleModalVisible, handleUpdateRoleModalVisible] = useState(false);
  const [updateRoleFormValues, setUpdateRoleFormValues] = useState({});
  // 编辑用户组信息
  const [editGroupModalVisible, handleEditGroupModalVisible] = useState(false);
  const [editGroupFormValues, setEditGroupFormValues] = useState({});

  const actionRef = useRef();
  const [row, setRow] = useState();
  const { canOperation } = useAccess();

  const [userGroups, setUserGroups] = useState([]);
  const getUserGroupsRequest = useRequestHandle(queryUserGroup, data => {
    setUserGroups(data);
  });
  useMount(() => {
    getUserGroupsRequest.run();
  });
  const [userGroupId, setUserGroupId] = useState(-1);

  // 刷新
  const reload = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }
  // 新增
  const addRequest = useRequestHandle(add, () => {
    message.success('创建成功.')
    handleModalVisible(false);
    reload();
  });
  // 更新
  const updateRequest = useRequestHandle(update, () => {
    message.success('更新成功.')
    handleUpdateModalVisible(false);
    setUpdateFormValues({});
    reload();
  });
  // 新增组
  const addGroupRequest = useRequestHandle(addGroup, () => {
    message.success('创建成功.')
    handleGroupModalVisible(false);
    getUserGroupsRequest.run();
  });
  // 更新组
  const updateGroupRequest = useRequestHandle(updateGroup, () => {
    message.success('更新成功.')
    handleUpdateGroupModalVisible(false);
    setUpdateGroupFormValues({});
    getUserGroupsRequest.run();
  });
  // 更新角色
  const updateRoleRequest = useRequestHandle(updateRole, () => {
    message.success('更新成功.')
    handleUpdateRoleModalVisible(false);
    setUpdateRoleFormValues({});
    reload();
  });
  // 编辑组
  const editGroupRequest = useRequestHandle(editGroup, () => {
    message.success('更新成功.')
    handleEditGroupModalVisible(false);
    setEditGroupFormValues({});
  });

  const columns = [{
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 75,
  },
  {
    title: '用户名',
    dataIndex: 'userName',
    render: (dom, entity) => <a onClick={() => setRow(entity)}>{dom}</a>,
  },
  {
    title: '真实姓名',
    hideInSearch: true,
    dataIndex: 'realName',
  },
  {
    title: '手机号',
    copyable: true,
    hideInSearch: true,
    dataIndex: 'phoneNumber'
  },
  {
    title: '电子邮箱',
    copyable: true,
    dataIndex: 'email',
    hideInSearch: true
  },
  {
    title: '操作时间',
    dataIndex: 'updatedOn',
    valueType: 'dateTime',
    width: 165,
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (_, record) => (
      <>
        <Space>
          <Access accessible={canOperation('authority.update.user')}>
            <a
              onClick={() => {
                handleUpdateModalVisible(true);
                setUpdateFormValues(record);
              }}
            >
              编辑
            </a>
          </Access>
          <Access accessible={canOperation('authority.saveusergroupuser.user')}>
            <a
              onClick={() => {
                handleEditGroupModalVisible(true);
                setEditGroupFormValues(record);
              }}
            >
              编辑组
          </a>
          </Access>
          <Access accessible={canOperation('authority.saveuserrole.user')}>
            <a
              onClick={() => {
                handleUpdateRoleModalVisible(true);
                setUpdateRoleFormValues(record);
              }}
            >
              分配角色
          </a>
          </Access>
          <Access accessible={canOperation('authority.saveuserrolegroup.user')}>
            <a
              onClick={() => {
                handleUpdateRoleModalVisible(true);
                setUpdateRoleFormValues(record);
              }}
            >
              分配角色组
          </a>
          </Access>
        </Space>
      </>
    ),
  },
  ];

  return (
    <PageContainer>
      <Row gutter={12}>
        <Col span={6}>
          <ProList
            actions={[
              <Tooltip placement="top" title="刷新">
                <ReloadOutlined style={{ fontSize: 16, cursor: 'pointer' }} onClick={() => {
                  getUserGroupsRequest.run();
                }} />
              </Tooltip>,
              <Access accessible={canOperation('authority.create.usergroup')}>
                <Button key="3" type="primary" onClick={() => handleGroupModalVisible(true)}>
                  新建
                </Button>
              </Access>
            ]}
            style={{
              background: '#FFF',
            }}
            rowKey="id"
            title="用户组"
            loading={getUserGroupsRequest.loading}
            showActions="always"
            dataSource={userGroups}
            renderItem={(item) => ({
              title: item.name,
              actions: [
                <Access accessible={canOperation('authority.update.usergroup')}>
                  <a onClick={() => {
                    handleUpdateGroupModalVisible(true)
                    setUpdateGroupFormValues({ ...item, status: item.status === 1 });
                  }}>编辑</a>
                </Access>,
                <a onClick={() => {
                  setUserGroupId(item.id);
                  actionRef.current.reload();
                }}>用户</a>
              ],
              subTitle: item.status === 1 ? <Tag color="#5BD8A6">启用</Tag> : <Tag color="#f50">禁用</Tag>,
              description: item.remarks,
              avatar:
                'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            })}
          />
          <CreateGroupForm
            onCancel={() => handleGroupModalVisible(false)}
            onSubmit={value => {
              addGroupRequest.run(value);
            }}
            modalVisible={createGroupModalVisible} />
          {updateGroupFormValues && Object.keys(updateGroupFormValues).length ? (
            <UpdateGroupForm
              onSubmit={value => {
                updateGroupRequest.run(value);
              }}
              onCancel={() => {
                handleUpdateGroupModalVisible(false);
                setUpdateGroupFormValues({});
              }}
              modalVisible={updateGroupModalVisible}
              values={updateGroupFormValues}
            />
          ) : null}
        </Col>
        <Col span={18}>
          <ProTable
            headerTitle="查询表格"
            actionRef={actionRef}
            rowKey="id"
            search={{
              labelWidth: 120,
            }}
            toolBarRender={() => [
              <Access accessible={canOperation('authority.create.user')}>
                <Button type="primary" onClick={() => handleModalVisible(true)}>
                  <PlusOutlined /> 创建
                </Button>
              </Access>
            ]}
            onReset={() => {
              setUserGroupId(-1);
            }}
            request={async (params, sorter, filter) => {
              const data = params;
              data.pageIndex = params.current;
              if (userGroupId !== -1) {
                data.userGroupId = userGroupId;
              }
              const result = await query({ ...data, sorter, filter });
              if (result.success) {
                return {
                  ...result,
                  total: result.data.totalItems
                };
              }
              return [];
            }}
            postData={(data) => {
              return !data ? [] : data.items;
            }}
            columns={columns}
            rowSelection={false}
          />
        </Col>
      </Row>
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        onSubmit={async value => {
          const data = value;
          data.status = value.status ? 1 : 2;
          addRequest.run(data);
        }}
        loading={addRequest.loading}
        modalVisible={createModalVisible} />
      {/* 更新基础信息 */}
      {updateFormValues && Object.keys(updateFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            updateRequest.run(value);
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setUpdateFormValues({});
          }}
          loading={updateRequest.loading}
          modalVisible={updateModalVisible}
          record={updateFormValues}
        />
      ) : null}
      {editGroupFormValues && Object.keys(editGroupFormValues).length ? (
        <EditGroupForm
          onSubmit={async value => {
            editGroupRequest.run(value);
          }}
          onCancel={() => {
            handleEditGroupModalVisible(false);
            setEditGroupFormValues({});
          }}
          loading={editGroupRequest.loading}
          modalVisible={editGroupModalVisible}
          record={editGroupFormValues}
        />
      ) : null}
      {/* 更新角色信息 */}
      {updateRoleFormValues && Object.keys(updateRoleFormValues).length ? (
        <UpdateRoleForm
          onSubmit={async value => {
            updateRoleRequest.run(value);
          }}
          onCancel={() => {
            handleUpdateRoleModalVisible(false);
            setUpdateRoleFormValues({});
          }}
          loading={updateRoleRequest.loading}
          modalVisible={updateRoleModalVisible}
          record={updateRoleFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.id && (
          <ProDescriptions
            column={2}
            title={row?.realName}
            request={async () => ({
              data: row || {},
            })}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
