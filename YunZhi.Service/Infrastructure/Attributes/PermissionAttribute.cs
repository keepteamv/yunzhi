using System;

namespace YunZhi.Service.Infrastructure.Attributes
{
    /// <summary>
    /// 权限标记
    /// </summary>
    public class PermissionAttribute : Attribute
    {
        public PermissionAttribute(params string[] permissions)
        {
            Permissions = permissions;
        }
        public string[] Permissions { get; set; }
    }
}
