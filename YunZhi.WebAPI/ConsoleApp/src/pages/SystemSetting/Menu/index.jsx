import { PlusOutlined } from '@ant-design/icons';
import { Button, Drawer, Switch, Popconfirm, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { useAccess, Access } from 'umi';
import { useRequestHandle } from '@/utils/utils';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { query, update, add, updateStatus } from './service';


const TableList = (routes) => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [updateFormValues, setUpdateFormValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();
  const { path } = routes.route;
  const { canOperation } = useAccess();

  // 刷新表格
  const reload = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }
  // 创建
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
    message.success('操作成功.');
    reload();
  });

  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      // align: 'center',
      width: 200,
      hideInSearch: true,
      render: (dom, entity) => <a onClick={() => setRow(entity)}>{dom}</a>,
    },
    {
      title: '跳转路径',
      dataIndex: 'path',
      hideInSearch: true
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      width: 100,
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
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
              loading={updateStatusRequest.loading}
              checked={checked}
              disabled={!canOperation('更新状态')} />
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
      title: '排序',
      dataIndex: 'sort',
      width: 50,
      hideInSearch: true
    },
    {
      title: '操作时间',
      dataIndex: 'updatedOn',
      valueType: 'dateTime',
      width: 170,
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 85,
      render: (_, record) => (
        <>
          {/* <Access accessible={canOperation('编辑')}> */}
          <Button
            size='small'
            onClick={() => {
              handleUpdateModalVisible(true);
              setUpdateFormValues({ ...record, status: record.status === 1 });
            }}
          >
            编辑
            </Button>
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
          // <Access accessible={canOperation('新增')}>
          //   <Button type="primary" onClick={() => handleModalVisible(true)}>
          //     <PlusOutlined /> 创建
          //   </Button>
          // </Access>,
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 创建
          </Button>
        ]}
        request={async (params) => {
          const result = await query(params);
          if (result.success) {
            return {
              ...result,
            };
          }
          return [];
        }}
        postData={(data) => {
          return !data ? [] : data;
        }}
        pagination={false}
        columns={columns}
        rowSelection={false}
      />
      <CreateForm
        onCancel={() => handleModalVisible(false)}
        onSubmit={async value => {
          addRequest.run(value);
        }}
        loading={addRequest.loading}
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
          loading={updateRequest.loading}
          modalVisible={updateModalVisible}
          record={updateFormValues}
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
