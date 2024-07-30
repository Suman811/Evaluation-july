using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UserManagement.Domain.DTO;
using UserManagement.Domain.Models;
using UserManagement.IRepository.RepositoryInterface;
using Microsoft.EntityFrameworkCore;
using System.Numerics;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace UserManagement.Repository.UserRepository
{
    public class UserRepository : IUserRepository

    {
        private readonly TestContext _context;
        private readonly IConfiguration _configuration;
        public UserRepository(TestContext context,IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
            



        public async Task<string> AddUser(SUser user, SAddress address)
        {
            
                using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();

                    using (var command = new SqlCommand("dbo.createuser_usp1", connection))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        // Adding parameters to the command

                        command.Parameters.AddWithValue("@FirstName", user.FirstName ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@MiddleName", user.MiddleName ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@LastName", user.LastName ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@Gender", user.Gender ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@DateOfJoining", user.DateOfJoining);
                        command.Parameters.AddWithValue("@DOB", user.DateOfBirth);
                        command.Parameters.AddWithValue("@Email", user.Email ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@Password", user.Password ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@Phone", user.Phone ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@AlternatePhone", user.AlternatePhone ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@ImagePath", user.ImagePath ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@Address", address.Address ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@City", address.City ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@State", address.State ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@Country", address.Country ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@ZipCode", address.ZipCode ?? (object)DBNull.Value);
                        command.Parameters.AddWithValue("@LoginId", user.CreatedBy ?? (object)DBNull.Value);

                        await command.ExecuteScalarAsync();
                    }
                }
                return "User Added Successfully";
            
            


        }

        //public async Task<bool> DeleteUser(int id)
        //{
        //    bool result = false;
        //    var User = await _context.SUsers.FindAsync(id);
        //    if (User != null) {

        //        _context.SUsers.Remove(User);
        //        result = true; 
        //    }
        //    else
        //    {
        //        result= false;
        //    }
        //    return result;
        //}



        //public async Task<bool> DeleteUser(int id)
        //{
        //    using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
        //    {
        //        await connection.OpenAsync();
        //        var command = connection.CreateCommand();
        //        using (var command = new SqlCommand("dbo.deleteUser_usp",connection))
        //        {
        //            command.CommandType = CommandType.StoredProcedure;
        //            command.Parameters.AddWithValue("@UserId", id);

        //            await command.ExecuteNonQueryAsync();
        //        }
        //    }
        //    return true;
        //}
        public async Task<string> DeleteUser(int id)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();
                var command = connection.CreateCommand();
                using ( command = new SqlCommand("dbo.deleteUser_usp", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@UserId", id);

                    await command.ExecuteNonQueryAsync();
                }
            }
            return "User Deleted Successfully";
        }


        public async Task<List<SUser>> GetAllUsers()
        {
           // using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
                return await _context.SUsers.ToListAsync();
                //string query = "SELECT * FROM SUsers WHERE IsDeleted = 0";
            //return await _context.SUsers()
            //connection.Open();
            //SqlCommand command = new SqlCommand(query, connection);
            //var users = _context.SUsers.Where(u => u.IsDeleted == 0).ToListAsync();
        }

        public async Task<SUser> GetUserByID(int id)
        {
            return await _context.SUsers.FindAsync(id);
        }

        public async Task<SUser> UpdateUser(SUser user)
        {
            _context.Entry(user).State=EntityState.Modified;
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> Validate(LoginDTO login)
        {


            bool exists = await _context.SUsers.AnyAsync(u => u.Email == login.Email && u.Password == login.Password && u.IsActive == true);
            return exists;

        }

       
    }
}
