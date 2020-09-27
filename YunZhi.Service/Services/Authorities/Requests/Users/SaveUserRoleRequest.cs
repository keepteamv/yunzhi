using System;
using System.Collections.Generic;

namespace YunZhi.Service.Services.Authorities.Requests.Users
{
    /// <summary>
    /// 保存用户与用色关联信息请求类
    /// </summary>
    public class SaveUserRoleRequest
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        /// <value></value>
        public string UserId { get; set; }
        /// <summary>
        /// 角色ID列表
        /// </summary>
        /// <value></value>
        public IList<string> RoleIds { get; set; }
    }
}
