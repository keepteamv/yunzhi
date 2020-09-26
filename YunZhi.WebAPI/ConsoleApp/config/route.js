const routes = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/account/login',
        component: './account/login',
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
            component: './Manager'
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
];

export default routes;