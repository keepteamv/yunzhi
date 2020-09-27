import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Switch, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { useAccess, Access, Link } from 'umi';
import { submitHandle } from '@/utils/utils'

import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryEquipment, updateEquipment, addEquipment, updateStatus } from './service';


const TableList = (props) => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();
  const { path } = props.route;
  const { query } = props.location;
  const { canOperation } = useAccess();
  const columns = [{
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 70,
  },
  {
    title: '区域',
    dataIndex: 'regionName',
    hideInSearch: true
  },
  {
    title: '门店名称',
    dataIndex: 'name',
    render: (dom, entity) => <a onClick={() => setRow(entity)}>{dom}</a>,
  }, {
    title: '门店类型',
    dataIndex: 'equipmentType',
    valueEnum: {
      0: {
        text: '全自动饮品工作站',
        status: 'Success',
      },
      1: {
        text: '全自动饮品机',
        status: 'Error',
      }
    },
  }, {
    title: '门店地址',
    dataIndex: 'address',
    hideInSearch: true,
    width: 200,
    ellipsis: true
  }, {
    title: '营业时间',
    dataIndex: 'time',
    hideInSearch: true,
    render: (_, record) => {
      return <span>{record.businessHoursStart}-{record.businessHoursEnd}</span>
    }
  },
  {
    title: '营业状态',
    dataIndex: 'businessStatus',
    hideInSearch: true,
    valueEnum: {
      1: {
        text: '正常营业',
        status: 'Success',
      },
      2: {
        text: '暂停营业',
        status: 'Default',
      },
      3: {
        text: '设备故障',
        status: 'Error',
      }
    },
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
          onConfirm={async () => {
            const success = await submitHandle(updateStatus, {
              id: entity.id,
              status: checked ? 2 : 1
            });
            if (success) {
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }} okText="确定" cancelText="取消">
          <Switch checkedChildren="启用" unCheckedChildren="禁用" checked={checked} />
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
    title: '创建人',
    dataIndex: 'createdUser',
    hideInSearch: true,
    hideInTable: true
  }, {
    title: '创建时间',
    dataIndex: 'createdOn',
    valueType: 'dateTime',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '操作人',
    dataIndex: 'lastUpdatedUser',
    hideInSearch: true,
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
    render: (_, record) => [
      <Access accessible={canOperation('编辑')}>
        <Link to={`/manager/equipment/edit?id=${record.id}`}>编辑</Link>
      </Access>,
      <TableDropdown
        key="show"
        onSelect={key => message.info(key)}
        menus={[
          {
            key: 'key2',
            name: '管理员',
          },
          {
            key: 'key3',
            name: '修改密码',
          },
          {
            key: 'key1',
            name: '料位管理',
          },
          {
            key: 'key4',
            name: '制作队列',
          },
          {
            key: 'key5',
            name: '月报表',
          },
          {
            key: 'key6',
            name: '汇总报表',
          },
          {
            key: 'key7',
            name: '更新营业时间',
          },
          {
            key: 'key8',
            name: '更新营业状态',
          },
        ]}
      />,
    ],
  },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Access accessible={canOperation('新增')}>
            <Button type="primary" onClick={() => handleModalVisible(true)}>
              <PlusOutlined /> 创建
            </Button>
          </Access>,
        ]}
        request={async (params, sorter, filter) => {
          const data = params;
          data.pageIndex = params.current;
          data.managerId = query.managerId;

          const result = await queryEquipment({ ...data, sorter, filter });
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
      <CreateForm
        onSubmit={async (value) => {
          const params = value;
          params.status = value.status ? 1 : 2;
          const success = await submitHandle(addEquipment, params);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async value => {
            const success = await submitHandle(updateEquipment, value);
            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          modalVisible={updateModalVisible}
          values={stepFormValues}
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
