﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserManagement.Domain.DTO
{
   public class UserDTO
    {

        public string FirstName { get; set; } = null!;

        public string? MiddleName { get; set; }

        public string LastName { get; set; } = null!;

        public string Gender { get; set; } = null!;

        public DateTime DateOfJoining { get; set; }

        public DateTime Dob { get; set; }

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public string? AlternatePhone { get; set; }
        public int LoginUserId { get; set; }

        public string? ImagePath { get; set; }

        public string Address { get; set; } = null!;

        public string City { get; set; } = null!;

        public string State { get; set; } = null!;

        public string Country { get; set; } = null!;

        public string ZipCode { get; set; } = null!;
  

    }
}