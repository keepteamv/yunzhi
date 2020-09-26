using System;

namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 用户与角色关联
    /// </summary>
    public class UserRole : EntityCore
    {
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
