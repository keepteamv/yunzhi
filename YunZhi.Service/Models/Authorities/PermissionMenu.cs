using System;

namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 权限与菜单关联
    /// </summary>
    public class PermissionMenu : EntityCore
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
        /// 菜单ID
        /// </summary>
        /// <value></value>
        public string MenuId { get; set; }
        /// <summary>
        /// 菜单组
        /// </summary>
        /// <value></value>
        public virtual Menu Menu { get; set; }
        protected override void Validate()
        {
            // throw new NotImplementedException();
        }
    }
}
