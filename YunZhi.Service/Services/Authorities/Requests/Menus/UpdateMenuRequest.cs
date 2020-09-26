using System;
using YunZhi.Service.Models;

namespace YunZhi.Service.Services.Authorities.Requests.Menus
{
    public class UpdateMenuRequest
    {
        /// <summary>
        /// ID
        /// </summary>
        /// <value></value>
        public string Id { get; set; }
        /// <summary>
        /// 父级ID
        /// </summary>
        public string ParentId { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 跳转路径
        /// </summary>
        public string Path { get; set; }
        /// <summary>
        /// 排序
        /// </summary>
        public int Sort { get; set; }
        /// <summary>
        /// 状态
        /// </summary>
        public Status Status { get; set; }
        /// <summary>
        /// 是否在数据行操作上的菜单
        ///     类型为菜单专用字段，因为有部分菜单是嵌入数据行里的
        ///     如果该值为true,将不显示在左侧导航菜单和头部导航菜单
        /// </summary>
        public bool IsInside { get; set; }
    }
}
