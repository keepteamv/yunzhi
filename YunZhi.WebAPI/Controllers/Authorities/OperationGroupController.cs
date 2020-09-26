using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities;
using YunZhi.Service.Services.Authorities.Requests.OperationGroups;

namespace YunZhi.WebAPI.Controllers.Authorities
{
    public class OperationGroupController : YunZhiControllerBase
    {
        private readonly IOperationGroupService _operationGroupService;
        public OperationGroupController(IOperationGroupService operationGroupService)
        {
            _operationGroupService = operationGroupService;
        }
        /// <summary>
        /// 查询分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("getPages")]
        [Permission("webapi.getpages.operationgroup")]
        public async Task<ApiResult<Page<OperationGroup>>> GetPages([FromBody] GetOperationGroupPagesRequest request)
        {
            return await _operationGroupService.GetPagesAsync(request);
        }
        /// <summary>
        /// 查询分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpGet("getList")]
        [Permission("webapi.getlist.operationgroup")]
        public async Task<ApiResult<IList<OperationGroup>>> GetList()
        {
            return await _operationGroupService.GetListAsync();
        }
        /// <summary>
        /// 创建
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("create")]
        [Permission("webapi.create.operationgroup")]
        public async Task<ApiResult<string>> Create([FromBody] InsertOperationGroupRequest request)
        {
            return await _operationGroupService.InsertAsync(request);
        }
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("update")]
        [Permission("webapi.update.operationgroup")]
        public async Task<ApiResult<string>> Update([FromBody] UpdateOperationGroupRequest request)
        {
            return await _operationGroupService.UpdateAsync(request);
        }
    }
}