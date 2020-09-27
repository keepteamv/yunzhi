import React, { useRef } from 'react';
import { Modal, Button, Tooltip } from 'antd';
import { DownloadOutlined, ReloadOutlined, RollbackOutlined } from '@ant-design/icons';
import { useAccess, Access } from 'umi';
import ProTable from '@ant-design/pro-table';
import { queryMakeQueues } from '../service'

const MakeQueueTable = props => {
  const { modalVisible, onCancel, record, path } = props;
  const actionRef = useRef();
  const { canOperation } = useAccess();
  const oStyle = { marginRight: 7 };

  const columns = [{
    title: '排队号',
    dataIndex: 'takeNumber',
    hideInSearch: true,
    width: 90,
    fixed: 'left',
  }, {
    title: '饮品规格',
    dataIndex: 'name',
    hideInSearch: true,
    width: 230,
    ellipsis: true
  },
  {
    title: '指令状态',
    dataIndex: 'instructionStatusName',
    hideInSearch: true,
    width: 75,
  },
  {
    title: '制作状态',
    dataIndex: 'makeQueueStatusName',
    hideInSearch: true,
    width: 90,
  }, {
    title: '冰量',
    dataIndex: 'iceDegreeName',
    hideInSearch: true,
    width: 70,
  }, {
    title: '糖量',
    dataIndex: 'sugarDegreeName',
    hideInSearch: true,
    width: 70,
  },
  {
    title: '更新时间',
    dataIndex: 'updatedOn',
    valueType: 'dateTime',
    hideInSearch: true,
    width: 165,
  },
  {
    title: '失败原因',
    dataIndex: 'failedReason',
    hideInSearch: true,
    width: 200,
    ellipsis: true
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    fixed: 'right',
    // align: 'center',
    width: 130,
    render: (_, row) => (
      <>
        <Access accessible={canOperation('可退单') && row.makeQueueStatus === 1}>
          <Tooltip title="推送至门店终端">
            <Button
              style={{ ...oStyle }}
              size='small'
              title="推送"
              onClick={() => {
              }}
            >
              <DownloadOutlined />
            </Button>
          </Tooltip>
        </Access>
        <Access accessible={canOperation('可退单') && row.makeQueueStatus === 0}>
          <Tooltip title="更新">
            <Button
              style={{ ...oStyle }}
              size='small'
              type="primary"
              onClick={() => {
              }}
            >
              <ReloadOutlined />
            </Button>
          </Tooltip>
        </Access>
        <Access accessible={canOperation('可退单') && (row.makeQueueStatus === 0 || row.makeQueueStatus === 1 || row.makeQueueStatus === 2)}>
          <Tooltip title="取消制作">
            <Button
              size='small'
              danger
              title="取消制作"
              onClick={() => {
              }}
            >
              <RollbackOutlined />
            </Button>
          </Tooltip>
        </Access>
      </>
    ),
  },
  ];
  return (
    <Modal
      destroyOnClose
      title="队列列表"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
      width={800}
    >
      <ProTable
        columns={columns}
        actionRef={actionRef}
        search={false}
        request={async () => {
          const result = await queryMakeQueues({
            orderId: record.orderId
          });
          if (result.success) {
            return {
              ...result,
            };
          }
          return [];
        }}
        scroll={{ x: 750 }}
        postData={(data) => {
          return !data ? [] : data;
        }}
        pagination={false}
        rowKey="id"
        headerTitle="制作队列"
      />
    </Modal>
  );
};

export default MakeQueueTable;
