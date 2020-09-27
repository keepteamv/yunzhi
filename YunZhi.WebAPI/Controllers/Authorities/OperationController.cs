using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Attributes;
using YunZhi.Service.Models.Authorities;
using YunZhi.Service.Services.Authorities;
using YunZhi.Service.Services.Authorities.Requests;
using YunZhi.Service.Services.Authorities.Requests.Operations;
using YunZhi.Service.Services.Authorities.Responses.Operations;

namespace YunZhi.WebAPI.Controllers.Authorities
{
    /// <summary>
    /// 控制器
    /// </summary>
    public class OperationController : YunZhiControllerBase
    {
        private readonly IOperationService _operationService;
        public OperationController(IOperationService operationService)
        {
            _operationService = operationService;
        }
        /// <summary>
        /// 查询分页数据
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("getPages")]
        [Permission("authority.getpages.operation")]
        public async Task<ApiResult<Page<Operation>>> GetPages([FromBody] GetOperationPagesRequest request)
        {
            return await _operationService.GetPagesAsync(request);
        }

        /// <summary>
        /// 查询数据
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        [HttpGet("getList")]
        [Permission("authority.getlist.operation")]
        public async Task<ApiResult<IList<GetOperationsResponse>>> GetList(string roleId)
        {
            return await _operationService.GetListAsync(roleId);
        }
        /// <summary>
        /// 根据用户Id读取操作列表
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("getOperationnCodes")]
        [Permission("authority.getoperationcodes.operation")]
        public async Task<ApiResult<IList<string>>> GetOperationnCodes()
        {
            return await _operationService.GetOperationnCodesByUserIdAsync(UserId);
        }
        /// <summary>
        /// 创建
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("create")]
        [Permission("authority.create.operation")]
        public async Task<ApiResult<string>> Create([FromBody] InsertOperationRequest request)
        {
            return await _operationService.InsertAsync(request);
        }
        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("update")]
        [Permission("authority.update.operation")]
        public async Task<ApiResult<string>> Update([FromBody] UpdateOperationRequest request)
        {
            return await _operationService.UpdateAsync(request);
        }
    }
}