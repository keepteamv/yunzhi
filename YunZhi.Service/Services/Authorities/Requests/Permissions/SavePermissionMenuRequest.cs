using System;
using System.Collections.Generic;

namespace YunZhi.Service.Services.Authorities.Requests.Permissions
{
    /// <summary>
    /// 保存权限菜单请求类
    /// </summary>
    public class SavePermissionMenuRequest
    {
        /// <summary>
        /// 角色ID
        /// </summary>
        /// <value></value>
        public string RoleId { get; set; }
        /// <summary>
        /// 菜单Id列表
        /// </summary>
        /// <value></value>
        public IList<string> MenuIds { get; set; }
    }
}
