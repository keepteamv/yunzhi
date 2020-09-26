import React from 'react';
import { Modal, Spin } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProForm, {
  ProFormTextArea,
  // eslint-disable-next-line import/no-extraneous-dependencies
} from '@ant-design/pro-form';

const CreateForm = props => {
  const { modalVisible, onCancel, onSubmit, record, loading } = props;

  const columns = [{
    title: '订单号',
    dataIndex: 'number',
  },
  {
    title: '订单类型',
    dataIndex: 'orderType',
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
  },
  {
    title: '饮品数量',
    dataIndex: 'amount',
  },
  {
    title: '特饮数量',
    dataIndex: 'specialAmount',
  },
  {
    title: '特饮金额',
    dataIndex: 'specialAmountOfMoney',
    valueType: 'money',
  },
  {
    title: '总金额',
    dataIndex: 'totalAmountOfMoney',
    valueType: 'money',
  },
  {
    title: '支付金额',
    dataIndex: 'paymentAmountOfMoney',
    valueType: 'money',
    render: (dom, row) => {
      if (row.paymentStatus === 1) {
        return <span>-</span>;
      }
      return dom;
    }
  },
  {
    title: '优惠金额',
    dataIndex: 'discountAmountOfMoney',
    valueType: 'money',
    hideInSearch: true
  },
  {
    title: '支付时间',
    dataIndex: 'paymentTime',
    valueType: 'dateTime',
  },
  {
    title: '支付方式',
    dataIndex: 'modeOfPayment',
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
  },
  {
    title: '下单时间',
    dataIndex: 'createdOn',
    valueType: 'dateTime',
  },
  {
    title: '结算状态',
    dataIndex: 'settlementStatus',
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
    render: (dom, row) => {
      if (row.settlementStatus === 1) {
        return <span>-</span>;
      }
      return dom;
    }
  },
  ];
  return (
    <Modal
      destroyOnClose
      title="订单退单"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={700}
    >
      <Spin tip="正在处理..." spinning={loading}>
        <ProDescriptions
          column={2}
          title={record?.orderItemNames}
          request={async () => ({
            data: record || {},
          })}
          params={{
            id: record?.id,
          }}
          columns={columns}
        />
        <ProForm onFinish={async value => {
          await onSubmit({ ...value, id: record.id });
        }}>
          <ProFormTextArea
            name="refundReason"
            label="退单原因"
            placeholder="请输入退单原因."
            rules={[{ required: true, message: '退单原因不能为空！' }]}
          />
        </ProForm>
      </Spin>
    </Modal>
  );
};

export default CreateForm;
