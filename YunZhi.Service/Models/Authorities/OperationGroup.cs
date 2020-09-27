using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 操作组
    /// </summary>
    public class OperationGroup : EntityCore
    {
        /// <summary>
        /// 名称
        /// </summary>
        /// <value></value>
        public string Name { get; set; }
        /// <summary>
        /// 排序字段
        /// </summary>
        /// <value></value>
        public int Sort { get; set; }
        /// <summary>
        /// 操作菜单
        /// </summary>
        /// <value></value>
        [JsonIgnore]
        public virtual ICollection<Operation> Operations { get; set; }
        protected override void Validate()
        {
            // throw new NotImplementedException();
        }
    }
}
