﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManagement.Domain.DTO;
using UserManagement.Domain.Models;

namespace UserManagement.IRepository.RepositoryInterface
{
    public interface IUserRepository
    {
        Task<string> AddUser(SUser user,SAddress address);
        Task<SUser> UpdateUser(UserDTO user, AddressDTO address);
        Task<string> DeleteUser(int id);
        //Task<SUser> GetUserByID(int id);
        Task<List<SUser>> GetAllUsers();
        Task<bool> Validate(LoginDTO login);
        //Task <bool> ForgotPassword(ForgotPasswordDTO forgotPasswordDTO);
       // Task <bool>GetByEmail(string email);

    }
}
