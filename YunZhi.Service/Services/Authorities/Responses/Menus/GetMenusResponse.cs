using System;
using System.Collections.Generic;
using YunZhi.Service.Models.Authorities;

namespace YunZhi.Service.Services.Authorities.Responses.Menus
{
    public class GetMenusResponse : Menu
    {
        /// <summary>
        /// KEY
        /// </summary>
        /// <value></value>
        public string Key { get; set; }
        /// <summary>
        /// 标题
        /// </summary>
        /// <value></value>
        public string Title { get; set; }
        /// <summary>
        /// 子级
        /// </summary>
        /// <value></value>
        public IList<GetMenusResponse> Children { get; set; }
    }
}
