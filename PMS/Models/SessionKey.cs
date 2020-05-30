using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

       

    }
}
