using System;
using YunZhi.Service.Models;

namespace YunZhi.Service.Services.Authorities.Requests.OperationGroups
{
    public class InsertOperationGroupRequest
    {
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 排序字段
        /// </summary>
        /// <value></value>
        public int Sort { get; set; }
    }
}
