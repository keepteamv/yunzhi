using System;

namespace YunZhi.Service.Models.Authorities
{
    /// <summary>
    /// 菜单
    /// </summary>
    public class Menu : EntityCore
    {
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
        /// 数据深度
        /// </summary>
        /// <value></value>
        public int Level { get; set; }
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
        protected override void Validate()
        {
            // throw new NotImplementedException();
        }
    }
}
