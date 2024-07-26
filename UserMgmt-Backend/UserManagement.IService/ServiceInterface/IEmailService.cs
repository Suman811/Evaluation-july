using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UserManagement.IService.ServiceInterface
{
   public interface IEmailService
    {
       
            public Task SendEmail(string email);
        
    }
}
