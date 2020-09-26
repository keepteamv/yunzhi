using System.Collections.Generic;
using System;
using Newtonsoft.Json;

namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 操作
    /// </summary>
    public class Operation : EntityCore
    {
        /// <summary>
        /// 操作组ID
        /// </summary>
        /// <value></value>
        public string OperationGroupId { get; set; }
        /// <summary>
        /// 操作组
        /// </summary>
        /// <value></value>
        public virtual OperationGroup OperationGroup { get; set; }
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
        protected override void Validate()
        {
            // throw new NotImplementedException();
        }
    }
}
