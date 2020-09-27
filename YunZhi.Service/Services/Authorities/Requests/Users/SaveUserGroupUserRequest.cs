using System;
using System.Collections.Generic;

namespace YunZhi.Service.Services.Authorities.Requests.Users
{
    /// <summary>
    /// 保存用户组与用户关联信息请求类
    /// </summary>
    public class SaveUserGroupUserRequest
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        /// <value></value>
        public string UserId { get; set; }
        /// <summary>
        /// 用户组ID列表
        /// </summary>
        /// <value></value>
        public IList<string> UserGroupIds { get; set; }
    }
}
