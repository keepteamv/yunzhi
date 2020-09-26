using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Models;

namespace YunZhi.Service.Services
{
    /// <summary>
    /// 基类
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class QueryServiceBase<T> where T : EntityCore
    {
        private readonly DbSet<T> _entities;
        private readonly DbContext _context;

        protected QueryServiceBase(DbContext context)
        {
            _entities = context.Set<T>();
            _context = context;
        }
        /// <summary>
        /// 查询对象
        /// </summary>
        /// <returns></returns>
        public IQueryable<TEntity> Query<TEntity>() where TEntity : EntityCore
        {
            return _context.Set<TEntity>().AsTracking();
        }
        /// <summary>
        /// 查询对象不跟踪
        /// </summary>
        /// <returns></returns>
        public IQueryable<TEntity> QueryNoTracking<TEntity>() where TEntity : EntityCore
        {
            return _context.Set<TEntity>().AsNoTracking();
        }
        /// <summary>
        /// 查询对象
        /// </summary>
        /// <returns></returns>
        public IQueryable<T> Query()
        {
            return _entities.AsTracking();
        }
        /// <summary>
        /// 查询对象不跟踪
        /// </summary>
        /// <returns></returns>
        public IQueryable<T> QueryNoTracking()
        {
            return _entities.AsNoTracking();
        }

        /// <summary>
        /// [异步]查询服务结果
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="func">需要执行的方法</param>
        /// <param name="onError">发生错误时触发的方法</param>
        /// <returns></returns>
        protected async Task<ApiResult<TResult>> QueryResultAsync<TResult>(Func<IQueryable<T>, Task<ApiResult<TResult>>> func, Action<string> onError = null) where TResult : class
        {
            var rsp = new ApiResult<TResult>();
            try
            {
                var result = await func(QueryNoTracking());
                rsp.StatusCode = result.StatusCode; // 状态码
                rsp.Message = result.Message; // 信息
                rsp.Success = result.Success; // 是否成功
                rsp.Data = result.Data; // 数据集
            }
            catch (Exception ex)
            {
                rsp.StatusCode = 500;
                rsp.Message = ex.Message;
                onError?.Invoke(JsonConvert.SerializeObject(ex.InnerException));
            }

            return rsp;
        }
        /// <summary>
        /// 查询服务结果
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="func">需要执行的方法</param>
        /// <param name="onError">发生错误时触发的方法</param>
        /// <returns></returns>
        protected ApiResult<TResult> QueryResult<TResult>(Func<IQueryable<T>, ApiResult<TResult>> func, Action<string> onError = null) where TResult : class
        {
            var rsp = new ApiResult<TResult>();
            try
            {
                var result = func(QueryNoTracking());
                rsp.StatusCode = result.StatusCode;// 状态码
                rsp.Message = result.Message; // 信息
                rsp.Success = result.Success; // 是否成功
                rsp.Data = result.Data; // 数据集
            }
            catch (Exception ex)
            {
                rsp.StatusCode = 500;
                rsp.Message = ex.Message;
                onError?.Invoke(JsonConvert.SerializeObject(ex.InnerException));
            }
            return rsp;
        }


        /// <summary>
        /// [异步]执行结果
        /// </summary>
        /// <param name="func"></param>
        /// <param name="onError"></param>
        /// <typeparam name="TResult"></typeparam>
        /// <returns></returns>
        protected async Task<ApiResult<TResult>> ExecuteResultAsync<TResult>(Func<IQueryable<T>, Task<ApiResult<TResult>>> func, Action<string> onError = null) where TResult : class
        {
            var rsp = new ApiResult<TResult>();
            try
            {
                var result = await func(Query());
                rsp.StatusCode = result.StatusCode; // 状态码
                rsp.Message = result.Message; // 信息
                rsp.Success = result.Success; // 是否成功
                rsp.Data = result.Data; // 数据集
            }
            catch (Exception ex)
            {
                rsp.StatusCode = 500;
                rsp.Message = ex.Message;
                onError?.Invoke(JsonConvert.SerializeObject(ex.InnerException));
            }
            return rsp;
        }
        /// <summary>
        /// 执行结果
        /// </summary>
        /// <typeparam name="TResult"></typeparam>
        /// <param name="func">需要执行的方法</param>
        /// <param name="onError">发生错误时触发的方法</param>
        /// <returns></returns>
        protected ApiResult<TResult> ExecuteResult<TResult>(Func<IQueryable<T>, ApiResult<TResult>> func, Action<string> onError = null) where TResult : class
        {
            var rsp = new ApiResult<TResult>();
            try
            {
                var result = func(Query());
                rsp.StatusCode = result.StatusCode;// 状态码
                rsp.Message = result.Message; // 信息
                rsp.Success = result.Success; // 是否成功
                rsp.Data = result.Data; // 数据集
            }
            catch (Exception ex)
            {
                rsp.StatusCode = 500;
                rsp.Message = ex.Message;
                onError?.Invoke(JsonConvert.SerializeObject(ex.InnerException));
            }
            return rsp;
        }
    }
}