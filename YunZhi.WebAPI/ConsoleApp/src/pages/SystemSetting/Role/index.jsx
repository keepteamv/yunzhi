import { PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Switch, Popconfirm, Space, Row, Col, Tag, Tooltip } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProList from '@ant-design/pro-list';
import { useAccess, Access } from 'umi';
import { useRequestHandle } from '@/utils/utils';
import { useMount } from '@umijs/hooks';
import CreateForm from './components/CreateForm';
import CreateGroupForm from './components/CreateGroupForm';
import UpdateForm from './components/UpdateForm';
import UpdateGroupForm from './components/UpdateGroupForm';
import PermissionForm from './components/PermissionForm';
import EditGroupForm from './components/EditGroupForm';
import { query, update, add, updateGroup, addGroup, updateStatus, queryRoleGroup, editGroup } from './service';

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [createGroupModalVisible, handleGroupModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const [updateGroupModalVisible, handleUpdateGroupModalVisible] = useState(false);
  const [updateGroupFormValues, setUpdateGroupFormValues] = useState({});
  const [editGroupModalVisible, handleEditGroupModalVisible] = useState(false);
  const [editGroupFormValues, setEditGroupFormValues] = useState({});
  const [permissionModalVisible, handlePermissionModalVisible] = useState(false);
  const [permissionFormValues, setPermissionFormValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const { canOperation } = useAccess();

  const [roleGroups, setRoleGroups] = useState([]);
  const getRoleGroupsRequest = useRequestHandle(queryRoleGroup, data => {
    setRoleGroups(data);
  });
  useMount(() => {
    getRoleGroupsRequest.run();
  });
  const [roleGroupId, setRoleGroupId] = useState(-1);

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
  // 新增组
  const addGroupRequest = useRequestHandle(addGroup, () => {
    message.success('创建成功.')
    handleGroupModalVisible(false);
    getRoleGroupsRequest.run();
  });
  // 更新
  const updateRequest = useRequestHandle(update, () => {
    message.success('更新成功.')
    handleUpdateModalVisible(false);
    setUpdateFormValues({});
    reload();
  });
  // 更新组
  const updateGroupRequest = useRequestHandle(updateGroup, () => {
    message.success('更新成功.')
    handleUpdateGroupModalVisible(false);
    setUpdateGroupFormValues({});
    getRoleGroupsRequest.run();
  });
  // 编辑组
  const editGroupRequest = useRequestHandle(editGroup, () => {
    message.success('更新成功.')
    handleEditGroupModalVisible(false);
    setEditGroupFormValues({});
  });
  // 更新状态
  const updateStatusRequest = useRequestHandle(updateStatus, () => {
    message.success('更新成功.')
    reload();
  });

  const columns = [{
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 50,
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    render: (dom, entity) => <a onClick={() => setRow(entity)}>{dom}</a>,
  },
  {
    title: '描述',
    dataIndex: 'remarks',
    hideInSearch: true
  },
  {
    title: '状态',
    dataIndex: 'status',
    filters: true,
    hideInSearch: true,
    render: (_, entity) => {
      const checked = entity.status === 1;
      return <>
        <Popconfirm placement="right" title={`确定要${entity.status === 1 ? '禁用' : '启用'}吗？`}
          disabled={!canOperation('更新状态')}
          onConfirm={async () => {
            updateStatusRequest.run({
              id: entity.id,
              status: checked ? 2 : 1
            });
          }} okText="确定" cancelText="取消">
          <Switch checkedChildren="启用" unCheckedChildren="禁用" loading={updateStatusRequest.loading} checked={checked} disabled={!canOperation('更新状态')} />
        </Popconfirm>
      </>;
    },
    valueEnum: {
      1: {
        text: '启用',
        status: 'Success',
      },
      2: {
        text: '禁用',
        status: 'Error',
      }
    },
  },
  {
    title: '操作时间',
    dataIndex: 'updatedOn',
    sorter: true,
    valueType: 'dateTime',
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
          <Access accessible={canOperation('authority.update.role')}>
            <a
              onClick={() => {
                handleUpdateModalVisible(true);
                setUpdateFormValues({ ...record, status: record.status === 1 });
              }}
            >
              编辑
          </a>
          </Access>
          <Access accessible={canOperation('authority.saverolegrouprole.role')}>
            <a
              onClick={() => {
                handleEditGroupModalVisible(true);
                setEditGroupFormValues(record);
              }}
            >
              编辑组
          </a>
          </Access>
          <Access accessible={
            canOperation('authority.savepermissionmenu.permission') ||
            canOperation('authority.savepermissionoperation.permission')
          }>
            <a
              onClick={() => {
                handlePermissionModalVisible(true);
                setPermissionFormValues(record);
              }}
            >
              权限
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
                  getRoleGroupsRequest.run();
                }} />
              </Tooltip>,
              <Access accessible={canOperation('authority.create.rolegroup')}>
                <Button key="3" type="primary" onClick={() => handleGroupModalVisible(true)}>
                  新建
                </Button>
              </Access>
            ]}
            style={{
              background: '#FFF',
            }}
            rowKey="id"
            title="角色组"
            loading={getRoleGroupsRequest.loading}
            showActions="always"
            dataSource={roleGroups}
            renderItem={(item) => ({
              title: item.name,
              actions: [
                <Access accessible={canOperation('authority.update.rolegroup')}>
                  <a onClick={() => {
                    handleUpdateGroupModalVisible(true)
                    setUpdateGroupFormValues({ ...item, status: item.status === 1 });
                  }}>编辑</a>
                </Access>,
                <a onClick={() => {
                  setRoleGroupId(item.id);
                  actionRef.current.reload();
                }}>角色</a>
              ],
              subTitle: item.status === 1 ? <Tag color="#5BD8A6">启用</Tag> : <Tag color="#f50">禁用</Tag>,
              description: item.remarks,
              avatar:
                'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
            })}
          />
          <CreateGroupForm
            onCancel={() => handleGroupModalVisible(false)}
            onSubmit={async value => {
              addGroupRequest.run(value);
            }}
            modalVisible={createGroupModalVisible} />
          {updateGroupFormValues && Object.keys(updateGroupFormValues).length ? (
            <UpdateGroupForm
              onSubmit={async value => {
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
              <Access accessible={canOperation('authority.create.role')}>
                <Button type="primary" onClick={() => handleModalVisible(true)}>
                  <PlusOutlined /> 创建
                </Button>
              </Access>,
            ]}
            request={async (params, sorter, filter) => {
              const data = params;
              data.pageIndex = params.current;
              if (roleGroupId !== -1) {
                data.roleGroupId = roleGroupId;
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
            onReset={() => {
              setRoleGroupId(-1);
            }}
            postData={(data) => {
              return !data ? [] : data.items;
            }}
            columns={columns}
            rowSelection={{
              onChange: (_, selectedRows) => {
                setSelectedRows(selectedRows)
              },
            }}
          />
        </Col>
      </Row>
      {selectedRowsState?.length > 0 && (
        <FooterToolbar

          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项
            </div>
          }
        >
          <Button type="primary" onClick={() => {
            message.info('未实现');
          }}>批量禁用</Button>
        </FooterToolbar>
      )}
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        onSubmit={async value => {
          const data = value;
          data.status = value.status ? 1 : 2;
          addRequest.run(data);
        }}
        modalVisible={createModalVisible} />
      {updateFormValues && Object.keys(updateFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            updateRequest.run(value);
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setUpdateFormValues({});
          }}
          modalVisible={updateModalVisible}
          values={updateFormValues}
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
      {permissionFormValues && Object.keys(permissionFormValues).length ? (
        <PermissionForm
          onSubmit={async value => {
            updateRequest.run(value);
          }}
          onCancel={() => {
            handlePermissionModalVisible(false);
            setPermissionFormValues({});
          }}
          modalVisible={permissionModalVisible}
          values={permissionFormValues}
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
        {row?.name && (
          <ProDescriptions
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
