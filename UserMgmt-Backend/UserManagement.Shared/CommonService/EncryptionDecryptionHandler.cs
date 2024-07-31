using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace UserManagement.Shared.CommonService
{
    public static class EncryptionDecryptionHandler
    {
        //private static readonly byte[] _key = Encoding.UTF8.GetBytes("this_is_the_secrrsy_usjg");


        //public static string Encryption(string data)
        //{
        //    using (var aes = Aes.Create())
        //    {
        //        aes.Key = _key;
        //        aes.IV = new byte[16]; // Initialize to zero

        //        var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
        //        using (var ms = new System.IO.MemoryStream())
        //        using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
        //        using (var sw = new System.IO.StreamWriter(cs))
        //        {
        //            sw.Write(data);
        //            sw.Close();
        //            return Convert.ToBase64String(ms.ToArray());
        //        }
        //    }
        //if (data == null)
        //{
        //    return null;
        //}
        //byte[] tostoredata = ASCIIEncoding.ASCII.GetBytes(data);
        //string encrypteddata = Convert.ToBase64String(tostoredata);
        //return encrypteddata;
        // }

        //public static string Decryption(string encryptedText)
        //{
        //    try
        //    {
        //        using (var aes = Aes.Create())
        //        {
        //            aes.Key = _key;
        //            aes.IV = new byte[16]; // Initialize to zero

        //            var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
        //            using (var ms = new System.IO.MemoryStream(Convert.FromBase64String(encryptedText)))
        //            using (var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
        //            using (var sr = new System.IO.StreamReader(cs))
        //            {
        //                return sr.ReadToEnd();
        //            }
        //        }
        //    }
        //    catch (FormatException ex)
        //    {
        //        // Log the exception
        //        Console.WriteLine($"Invalid Base64 string: {ex.Message}");
        //        return null;
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception
        //        Console.WriteLine($"Error decrypting string: {ex.Message}");
        //        return null;
        //    }
        //}

      
            public static string Encryption(string data)
            {
                if (string.IsNullOrEmpty(data))
                {
                    return null;
                }
                else
                {
                    byte[] storeData = ASCIIEncoding.ASCII.GetBytes(data);
                    string encryptData = Convert.ToBase64String(storeData);
                    return encryptData;
                }
            }

            public static string Decryption(string data)
            {
                if (string.IsNullOrEmpty(data))
                {
                    return null;
                }
                else
                {
                    byte[] encryptedData = Convert.FromBase64String(data);
                    string decryptData = ASCIIEncoding.ASCII.GetString(encryptedData);
                    return decryptData;
                }
            }
        }
    }


