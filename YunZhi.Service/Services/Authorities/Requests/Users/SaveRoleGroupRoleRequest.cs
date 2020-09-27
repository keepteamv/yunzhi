using System;
using System.Collections.Generic;

namespace YunZhi.Service.Services.Authorities.Requests.Roles
{
    /// <summary>
    /// 保存角色组与角色关联信息请求类
    /// </summary>
    public class SaveRoleGroupRoleRequest
    {
        /// <summary>
        /// 角色ID
        /// </summary>
        /// <value></value>
        public string RoleId { get; set; }
        /// <summary>
        /// 角色组ID列表
        /// </summary>
        /// <value></value>
        public IList<string> RoleGroupIds { get; set; }
    }
}
