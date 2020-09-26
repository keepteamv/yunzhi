using System;

namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 用户组与用户关联
    /// </summary>
    public class UserGroupUser : EntityCore
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
            // throw new NotImplementedException();
        }
    }
}
