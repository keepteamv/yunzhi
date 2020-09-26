namespace YunZhi.Service.Services.Authorities.Requests.Users
{
    public class InsertUserRequest
    {
        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// 真实姓名
        /// </summary>
        public string RealName { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }
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
    }
}