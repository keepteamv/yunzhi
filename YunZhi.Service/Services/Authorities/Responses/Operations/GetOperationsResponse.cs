using System;
using System.Collections.Generic;
using YunZhi.Service.Models.Authorities;

namespace YunZhi.Service.Services.Authorities.Responses.Operations
{
    public class GetOperationsResponse : Operation
    {
        /// <summary>
        /// 是否选中
        /// </summary>
        public bool Checked { get; set; }
        /// <summary>
        /// 操作项
        /// </summary>
        public IList<GetOperationsResponse> Children { get; set; }
    }
}
