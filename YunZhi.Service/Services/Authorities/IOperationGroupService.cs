using System.Collections.Generic;
using System.Threading.Tasks;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests.OperationGroups;
namespace YunZhi.Service.Services.Authorities
{
    public interface IOperationGroupService
    {
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> InsertAsync(InsertOperationGroupRequest request);
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> UpdateAsync(UpdateOperationGroupRequest request);
        /// <summary>
        /// 读取分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<Page<OperationGroup>>> GetPagesAsync(GetOperationGroupPagesRequest request);
        /// <summary>
        /// 读取数据列表
        /// </summary>
        /// <returns></returns>
        Task<ApiResult<IList<OperationGroup>>> GetListAsync();
    }
}