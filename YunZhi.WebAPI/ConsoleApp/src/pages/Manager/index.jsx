import { PlusOutlined, FormOutlined, MoreOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Button, message, Image, Drawer, Switch, Popconfirm, Menu, Dropdown } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { useAccess, Access, Link, history } from 'umi';
import { useRequestHandle } from '@/utils/utils';
import config from '@/config';
import CreateForm from './components/CreateForm';
import UpdatePersonInChargeForm from './components/UpdatePersonInChargeForm';
import { queryManager, addManager, updateStatus, updatePersonInCharge } from './service';

const { cdnAddress } = config;
const MenuItem = Menu.Item;

const TableList = (props) => {
  // 创建
  const [createModalVisible, handleModalVisible] = useState(false);
  // 更新负责人
  const [updatePersonInChargeModalVisible, handleUpdatePersonInChargeModalVisible] = useState(
    false,
  );
  // 负责人表单值
  const [personInChargeFormValue, setPersonInChargeFormValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();
  const { path } = props.route;
  const { canOperation } = useAccess();
  // 读取资质图片附件
  const getQualificationAnnexs = (value) => {
    const arr = value.split(',');
    const images = [];
    for (let i = 0; i < arr.length; i += 1) {
      const item = arr[i];
      images.push(<Image style={{ marginRight: 5 }} width={60} src={`${cdnAddress}${item}`} />);
    }
    return images;
  };
  // 获取更多操作菜单
  const getOperationMenus = record => {
    return (<Menu>
      {canOperation(path, '管理员') ?
        <MenuItem onClick={() => {
          // 
        }} icon={<FormOutlined />}>
          <span>管理员列表</span>
        </MenuItem> : null
      }
      {canOperation(path, '经营者收支记录管理') ?
        <MenuItem onClick={() => {
          history.push(`/manager/income-and-expense?managerId=${record.id}`)
        }} icon={<UnorderedListOutlined />}>
          <span>收支记录</span>
        </MenuItem> : null
      }
      {canOperation(path, '仓库管理') ?
        <MenuItem onClick={() => {
          // 
        }} icon={<FormOutlined />}>
          <span>仓库管理</span>
        </MenuItem> : null
      }
      {canOperation(path, '编辑负责人') ?
        <MenuItem onClick={() => {
          handleUpdatePersonInChargeModalVisible(true);
          setPersonInChargeFormValues({
            id: record.id,
            email: record.personInChargeEmail,
            mobilePhone: record.personInChargeMobilePhone,
            name: record.personInChargeName,
          });
        }} icon={<FormOutlined />}>
          <span>编辑负责人</span>
        </MenuItem> : null
      }
      {canOperation(path, '更新提现周期') ?
        <MenuItem onClick={() => {
          // 
        }} icon={<FormOutlined />}>
          <span>更新提现周期</span>
        </MenuItem> : null
      }
      {canOperation(path, '更新平台管理费率') ?
        <MenuItem onClick={() => {
          // 
        }} icon={<FormOutlined />}>
          <span>更新平台管理费率</span>
        </MenuItem> : null
      }
    </Menu>);
  }
  /**
   * 刷新表格
   */
  const reload = () => {
    if (actionRef.current) {
      actionRef.current.reload();
    }
  }
  // 更新状态
  const updateStatusRequest = useRequestHandle(updateStatus, () => {
    message.success('操作成功.');
    reload();
  });
  // 创建
  const addRequest = useRequestHandle(addManager, () => {
    message.success('创建成功.');
    handleModalVisible(false);
    reload();
  });
  // 更新负责人
  const updatePersonInChargeRequest = useRequestHandle(updatePersonInCharge, () => {
    message.success('更新成功.');
    handleUpdatePersonInChargeModalVisible(false);
    setPersonInChargeFormValues({});
    reload();
  })

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 70,
    },
    {
      title: '分类',
      dataIndex: 'category',
      filters: true,
      width: 120,
      hideInSearch: true,
      valueEnum: {
        1: {
          text: '省级代理商',
          status: 'Default',
        },
        2: {
          text: '市级代理商',
          status: 'Processing',
        },
        3: {
          text: '市级加盟商',
          status: 'Success',
        },
      },
    },
    {
      title: '企业名称',
      dataIndex: 'businessName',
      render: (dom, entity) => <a onClick={() => setRow(entity)}>{dom}</a>,
    },
    {
      title: '纳税人识别号',
      dataIndex: 'taxpayerIdentificationNumber',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '注册地址',
      dataIndex: 'registrationAddress',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '平台管理费率',
      dataIndex: 'platformManagementExpenseRate',
      hideInSearch: true,
      valueType: 'percent',
    },
    {
      title: '管理费率',
      dataIndex: 'managementExpenseRate',
      hideInSearch: true,
      valueType: 'percent',
    },
    {
      title: '法定代表人',
      dataIndex: 'legalRepresentative',
      hideInSearch: true,
    },
    {
      title: '法定代表人手机',
      dataIndex: 'legalRepresentativeMobilePhone',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '负责人',
      dataIndex: 'personInChargeName',
      hideInSearch: true,
    },
    {
      title: '负责人手机',
      dataIndex: 'personInChargeMobilePhone',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '负责人邮箱',
      dataIndex: 'personInChargeEmail',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      hideInSearch: true,
      render: (_, entity) => {
        const checked = entity.status === 1;
        return (
          <>
            <Popconfirm
              placement="right"
              title={`确定要${entity.status === 1 ? '禁用' : '启用'}吗？`}
              disabled={!canOperation(path, '更新状态')}
              onConfirm={() => {
                updateStatusRequest.run({
                  id: entity.id,
                  status: checked ? 2 : 1,
                });
              }}
              okText="确定"
              cancelText="取消"
            >
              <Switch
                loading={updateStatusRequest.loading}
                checkedChildren="启用"
                unCheckedChildren="禁用"
                checked={checked}
                disabled={!canOperation(path, '更新状态')}
              />
            </Popconfirm>
          </>
        );
      },
      valueEnum: {
        1: {
          text: '启用',
          status: 'Success',
        },
        2: {
          text: '禁用',
          status: 'Error',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdOn',
      valueType: 'dateTime',
      hideInSearch: true,
      hideInTable: true,
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
      title: '资质附件',
      dataIndex: 'qualificationAnnexs',
      hideInSearch: true,
      hideInTable: true,
      render: (_, record) => {
        return <>{getQualificationAnnexs(record.qualificationAnnexs)}</>;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Access key="key1" accessible={canOperation(path, '设备(门店)管理')}>
          <Link to={`/manager/equipment?managerId=${record.id}`}>设备(门店)</Link>
        </Access>,
        getOperationMenus(record) !== null ? <Dropdown overlay={() => getOperationMenus(record)} placement="bottomCenter" arrow>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            <MoreOutlined />
          </a>
        </Dropdown> : null
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
          <Access accessible={canOperation(path, '新增')}>
            <Button type="primary" onClick={() => handleModalVisible(true)}>
              <PlusOutlined /> 创建
            </Button>
          </Access>,
        ]}
        request={async (params, sorter, filter) => {
          const p = Object.assign(params, { pageIndex: params.current });
          const result = await queryManager({ ...p, sorter, filter });
          if (result.success) {
            return {
              ...result,
              total: result.data.totalItems,
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
          const params = { ...value };
          params.status = value.status ? 1 : 2;
          const qualificationAnnexs = [];
          for (let i = 0; i < value.qualificationAnnexs.length; i += 1) {
            const item = value.qualificationAnnexs[i];
            if (item.status === 'done') {
              qualificationAnnexs.push(item.response.key);
            }
          }
          params.qualificationAnnexs = qualificationAnnexs;
          // 发送请求
          addRequest.run(params);
        }}
        loading={addRequest.loading}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {personInChargeFormValue && Object.keys(personInChargeFormValue).length ? (
        <UpdatePersonInChargeForm
          onSubmit={async (value) => {
            // 发送请求
            updatePersonInChargeRequest.run(value);
          }}
          onCancel={() => {
            handleUpdatePersonInChargeModalVisible(false);
            setPersonInChargeFormValues({});
          }}
          loading={updatePersonInChargeRequest.loading}
          modalVisible={updatePersonInChargeModalVisible}
          values={personInChargeFormValue}
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
        {row?.businessName && (
          <ProDescriptions
            column={2}
            title={row?.businessName}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.businessName,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
