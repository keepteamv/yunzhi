using System;

namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 角色与权限关联
    /// </summary>
    public class RolePermission : EntityCore
    {
        /// <summary>
        /// 角色ID
        /// </summary>
        /// <value></value>
        public string RoleId { get; set; }
        /// <summary>
        /// 角色
        /// </summary>
        /// <value></value>
        public virtual Role Role { get; set; }
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

        protected override void Validate()
        {
            // throw new NotImplementedException();
        }
    }
}
