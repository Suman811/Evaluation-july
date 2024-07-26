using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManagement.Domain.DTO;
using UserManagement.IService.ServiceInterface;

namespace UserManagement.Service.Services
{
   public class JWTService : IJWTService
    {
        private readonly IConfiguration _config;
        public JWTService(IConfiguration configuration)
        {
           _config=configuration;
        }


        public string GenerateToken(LoginDTO login)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], null,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
