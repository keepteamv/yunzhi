using System;
using YunZhi.Service.Infrastructure;

namespace YunZhi.Service.Services.Authorities.Requests.Roles
{
    public class GetRolePagesRequest : GetPageRequestBase
    {
        public GetRolePagesRequest(int pageIndex, int pageSize) : base(pageIndex, pageSize)
        {
        }
        /// <summary>
        /// 名称
        /// </summary>
        /// <value></value>
        public string Name { get; set; }
        /// <summary>
        /// 角色组ID
        /// </summary>
        /// <value></value>
        public string RoleGroupId { get; set; }
    }
}
