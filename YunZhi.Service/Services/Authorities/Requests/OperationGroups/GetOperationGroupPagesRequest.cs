using System;
using YunZhi.Service.Infrastructure;

namespace YunZhi.Service.Services.Authorities.Requests.OperationGroups
{
    public class GetOperationGroupPagesRequest : GetPageRequestBase
    {
        public GetOperationGroupPagesRequest(int pageIndex, int pageSize) : base(pageIndex, pageSize)
        {
        }
        /// <summary>
        /// 名称
        /// </summary>
        /// <value></value>
        public string Name { get; set; }
    }
}
