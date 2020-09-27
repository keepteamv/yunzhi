import { message, Drawer, Tooltip, Button, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { useAccess, Access } from 'umi';
import { useRequestHandle } from '@/utils/utils';
import RefundForm from './components/RefundForm';
import MakeQueueTable from './components/MakeQueueTable';
import { query, refund } from './service';

const TableList = (props) => {
  // 退单
  const [refundModalVisible, handleRefundModalVisible] = useState(false);
  const [refundFormValues, setRefundFormValues] = useState({});
  // 制作队列
  const [makeQueueModalVisible, handleMakeQueueModalVisible] = useState(false);
  const [makeQueueTableValues, setMakeQueueTableValues] = useState({});

  const actionRef = useRef();
  const [row, setRow] = useState();
  const { path } = props.route;
  const { canOperation } = useAccess();
  const [modal, contextHolder] = Modal.useModal();

  // 刷新
  const reload = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }
  // 退款
  const refundRequest = useRequestHandle(refund, () => {
    message.success('提交成功.')
    handleRefundModalVisible(false);
    setRefundFormValues({});
    reload();
  });

  const columns = [{
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    fixed: 'left',
    width: 60,
  },
  {
    title: '订单号',
    dataIndex: 'number',
    width: 255,
    fixed: 'left',
    // copyable: true,
    render: (dom, entity) => <a onClick={() => setRow(entity)}>{dom}</a>,
  },
  {
    title: '订单类型',
    dataIndex: 'orderType',
    filters: true,
    width: 120,
    hideInSearch: true,
    valueEnum: {
      0: {
        text: '机器人门店',
        status: 'Success',
      },
      1: {
        text: '全自动门店',
        status: 'Processing',
      }
    },
  },
  {
    title: '支付状态',
    dataIndex: 'paymentStatus',
    filters: true,
    width: 100,
    hideInSearch: true,
    valueEnum: {
      1: {
        text: '未支付',
        status: 'Processing',
      },
      2: {
        text: '已支付',
        status: 'Success',
      },
      3: {
        text: '已失效',
        status: 'Default',
      },
      4: {
        text: '已退单',
        status: 'Warning',
      }
    },
  },
  {
    title: '消费门店',
    dataIndex: 'equipmentName',
    width: 145,
    ellipsis: true,
    // hideInSearch: true
  },
  {
    title: '饮品名称',
    dataIndex: 'orderItemNames',
    width: 180,
    ellipsis: true,
    hideInSearch: true
  },
  {
    title: '饮品数量',
    dataIndex: 'amount',
    width: 75,
    hideInSearch: true
  },
  {
    title: '特饮数量',
    dataIndex: 'specialAmount',
    hideInTable: true,
    width: 75,
    hideInSearch: true
  },
  {
    title: '特饮金额',
    dataIndex: 'specialAmountOfMoney',
    valueType: 'money',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '特饮返点费入帐金额',
    dataIndex: 'specialIncomeAmountOfMoney',
    valueType: 'money',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '总金额',
    dataIndex: 'totalAmountOfMoney',
    valueType: 'money',
    width: 75,
    hideInSearch: true
  },
  {
    title: '支付金额',
    dataIndex: 'paymentAmountOfMoney',
    valueType: 'money',
    width: 75,
    hideInSearch: true,
    render: (dom, record) => {
      if (record.paymentStatus === 1) {
        return <span>-</span>;
      }
      return dom;
    }
  },
  {
    title: '优惠金额',
    dataIndex: 'discountAmountOfMoney',
    valueType: 'money',
    width: 75,
    hideInSearch: true
  },
  {
    title: '支付时间',
    dataIndex: 'paymentTime',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '支付方式',
    dataIndex: 'modeOfPayment',
    filters: true,
    width: 100,
    hideInSearch: true,
    valueEnum: {
      0: {
        text: '免支付',
        status: 'Warning',
      },
      1: {
        text: '支付宝',
        status: 'Processing',
      },
      2: {
        text: '微信',
        status: 'Success',
      },
      3: {
        text: '银联',
        status: 'Error',
      },
      4: {
        text: '未确认',
        status: 'Default',
      }
    },
  },
  {
    title: '渠道单号',
    dataIndex: 'otherNumber',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '下单时间',
    dataIndex: 'createdOn',
    valueType: 'dateTime',
    hideInSearch: true,
  },
  {
    title: '平台管理费率',
    dataIndex: 'platformManagementExpenseRate',
    valueType: 'percent',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '平台管理费',
    dataIndex: 'managementExpense',
    valueType: 'money',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '平台管理费入帐金额',
    dataIndex: 'managementExpenseIncomeAmountOfMoney',
    valueType: 'money',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '省代管理费入帐金额',
    dataIndex: 'provincialAgentManagementExpenseIncomeAmountOfMoney',
    valueType: 'money',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '市代管理费入帐金额',
    dataIndex: 'cityAgentManagementExpenseIncomeAmountOfMoney',
    valueType: 'money',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '单店入帐金额',
    dataIndex: 'singleStoreIncome',
    valueType: 'money',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '渠道返还金额',
    dataIndex: 'thirdPartyReturnAmountOfMoney',
    valueType: 'money',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '渠道手续费',
    dataIndex: 'thirdPartyServiceCharge',
    valueType: 'money',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '渠道结算手续费率',
    dataIndex: 'rate',
    valueType: 'percent',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '入池积分',
    dataIndex: 'enteringPoolIntegral',
    hideInSearch: true,
    hideInTable: true
  }, {
    title: '积分支付',
    dataIndex: 'integralPayment',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '结算状态',
    dataIndex: 'settlementStatus',
    hideInSearch: true,
    filters: true,
    width: 100,
    valueEnum: {
      0: {
        text: '已结算',
        status: 'Success',
      },
      1: {
        text: '未结算',
        status: 'Processing',
      }
    },
  },
  {
    title: '结算时间',
    dataIndex: 'settlementTime',
    valueType: 'dateTime',
    hideInSearch: true,
    render: (dom, record) => {
      if (record.settlementStatus === 1) {
        return <span>-</span>;
      }
      return dom;
    }
  },
  {
    title: '退款金额',
    dataIndex: 'refundAmountOfMoney',
    valueType: 'money',
    width: 75,
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '退款原因',
    dataIndex: 'refundReason',
    hideInSearch: true,
    hideInTable: true
  },
  {
    title: '购买会员',
    dataIndex: 'memberName',
    hideInSearch: true,
    hideInTable: true,
    render: (dom, record) => {
      if (record.memberId === null) {
        return <span>非会员订单</span>;
      }
      return <Tooltip title={record.memberId}>
        <span style={{ color: 'blue', cursor: 'pointer' }}>{dom}</span>
      </Tooltip>;
    }
  },
  {
    title: '优惠券',
    dataIndex: 'couponName',
    hideInSearch: true,
    hideInTable: true,
    render: (dom, record) => {
      if (record.couponNumberId === null) {
        return <span>未使用优惠券</span>;
      }
      return <Tooltip title={record.couponNumberId}>
        <span style={{ color: 'blue', cursor: 'pointer' }}>{dom}</span>
      </Tooltip>;
    }
  },
  {
    title: '优惠券类型',
    dataIndex: 'couponType',
    hideInSearch: true,
    hideInTable: true,
    valueEnum: {
      1: {
        text: '代金券',
      },
      2: {
        text: '兑换券',
      },
      3: {
        text: '折扣券',
      },
      4: {
        text: '免单券',
      },
      5: {
        text: '买赠券',
      },
      6: {
        text: '工作券',
      },
      7: {
        text: 'DIY兑换券',
      },
      8: {
        text: '满减',
      }
    },
  },
  {
    title: '下单时间',
    dataIndex: 'createdOn',
    valueType: 'dateRange',
    hideInTable: true,
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    fixed: 'right',
    // align: 'center',
    width: 127,
    render: (_, record) => (
      <>
        <Access accessible={canOperation('可退单')}>
          <Button
            style={{ marginRight: 7 }}
            size='small'
            danger
            // 不为“已支付”状态，则禁用按钮
            disabled={record.paymentStatus !== 2}
            onClick={() => {
              handleRefundModalVisible(true);
              setRefundFormValues(record);
            }}
          >
            退单
          </Button>
        </Access>
        <Button
          size='small'
          type="primary"
          // 如果未消费，则禁用按钮
          disabled={record.settlementStatus === 1}
          onClick={() => {
            handleMakeQueueModalVisible(true);
            setMakeQueueTableValues({
              orderId: record.id
            });
          }}
        >
          队列
        </Button>
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
          // 如果有下单时间查询条件
          if (params.createdOn && params.createdOn.length === 2) {
            // eslint-disable-next-line prefer-destructuring
            data.startPaymentTime = params.createdOn[0].split(' ')[0];
            // eslint-disable-next-line prefer-destructuring
            data.endPaymentTime = params.createdOn[1].split(' ')[0];
          }
          // 订单号
          if (params.number) {
            data.orderNo = params.number;
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
        scroll={{ x: 1977 }}
        columns={columns}
        rowSelection={false}
      />
      {/* 退单表单 */}
      {refundFormValues && Object.keys(refundFormValues).length ? (
        <RefundForm
          onSubmit={value => {
            modal.confirm({
              title: '系统提示',
              content: '确定要提交退单操作吗？',
              onOk: () => {
                refundRequest.run(value);
              },
              onCancel: () => {
                handleRefundModalVisible(false);
                setRefundFormValues({});
              }
            });
          }}
          loading={refundRequest.loading}
          onCancel={() => {
            handleRefundModalVisible(false);
            setRefundFormValues({});
          }}
          modalVisible={refundModalVisible}
          record={refundFormValues}
        />
      ) : null}
      {/* 退单确认框Holder */}
      {contextHolder}
      {/* 制作队列 */}
      {makeQueueTableValues && Object.keys(makeQueueTableValues).length ? (
        <MakeQueueTable
          onCancel={() => {
            handleMakeQueueModalVisible(false);
            setMakeQueueTableValues({});
          }}
          modalVisible={makeQueueModalVisible}
          record={makeQueueTableValues}
          path={path}
        />
      ) : null}

      <Drawer
        width={720}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.id && (
          <ProDescriptions
            column={2}
            title={row?.orderItemNames}
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
