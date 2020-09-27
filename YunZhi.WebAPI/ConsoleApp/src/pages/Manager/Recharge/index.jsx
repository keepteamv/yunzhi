import { message, Drawer, Image, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { useAccess, Access } from 'umi';
import config from '@/config'
import { query, confirm } from './service';


const { cdnAddress } = config;

const TableList = (routes) => {
  const actionRef = useRef();
  const [row, setRow] = useState();
  const { path } = routes.route;
  const { canOperation } = useAccess();
  // 读取转帐凭证图片附件
  const getTransferVouchers = (value) => {
    const arr = value.split(',');
    const images = [];
    for (let i = 0; i < arr.length; i += 1) {
      const item = arr[i];
      images.push(<Image style={{ marginRight: 5 }} width={60} src={`${cdnAddress}${item}`} />);
    }
    return images;
  };

  // 刷新
  const reload = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }

  const columns = [{
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 75,
  },
  {
    title: '企业名称',
    dataIndex: 'managerName',
    hideInSearch: true
  },
  {
    title: '流水号',
    dataIndex: 'serialNumber',
    width: 200,
    render: (dom, entity) => <a onClick={() => setRow(entity)}>{dom}</a>,
  },
  {
    title: '充值状态',
    dataIndex: 'rechargeStatus',
    filters: true,
    width: 110,
    hideInSearch: true,
    valueEnum: {
      0: {
        text: '未确认',
        status: 'Default',
      },
      1: {
        text: '已确认',
        status: 'Success',
      },
    },
  },
  {
    title: '充值金额',
    dataIndex: 'amountOfMoney',
    valueType: 'money',
    hideInSearch: true
  },
  {
    title: '申请人',
    dataIndex: 'createdUserName',
    hideInSearch: true,
  },
  {
    title: '申请人手机号',
    dataIndex: 'createdUserPhone',
    copyable: true,
    hideInSearch: true,
  },
  {
    title: '操作时间',
    dataIndex: 'createdOn',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '确认人',
    dataIndex: 'checkedUserName',
    hideInSearch: true,
    hideInTable: true,
  },
  {
    title: '确认时间',
    dataIndex: 'checkedTime',
    valueType: 'dateTime',
    hideInSearch: true,
    hideInTable: true,
  },
  {
    title: '转帐凭证附件',
    dataIndex: 'transferVoucher',
    hideInSearch: true,
    hideInTable: true,
    render: (_, record) => {
      return <>{getTransferVouchers(record.transferVoucher)}</>;
    },
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (_, record) => [
      <Access key="key1" accessible={canOperation('确认到账') && record.rechargeStatus === 0}>
        <Popconfirm
          title={`是否确认[${record.managerName}]转帐的${record.amountOfMoney}元已到账？`}
          onConfirm={() => {
            const hide = message.loading("正在确认...");
            confirm({ id: record.id }).then(res => {
              hide();
              if (res.success) {
                message.success('确认成功.');
                reload();
              } else {
                message.error(res.error);
              }
            });
          }}
          placement="leftTop"
          okText="确认"
          cancelText="取消"
        >
          <a href="#">确认</a>
        </Popconfirm>
      </Access>,
    ],
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
