import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { useAccess, Access } from 'umi';
import { useRequestHandle } from '@/utils/utils';
import { query, processing } from './service';

const TableList = (routes) => {
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

  const columns = [{
    title: '序号',
    dataIndex: 'index',
    fixed: 'left',
    valueType: 'indexBorder',
    width: 50,
  },
  {
    title: '流水号',
    dataIndex: 'serialNumber',
    fixed: 'left',
    width: 195,
    render: (dom, entity) => <a onClick={() => setRow(entity)}>{dom}</a>,
  },
  {
    title: '经营者',
    dataIndex: 'managerName',
    width: 230,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '提现状态',
    dataIndex: 'cashOutStatus',
    filters: true,
    width: 100,
    hideInSearch: true,
    valueEnum: {
      0: {
        text: '待审核',
        status: 'Default',
      },
      1: {
        text: '处理中',
        status: 'Processing',
      },
      2: {
        text: '提现成功',
        status: 'Success',
      },
      3: {
        text: '提现失败',
        status: 'Error',
      },
    },
  },
  {
    title: '提现金额',
    dataIndex: 'price',
    valueType: 'money',
    width: 100,
    hideInSearch: true
  },
  {
    title: '帐户名',
    dataIndex: 'accountName',
    width: 100,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '帐户',
    dataIndex: 'account',
    width: 200,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '开户行',
    dataIndex: 'bankName',
    width: 180,
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '开户行行号',
    dataIndex: 'bankNameNumber',
    // width: 180,
    ellipsis: true,
    hideInSearch: true
  },
  {
    title: '申请时间',
    dataIndex: 'createdOn',
    valueType: 'dateTime',
    width: 175,
    hideInSearch: true,
  },
  {
    title: '申请人',
    dataIndex: 'createdUserName',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '审核时间',
    dataIndex: 'auditedTime',
    valueType: 'dateTime',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '处理时间',
    dataIndex: 'handledTime',
    valueType: 'dateTime',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '备注',
    dataIndex: 'remarks',
    hideInSearch: true,
    hideInTable: true,
  },
  {
    title: '汇款时间',
    dataIndex: 'remittanceTime',
    valueType: 'dateTime',
    hideInSearch: true,
    hideInTable: true,
  },
  {
    title: '申请时间',
    dataIndex: 'createdOn',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    width: 120,
    fixed: 'right',
    render: (_, record) => (
      <>
        <Access accessible={canOperation(path, '处理中')}>
          <Popconfirm
            title="确认要设置为处理中吗？"
            onConfirm={() => {
              const hide = message.loading("正在操作...");
              processing({ id: record.id }).then(res => {
                hide();
                if (res.success) {
                  message.success('操作成功.');
                  reload();
                } else {
                  message.error(res.error);
                }
              });
            }}
            disabled={record.cashOutStatus !== 0}
            placement="leftTop"
            okText="确认"
            cancelText="取消"
          >
            <Button
              style={{ marginRight: 7 }}
              size='small'
              // 不为“待审核”状态，则禁用按钮
              disabled={record.cashOutStatus !== 0}
            >
              处理
            </Button>
          </Popconfirm>
        </Access>
        <Access accessible={canOperation(path, '汇款结果')}>
          <Button
            size='small'
            // 不为“处理中”状态，则禁用按钮
            disabled={record.cashOutStatus !== 1}
            onClick={() => {
              // handleRefundModalVisible(true);
              // setRefundFormValues(record);
            }}
          >
            结果
          </Button>
        </Access>
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
          labelWidth: 80
        }}
        request={async (params, sorter, filter) => {
          const data = params;
          data.pageIndex = params.current;
          // 如果有申请时间查询条件
          if (params.createdOn && params.createdOn.length === 2) {
            // eslint-disable-next-line prefer-destructuring
            data.startTime = params.createdOn[0].split(' ')[0];
            // eslint-disable-next-line prefer-destructuring
            data.endTime = params.createdOn[1].split(' ')[0];
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
        scroll={{ x: 1700 }}
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
            title={row?.serialNumber}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
