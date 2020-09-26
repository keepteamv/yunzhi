using System;

namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 权限与操作关联
    /// </summary>
    public class PermissionOperation : EntityCore
    {
        /// <summary>
        /// 权限ID
        /// </summary>
        /// <value></value>
        public string PermissionId { get; set; }
        /// <summary>
        /// 权限
        /// </summary>
        /// <value></value>
        public virtual Permission Permission { get; set; }
        /// <summary>
        /// 操作ID
        /// </summary>
        /// <value></value>
        public string OperationId { get; set; }
        /// <summary>
        /// 操作组
        /// </summary>
        /// <value></value>
        public virtual Operation Operation { get; set; }
        protected override void Validate()
        {
            // throw new NotImplementedException();
        }
    }
}
