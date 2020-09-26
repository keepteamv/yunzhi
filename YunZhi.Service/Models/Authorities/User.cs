namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 用户
    /// </summary>
    public class User : EntityCore
    {
        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }
        /// <summary>
        /// 真实姓名
        /// </summary>
        public string RealName { get; set; }
        /// <summary>
        /// 手机号
        /// </summary>
        public string PhoneNumber { get; set; }
        /// <summary>
        /// Email
        /// </summary>
        /// <value></value>
        public string Email { get; set; }
        /// <summary>
        /// 头像
        /// </summary>
        /// <value></value>
        public string AvatarUrl { get; set; }

        protected override void Validate()
        {
            if (string.IsNullOrEmpty(UserName))
            {
                AddBrokenRule(new BusinessRule(nameof(UserName), "用户名不能为空!"));
            }
            if (string.IsNullOrEmpty(Password))
            {
                AddBrokenRule(new BusinessRule(nameof(Password), "密码不能为空!"));
            }
        }
    }
}