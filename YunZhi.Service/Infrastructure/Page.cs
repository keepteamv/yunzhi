using System.Collections.Generic;

namespace YunZhi.Service.Infrastructure
{
    public class Page<T>
    {
        /// <summary>
        /// 当前页索引
        /// </summary>
        public long CurrentPage { get; set; }
        /// <summary>
        /// 总页数
        /// </summary>
        public long TotalPages { get; set; }
        /// <summary>
        /// 总记录数
        /// </summary>
        public long TotalItems { get; set; }
        /// <summary>
        /// 每页的记录数
        /// </summary>
        public long ItemsPerPage { get; set; }
        /// <summary>
        /// 数据集
        /// </summary>
        public IList<T> Items { get; set; }
    }
}