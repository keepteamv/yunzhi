using System;

namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 用户组
    /// </summary>
    public class UserGroup : EntityCore
    {
        /// <summary>
        /// 名称
        /// </summary>
        /// <value></value>
        public string Name { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        /// <value></value>
        public string Remarks { get; set; }
        /// <summary>
        /// 状态
        /// </summary>
        /// <value></value>
        public Status Status { get; set; }

        protected override void Validate()
        {
            // throw new NotImplementedException();
        }
    }
}
