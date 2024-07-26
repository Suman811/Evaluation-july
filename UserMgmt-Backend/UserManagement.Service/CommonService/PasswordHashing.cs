using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;

namespace UserManagement.Service.CommonService
{
    public class PasswordHashing
    {
        private readonly IPasswordHasher<object> _passwordHasher;

        public PasswordHashing()
        {
            _passwordHasher = new PasswordHasher<object>();
        }

        public string HashedPassword(string password)
        {
            return _passwordHasher.HashPassword(null, password);
        }

        public bool VerificationPassword(string password, string hashedPassword)
        {
            var result = _passwordHasher.VerifyHashedPassword(null, hashedPassword, password);
            return result == PasswordVerificationResult.Success;
        }
    }
}
