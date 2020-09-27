import React, { useEffect, useState } from 'react';
import { CaretUpOutlined, CaretDownOutlined, SaveOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Modal, Tabs, Tree, Space, Button, message, Checkbox, Spin, Skeleton, Form, Input, Row, Col, InputNumber } from 'antd';
import { useMap } from '@umijs/hooks';
import { useAccess } from 'umi';
import ProForm, {
  ProFormText
} from '@ant-design/pro-form';
import { useRequestHandle } from '@/utils/utils';
import { getMenus, getMenuIdsByRoleId, getOperations, savePermissionMenu, savePermissionOperation, createOperationGroup, createOperation } from '../service';

const { TabPane } = Tabs;
const CheckboxGroup = Checkbox.Group;

const PermissionForm = props => {
  const { modalVisible, onCancel, values } = props;

  const { canOperation } = useAccess();
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    if (menus.length === 0) {
      getMenus().then(res => {
        setMenus(res.success ? res.data : []);
      });
      getMenuIdsByRoleId({ roleId: values.id }).then(res => {
        setCheckedKeys(res.success ? res.data : []);
      });
    }
  })
  const [operations, setOperations] = useState([]);
  const [map, { set, get, setAll }] = useMap([]);

  const handleOperations = data => {
    const arr = [];
    for (let i = 0; i < data.length; i += 1) {
      const item = data[i];
      arr.push([item.id, {
        checkedList: item.checkedList,
        indeterminate: !!item.checkedList.length && item.checkedList.length < item.children.length,
        checkAll: item.checkedList.length === item.children.length
      }])

    }
    setAll(arr);
  }
  // 查询操作列表请求
  const queryOperationsRequest = useRequestHandle(getOperations, data => {
    setOperations(data);
    handleOperations(data);
  });

  useEffect(() => {
    if (operations.length === 0) {
      getOperations({ roleId: values.id }).then(res => {
        setOperations(res.success ? res.data : []);
        if (res.success) {
          handleOperations(res.data);
        }
      });
    }
  });

  // 操作组Modal
  const [addOperationGroupModalVisible, setAddOperationGroupModalVisible] = useState(false);
  // 操作Modal
  const [addOperationModalVisible, setAddOperationModalVisible] = useState(false);
  // 操作组Id
  const [operationGroupId, setOperationGroupId] = useState('');

  // 添加操作组请求
  const addOperationGroupRequest = useRequestHandle(createOperationGroup, () => {
    message.success('添加成功.');
    // 重新查询操作列表
    queryOperationsRequest.run({ roleId: values.id });
    // 隐藏modal
    setAddOperationGroupModalVisible(false);
  });
  // 添加操作请求
  const addOperationRequest = useRequestHandle(createOperation, () => {
    message.success('添加成功.');
    // 重新查询操作列表
    queryOperationsRequest.run({ roleId: values.id });
    // 隐藏modal
    setAddOperationModalVisible(false);
  });

  // 保存权限操作请求
  const savePermissionOperationRequest = useRequestHandle(savePermissionOperation, () => {
    message.success('保存成功.');
  });
  // 保存权限菜单请求
  const savePermissionMenuRequest = useRequestHandle(savePermissionMenu, () => {
    message.success('保存成功.');
  });

  return (
    <Modal
      destroyOnClose
      title={`权限配置(${values.name})`}
      visible={modalVisible}
      width={800}
      onCancel={() => onCancel()}
      footer={null}
      maskClosable={false}
    >
      <Tabs>
        {canOperation('authority.savepermissionmenu.permission') ?
          <TabPane tab="菜单权限" key="1">
            <Space style={{ padding: '20px 10px' }}>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  setExpandedKeys(checkedKeys);
                }}
                disabled={menus.length === 0 || expandedKeys.length !== 0}
              >
                展开选中的节点<CaretDownOutlined />
              </Button>
              <Button
                size="small"
                onClick={() => {
                  setExpandedKeys([]);
                }}
                disabled={expandedKeys.length === 0}
              >
                收起全部节点<CaretUpOutlined />
              </Button>
              <Button
                type="primary"
                size="small"
                onClick={() => {
                  savePermissionMenuRequest.run({
                    roleId: values.id,
                    menuIds: checkedKeys
                  });
                }}
                loading={savePermissionMenuRequest.loading}
              >
                <SaveOutlined />保存
            </Button>
            </Space>
            {menus.length > 0 ? <Tree
              style={{ minHeight: 400 }}
              checkable
              // showLine
              selectable={false}
              expandedKeys={expandedKeys}
              onExpand={(keys) => {
                setExpandedKeys(keys);
              }}
              onCheck={(value) => {
                setCheckedKeys(value);
              }}
              checkedKeys={checkedKeys}
              treeData={menus}
            /> : <Skeleton />}
          </TabPane> : null
        }
        {canOperation('authority.savepermissionoperation.permission') ?
          <TabPane tab="操作权限" key="2">
            {map.size > 0 ? operations.map((item) => get(item.id) !== undefined ?
              <div style={{ borderBottom: '1px solid #e9e9e9', paddingBottom: 15, marginBottom: 10 }}>
                <div style={{ marginBottom: 15 }}>
                  <Checkbox
                    indeterminate={get(item.id).indeterminate}
                    onChange={(e) => {
                      set(item.id, {
                        checkedList: e.target.checked ? item.children.map(p => p.value) : [],
                        indeterminate: false,
                        checkAll: e.target.checked
                      })
                    }}
                    checked={get(item.id).checkAll}
                  >
                    {item.label}
                  </Checkbox>
                </div>
                <CheckboxGroup
                  options={item.children}
                  value={get(item.id).checkedList}
                  onChange={(list) => {
                    set(item.id, {
                      checkedList: list,
                      indeterminate: !!list.length && list.length < item.children.length,
                      checkAll: list.length === item.children.length
                    })
                  }}
                />
                <Button type="dashed" size="small" onClick={() => {
                  setAddOperationModalVisible(true);
                  setOperationGroupId(item.operationGroupId);
                }}>
                  <PlusOutlined />
                  <span>添加操作</span>
                </Button>
              </div> : <Skeleton />) : <Skeleton />}
            <Button type="dashed" size="small" onClick={() => {
              setAddOperationGroupModalVisible(true);
            }}>
              <PlusOutlined />
              <span>添加操作组</span>
            </Button>
            <div style={{ marginTop: 15 }}>
              <Space>
                <Button type="primary"
                  disabled={map.size === 0}
                  loading={savePermissionOperationRequest.loading}
                  onClick={() => {
                    const checkedList = [];
                    map.forEach((value) => {
                      for (let i = 0; i < value.checkedList.length; i += 1) {
                        const operationId = value.checkedList[i];
                        checkedList.push(operationId);
                      }
                    })
                    savePermissionOperationRequest.run({
                      roleId: values.id,
                      operationIds: checkedList
                    });
                  }}>
                  <SaveOutlined />
                  <span>保存</span>
                </Button>
              </Space>
            </div>
          </TabPane> : null
        }
      </Tabs>
      <Modal
        destroyOnClose
        title="添加操作组"
        visible={addOperationGroupModalVisible}
        footer={null}
        onCancel={() => {
          setAddOperationGroupModalVisible(false);
        }}
      >
        <Spin spinning={addOperationGroupRequest.loading} tip="保存中...">
          <ProForm
            onFinish={value => {
              addOperationGroupRequest.run(value);
            }}
            initialValues={{
              sort: 0
            }}
          >
            <ProFormText
              name="name"
              label="名称"
              placeholder="请输入操作组名称"
              rules={[{ required: true, message: '请输入操作组名称！' }]}
            />
            <Form.Item label="排序值" name="sort"
              rules={[{
                required: true,
                message: '请输入排序值！'
              }]}
            >
              <InputNumber min={0} max={999} precision={0} />
            </Form.Item>
          </ProForm>
        </Spin>
      </Modal>
      <Modal
        destroyOnClose
        title="添加操作"
        visible={addOperationModalVisible}
        footer={null}
        onCancel={() => {
          setAddOperationModalVisible(false);
        }}
      >
        <Spin spinning={addOperationRequest.loading} tip="保存中...">
          <ProForm onFinish={value => {
            if (operationGroupId === '') {
              message.error('保存出错，请关闭重试.');
              return;
            }
            if (!value.codes) {
              message.error('请添加操作代码.');
              return;
            }
            let code = "";
            for (let i = 0; i < value.codes.length; i += 1) {
              const item = value.codes[i];
              if (i === value.codes.length - 1) {
                code += item.code;
              } else {
                code += `${item.code},`;
              }
            }
            addOperationRequest.run({
              ...value,
              operationGroupId,
              code
            });
          }}
            initialValues={{
              sort: 0
            }}
          >
            <ProFormText
              name="name"
              label="名称"
              placeholder="请输入操作名称"
              rules={[{ required: true, message: '请输入操作名称！' }]}
            />
            <Form.List name="codes">
              {(fields, { add, remove }) => {
                return (
                  <div>
                    {fields.map(field => (
                      <Row gutter={12}>
                        <Col span={22}>
                          <Form.Item
                            {...field}
                            name={[field.name, 'code']}
                            fieldKey={[field.fieldKey, 'code']}
                            rules={[{ required: true, message: '操作代码不能为空' }]}
                          >
                            <Input placeholder="请输入操作代码" />
                          </Form.Item>
                        </Col>
                        <Col span={2}>
                          <div style={{ marginTop: 5 }}>
                            <MinusCircleOutlined
                              style={{ color: '#ff4d4f' }}
                              onClick={() => {
                                remove(field.name);
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => {
                          add();
                        }}
                        block
                      >
                        <PlusOutlined /> 添加代码
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
            <Form.Item label="排序值" name="sort"
              rules={[{
                required: true,
                message: '请输入排序值！'
              }]}
            >
              <InputNumber min={0} max={999} precision={0} />
            </Form.Item>
            <ProFormText
              name="tips"
              label="提示信息"
              placeholder="请输入提示信息"
            />
          </ProForm>
        </Spin>
      </Modal>
    </Modal>
  );
};

export default PermissionForm;
