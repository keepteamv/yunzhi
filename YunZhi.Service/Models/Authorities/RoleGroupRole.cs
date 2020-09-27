using System;

namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 角色组与角色关联
    /// </summary>
    public class RoleGroupRole : EntityCore
    {
        /// <summary>
        /// 角色组ID
        /// </summary>
        /// <value></value>
        public string RoleGroupId { get; set; }
        /// <summary>
        /// 角色组
        /// </summary>
        /// <value></value>
        public virtual RoleGroup RoleGroup { get; set; }
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
        protected override void Validate()
        {
            // throw new NotImplementedException();
        }
    }
}
