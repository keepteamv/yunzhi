using System;

namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 角色组与用户关联
    /// </summary>
    public class RoleGroupUser : EntityCore
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
        /// 用户ID
        /// </summary>
        /// <value></value>
        public string UserId { get; set; }
        /// <summary>
        /// 用户
        /// </summary>
        /// <value></value>
        public virtual User User { get; set; }

        protected override void Validate()
        {
            throw new NotImplementedException();
        }
    }
}
