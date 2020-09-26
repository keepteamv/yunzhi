using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace YunZhi.Service.Infrastructure.Extensions
{
    public static class QueryableExtension
    {
        /// <summary>
        /// 读取分页数据结果
        /// </summary>
        /// <param name="result">结果集</param>
        /// <param name="rsp">响应类</param>
        /// <param name="func"></param>
        /// <typeparam name="TEntity">实体</typeparam>
        /// <typeparam name="TView">DTO</typeparam>
        /// <returns></returns>
        public static ApiResult<Page<TView>> GetPagesResult<TEntity, TView>(this Page<TEntity> result, ApiResult<Page<TView>> rsp, Func<TEntity, TView> func)
        {
            if (result.Items == null || result.Items.Count == 0)
            {
                rsp.Message = "暂无数据.";
                return rsp;
            }
            var data = result.ToViewPage(func);
            rsp.Success = true;
            rsp.Message = "读取成功.";
            rsp.Data = data;
            return rsp;
        }

        public static IQueryable<TSource> HasWhere<TSource>(this IQueryable<TSource> query, object target,
            Expression<Func<TSource, bool>> whExpression)
        {
            if (target != null && !string.IsNullOrEmpty(target.ToString()))
            {

                query = query.Where(whExpression);
            }
            return query;
        }
        public static IQueryable<TSource> HasWhere<TSource>(this IQueryable<TSource> query, object target1, object target2,
            Expression<Func<TSource, bool>> whExpression)
        {
            if (target1 != null && target2 != null)
            {
                query = query.Where(whExpression);
            }
            return query;
        }

        /// <summary>
        /// 读取列表
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="isOrderBy"></param>
        /// <returns></returns>
        public static Page<T> ToPage<T>(this IQueryable<T> query,
            int pageIndex,
            int pageSize,
            bool isOrderBy = false)
        {
            var page = new Page<T>();
            var totalItems = query.Count();
            var totalPages = (totalItems % pageSize) == 0 ? (totalItems / pageSize) : (totalItems / pageSize) + 1;
            page.CurrentPage = pageIndex;
            page.ItemsPerPage = pageSize;
            page.TotalItems = totalItems;
            page.TotalPages = totalPages;
            page.Items = query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToList();
            return page;
        }

        /// <summary>
        /// 读取列表
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="query"></param>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="isOrderBy"></param>
        /// <returns></returns>
        public static async Task<Page<T>> ToPageAsync<T>(this IQueryable<T> query,
            int pageIndex,
            int pageSize,
            bool isOrderBy = false)
        {
            var page = new Page<T>();
            var totalItems = await query.CountAsync();
            var totalPages = totalItems != 0 ? (totalItems % pageSize) == 0 ? (totalItems / pageSize) : (totalItems / pageSize) + 1 : 0;
            page.CurrentPage = pageIndex;
            page.ItemsPerPage = pageSize;
            page.TotalItems = totalItems;
            page.TotalPages = totalPages;
            page.Items = totalItems == 0 ? new List<T>() : await query.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return page;
        }

        /// <summary>
        /// 转化Page
        /// </summary>
        /// <typeparam name="TEntity">转化前</typeparam>
        /// <typeparam name="TView">转化后</typeparam>
        /// <param name="page"></param>
        /// <returns></returns>
        public static Page<TView> ToViewPage<TEntity, TView>(this Page<TEntity> page, Func<TEntity, TView> func)
        {
            var view = new Page<TView>
            {
                CurrentPage = page.CurrentPage,
                ItemsPerPage = page.ItemsPerPage,
                TotalItems = page.TotalItems,
                TotalPages = page.TotalPages,
                Items = null
            };
            if (page.Items != null && page.Items.Count > 0)
            {
                view.Items = page.Items.Select(func).ToList();
            }
            return view;
        }
    }
}