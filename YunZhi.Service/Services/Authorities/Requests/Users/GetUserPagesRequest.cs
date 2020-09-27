using YunZhi.Service.Infrastructure;

namespace YunZhi.Service.Services.Authorities.Requests.Users
{
    /// <summary>
    /// 读取用户分页数据
    /// </summary>
    public class GetUserPagesRequest : GetPageRequestBase
    {
        public GetUserPagesRequest(int pageIndex, int pageSize) : base(pageIndex, pageSize)
        {
        }

        /// <summary>
        /// 用户名
        /// </summary>
        public string UserName { get; set; }
        /// <summary>
        /// 用户组Id
        /// </summary>
        public string UserGroupId { get; set; }
        /// <summary>
        /// 角色组ID
        /// </summary>
        /// <value></value>
        public string RoleGroupId { get; set; }
    }
}