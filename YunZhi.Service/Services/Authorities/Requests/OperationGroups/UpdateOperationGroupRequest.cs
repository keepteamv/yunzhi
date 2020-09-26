using System;
using YunZhi.Service.Models;

namespace YunZhi.Service.Services.Authorities.Requests.OperationGroups
{
    public class UpdateOperationGroupRequest
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
    }
}
