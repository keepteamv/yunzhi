using System;
using YunZhi.Service.Infrastructure;

namespace YunZhi.Service.Services.Authorities.Requests.Operations
{
    /// <summary>
    /// 读取操作分页数据请求类
    /// </summary>
    public class GetOperationPagesRequest : GetPageRequestBase
    {
        public GetOperationPagesRequest(int pageIndex, int pageSize) : base(pageIndex, pageSize)
        {
        }
        /// <summary>
        /// 名称
        /// </summary>
        /// <value></value>
        public string Name { get; set; }
    }
}
