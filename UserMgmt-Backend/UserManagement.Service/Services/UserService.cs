using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManagement.Domain.DTO;
using UserManagement.Domain.Models;

using UserManagement.IRepository.RepositoryInterface;
using UserManagement.IService.ServiceInterface;
using UserManagement.Service.CommonService;
using UserManagement.Shared.CommonService;

namespace UserManagement.Service.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IConfiguration _config;

        public UserService(IUserRepository repository, IConfiguration configuration) 
        {
            _repository = repository;
            _config = configuration;
        }
        public Task<string> AddUser(UserDTO user)
        {
            var pass = GeneratePassword.GenerateUniquePassword();
            PasswordHashing passwordHashing = new PasswordHashing();
            
                SUser sUser = new SUser();
                SAddress address = new SAddress();

                sUser.FirstName = user.FirstName;
                sUser.MiddleName = user.MiddleName;
                sUser.LastName = user.LastName;
                sUser.Email = EncryptionDecryptionHandler.Encryption(user.Email);
                sUser.Gender = user.Gender;
                sUser.DateOfJoining = user.DateOfJoining;
                sUser.DateOfBirth  = user.DateOfBirth;
                sUser.Phone = EncryptionDecryptionHandler.Encryption(user.Phone);
                sUser.AlternatePhone = EncryptionDecryptionHandler.Encryption(user.AlternatePhone);
            // sUser.Password = passwordHashing.HashedPassword(pass);
            sUser.Password=EncryptionDecryptionHandler.Encryption(GeneratePassword.GenerateUniquePassword());
           
                sUser.ImagePath = user.ImagePath;
               // sUser.CreatedBy = user.LoginUserId;
                address.Address = user.Address;
                address.City = user.City;
                address.Country = user.Country;
                address.State = user.State;
                address.ZipCode = user.ZipCode;


            return _repository.AddUser(sUser, address);

            
           
        }

        public Task<string> DeleteUser(int id)
        {
           return _repository.DeleteUser(id);
        }

        public async Task<List<SUser>> GetAllUsers()
        {
            return await _repository.GetAllUsers();
        }

        //public Task<SUser> GetUserByID(int id)
        //{
        //    return _repository.GetUserByID(id); 
        //}

        public Task<SUser> UpdateUser(UserDTO user,AddressDTO address)
        {
            address.City = user.City;
            address.Country = user.Country;
            address.State = user.State;
            address.ZipCode = user.ZipCode;
            address.UserId = user.UserId;

           return _repository.UpdateUser(user,address); 
        }

        public async Task<bool> Validate(LoginDTO login)
        {
            return await _repository.Validate(login);
        }
    }
}
