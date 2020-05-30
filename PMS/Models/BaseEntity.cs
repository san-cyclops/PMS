using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Models
{
    public class BaseEntity
    {
        public BaseEntity()
        {
            GroupOfCompanyID = Common.CompanyID;
            CreatedUser = Common.LoggedUser;
            CreatedDate = DateTime.Now;
            ModifiedUser = Common.LoggedUser;
            ModifiedDate = DateTime.Now;
        }

        public int GroupOfCompanyID { get; set; }

        [MaxLength(50)]
        public string CreatedUser { get; set; }

        public DateTime CreatedDate { get; set; }

        [MaxLength(50)]
        public string ModifiedUser { get; set; }

        public DateTime ModifiedDate { get; set; }

    }
}
