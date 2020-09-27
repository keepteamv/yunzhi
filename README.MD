# 管理前端

1. 框架：UMIJS(基于React) [https://umijs.org/](https://umijs.org/)
2. UI 框架 ：Ant Design Pro [https://pro.ant.design/](https://pro.ant.design/)
3. UI：Ant Design [https://ant.design/](https://ant.design/) 
4. UI 组件：[https://procomponents.ant.design/](https://procomponents.ant.design/)

## 开发与发布

> 源文件位于：YunZhi.WebAPI/ConsoleApp

### 开发

```bash
# 1.还原依赖我
yarn 
# or
npm i
# 2.运行
yarn start
# or 
npm start
```

### 发布

```bash
yarn build
# or
npm run build

# 它会自动打包到上级wwwroot目录,直接运行YunZhi.WebAPI就可以了
# 运行成功后访问：http://localhost:5000/index.html 
```



# 服务端

1. 语言：C#
2. 框架：asp.net core 3.1
3. 数据库：mysql


## 文件夹说明

1. YunZhi.WebAPI 管理端的API
2. YunZhi.MobileAPI 移动端的API
3. YunZhi.Service 实现代码逻辑的地方，被YunZhi.WebAPI 和YunZhi.MobileAPI 引用



## 还原数据库步骤

``` bash
# 安装dotnet ef 工具
dotnet tool install --global dotnet-ef
# 1.定位到YunZhi.WebAPI目录下
cd YunZhi.WebAPI
# 2.修改配置文件，appsettingn.Development.json 下的 data
# 3.运行更新命令
dotnet ef database update -c YunZhiDbContext
```



## 新增表或者修改表结构并同步到数据库步骤

```c#
// 1.继承EntityCore类
// 2.在YunZhiDbContext类中的OnModelCreating添加代码
modelBuilder.Entity<User>().ToTable("Users");
// User是实现类，Users是数据库表名
// 3.运行migrations命令
dotnet ef migrations add add_table_users -c YunZhiDbContext
// add_table_users名称可自定义，比如说：update_table_xxxx
// 4.运行更新命令
dotnet ef database update -c YunZhiDbContext
```



注：

1. 需要先创建数据库，编码为：utf8mb4
2. 运行dotnet ef命令都需要在YunZhi.WebAPI(管理端的API)目录下
3. 数据库名：yunzhi_data（可修改）

