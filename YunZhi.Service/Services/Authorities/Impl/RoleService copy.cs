using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Infrastructure.Extensions;
using YunZhi.Service.Models;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities.Requests.Roles;

namespace YunZhi.Service.Services.Authorities.Impl
{
    [Component]
    public class RoleService : ServiceBase<Role>, IRoleService
    {
        public RoleService(YunZhiDbContext context) : base(context)
        {
        }
        /// <summary>
        /// 新增
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<string>> InsertAsync(InsertRoleRequest request)
        {
            return await ExecuteResultAsync(async query =>
            {
                var rsp = new ApiResult<string>();
                var entity = new Role
                {
                    Name = request.Name,
                    Status = request.Status,
                    Remarks = request.Remarks
                };
                // 新增
                await RegisterNewAsync(entity);
                // 提交
                var flag = await CommitAsync();

                rsp.Message = flag ? "新增成功" : "新增失败";
                rsp.Success = flag;
                rsp.Data = entity.Id;
                return rsp;
            });
        }
        /// <summary>
        /// 修改用户信息
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<string>> UpdateAsync(UpdateRoleRequest request)
        {
            return await ExecuteResultAsync(async query =>
            {
                var rsp = new ApiResult<string>();
                var entity = await query.FirstOrDefaultAsync(p => p.Id == request.Id);
                if (entity == null)
                {
                    rsp.Message = "找不到要修改的信息.";
                    return rsp;
                }

                entity.Name = request.Name;
                entity.Remarks = request.Remarks;
                entity.Status = request.Status;
                // 修改
                RegisterDirty(entity);
                // 提交
                var flag = await CommitAsync();

                rsp.Message = flag ? "更新成功" : "更新失败";
                rsp.Success = flag;
                rsp.Data = entity.Id;
                return rsp;
            });
        }

        /// <summary>
        /// 读取分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task<ApiResult<Page<Role>>> GetPagesAsync(GetRolePagesRequest request)
        {
            return await QueryResultAsync(async query =>
            {
                var rsp = new ApiResult<Page<Role>>();

                var result = await query
                    .HasWhere(request.Name, p => p.Name.Contains(request.Name))
                    .ToPageAsync(request.PageIndex, request.PageSize);
                if (result.Items.Count == 0)
                {
                    rsp.Message = "暂无数据.";
                    return rsp;
                }
                rsp.Message = "读取成功.";
                rsp.Data = result;
                rsp.Success = true;
                return rsp;
            });
        }
    }
}