using System;
using YunZhi.Service.Models;

namespace YunZhi.Service.Services.Authorities.Requests.RoleGroups
{
    public class UpdateRoleGroupRequest
    {
        /// <summary>
        /// ID
        /// </summary>
        /// <value></value>
        public string Id { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Remarks { get; set; }
        /// <summary>
        /// 状态
        /// </summary>
        public Status Status { get; set; }
    }
}
