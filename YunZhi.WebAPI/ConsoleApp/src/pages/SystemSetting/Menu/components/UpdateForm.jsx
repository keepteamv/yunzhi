import React, { useState } from 'react';
import { Modal, Row, Col, Form, Input, Select, Switch, InputNumber, TreeSelect } from 'antd';
import { useDebounceFn, useMount } from '@umijs/hooks';
import { deepClone } from '@/utils/utils';
import ProForm, {
  ProFormText,
  ProFormSwitch
  // eslint-disable-next-line import/no-extraneous-dependencies
} from '@ant-design/pro-form';
import { queryCascaders } from '../service';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const UpdateForm = props => {
  const { modalVisible, onCancel, onSubmit, loading, record } = props;
  const [menuType, setMenuType] = useState(0);
  const [form] = Form.useForm();
  const [menus, setMenus] = useState([]);
  const [parentMenus, setParentMenus] = useState([]);
  // 父级菜单处理
  const parentMenusHandle = (type, values) => {
    if (values.length > 0 && type !== 0) {
      const dMenus = deepClone(values);
      const m = [];
      switch (type) {
        case 2:
          for (let i = 0; i < dMenus.length; i += 1) {
            const item = dMenus[i];
            item.children = [];
            item.disabled = false;
            m.push(item)
          }
          break;
        case 3:
          for (let i = 0; i < dMenus.length; i += 1) {
            const item = dMenus[i];
            item.disabled = item.menuType === 1;
            m.push(item)
          }
          break;
        default:
          break;
      }
      setParentMenus(m);
    }
  }

  // 防抖动函数
  const { run } = useDebounceFn(async value => {
    const res = await queryCascaders({ websiteType: value });
    setMenus(res.success ? res.data : []);
    parentMenusHandle(menuType, res.data);
  }, 100);

  useMount(
    () => {
      setMenuType(record.menuType);
      run(record.websiteType);
    }
  );

  return (
    <Modal
      destroyOnClose
      title="编辑菜单"
      width={650}
      visible={modalVisible}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
    >
      <ProForm
        form={form}
        initialValues={record}
        onFinish={async value => {
          const params = value;
          params.icon = record.icon;
          params.id = record.id;
          params.status = value.status ? 1 : 2;
          await onSubmit(params);
        }}
      >
        <Row gutter={12}>
          <Col span={12}>
            <FormItem label="所属平台" name="websiteType"
              rules={[{ required: true, message: '请选择所属平台!' }]}>
              <Select
                hasFeedback
                allowClear
                placeholder="请选择所属平台"
                onChange={async value => {
                  run(value);
                }}
              >
                <Option value={1}>总平台</Option>
                <Option value={2}>经营者平台</Option>
                <Option value={3}>供应商平台</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="菜单类型" name="menuType"
              rules={[{ required: true, message: '请选择菜单类型!' }]}>
              <Select
                hasFeedback
                allowClear
                placeholder="请选择菜单类型"
                onChange={type => {
                  // 重置所属上级字段
                  form.setFieldsValue({
                    parentId: null
                  })
                  // 设置当前选择的类型
                  setMenuType(type);
                  // 处理所属上级菜单数据
                  parentMenusHandle(type, menus);
                }}
              >
                <Option value={1}>目录</Option>
                <Option value={2}>菜单</Option>
                <Option value={3}>操作</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <FormItem label="所属上级" name="parentId"
              rules={[{
                validator: async (_, value) => {
                  // 如果菜单类型为操作，则必填
                  if (menuType === 3 && value === undefined) {
                    throw new Error("请选择所属上级");
                  }
                }
              }]}>
              <TreeSelect
                allowClear
                style={{ width: '100%' }}
                treeData={parentMenus}
                placeholder="请选择"
                treeDefaultExpandAll
              />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="菜单名称" name="name"
              rules={[{ required: true, message: '请输入菜单名称！' }]}
            >
              <Input placeholder="请输入菜单名称" />
            </FormItem>
          </Col>
        </Row>
        {/* 如果是菜单，就显示跳转路径 */}
        {menuType === 2 ? <Row gutter={12}>
          <Col span={12}>
            <ProFormText
              label="跳转路径"
              name="path"
              placeholder="请输入跳转路径！"
              rules={[{ required: true, message: '请输入跳转路径！' }]}
            />
          </Col>
          <Col span={12}>
            <ProFormSwitch
              label="操作内菜单"
              tip="为true时将不显示在左侧菜单拦"
              name="isInside"
            />
          </Col>
        </Row> : null}

        {/* 如果是操作，就显示触发代码 */}
        {menuType === 3 ? (
          <FormItem label="触发代码" name="triggerCode"
            rules={[{ required: true, message: '请输入请输入触发代码！' }]}
          >
            <TextArea rows={2} placeholder="请输入触发代码,多个用逗号分割,示例：controller:action" />
          </FormItem>
        ) : null}
        <Row gutter={12}>
          <Col span={12}>
            <FormItem label="排序值" name="sort"
              rules={[{
                required: true,
                message: '请输入排序值！'
              }]}
            >
              <InputNumber min={0} value={0} max={999} precision={0} />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem label="状态" name="status">
              <Switch defaultChecked={record.status} />
            </FormItem>
          </Col>
        </Row>

        <FormItem label="备注" name="remark">
          <TextArea rows={3} placeholder="请输入备注" />
        </FormItem>
        {/* <FormItem style={{ marginBottom: 0 }}>
          <Button style={{ marginRight: 7 }} loading={loading} type="primary" htmlType="submit">提交</Button>
          <Button htmlType="reset" onClick={() => {
            form.resetFields();
          }}>重置</Button>
        </FormItem> */}
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
