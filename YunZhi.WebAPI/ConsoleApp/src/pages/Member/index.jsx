import { Drawer, Image } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { query } from './service';

const TableList = () => {
  const actionRef = useRef();
  const [row, setRow] = useState();

  const columns = [{
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 75,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    hideInSearch: true,
    render: (_, entity) => <Image src={entity.avatarUrl} width={40} height={40} />,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    hideInSearch: true,
    render: (dom, entity) => <a onClick={() => setRow(entity)}>{dom}</a>,
  },
  {
    title: '手机号',
    dataIndex: 'phoneNumber',
    hideInSearch: true
  },
  {
    title: '性别',
    dataIndex: 'gender',
    filters: true,
    hideInSearch: true,
    valueEnum: {
      0: {
        text: '保密',
        status: 'Default',
      },
      1: {
        text: '帅哥',
        status: 'Success',
      },
      2: {
        text: '美女',
        status: 'Warning',
      }
    },
  },
  {
    title: '经验值',
    dataIndex: 'experience',
    hideInSearch: true
  },
  {
    title: '积分',
    dataIndex: 'integral',
    hideInSearch: true
  },
  {
    title: '返点',
    dataIndex: 'returnPoint',
    hideInSearch: true
  },
  {
    title: '状态',
    dataIndex: 'status',
    filters: true,
    hideInSearch: true,
    valueEnum: {
      1: {
        text: '正常',
        status: 'Success',
      },
      2: {
        text: '禁用',
        status: 'Error',
      }
    },
  },
  {
    title: '会员等级',
    dataIndex: 'memberLevel',
    filters: true,
    hideInSearch: true,
    valueEnum: {
      1: {
        text: '奶茶爱好者',
        status: 'Processing',
      },
      2: {
        text: '奶茶学徒',
        status: 'Success',
      },
      3: {
        text: '奶茶师',
        status: 'Error',
      },
      4: {
        text: '奶茶大师',
        status: 'Default',
      },
      5: {
        text: '顶级奶茶师',
        status: 'Warning',
      },
    },
  },
  {
    title: '注册时间',
    dataIndex: 'createdOn',
    valueType: 'dateTime',
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: 'ID',
    dataIndex: 'id',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '关键字',
    dataIndex: 'keyword',
    hideInTable: true
  },
  {
    title: '注册时间',
    dataIndex: 'createdOn',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '生日',
    dataIndex: 'birthday',
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
          data.pageIndex = params.current;
          // 如果有注册时间查询条件
          if (params.createdOn && params.createdOn.length === 2) {
            // eslint-disable-next-line prefer-destructuring
            data.startRegisterTime = params.createdOn[0].split(' ')[0];
            // eslint-disable-next-line prefer-destructuring
            data.endRegisterTime = params.createdOn[1].split(' ')[0];
          }
          // 如果有生日查询条件
          if (params.birthday && params.birthday.length === 2) {
            // eslint-disable-next-line prefer-destructuring
            data.startBirthday = params.birthday[0].split(' ')[0];
            // eslint-disable-next-line prefer-destructuring
            data.endBirthday = params.birthday[1].split(' ')[0];
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
            title={row?.nickname}
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
