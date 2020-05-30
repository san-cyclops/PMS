using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PMS.Models
{
    public static class Common
    {

        public struct ModuleTypes
        {
            public static bool Student;
            public static bool DashBoard;
        }

        public static int SystemProductID;
        public static int CompanyID;
        public static string LoggedUser;
        public static long LoggedUserId;
        public static int LoggedLocationID;
        public static string LoggedLocationCode;
        public static string LoggedLocationName;
        public static int LoggedCompanyID;
        public static string Version = "1.4.0.0";  // sanjeewa
        public static string LastBuildDate = "01-02-2015";  // sanjeewa
        public static string LoggedPcName;
        public static long UserGroupID;
        public static string Connection = "SysConn";
    }
}
