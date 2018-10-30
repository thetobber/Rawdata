using System;
using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Rawdata.Data.Repositories
{
    public class Authentication
    {
        public static string CreateHash(string value, string salt)
        {
            var bytes = KeyDerivation.Pbkdf2(
                password: value,
                salt: Encoding.UTF8.GetBytes(salt),
                prf: KeyDerivationPrf.HMACSHA512,
                iterationCount: 10000,
                numBytesRequested: 256 / 8 // 32 bytes
            );

            return Convert.ToBase64String(bytes);
        }

        public static string CreateSalt()
        {
            byte[] bytes = new byte[128 / 8]; // 16 bytes 

            using (var generator = RandomNumberGenerator.Create())
            {
                generator.GetBytes(bytes);
                return Convert.ToBase64String(bytes);
            }
        }

        public static bool Validate(string value, string salt, string hash)
        {
            return CreateHash(value, salt) == hash;
        }
    }
}