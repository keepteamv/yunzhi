using System;
using System.Collections.Generic;
using YunZhi.Service.Models.Authorities;

namespace YunZhi.Service.Services.Authorities.Responses.Operations
{
    public class GetOperationsResponse : Operation
    {
        /// <summary>
        /// LABEL
        /// </summary>
        /// <value></value>
        public string Label { get; set; }
        /// <summary>
        /// Value
        /// </summary>
        /// <value></value>
        public string Value { get; set; }
        /// <summary>
        /// 选中的列表
        /// </summary>
        public IList<string> CheckedList { get; set; }
        /// <summary>
        /// 操作项
        /// </summary>
        public IList<GetOperationsResponse> Children { get; set; }
    }
}
