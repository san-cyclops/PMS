using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Models
{
    public class UserMaster : BaseEntity
    {
        public long UserMasterID { get; set; }

        [DefaultValue(0)]
        public int CompanyID { get; set; }

        [DefaultValue(0)]
        public int LocationID { get; set; }

        [MaxLength(15)]
        public string UserName { get; set; }

        [MaxLength(100)]
        public string UserDescription { get; set; }

        [MaxLength(15)]
        public string Password { get; set; }

        public long UserGroupID { get; set; }

        [DefaultValue(0)]
        public bool IsActive { get; set; }

        [DefaultValue(0)]
        public bool IsUserCantChangePassword { get; set; }

        [DefaultValue(0)]
        public bool IsUserMustChangePassword { get; set; }

        [DefaultValue(0)]
        public bool IsDelete { get; set; }




    }
}
