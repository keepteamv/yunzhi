// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
// import routes from './route';
export default defineConfig({
  hash: true,
  antd: {},
  history: {
    type: 'hash',
  },
  // publicPath: 'http://dev.console.gzwjz.com/console_dev_react/',
  // publicPath: 'https://console.gzwjz.com/console_react/',
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/account',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/account/login',
          component: './Account/Login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/index',
            },
            {
              path: '/welcome',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: 'product',
              icon: 'smile',
              path: '/product',
              component: './Product',
            },
            {
              name: '分析页',
              icon: 'smile',
              path: '/index',
              component: './Index',
            },
            {
              name: '经营者管理',
              icon: 'smile',
              path: '/manager',
              component: './Manager',
            },
            {
              name: '经营者收支记录管理',
              icon: 'smile',
              path: '/manager/income-and-expense',
              component: './Manager/IncomeAndExpense',
            },
            {
              name: '提现记录管理',
              icon: 'smile',
              path: '/manager/cash-out-record',
              component: './Manager/CashOutRecord',
            },
            {
              name: '充值记录管理',
              icon: 'smile',
              path: '/manager/recharge',
              component: './Manager/Recharge',
            },
            {
              name: '门店管理',
              icon: 'smile',
              path: '/manager/equipment',
              component: './Manager/Equipment',
            },
            {
              name: '编辑门店',
              icon: 'smile',
              path: '/manager/equipment/edit',
              component: './Manager/Equipment/Edit',
            },
            {
              name: '角色管理',
              icon: 'smile',
              path: '/role',
              component: './SystemSetting/Role',
            },
            {
              name: '菜单管理',
              icon: 'smile',
              path: '/menu',
              component: './SystemSetting/Menu',
            },
            {
              name: '用户管理',
              icon: 'smile',
              path: '/user',
              component: './SystemSetting/User',
            },
            {
              name: '权限管理',
              icon: 'smile',
              path: '/authority',
              component: './SystemSetting/Authority',
            },
            {
              name: '订单管理',
              icon: 'smile',
              path: '/order',
              component: './Order',
            },
            {
              name: '会员管理',
              icon: 'smile',
              path: '/member',
              component: './Member',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
