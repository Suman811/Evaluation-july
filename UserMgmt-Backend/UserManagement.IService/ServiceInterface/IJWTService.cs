using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManagement.Domain.DTO;

namespace UserManagement.IService.ServiceInterface
{
    public interface IJWTService
    {
        public string GenerateToken(LoginDTO login);
    }
}
