using System;
using System.Collections.Generic;

namespace YunZhi.Service.Services.Authorities.Requests.Permissions
{
    /// <summary>
    /// 保存权限操作请求类
    /// </summary>
    public class SavePermissionOperationRequest
    {
        /// <summary>
        /// 角色ID
        /// </summary>
        /// <value></value>
        public string RoleId { get; set; }
        /// <summary>
        /// 操作Id列表
        /// </summary>
        /// <value></value>
        public IList<string> OperationIds { get; set; }
    }
}
