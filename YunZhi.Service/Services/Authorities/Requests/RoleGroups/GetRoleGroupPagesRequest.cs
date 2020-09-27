using System;
using YunZhi.Service.Infrastructure;

namespace YunZhi.Service.Services.Authorities.Requests.RoleGroups
{
    public class GetRoleGroupPagesRequest : GetPageRequestBase
    {
        public GetRoleGroupPagesRequest(int pageIndex, int pageSize) : base(pageIndex, pageSize)
        {
        }
        /// <summary>
        /// 名称
        /// </summary>
        /// <value></value>
        public string Name { get; set; }
    }
}
