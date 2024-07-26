﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace UserManagement.Service.CommonService
{
    public static class EncryptionDecryptionHandler
    {
        private static readonly byte[] _key = Encoding.UTF8.GetBytes("your_secret_key_here_and_suman_is_pagal");

        public static string Encryption(string data)
        {
            //using (var aes = Aes.Create())
            //{
            //    aes.Key = _key;
            //    aes.IV = new byte[16]; // Initialize to zero

            //    var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
            //    using (var ms = new System.IO.MemoryStream())
            //    using (var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write))
            //    using (var sw = new System.IO.StreamWriter(cs))
            //    {
            //        sw.Write(data);
            //        sw.Close();
            //        return Convert.ToBase64String(ms.ToArray());
            //    }
            //}
            if (data == null)
            {
                return null;
            }
            byte[] tostoredata = ASCIIEncoding.ASCII.GetBytes(data);
            string encrypteddata = Convert.ToBase64String(tostoredata);
            return encrypteddata;
        }

        public static string Decryption(string encryptedText)
        {
            using (var aes = Aes.Create())
            {
                aes.Key = _key;
                aes.IV = new byte[16]; // Initialize to zero

                var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
                using (var ms = new System.IO.MemoryStream(Convert.FromBase64String(encryptedText)))
                using (var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read))
                using (var sr = new System.IO.StreamReader(cs))
                {
                    return sr.ReadToEnd();
                }
            }
            //if (data == null)
            //{
            //    return null;
            //}

            //byte[] encryptedData = Convert.FromBase64String(data);
            //string decryptedData = ASCIIEncoding.ASCII.GetString(encryptedData);
            //return decryptedData;
        }
    }
}
