using System;

namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 权限
    /// </summary>
    public class Permission : EntityCore
    {
        /// <summary>
        /// 权限类型
        /// </summary>
        /// <value></value>
        public PermissionType PermissionType { get; set; }
        protected override void Validate()
        {
            // throw new NotImplementedException();
        }
    }
}
