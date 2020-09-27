/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { Link, useIntl, connect, history } from 'umi';
import request from '@/utils/request';
import { GithubOutlined, FolderOutlined, FileOutlined } from '@ant-design/icons';
import { Result, Button, Spin } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { getAuthorityFromRouter } from '@/utils/utils';
import { getMenus, setMenus } from '@/utils/authority';
import { useMount } from '@umijs/hooks';
import logo from '../assets/logo2.png';
// import menu from '@/locales/zh-TW/menu';
const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/account/login">Go Login</Link>
      </Button>
    }
  />
);

const defaultFooterDom = (
  <DefaultFooter
    copyright={`${new Date().getFullYear()} 伍进制信息科技`}
    links={[
      {
        key: 'Ant Design Pro',
        title: 'Ant Design Pro',
        href: 'https://pro.ant.design',
        blankTarget: true,
      },
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ant-design/ant-design-pro',
        blankTarget: true,
      },
      {
        key: 'Ant Design',
        title: 'Ant Design',
        href: 'https://ant.design',
        blankTarget: true,
      },
    ]}
  />
);

const BasicLayout = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * constructor
   */
  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }, []);

  useMount(async () => {
    // 读取数据
    let menus = getMenus();
    if (menus.length === 0) {
      const res = await request('/api/Menu/getTreeListByUser', {
        method: 'GET'
      });
      if (res.success) {
        menus = res.data;
        setMenus(res.data);
      }
    }
    const newMenus = [];
    // 处理
    for (let i = 0; i < menus.length; i += 1) {
      const item = menus[i];
      const single = {
        icon: <FolderOutlined />,
        path: item.path === null ? "" : item.path,
        name: item.name,
      };
      if (item.children && item.children.length > 0) {
        const items = [];
        for (let j = 0; j < item.children.length; j += 1) {
          const child = item.children[j];
          if (!child.isInside) {
            items.push({
              icon: <FileOutlined />,
              path: child.path,
              name: child.name,
            })
          }
        }
        single.children = items;
      }
      newMenus.push(single);
    }
    setLoading(false);
    setMenuData(newMenus);
  });

  /**
   * init variables
   */
  const handleMenuCollapse = (payload) => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  }; // get children authority

  const authorized = getAuthorityFromRouter(props.route.routes, location.pathname || '/') || {
    authority: undefined,
  };
  const { formatMessage } = useIntl();
  return (
    <ProLayout
      logo={logo}
      formatMessage={formatMessage}
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      menuContentRender={(_, dom) =>
        loading ? (
          <div
            style={{
              padding: '24px 0',
            }}
          >
            <Spin tip="菜单加载中">{dom}</Spin>
          </div>
        ) : (
            dom
          )
      }
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: formatMessage({
            id: 'menu.home',
          }),
        },
        ...routers,
      ]}
      itemRender={(route, _, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
            <span>{route.breadcrumbName}</span>
          );
      }}
      footerRender={() => defaultFooterDom}
      menuDataRender={() => menuData}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      <Authorized authority={authorized.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings }) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
