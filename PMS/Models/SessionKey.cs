using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace PMS.Models
{
    public class SessionKey
    {
        public int SessionKeyID { get; set; }


        [MaxLength(150)]
        public string UserName { get; set; }

        [MaxLength(20)]        
	    public string Password { get; set; }

        public string AuthKey { get; set; }
        public string UserType { get; set; }


    }
    public static class SessionExtensions
    {
        public static void SetObjectAsJson(this ISession session, string key, object value)
        {
            session.SetString(key, JsonConvert.SerializeObject(value));
        }

        public static T GetObjectFromJson<T>(this ISession session, string key)
        {
            var value = session.GetString(key);
            return value == null ? default(T) : JsonConvert.DeserializeObject<T>(value);
        }
    }
}
