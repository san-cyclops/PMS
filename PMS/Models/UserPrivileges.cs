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
    public class UserPrivileges : BaseEntity
    {

        public long UserPrivilegesID { get; set; }

        public long UserMasterID { get; set; }


        [MaxLength(50)]
        [NotMapped]
        public string UserDescription { get; set; }

        [MaxLength(15)]
        [NotMapped]
        public string UserPassword { get; set; }

        public long TransactionRightsID { get; set; }

        public long FormID { get; set; }

        [MaxLength(15)]
        [NotMapped]
        public string TransactionCode { get; set; }

        [MaxLength(50)]
        [NotMapped]
        public string TransactionName { get; set; }

        [MaxLength(50)]
        [NotMapped]
        public string PageName { get; set; }

        [DefaultValue(0)]
        public int TransactionTypeID { get; set; } // 1- Admin Portal, 2 - Student Portal, 3 - Lecture Portal

        [DefaultValue(0)]
        public bool IsAccess { get; set; }

        [DefaultValue(0)]
        public bool IsPause { get; set; }

        [DefaultValue(0)]
        public bool IsSave { get; set; }

        [DefaultValue(0)]
        public bool IsModify { get; set; }

        [DefaultValue(0)]
        public bool IsView { get; set; }  

    }
}
