import React, { useState } from 'react';
import { Modal, Row, Col, message } from 'antd';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
  ProFormSwitch,
  ProFormUploadDragger
  // eslint-disable-next-line import/no-extraneous-dependencies
} from '@ant-design/pro-form';

import pattern from '@/utils/pattern';
import config from '@/config';
import { getUploadToken } from '../service';

const { cdnAddress } = config;

const CreateForm = props => {
  const { modalVisible, onCancel, onSubmit } = props;
  const [extraData, setExtraData] = useState({});
  const [fileList, setFileList] = useState([]);

  const init = async () => {
    const res = await getUploadToken();
    setExtraData({
      token: res.uptoken
    })
  }

  return (
    <Modal
      width={640}
      destroyOnClose
      title="创建经营者"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProForm onFinish={async value => {
        await onSubmit(value);
      }}>
        <Row gutter={24}>
          <Col span={12}>
            <ProFormText
              name="businessName"
              label="企业名称"
              placeholder="请输入企业名称"
              fieldProps={{
                allowClear: true
              }}
              rules={[{ required: true, message: '请输入企业名称！' }]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="taxpayerIdentificationNumber"
              label="纳税人识别号"
              placeholder="请输入纳税人识别号"
              fieldProps={{
                allowClear: true,
                maxLength: 20
              }}
              rules={[{ required: true, message: '请输入纳税人识别号！' }]}
            />
          </Col>
        </Row>
        <ProFormTextArea
          name="registrationAddress"
          label="注册地址"
          placeholder="请输入注册地址"
          fieldProps={{
            allowClear: true
          }}
          rules={[{ required: true, message: '请输入注册地址！' }]}
        />
        <Row gutter={24}>
          <Col span={12}>
            <ProFormText
              name="legalRepresentative"
              label="法人姓名"
              placeholder="请输入法人姓名"
              fieldProps={{
                allowClear: true,
                maxLength: 11
              }}
              rules={[{ required: true, message: '请输入法人姓名！' }]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="legalRepresentativeMobilePhone"
              label="法人手机"
              placeholder="请输入法人手机号"
              fieldProps={{
                allowClear: true
              }}
              rules={[{
                required: true,
                message: '请输入正确的手机号！',
                pattern: pattern.mobile
              }]}
            />
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <ProFormText
              name="personInChargeName"
              label="负责人姓名"
              placeholder="请输入负责人姓名"
              fieldProps={{
                allowClear: true
              }}
              rules={[{ required: true, message: '请输入负责人姓名！' }]}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              name="personInChargeMobilePhone"
              label="负责人手机"
              placeholder="请输入负责人手机号"
              fieldProps={{
                allowClear: true,
                maxLength: 11
              }}
              rules={[{
                required: true,
                message: '请输入正确的手机号！',
                pattern: pattern.mobile
              }]}
            />
          </Col>
        </Row>
        <ProFormText
          name="personInChargeEmail"
          label="负责人邮箱"
          placeholder="请输入负责人邮箱号"
          fieldProps={{
            allowClear: true
          }}
          rules={[{
            message: '请输入正确的邮箱地址！',
            type: 'email'
          }]}
        />
        <Row gutter={24}>
          <Col span={8}>
            <ProFormDigit
              label="管理费率"
              name="managementExpenseRate"
              min={0} max={50}
              placeholder="请输入管理费率"
              tip='单位百分比'
              fieldProps={{
                precision: 2,
              }}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              rules={[{ required: true, message: '请输入管理费率！' }]}
            />
          </Col>
          <Col span={8}>
            <ProFormDigit
              label="平台管理费率"
              name="platformManagementExpenseRate"
              min={0} max={50}
              placeholder="请输入平台管理费率"
              tip='平台收取的管理费率，单位百分比'
              fieldProps={{
                precision: 2
              }}
              initialValue={3}
              formatter={value => `${value}%`}
              parser={value => value.replace('%', '')}
              rules={[{ required: true, message: '请输入管理费率！' }]}
            />
          </Col>
          <Col span={8}>
            <ProFormSwitch name="status" label="状态" fieldProps={{
              checkedChildren: "启用",
              unCheckedChildren: "禁用"
            }} />
          </Col>
        </Row>
        <ProFormUploadDragger
          label="资质图片"
          name="qualificationAnnexs"
          description="单击或拖动文件到此区域进行上传,最多上传五张图片"
          fieldProps={{
            name: 'file',
            action: '//upload-z2.qiniup.com',
            accept: ".jpg, .jpeg, .png, .bmp, .JPG, .JPEG, .PBG, .BMP",
            data: extraData,
            defaultFileList: fileList,
            openFileDialogOnClick: fileList.length < 5,
            beforeUpload: async () => {
              if (!extraData || !extraData.token) {
                await init();
              }
              return false;
            },
            onPreview: file => {
              if (file.status === 'done') {
                window.open(`${cdnAddress}${file.response.key}`, "_blank");
              }
            },
            onChange: (obj) => {
              const { file } = obj;
              setFileList(obj.fileList);
              if (file.status === 'error') {
                message.error(file.response.error);
              }
              if (file.status === 'done') {
                message.success('上传成功.');
              }
            }
          }}
          rules={[{ required: true, message: '请上传资质图片！' }]}
        />
      </ProForm>
    </Modal>
  );
};

export default CreateForm;
