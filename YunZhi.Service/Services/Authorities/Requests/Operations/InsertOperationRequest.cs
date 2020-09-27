using System;
using YunZhi.Service.Models;

namespace YunZhi.Service.Services.Authorities.Requests.Operations
{
    public class InsertOperationRequest
    {
        /// <summary>
        /// 操作组ID
        /// </summary>
        /// <value></value>
        public string OperationGroupId { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        /// <value></value>
        public string Name { get; set; }
        /// <summary>
        /// 操作编码
        /// </summary>
        /// <value></value>
        public string Code { get; set; }
        /// <summary>
        /// 提示
        /// </summary>
        /// <value></value>
        public string Tips { get; set; }
        /// <summary>
        /// 排序字段
        /// </summary>
        /// <value></value>
        public int Sort { get; set; }
    }
}
