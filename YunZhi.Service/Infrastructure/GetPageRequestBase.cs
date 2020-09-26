namespace PanasonicInspect.Service.Infrastructure
{
    /// <summary>
    /// 读取分页列表请求基类
    ///     所有读取分页列表的请求类需要继续此基类
    /// </summary>
    public class GetPageRequestBase
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="pageIndex">页码</param>
        /// <param name="pageSize">页数据量</param>
        public GetPageRequestBase(int pageIndex,int pageSize)
        {
            PageIndex = pageIndex <= 0 ? 1 : pageIndex;
            PageSize = pageSize <= 0 ? 20 : pageSize;
        }

        /// <summary>
        /// 页码
        /// </summary>
        public int PageIndex { get; private set; } = 1;
        /// <summary>
        /// 每页的记录数
        /// </summary>
        public int PageSize { get; private set; } = 20;
    }
}