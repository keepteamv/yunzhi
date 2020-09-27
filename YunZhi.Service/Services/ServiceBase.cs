using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using YunZhi.Service.Models;

namespace YunZhi.Service.Services
{
    public class ServiceBase<T> : QueryServiceBase<T> where T : EntityCore
    {
        private readonly DbContext _context;

        protected ServiceBase(DbContext context) : base(context)
        {
            _context = context;
        }
        protected void RegisterNew<TEntity>(TEntity entity)
             where TEntity : EntityCore
        {
            ThrowExceptionIfEntityIsInvalid(entity);
            _context.Set<TEntity>().Add(entity);
        }
        protected async Task RegisterNewAsync<TEntity>(TEntity entity)
        where TEntity : EntityCore
        {
            ThrowExceptionIfEntityIsInvalid(entity);
            entity.CreatedOn = DateTime.Now;
            entity.UpdatedOn = DateTime.Now;
            await _context.Set<TEntity>().AddAsync(entity);
        }
        protected void RegisterNewRange<TEntity>(IList<TEntity> entities) where TEntity : EntityCore
        {
            if (entities == null || !entities.Any())
                throw new ArgumentNullException(nameof(entities));
            foreach (var entity in entities)
            {
                entity.CreatedOn = DateTime.Now;
                entity.UpdatedOn = DateTime.Now;
                ThrowExceptionIfEntityIsInvalid(entity);
            }
            _context.Set<TEntity>().AddRange(entities);
        }

        protected async Task RegisterNewRangeAsync<TEntity>(IList<TEntity> entities) where TEntity : EntityCore
        {
            if (entities == null || !entities.Any())
                throw new ArgumentNullException(nameof(entities));
            foreach (var entity in entities)
            {
                entity.CreatedOn = DateTime.Now;
                entity.UpdatedOn = DateTime.Now;
                ThrowExceptionIfEntityIsInvalid(entity);
            }
            await _context.Set<TEntity>().AddRangeAsync(entities);
        }
        protected void RegisterDirty<TEntity>(TEntity entity)
            where TEntity : EntityCore
        {
            ThrowExceptionIfEntityIsInvalid(entity);
            var entry = _context.Entry(entity);
            entry.State = EntityState.Modified;
            entity.UpdatedOn = DateTime.Now;
        }
        protected void RegisterClean<TEntity>(TEntity entity)
            where TEntity : EntityCore
        {
            var entry = _context.Entry(entity);
            entry.State = EntityState.Unchanged;
        }

        protected void RegisterDeleted<TEntity>(TEntity entity)
            where TEntity : EntityCore
        {
            _context.Set<TEntity>().Remove(entity);
        }
        protected void RegisterDeleteRange<TEntity>(IList<TEntity> entities)
            where TEntity : EntityCore
        {
            _context.Set<TEntity>().RemoveRange(entities);
        }

        protected async Task<bool> CommitAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        protected bool Commit()
        {
            return _context.SaveChanges() > 0;
        }
        /// <summary>
        /// 验证数据的正确性
        /// </summary>
        /// <param name="entity">实体</param>
        private static void ThrowExceptionIfEntityIsInvalid<TEntity>(TEntity entity) where TEntity : EntityCore
        {
            if (entity == null)
                throw new ArgumentNullException(nameof(entity));
            if (!entity.GetBrokenRules().Any()) return;
            var brokenRules = new StringBuilder();
            brokenRules.AppendLine("数据验证不通过，错误信息：");
            foreach (var businessRule in entity.GetBrokenRules())
            {
                brokenRules.AppendLine(businessRule.Rule);
            }
            throw new Exception(brokenRules.ToString());
        }
    }
}