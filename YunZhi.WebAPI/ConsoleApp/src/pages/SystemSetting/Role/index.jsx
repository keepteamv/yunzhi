import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Switch, Popconfirm, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { useAccess, Access } from 'umi';
import { useRequestHandle } from '@/utils/utils';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import PermissionForm from './components/PermissionForm';
import { query, update, add, updateStatus } from './service';

const TableList = (routes) => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const [permissionModalVisible, handlePermissionModalVisible] = useState(false);
  const [permissionFormValues, setPermissionFormValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const { path } = routes.route;
  const { canOperation } = useAccess();

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
          disabled={!canOperation(path, '更新状态')}
          onConfirm={async () => {
            updateStatusRequest.run({
              id: entity.id,
              status: checked ? 2 : 1
            });
          }} okText="确定" cancelText="取消">
          <Switch checkedChildren="启用" unCheckedChildren="禁用" loading={updateStatusRequest.loading} checked={checked} disabled={!canOperation(path, '更新状态')} />
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
        {/* <Access accessible={canOperation(path, '编辑')}> */}
        <Space>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setUpdateFormValues(record);
            }}
          >
            编辑
          </a>
          <a
            onClick={() => {
              handlePermissionModalVisible(true);
              setPermissionFormValues(record);
            }}
          >
            权限
          </a>
        </Space>
        {/* </Access> */}
      </>
    ),
  },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // <Access accessible={canOperation(path, '新增')}>
          //   <Button type="primary" onClick={() => handleModalVisible(true)}>
          //     <PlusOutlined /> 创建
          //   </Button>
          // </Access>,
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 创建
          </Button>
        ]}
        request={async (params, sorter, filter) => {
          const data = params;
          data.pageIndex = params.current;
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
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows)
          },
        }}
      />
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
