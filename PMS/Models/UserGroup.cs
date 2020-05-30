using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace PMS.Models
{
    public class UserGroup : BaseEntity
    {
        public long UserGroupID { get; set; }

        [Required()]
        [MaxLength(50)]
        public string UserGroupName { get; set; }          
        
        [DefaultValue(0)]
        public bool IsDelete { get; set; }

        
    }
}
