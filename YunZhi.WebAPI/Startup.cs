using System;
using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using YunZhi.Service.Infrastructure;
using YunZhi.Service.Infrastructure.Configs;
using YunZhi.Service.Infrastructure.Services;
using YunZhi.Service.Models;
using YunZhi.WebAPI.Extensions;

namespace YunZhi.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            #region RedisConfig
            // 读取环境变量的配置信息
            var redisConfig = Environment.GetEnvironmentVariable("REDISCONFIG");
            if (string.IsNullOrEmpty(redisConfig))
            {
                ConfigSettings.RedisConfig = new RedisConfig()
                {
                    Address = Configuration.GetSection("RedisConfig")["Address"],
                    Password = Configuration.GetSection("RedisConfig")["Password"],
                    Port = Configuration.GetSection("RedisConfig")["Port"]
                };
            }
            else
            {
                ConfigSettings.RedisConfig = new RedisConfig()
                {
                    Address = redisConfig.Split(':')[0],
                    Password = redisConfig.Split(':')[1],
                    Port = redisConfig.Split(':')[2],
                };
            }
            #endregion
            #region Mysql DbContext config
            var connectionString = Environment.GetEnvironmentVariable("MYSQL_CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
            {
                connectionString = Configuration.GetConnectionString("data");
                // connectionString = "data source=47.107.168.17;database=yunzhi_data;uid=root;pwd=@123123qq;charset=utf8mb4;";
            }
            services.AddDbContext<YunZhiDbContext>(opt =>
                opt.UseMySql(connectionString, p => p.MigrationsAssembly("YunZhi.WebAPI")));
            #endregion
            // 添加Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API Demo", Version = "v1" });
            });
            services.AddControllers()
                .AddNewtonsoftJson(options =>
                    {
                        //修改属性名称的序列化方式，首字母小写
                        options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                        //修改时间的序列化方式
                        options.SerializerSettings.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "yyyy-MM-dd HH:mm:ss" });
                    }
                );

            services.Configure<TokenManagement>(Configuration.GetSection("tokenManagement"));
            var token = Configuration.GetSection("tokenManagement").Get<TokenManagement>();
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(token.Secret)),
                    ValidIssuer = token.Issuer,
                    ValidAudience = token.Audience,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            #region CORS
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins("http://localhost:8080")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        //.AllowAnyOrigin()
                        .AllowCredentials();
                });
            });
            #endregion

            // 注册Redis
            services.AddScoped<RedisService, RedisService>();

            // 注册业务组件
            services.RegisterBusinessComponents(new[]{
                Assembly.GetExecutingAssembly(),
                Assembly.Load("YunZhi.Service")
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            // 添加Swagger有关中间件
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API Demo v1");
            });
            app.UseStaticFiles();
            app.UseErrorHandling();
            app.UseAuthentication();
            app.UseRouting();
            app.UseCors();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
