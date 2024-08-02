using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManagement.Domain.DTO;
using UserManagement.Domain.Models;

namespace UserManagement.IService.ServiceInterface
{
 public  interface IUserService
    {
        Task<string> AddUser(UserDTO user);
        Task<SUser> UpdateUser(UserDTO user,AddressDTO address);
        Task<string> DeleteUser(int id);
       // Task<SUser> GetUserByID(int id);
        Task<List<SUser>> GetAllUsers();
        Task<bool> Validate(LoginDTO login);
    }
}
