using System;
using YunZhi.Service.Infrastructure;

namespace YunZhi.Service.Services.Authorities.Requests.Menus
{
    /// <summary>
    /// 读取菜单分页数据请求类
    /// </summary>
    public class GetMenuPagesRequest : GetPageRequestBase
    {
        public GetMenuPagesRequest(int pageIndex, int pageSize) : base(pageIndex, pageSize)
        {
        }
        /// <summary>
        /// 名称
        /// </summary>
        /// <value></value>
        public string Name { get; set; }
    }
}
