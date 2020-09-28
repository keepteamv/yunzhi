-- -------------------------------------------------------------
-- TablePlus 3.9.1(342)
--
-- https://tableplus.com/
--
-- Database: yunzhi_data
-- Generation Time: 2020-09-27 23:17:52.8680
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(95) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Menus` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `ParentId` longtext,
  `Name` longtext,
  `Path` longtext,
  `Level` int(11) NOT NULL,
  `Sort` int(11) NOT NULL,
  `Status` int(11) NOT NULL,
  `IsInside` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `OperationGroups` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `Name` longtext,
  `Sort` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Operations` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `OperationGroupId` varchar(32) DEFAULT NULL,
  `Name` longtext,
  `Code` longtext,
  `Tips` longtext,
  `Sort` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  KEY `IX_Operations_OperationGroupId` (`OperationGroupId`),
  CONSTRAINT `FK_Operations_OperationGroups_OperationGroupId` FOREIGN KEY (`OperationGroupId`) REFERENCES `OperationGroups` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `PermissionMenus` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `PermissionId` varchar(32) DEFAULT NULL,
  `MenuId` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_PermissionMenus_MenuId` (`MenuId`),
  KEY `IX_PermissionMenus_PermissionId` (`PermissionId`),
  CONSTRAINT `FK_PermissionMenus_Menus_MenuId` FOREIGN KEY (`MenuId`) REFERENCES `Menus` (`Id`),
  CONSTRAINT `FK_PermissionMenus_Permissions_PermissionId` FOREIGN KEY (`PermissionId`) REFERENCES `Permissions` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `PermissionOperations` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `PermissionId` varchar(32) DEFAULT NULL,
  `OperationId` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_PermissionOperations_OperationId` (`OperationId`),
  KEY `IX_PermissionOperations_PermissionId` (`PermissionId`),
  CONSTRAINT `FK_PermissionOperations_Operations_OperationId` FOREIGN KEY (`OperationId`) REFERENCES `Operations` (`Id`),
  CONSTRAINT `FK_PermissionOperations_Permissions_PermissionId` FOREIGN KEY (`PermissionId`) REFERENCES `Permissions` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Permissions` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `PermissionType` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `RoleGroupRoles` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `RoleGroupId` varchar(32) DEFAULT NULL,
  `RoleId` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_RoleGroupRoles_RoleGroupId` (`RoleGroupId`),
  KEY `IX_RoleGroupRoles_RoleId` (`RoleId`),
  CONSTRAINT `FK_RoleGroupRoles_RoleGroups_RoleGroupId` FOREIGN KEY (`RoleGroupId`) REFERENCES `RoleGroups` (`Id`),
  CONSTRAINT `FK_RoleGroupRoles_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `RoleGroups` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `Name` longtext,
  `Remarks` longtext,
  `Status` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `RoleGroupUsers` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `RoleGroupId` varchar(32) DEFAULT NULL,
  `UserId` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_RoleGroupUsers_RoleGroupId` (`RoleGroupId`),
  KEY `IX_RoleGroupUsers_UserId` (`UserId`),
  CONSTRAINT `FK_RoleGroupUsers_RoleGroups_RoleGroupId` FOREIGN KEY (`RoleGroupId`) REFERENCES `RoleGroups` (`Id`),
  CONSTRAINT `FK_RoleGroupUsers_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `RolePermissions` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `RoleId` varchar(32) DEFAULT NULL,
  `PermissionId` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_RolePermissions_PermissionId` (`PermissionId`),
  KEY `IX_RolePermissions_RoleId` (`RoleId`),
  CONSTRAINT `FK_RolePermissions_Permissions_PermissionId` FOREIGN KEY (`PermissionId`) REFERENCES `Permissions` (`Id`),
  CONSTRAINT `FK_RolePermissions_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Roles` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `Name` longtext,
  `Remarks` longtext,
  `Status` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `UserGroupRoles` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `UserGroupId` varchar(32) DEFAULT NULL,
  `RoleId` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_UserGroupRoles_RoleId` (`RoleId`),
  KEY `IX_UserGroupRoles_UserGroupId` (`UserGroupId`),
  CONSTRAINT `FK_UserGroupRoles_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`Id`),
  CONSTRAINT `FK_UserGroupRoles_UserGroups_UserGroupId` FOREIGN KEY (`UserGroupId`) REFERENCES `UserGroups` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `UserGroups` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `Name` longtext,
  `Remarks` longtext,
  `Status` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `UserGroupUsers` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `UserGroupId` varchar(32) DEFAULT NULL,
  `UserId` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_UserGroupUsers_UserGroupId` (`UserGroupId`),
  KEY `IX_UserGroupUsers_UserId` (`UserId`),
  CONSTRAINT `FK_UserGroupUsers_UserGroups_UserGroupId` FOREIGN KEY (`UserGroupId`) REFERENCES `UserGroups` (`Id`),
  CONSTRAINT `FK_UserGroupUsers_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `UserRoles` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `UserId` varchar(32) DEFAULT NULL,
  `RoleId` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX_UserRoles_RoleId` (`RoleId`),
  KEY `IX_UserRoles_UserId` (`UserId`),
  CONSTRAINT `FK_UserRoles_Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `Roles` (`Id`),
  CONSTRAINT `FK_UserRoles_Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `Users` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Users` (
  `Id` varchar(32) NOT NULL,
  `CreatedOn` datetime(6) NOT NULL,
  `UpdatedOn` datetime(6) NOT NULL,
  `UserName` longtext,
  `Password` longtext,
  `RealName` longtext,
  `PhoneNumber` longtext,
  `Email` longtext,
  `AvatarUrl` longtext,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`) VALUES
('20200926024202_init', '3.1.8'),
('20200927060505_add_table_roleGroups', '3.1.8'),
('20200927130619_update_table_operation_1', '3.1.8');

INSERT INTO `Menus` (`Id`, `CreatedOn`, `UpdatedOn`, `ParentId`, `Name`, `Path`, `Level`, `Sort`, `Status`, `IsInside`) VALUES
('5f6eac18d74a464fae27d842', '2020-09-26 10:48:56.393274', '2020-09-26 10:48:56.393286', NULL, '系统设置', '/', '0', '0', '1', '1'),
('5f6eac33d74a464fae27d844', '2020-09-26 10:49:23.079814', '2020-09-27 09:28:33.356640', '5f6eac18d74a464fae27d842', '用户管理', '/user', '1', '1', '1', '0'),
('5f6eac47d74a464fae27d846', '2020-09-26 10:49:43.989218', '2020-09-26 10:49:43.989230', '5f6eac18d74a464fae27d842', '角色管理', '/role', '1', '0', '1', '0'),
('5f6eac59d74a464fae27d848', '2020-09-26 10:50:01.547770', '2020-09-26 10:50:01.547777', '5f6eac18d74a464fae27d842', '菜单管理', '/menu', '1', '0', '1', '0'),
('5f6fe77ad74a46170ebbe5da', '2020-09-27 09:14:34.217529', '2020-09-27 20:59:52.802930', NULL, '信息管理', '/', '0', '1', '1', '0'),
('5f6fe7bfd74a46170ebbe60e', '2020-09-27 09:15:43.740915', '2020-09-27 22:23:34.665624', '5f6fe77ad74a46170ebbe5da', '产品管理', '/product1', '1', '2', '1', '0'),
('5f707cf5d74a460a04e61648', '2020-09-27 19:52:21.077456', '2020-09-27 19:52:21.077458', '5f6eac18d74a464fae27d842', '操作管理', '/operation', '1', '3', '1', '0');

INSERT INTO `OperationGroups` (`Id`, `CreatedOn`, `UpdatedOn`, `Name`, `Sort`) VALUES
('5f6eabadd74a464fae27d837', '2020-09-26 10:47:09.757945', '2020-09-26 10:47:09.757958', '系统设置', '0'),
('5f6f2bc1d74a46712e90ff54', '2020-09-26 19:53:37.452663', '2020-09-26 19:53:37.452673', '会员管理', '0'),
('5f6f5093d74a46d21d67d8fa', '2020-09-26 22:30:43.224138', '2020-09-26 22:30:43.224152', '产品管理', '0'),
('5f6f6958d74a46e6d7282480', '2020-09-27 00:16:24.967460', '2020-09-27 00:16:24.967473', '门店管理', '0'),
('5f707e0fd74a460a04e61731', '2020-09-27 19:57:03.225123', '2020-09-27 19:57:03.225125', '通用设置', '0');

INSERT INTO `Operations` (`Id`, `CreatedOn`, `UpdatedOn`, `OperationGroupId`, `Name`, `Code`, `Tips`, `Sort`) VALUES
('5f6eabb7d74a464fae27d838', '2020-09-26 10:47:19.398894', '2020-09-26 10:47:19.398906', '5f6eabadd74a464fae27d837', '创建用户', 'authority.create.user', '', '0'),
('5f6f2bf3d74a46712e90ff55', '2020-09-26 19:54:27.853856', '2020-09-26 19:54:27.853865', '5f6f2bc1d74a46712e90ff54 ', '查看会员列表', 'webapi.getpages.member', '', '0'),
('5f6f2c0ed74a46712e90ff56', '2020-09-26 19:54:54.098758', '2020-09-26 19:54:54.098765', '5f6f2bc1d74a46712e90ff54 ', '更新会员状态', 'webapi.updatestatus.member', '', '0'),
('5f6f2c71d74a46712e90ff80', '2020-09-26 19:56:33.688862', '2020-09-26 19:56:33.688882', '5f6eabadd74a464fae27d837', '编辑用户', 'authority.update.user', '', '0'),
('5f6f6537d74a46e6d728245c', '2020-09-26 23:58:47.677418', '2020-09-26 23:58:47.677430', '5f6f5093d74a46d21d67d8fa', '创建产品', 'webapi.create.product', NULL, '0'),
('5f6f6595d74a46e6d728246d', '2020-09-27 00:00:21.927505', '2020-09-27 00:00:21.927514', '5f6eabadd74a464fae27d837', '查询角色分页列表', 'authority.getpages.role', NULL, '0'),
('5f6f6989d74a46e6d7282495', '2020-09-27 00:17:13.702672', '2020-09-27 00:17:13.702683', '5f6f6958d74a46e6d7282480', '查询门店列表', 'webapi.getpages.store', NULL, '0'),
('5f6f72f2d74a46f72b595d1a', '2020-09-27 00:57:22.914426', '2020-09-27 00:57:22.914439', '5f6eabadd74a464fae27d837', '创建用户组', 'authority.create.usergroup', NULL, '0'),
('5f6f730dd74a46f72b595d33', '2020-09-27 00:57:49.375580', '2020-09-27 00:57:49.375589', '5f6eabadd74a464fae27d837', '编辑用户组', 'authority.update.usergroup', NULL, '0'),
('5f6f735ad74a46f72b595d9f', '2020-09-27 00:59:06.886417', '2020-09-27 00:59:06.886429', '5f6eabadd74a464fae27d837', '创建角色', 'authority.create.role', NULL, '0'),
('5f6f736bd74a46f72b595dbc', '2020-09-27 00:59:23.466451', '2020-09-27 00:59:23.466493', '5f6eabadd74a464fae27d837', '编辑角色', 'authority.update.role', NULL, '0'),
('5f6f7385d74a46f72b595ddb', '2020-09-27 00:59:49.747281', '2020-09-27 00:59:49.747289', '5f6eabadd74a464fae27d837', '查询用户列表', 'authority.getpages.user', NULL, '0'),
('5f6f73aad74a46f72b595dfc', '2020-09-27 01:00:26.030778', '2020-09-27 01:00:26.030786', '5f6eabadd74a464fae27d837', '查询用户组列表', 'authority.getlist.usergroup', NULL, '0'),
('5f6fe394d74a46f72b595f65', '2020-09-27 08:57:56.474790', '2020-09-27 08:57:56.474792', '5f6eabadd74a464fae27d837', '查询操作列表', 'authority.getlist.operation', NULL, '0'),
('5f6fe3a1d74a46f72b595f8a', '2020-09-27 08:58:09.498887', '2020-09-27 08:58:09.498889', '5f6eabadd74a464fae27d837', '创建操作', 'authority.create.operation', NULL, '0'),
('5f6fe3aed74a46f72b595fb1', '2020-09-27 08:58:22.699532', '2020-09-27 08:58:22.699533', '5f6eabadd74a464fae27d837', '编辑操作', 'authority.update.operation', NULL, '0'),
('5f6fe3ccd74a46f72b595fda', '2020-09-27 08:58:52.716824', '2020-09-27 08:58:52.716826', '5f6eabadd74a464fae27d837', '查询操作组列表', 'authority.getlist.operationgroup', NULL, '0'),
('5f6fe3e0d74a46f72b596005', '2020-09-27 08:59:12.153502', '2020-09-27 08:59:12.153504', '5f6eabadd74a464fae27d837', '创建操作组', 'authority.create.operationgroup', NULL, '0'),
('5f6fe3ead74a46f72b596032', '2020-09-27 08:59:22.904513', '2020-09-27 08:59:22.904514', '5f6eabadd74a464fae27d837', '更新操作组', 'authority.update.operationgroup', NULL, '0'),
('5f705fbfd74a46787918c8f3', '2020-09-27 17:47:43.702983', '2020-09-27 17:47:43.703007', '5f6eabadd74a464fae27d837', '创建用户组/用户', 'authority.saveusergroupuser.user,authority.getlist.usergroup,authority.getidsbyuserid.usergroup', NULL, '0'),
('5f705fd1d74a46787918c924', '2020-09-27 17:48:01.211542', '2020-09-27 17:48:01.211561', '5f6eabadd74a464fae27d837', '创建用户/角色', 'authority.saveuserrole.user,authority.getlist.role,authority.getidsbyuserid.role', NULL, '0'),
('5f706a6cd74a46787918d1f8', '2020-09-27 18:33:16.792735', '2020-09-27 18:33:16.792753', '5f6eabadd74a464fae27d837', '配置菜单权限', 'authority.gettreelist.menu,authority.getmenuidsbyroleid.menu,authority.savepermissionmenu.permission', NULL, '0'),
('5f706af7d74a46787918d22d', '2020-09-27 18:35:35.828838', '2020-09-27 18:35:35.828849', '5f6eabadd74a464fae27d837', '配置操作权限', 'authority.getlist.operation,authority.savepermissionoperation.permission', NULL, '0'),
('5f706e3dd74a460a04e61066', '2020-09-27 18:49:33.985400', '2020-09-27 18:49:33.985412', '5f6eabadd74a464fae27d837', '查询角色组列表', 'authority.getlist.rolegroup', NULL, '0'),
('5f706e52d74a460a04e6109f', '2020-09-27 18:49:54.055090', '2020-09-27 18:49:54.055099', '5f6eabadd74a464fae27d837', '创建角色组', 'authority.create.rolegroup', NULL, '0'),
('5f706e62d74a460a04e610da', '2020-09-27 18:50:10.700295', '2020-09-27 18:50:10.700305', '5f6eabadd74a464fae27d837', '编辑角色组', 'authority.update.rolegroup', NULL, '0'),
('5f707ca6d74a460a04e6140f', '2020-09-27 19:51:02.723774', '2020-09-27 19:51:02.723775', '5f6eabadd74a464fae27d837', '查询菜单列表', 'authority.gettreelist.menu', NULL, '0'),
('5f707cc0d74a460a04e6144e', '2020-09-27 19:51:28.061065', '2020-09-27 19:51:28.061067', '5f6eabadd74a464fae27d837', '创建菜单', 'authority.create.menu', NULL, '0'),
('5f707ccad74a460a04e6148f', '2020-09-27 19:51:38.327954', '2020-09-27 19:51:38.327956', '5f6eabadd74a464fae27d837', '编辑菜单', 'authority.update.menu', NULL, '0'),
('5f707e29d74a460a04e61776', '2020-09-27 19:57:29.907016', '2020-09-27 19:57:29.907017', '5f707e0fd74a460a04e61731', '查询用户菜单', 'authority.gettreelistbyuser.menu,authority.getpermissions.permission', NULL, '0'),
('5f708fa7d74a4626bec6eeb5', '2020-09-27 21:12:07.561832', '2020-09-27 21:12:07.561878', '5f6f2bc1d74a46712e90ff54', '编辑产品', 'product.update.product', NULL, '0'),
('5f709574d74a46288086d398', '2020-09-27 21:36:52.051934', '2020-09-27 21:36:52.051950', '5f6eabadd74a464fae27d837', '创建角色组/角色', 'authority.getidsbyroleid.rolegroup,authority.getlist.rolegroup,authority.saverolegrouprole.role', NULL, '0');

INSERT INTO `PermissionMenus` (`Id`, `CreatedOn`, `UpdatedOn`, `PermissionId`, `MenuId`) VALUES
('5f70a05dd74a4641859324c6', '2020-09-27 22:23:25.765710', '2020-09-27 22:23:25.765712', '5f70a05dd74a4641859324c5', '5f6eac33d74a464fae27d844'),
('5f70a05dd74a4641859324c9', '2020-09-27 22:23:25.765785', '2020-09-27 22:23:25.765785', '5f70a05dd74a4641859324c8', '5f6eac47d74a464fae27d846'),
('5f70a05dd74a4641859324cc', '2020-09-27 22:23:25.765786', '2020-09-27 22:23:25.765786', '5f70a05dd74a4641859324cb', '5f6fe77ad74a46170ebbe5da'),
('5f70a05dd74a4641859324cf', '2020-09-27 22:23:25.765786', '2020-09-27 22:23:25.765787', '5f70a05dd74a4641859324ce', '5f6fe7bfd74a46170ebbe60e'),
('5f70a05dd74a4641859324d2', '2020-09-27 22:23:25.765787', '2020-09-27 22:23:25.765787', '5f70a05dd74a4641859324d1', '5f6eac59d74a464fae27d848'),
('5f70a05dd74a4641859324d5', '2020-09-27 22:23:25.765787', '2020-09-27 22:23:25.765787', '5f70a05dd74a4641859324d4', '5f6eac18d74a464fae27d842'),
('5f70a05dd74a4641859324d8', '2020-09-27 22:23:25.765788', '2020-09-27 22:23:25.765788', '5f70a05dd74a4641859324d7', '5f707cf5d74a460a04e61648');

INSERT INTO `PermissionOperations` (`Id`, `CreatedOn`, `UpdatedOn`, `PermissionId`, `OperationId`) VALUES
('5f709906d74a46288086e2cc', '2020-09-27 21:52:06.065098', '2020-09-27 21:52:06.065098', '5f709906d74a46288086e2cb', '5f6eabb7d74a464fae27d838'),
('5f709906d74a46288086e2cf', '2020-09-27 21:52:06.065099', '2020-09-27 21:52:06.065099', '5f709906d74a46288086e2ce', '5f6f6595d74a46e6d728246d'),
('5f709906d74a46288086e2d2', '2020-09-27 21:52:06.065100', '2020-09-27 21:52:06.065100', '5f709906d74a46288086e2d1', '5f6f72f2d74a46f72b595d1a'),
('5f709906d74a46288086e2d5', '2020-09-27 21:52:06.065100', '2020-09-27 21:52:06.065100', '5f709906d74a46288086e2d4', '5f6f730dd74a46f72b595d33'),
('5f709906d74a46288086e2d8', '2020-09-27 21:52:06.065101', '2020-09-27 21:52:06.065101', '5f709906d74a46288086e2d7', '5f6f735ad74a46f72b595d9f'),
('5f709906d74a46288086e2db', '2020-09-27 21:52:06.065101', '2020-09-27 21:52:06.065101', '5f709906d74a46288086e2da', '5f6f736bd74a46f72b595dbc'),
('5f709906d74a46288086e2de', '2020-09-27 21:52:06.065102', '2020-09-27 21:52:06.065102', '5f709906d74a46288086e2dd', '5f6f7385d74a46f72b595ddb'),
('5f709906d74a46288086e2e1', '2020-09-27 21:52:06.065102', '2020-09-27 21:52:06.065102', '5f709906d74a46288086e2e0', '5f6f73aad74a46f72b595dfc'),
('5f709906d74a46288086e2e4', '2020-09-27 21:52:06.065102', '2020-09-27 21:52:06.065103', '5f709906d74a46288086e2e3', '5f6fe394d74a46f72b595f65'),
('5f709906d74a46288086e2e7', '2020-09-27 21:52:06.065103', '2020-09-27 21:52:06.065103', '5f709906d74a46288086e2e6', '5f6fe3a1d74a46f72b595f8a'),
('5f709906d74a46288086e2ea', '2020-09-27 21:52:06.065103', '2020-09-27 21:52:06.065103', '5f709906d74a46288086e2e9', '5f6fe3aed74a46f72b595fb1'),
('5f709906d74a46288086e2ed', '2020-09-27 21:52:06.065104', '2020-09-27 21:52:06.065104', '5f709906d74a46288086e2ec', '5f6fe3ccd74a46f72b595fda'),
('5f709906d74a46288086e2f0', '2020-09-27 21:52:06.065104', '2020-09-27 21:52:06.065104', '5f709906d74a46288086e2ef', '5f6fe3e0d74a46f72b596005'),
('5f709906d74a46288086e2f3', '2020-09-27 21:52:06.065105', '2020-09-27 21:52:06.065105', '5f709906d74a46288086e2f2', '5f6fe3ead74a46f72b596032'),
('5f709906d74a46288086e2f6', '2020-09-27 21:52:06.065105', '2020-09-27 21:52:06.065105', '5f709906d74a46288086e2f5', '5f705fbfd74a46787918c8f3'),
('5f709906d74a46288086e2f9', '2020-09-27 21:52:06.065105', '2020-09-27 21:52:06.065106', '5f709906d74a46288086e2f8', '5f705fd1d74a46787918c924'),
('5f709906d74a46288086e2fc', '2020-09-27 21:52:06.065106', '2020-09-27 21:52:06.065106', '5f709906d74a46288086e2fb', '5f706a6cd74a46787918d1f8'),
('5f709906d74a46288086e2ff', '2020-09-27 21:52:06.065106', '2020-09-27 21:52:06.065106', '5f709906d74a46288086e2fe', '5f706af7d74a46787918d22d'),
('5f709906d74a46288086e302', '2020-09-27 21:52:06.065107', '2020-09-27 21:52:06.065107', '5f709906d74a46288086e301', '5f706e3dd74a460a04e61066'),
('5f709906d74a46288086e305', '2020-09-27 21:52:06.065107', '2020-09-27 21:52:06.065107', '5f709906d74a46288086e304', '5f706e52d74a460a04e6109f'),
('5f709906d74a46288086e308', '2020-09-27 21:52:06.065108', '2020-09-27 21:52:06.065108', '5f709906d74a46288086e307', '5f706e62d74a460a04e610da'),
('5f709906d74a46288086e30b', '2020-09-27 21:52:06.065108', '2020-09-27 21:52:06.065108', '5f709906d74a46288086e30a', '5f707ca6d74a460a04e6140f'),
('5f709906d74a46288086e30e', '2020-09-27 21:52:06.065108', '2020-09-27 21:52:06.065109', '5f709906d74a46288086e30d', '5f707cc0d74a460a04e6144e'),
('5f709906d74a46288086e311', '2020-09-27 21:52:06.065109', '2020-09-27 21:52:06.065109', '5f709906d74a46288086e310', '5f707ccad74a460a04e6148f'),
('5f709906d74a46288086e314', '2020-09-27 21:52:06.065109', '2020-09-27 21:52:06.065110', '5f709906d74a46288086e313', '5f6f2bf3d74a46712e90ff55'),
('5f709906d74a46288086e317', '2020-09-27 21:52:06.065110', '2020-09-27 21:52:06.065110', '5f709906d74a46288086e316', '5f6f2c0ed74a46712e90ff56'),
('5f709906d74a46288086e31a', '2020-09-27 21:52:06.065110', '2020-09-27 21:52:06.065110', '5f709906d74a46288086e319', '5f6f6537d74a46e6d728245c'),
('5f709906d74a46288086e31d', '2020-09-27 21:52:06.065111', '2020-09-27 21:52:06.065111', '5f709906d74a46288086e31c', '5f6f6989d74a46e6d7282495'),
('5f709906d74a46288086e320', '2020-09-27 21:52:06.065111', '2020-09-27 21:52:06.065111', '5f709906d74a46288086e31f', '5f707e29d74a460a04e61776');

INSERT INTO `Permissions` (`Id`, `CreatedOn`, `UpdatedOn`, `PermissionType`) VALUES
('5f709906d74a46288086e2cb', '2020-09-27 21:52:06.064789', '2020-09-27 21:52:06.064791', '2'),
('5f709906d74a46288086e2ce', '2020-09-27 21:52:06.064792', '2020-09-27 21:52:06.064793', '2'),
('5f709906d74a46288086e2d1', '2020-09-27 21:52:06.064793', '2020-09-27 21:52:06.064793', '2'),
('5f709906d74a46288086e2d4', '2020-09-27 21:52:06.064793', '2020-09-27 21:52:06.064793', '2'),
('5f709906d74a46288086e2d7', '2020-09-27 21:52:06.064794', '2020-09-27 21:52:06.064794', '2'),
('5f709906d74a46288086e2da', '2020-09-27 21:52:06.064794', '2020-09-27 21:52:06.064794', '2'),
('5f709906d74a46288086e2dd', '2020-09-27 21:52:06.064795', '2020-09-27 21:52:06.064795', '2'),
('5f709906d74a46288086e2e0', '2020-09-27 21:52:06.064795', '2020-09-27 21:52:06.064795', '2'),
('5f709906d74a46288086e2e3', '2020-09-27 21:52:06.064795', '2020-09-27 21:52:06.064796', '2'),
('5f709906d74a46288086e2e6', '2020-09-27 21:52:06.064796', '2020-09-27 21:52:06.064796', '2'),
('5f709906d74a46288086e2e9', '2020-09-27 21:52:06.064796', '2020-09-27 21:52:06.064796', '2'),
('5f709906d74a46288086e2ec', '2020-09-27 21:52:06.064797', '2020-09-27 21:52:06.064797', '2'),
('5f709906d74a46288086e2ef', '2020-09-27 21:52:06.064797', '2020-09-27 21:52:06.064797', '2'),
('5f709906d74a46288086e2f2', '2020-09-27 21:52:06.064798', '2020-09-27 21:52:06.064798', '2'),
('5f709906d74a46288086e2f5', '2020-09-27 21:52:06.064798', '2020-09-27 21:52:06.064798', '2'),
('5f709906d74a46288086e2f8', '2020-09-27 21:52:06.064798', '2020-09-27 21:52:06.064799', '2'),
('5f709906d74a46288086e2fb', '2020-09-27 21:52:06.064799', '2020-09-27 21:52:06.064799', '2'),
('5f709906d74a46288086e2fe', '2020-09-27 21:52:06.064799', '2020-09-27 21:52:06.064799', '2'),
('5f709906d74a46288086e301', '2020-09-27 21:52:06.064800', '2020-09-27 21:52:06.064800', '2'),
('5f709906d74a46288086e304', '2020-09-27 21:52:06.064800', '2020-09-27 21:52:06.064800', '2'),
('5f709906d74a46288086e307', '2020-09-27 21:52:06.064801', '2020-09-27 21:52:06.064801', '2'),
('5f709906d74a46288086e30a', '2020-09-27 21:52:06.064801', '2020-09-27 21:52:06.064801', '2'),
('5f709906d74a46288086e30d', '2020-09-27 21:52:06.064801', '2020-09-27 21:52:06.064802', '2'),
('5f709906d74a46288086e310', '2020-09-27 21:52:06.064802', '2020-09-27 21:52:06.064802', '2'),
('5f709906d74a46288086e313', '2020-09-27 21:52:06.064802', '2020-09-27 21:52:06.064802', '2'),
('5f709906d74a46288086e316', '2020-09-27 21:52:06.064803', '2020-09-27 21:52:06.064803', '2'),
('5f709906d74a46288086e319', '2020-09-27 21:52:06.064803', '2020-09-27 21:52:06.064803', '2'),
('5f709906d74a46288086e31c', '2020-09-27 21:52:06.064804', '2020-09-27 21:52:06.064804', '2'),
('5f709906d74a46288086e31f', '2020-09-27 21:52:06.064804', '2020-09-27 21:52:06.064804', '2'),
('5f70a05dd74a4641859324c5', '2020-09-27 22:23:25.750856', '2020-09-27 22:23:25.750859', '1'),
('5f70a05dd74a4641859324c8', '2020-09-27 22:23:25.751309', '2020-09-27 22:23:25.751310', '1'),
('5f70a05dd74a4641859324cb', '2020-09-27 22:23:25.751315', '2020-09-27 22:23:25.751315', '1'),
('5f70a05dd74a4641859324ce', '2020-09-27 22:23:25.751315', '2020-09-27 22:23:25.751316', '1'),
('5f70a05dd74a4641859324d1', '2020-09-27 22:23:25.751316', '2020-09-27 22:23:25.751316', '1'),
('5f70a05dd74a4641859324d4', '2020-09-27 22:23:25.751316', '2020-09-27 22:23:25.751317', '1'),
('5f70a05dd74a4641859324d7', '2020-09-27 22:23:25.751317', '2020-09-27 22:23:25.751317', '1');

INSERT INTO `RoleGroupRoles` (`Id`, `CreatedOn`, `UpdatedOn`, `RoleGroupId`, `RoleId`) VALUES
('5f703acad74a464a9e941677', '2020-09-27 15:10:02.886231', '2020-09-27 15:10:02.886311', '5f702fcad74a46316da16d54', '5f6eac76d74a464fae27d849'),
('5f703acad74a464a9e941678', '2020-09-27 15:10:02.886944', '2020-09-27 15:10:02.886947', '5f702fd6d74a46316da16d57', '5f6eac76d74a464fae27d849'),
('5f703c6cd74a464cee8793b9', '2020-09-27 15:17:00.777293', '2020-09-27 15:17:00.777307', '5f702fb0d74a46316da16d52', '5f703c65d74a464cee8793b2');

INSERT INTO `RoleGroups` (`Id`, `CreatedOn`, `UpdatedOn`, `Name`, `Remarks`, `Status`) VALUES
('5f702fb0d74a46316da16d52', '2020-09-27 14:22:40.507141', '2020-09-27 18:50:30.745184', '客服组', '客服组1', '1'),
('5f702fcad74a46316da16d54', '2020-09-27 14:23:06.723150', '2020-09-27 15:20:38.900571', '角色组2', '角色组2', '1'),
('5f702fd6d74a46316da16d57', '2020-09-27 14:23:18.027300', '2020-09-27 14:23:18.027308', '管理员组', '管理员组', '1');

INSERT INTO `RolePermissions` (`Id`, `CreatedOn`, `UpdatedOn`, `RoleId`, `PermissionId`) VALUES
('5f709906d74a46288086e2cd', '2020-09-27 21:52:06.065673', '2020-09-27 21:52:06.065674', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2cb'),
('5f709906d74a46288086e2d0', '2020-09-27 21:52:06.065675', '2020-09-27 21:52:06.065675', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2ce'),
('5f709906d74a46288086e2d3', '2020-09-27 21:52:06.065675', '2020-09-27 21:52:06.065676', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2d1'),
('5f709906d74a46288086e2d6', '2020-09-27 21:52:06.065676', '2020-09-27 21:52:06.065676', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2d4'),
('5f709906d74a46288086e2d9', '2020-09-27 21:52:06.065676', '2020-09-27 21:52:06.065677', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2d7'),
('5f709906d74a46288086e2dc', '2020-09-27 21:52:06.065677', '2020-09-27 21:52:06.065677', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2da'),
('5f709906d74a46288086e2df', '2020-09-27 21:52:06.065677', '2020-09-27 21:52:06.065677', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2dd'),
('5f709906d74a46288086e2e2', '2020-09-27 21:52:06.065678', '2020-09-27 21:52:06.065678', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2e0'),
('5f709906d74a46288086e2e5', '2020-09-27 21:52:06.065678', '2020-09-27 21:52:06.065678', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2e3'),
('5f709906d74a46288086e2e8', '2020-09-27 21:52:06.065679', '2020-09-27 21:52:06.065679', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2e6'),
('5f709906d74a46288086e2eb', '2020-09-27 21:52:06.065679', '2020-09-27 21:52:06.065679', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2e9'),
('5f709906d74a46288086e2ee', '2020-09-27 21:52:06.065679', '2020-09-27 21:52:06.065680', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2ec'),
('5f709906d74a46288086e2f1', '2020-09-27 21:52:06.065680', '2020-09-27 21:52:06.065680', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2ef'),
('5f709906d74a46288086e2f4', '2020-09-27 21:52:06.065680', '2020-09-27 21:52:06.065680', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2f2'),
('5f709906d74a46288086e2f7', '2020-09-27 21:52:06.065681', '2020-09-27 21:52:06.065681', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2f5'),
('5f709906d74a46288086e2fa', '2020-09-27 21:52:06.065681', '2020-09-27 21:52:06.065681', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2f8'),
('5f709906d74a46288086e2fd', '2020-09-27 21:52:06.065682', '2020-09-27 21:52:06.065682', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2fb'),
('5f709906d74a46288086e300', '2020-09-27 21:52:06.065682', '2020-09-27 21:52:06.065682', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e2fe'),
('5f709906d74a46288086e303', '2020-09-27 21:52:06.065682', '2020-09-27 21:52:06.065683', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e301'),
('5f709906d74a46288086e306', '2020-09-27 21:52:06.065683', '2020-09-27 21:52:06.065683', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e304'),
('5f709906d74a46288086e309', '2020-09-27 21:52:06.065683', '2020-09-27 21:52:06.065683', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e307'),
('5f709906d74a46288086e30c', '2020-09-27 21:52:06.065684', '2020-09-27 21:52:06.065684', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e30a'),
('5f709906d74a46288086e30f', '2020-09-27 21:52:06.065684', '2020-09-27 21:52:06.065684', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e30d'),
('5f709906d74a46288086e312', '2020-09-27 21:52:06.065685', '2020-09-27 21:52:06.065685', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e310'),
('5f709906d74a46288086e315', '2020-09-27 21:52:06.065685', '2020-09-27 21:52:06.065685', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e313'),
('5f709906d74a46288086e318', '2020-09-27 21:52:06.065685', '2020-09-27 21:52:06.065686', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e316'),
('5f709906d74a46288086e31b', '2020-09-27 21:52:06.065686', '2020-09-27 21:52:06.065686', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e319'),
('5f709906d74a46288086e31e', '2020-09-27 21:52:06.065686', '2020-09-27 21:52:06.065686', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e31c'),
('5f709906d74a46288086e321', '2020-09-27 21:52:06.065687', '2020-09-27 21:52:06.065687', '5f6eac76d74a464fae27d849', '5f709906d74a46288086e31f'),
('5f70a05dd74a4641859324c7', '2020-09-27 22:23:25.769643', '2020-09-27 22:23:25.769645', '5f6eac76d74a464fae27d849', '5f70a05dd74a4641859324c5'),
('5f70a05dd74a4641859324ca', '2020-09-27 22:23:25.769708', '2020-09-27 22:23:25.769708', '5f6eac76d74a464fae27d849', '5f70a05dd74a4641859324c8'),
('5f70a05dd74a4641859324cd', '2020-09-27 22:23:25.769709', '2020-09-27 22:23:25.769709', '5f6eac76d74a464fae27d849', '5f70a05dd74a4641859324cb'),
('5f70a05dd74a4641859324d0', '2020-09-27 22:23:25.769709', '2020-09-27 22:23:25.769709', '5f6eac76d74a464fae27d849', '5f70a05dd74a4641859324ce'),
('5f70a05dd74a4641859324d3', '2020-09-27 22:23:25.769710', '2020-09-27 22:23:25.769710', '5f6eac76d74a464fae27d849', '5f70a05dd74a4641859324d1'),
('5f70a05dd74a4641859324d6', '2020-09-27 22:23:25.769710', '2020-09-27 22:23:25.769710', '5f6eac76d74a464fae27d849', '5f70a05dd74a4641859324d4'),
('5f70a05dd74a4641859324d9', '2020-09-27 22:23:25.769711', '2020-09-27 22:23:25.769711', '5f6eac76d74a464fae27d849', '5f70a05dd74a4641859324d7');

INSERT INTO `Roles` (`Id`, `CreatedOn`, `UpdatedOn`, `Name`, `Remarks`, `Status`) VALUES
('5f6eac76d74a464fae27d849', '2020-09-26 10:50:30.522709', '2020-09-26 10:50:30.522719', '超级管理员', '系统最高权限', '1'),
('5f702e1ad74a46316da16ce5', '2020-09-27 14:15:54.537033', '2020-09-27 14:15:54.537055', '系统管理员', '系统管理员11', '1'),
('5f703c65d74a464cee8793b2', '2020-09-27 15:16:53.704865', '2020-09-27 15:22:24.259570', '客服', '客服部门', '1');

INSERT INTO `UserGroups` (`Id`, `CreatedOn`, `UpdatedOn`, `Name`, `Remarks`, `Status`) VALUES
('5f6eabced74a464fae27d839', '2020-09-26 10:47:42.057665', '2020-09-26 10:47:42.057679', '用户组1', '用户组1', '1'),
('5f6eabd2d74a464fae27d83a', '2020-09-26 10:47:46.184411', '2020-09-26 10:47:46.184422', '用户组2', '用户组2', '1'),
('5f6eabd5d74a464fae27d83b', '2020-09-26 10:47:49.429036', '2020-09-26 10:47:49.429045', '用户组3', '用户组3', '1'),
('5f6eabf0d74a464fae27d83c', '2020-09-26 10:48:16.032273', '2020-09-26 10:48:16.032285', '客服部', '客服部1', '1'),
('5f7044b2d74a4655ba1fce08', '2020-09-27 15:52:18.157692', '2020-09-27 15:52:22.355711', '管理员组', '管理员组11', '1');

INSERT INTO `UserGroupUsers` (`Id`, `CreatedOn`, `UpdatedOn`, `UserGroupId`, `UserId`) VALUES
('5f70423ad74a4655ba1fcd70', '2020-09-27 15:41:46.869338', '2020-09-27 15:41:46.869434', '5f6eabd2d74a464fae27d83a', '5f6eaba5d74a464fae27d836'),
('5f7044c5d74a4655ba1fce1b', '2020-09-27 15:52:37.288693', '2020-09-27 15:52:37.288846', '5f7044b2d74a4655ba1fce08', '5f6f7c59d74a46f72b595ecb');

INSERT INTO `UserRoles` (`Id`, `CreatedOn`, `UpdatedOn`, `UserId`, `RoleId`) VALUES
('5f70496fd74a46656245817a', '2020-09-27 16:12:31.842017', '2020-09-27 16:12:31.842104', '5f6eaba5d74a464fae27d836', '5f6eac76d74a464fae27d849');

INSERT INTO `Users` (`Id`, `CreatedOn`, `UpdatedOn`, `UserName`, `Password`, `RealName`, `PhoneNumber`, `Email`, `AvatarUrl`) VALUES
('5f6eaba5d74a464fae27d836', '2020-09-26 10:47:01.745526', '2020-09-26 10:47:01.745591', 'admin', '3412:qoTwqEBYLT/2v7QVC6dcv3eSNdNeK/8Q:pwSnSSzSRiq4JeK4dDKk+veUQtmPmO3O', '超级管理员', '13564567834', 'zheng_jinfan@126.com', 'https://tcs-devops.aliyun.com/thumbnail/111x80da2e79d303cc174dc187e9c9624474/w/200/h/200'),
('5f6f7c59d74a46f72b595ecb', '2020-09-27 01:37:29.437075', '2020-09-27 08:55:49.760052', 'root', '3412:w3P4h8SqAtgL+vEaPO33pe+EyyrBuItp:JNqfuH/rePSj7H5iIvXZ3FNQG9DvcJsj', '开发者', '13534231242', 'zheng_jinfan@126.com', NULL);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;