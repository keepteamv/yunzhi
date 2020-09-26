using System.Collections;
using System;
using System.Collections.Generic;

namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 角色
    /// </summary>
    public class Role : EntityCore
    {
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Remarks { get; set; }
        /// <summary>
        /// 状态
        /// </summary>
        public Status Status { get; set; }
        protected override void Validate()
        {
            // throw new NotImplementedException();
        }
    }
}
