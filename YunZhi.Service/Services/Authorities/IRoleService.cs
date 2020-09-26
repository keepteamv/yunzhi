using System.Threading.Tasks;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests.Roles;
namespace YunZhi.Service.Services.Authorities
{
    public interface IRoleService
    {
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> InsertAsync(InsertRoleRequest request);
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<string>> UpdateAsync(UpdateRoleRequest request);
        /// <summary>
        /// 读取分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        Task<ApiResult<Page<Role>>> GetPagesAsync(GetRolePagesRequest request);
    }
}