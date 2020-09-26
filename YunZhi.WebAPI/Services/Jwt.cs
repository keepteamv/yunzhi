using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using PanasonicInspect.Service.Services.Authorities.Responses;

namespace PanasonicInspect.Services
{
    public class Jwt
    {
        /// <summary>
        /// 创建JWT并生成token
        /// </summary>
        /// <param name="config">配置文件</param>
        /// <param name="user">用户信息</param>
        /// <returns></returns>
        public static string Create(TokenManagement config, LoginResponse user)
        {
            // push the user’s name into a claim, so we can identify the user later on.
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())
            };
            //sign the token using a secret key.This secret will be shared between your API and anything that needs to check that the token is legit.
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.Secret));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            //.NET Core’s JwtSecurityToken class takes on the heavy lifting and actually creates the token.
            var issuer = config.Issuer;
            var audience = config.Audience;

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddSeconds(config.AccessExpiration),
                signingCredentials: creds);


            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
