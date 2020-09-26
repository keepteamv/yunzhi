using System;

namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 用户组与角色关联
    /// </summary>
    public class UserGroupRole : EntityCore
    {
        /// <summary>
        /// 用户组ID
        /// </summary>
        /// <value></value>
        public string UserGroupId { get; set; }
        /// <summary>
        /// 用户组
        /// </summary>
        /// <value></value>
        public virtual UserGroup UserGroup { get; set; }
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
