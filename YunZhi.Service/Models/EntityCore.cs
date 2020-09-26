using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PanasonicInspect.Service.Models
{
    public abstract class EntityCore
    {
        /// <summary>
        /// 聚合根ID
        /// </summary>
        [Required]
        [Key]
        public int Id { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        [Required]
        public DateTime CreatedOn { get; set; }
        /// <summary>
        /// 更新时间
        /// </summary>
        [Required]
        public DateTime UpdatedOn { get; set; }
        
        private readonly List<BusinessRule> _brokenRules = new List<BusinessRule>();
        protected abstract void Validate();
        public IEnumerable<BusinessRule> GetBrokenRules()
        {
            _brokenRules.Clear();
            Validate();
            return _brokenRules;
        }
        protected void AddBrokenRule(BusinessRule businessRule)
        {
            _brokenRules.Add(businessRule);
        }

        public override bool Equals(object entity)
        {
            return entity is EntityCore entityCore && this == entityCore;
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }

        public static bool operator ==(EntityCore entity1,
            EntityCore entity2)
        {
            if ((object)entity1 == null && (object)entity2 == null)
            {
                return true;
            }
            if ((object)entity1 == null || (object)entity2 == null)
            {
                return false;
            }
            return entity1.Id.ToString() == entity2.Id.ToString();
        }

        public static bool operator !=(EntityCore entity1,
            EntityCore entity2)
        {
            return (!(entity1 == entity2));
        }
    }
    public class BusinessRule
    {
        public BusinessRule(string property, string rule)
        {
            Property = property;
            Rule = rule;
        }
        public string Property { get; set; }
        public string Rule { get; set; }
    }
}