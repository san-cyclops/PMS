using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PMS.Migrations
{
    public partial class firstMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserMasters",
                columns: table => new
                {
                    UserMasterID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupOfCompanyID = table.Column<int>(nullable: false),
                    CreatedUser = table.Column<string>(maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedUser = table.Column<string>(maxLength: 50, nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    CompanyID = table.Column<int>(nullable: false),
                    LocationID = table.Column<int>(nullable: false),
                    UserName = table.Column<string>(maxLength: 15, nullable: true),
                    UserDescription = table.Column<string>(maxLength: 100, nullable: true),
                    Password = table.Column<string>(maxLength: 15, nullable: true),
                    UserGroupID = table.Column<long>(nullable: false),
                    IsActive = table.Column<bool>(nullable: false),
                    IsUserCantChangePassword = table.Column<bool>(nullable: false),
                    IsUserMustChangePassword = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMasters", x => x.UserMasterID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserMasters");
        }
    }
}
