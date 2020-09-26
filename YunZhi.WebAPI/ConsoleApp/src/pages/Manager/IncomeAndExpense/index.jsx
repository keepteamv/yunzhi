import { Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { queryList } from './service';

const TableList = (props) => {
  const actionRef = useRef();
  const [row, setRow] = useState();
  const { query } = props.location;

  const columns = [{
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 75,
  },
  {
    title: '经营者',
    dataIndex: 'managerName',
    hideInSearch: true,
    render: (dom, entity) => <a onClick={() => setRow(entity)}>{dom}</a>,
  },
  {
    title: '收支类型',
    dataIndex: 'incomeAndExpenseType',
    filters: true,
    hideInSearch: true,
    valueEnum: {
      1: {
        text: '收入',
        status: 'Default',
      },
      2: {
        text: '支出',
        status: 'Error',
      },
      3: {
        text: '冲正',
        status: 'Default',
      },
      4: {
        text: '充值',
        status: 'Processing',
      },
    },
  },
  {
    title: '帐户类型',
    dataIndex: 'accountType',
    filters: true,
    hideInSearch: true,
    valueEnum: {
      1: {
        text: '现金帐户',
        status: 'Success',
      },
      2: {
        text: '积分帐户',
        status: 'Processing',
      }
    },
  },
  {
    title: '金额',
    dataIndex: 'price',
    valueType: 'money',
    hideInSearch: true,
  },
  {
    title: '说明',
    dataIndex: 'explain',
    hideInSearch: true
  },
  {
    title: '记录时间',
    dataIndex: 'updatedOn',
    sorter: true,
    valueType: 'dateTime',
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: '记录时间',
    dataIndex: 'updatedOn',
    valueType: 'dateRange',
    hideInTable: true,
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
        request={async (params, sorter, filter) => {
          const data = params;
          data.managerId = query.managerId;
          data.pageIndex = params.current;
          // 如果有记录时间查询条件
          if (params.updatedOn && params.updatedOn.length === 2) {
            // eslint-disable-next-line prefer-destructuring
            data.startTime = params.updatedOn[0].split(' ')[0];
            // eslint-disable-next-line prefer-destructuring
            data.endTime = params.updatedOn[1].split(' ')[0];
          }
          const result = await queryList({ ...data, sorter, filter });
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
            title={row?.managerName}
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
