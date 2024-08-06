using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using UserManagement.IService.ServiceInterface;

namespace UserManagement.Service.Services
{
    public class EmailService : IEmailService
    {
        public Task SendEmail(string email)
        {
            var subj = "Change Your Passsword";
            var body = "Click link below to change password " +
            "http://localhost:4200/reset";
            return SendEmailAsync(email, subj, body);

        }
        public Task SendEmailAsync(string email, string subject, string message)
        {
            var mail = "sumandeepkaur811@gmail.com";
            var pw = "wfon rpdc xqhl cvrf";

            var client = new SmtpClient("smtp.gmail.com", 587)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(mail, pw)
            };

            return client.SendMailAsync(
                new MailMessage(from: mail,
                to: email,
                subject,
                message));

        }

    }
}
