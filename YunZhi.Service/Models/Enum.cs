using System;
using System.ComponentModel;

namespace YunZhi.Service.Models
{

    #region Authorities
    /// <summary>
    /// 状态
    /// </summary>
    public enum Status
    {
        /// <summary>
        /// 启用
        /// </summary>
        [Description("启用")]
        Enabled = 1,
        /// <summary>
        /// 禁用
        /// </summary>
        [Description("禁用")]
        Disabled = 2,
    }
    /// <summary>
    /// 菜单类型
    /// /// </summary>
    public enum MenuType
    {
        /// <summary>
        /// 目录
        /// </summary>
        [Description("目录")]
        Catalog = 1,
        /// <summary>
        /// 菜单
        /// </summary>
        [Description("菜单")]
        Menu = 2,
        /// <summary>
        /// 操作
        /// </summary>
        [Description("操作")]
        Operate = 3
    }
    /// <summary>
    /// 权限类型
    /// </summary>
    public enum PermissionType
    {
        /// <summary>
        /// 菜单
        /// </summary>
        [Description("菜单")]
        Menu = 1,
        /// <summary>
        /// 操作
        /// </summary>
        [Description("操作")]
        Operation = 2
    }
    #endregion

}
