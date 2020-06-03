using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PMS.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    CompanyID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupOfCompanyID = table.Column<int>(nullable: false),
                    CreatedUser = table.Column<string>(maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedUser = table.Column<string>(maxLength: 50, nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    CostCentreID = table.Column<int>(nullable: false),
                    CompanyCode = table.Column<string>(maxLength: 15, nullable: false),
                    CompanyName = table.Column<string>(maxLength: 50, nullable: false),
                    OtherBusinessName1 = table.Column<string>(maxLength: 100, nullable: true),
                    OtherBusinessName2 = table.Column<string>(maxLength: 100, nullable: true),
                    OtherBusinessName3 = table.Column<string>(maxLength: 100, nullable: true),
                    Address1 = table.Column<string>(maxLength: 50, nullable: true),
                    Address2 = table.Column<string>(maxLength: 50, nullable: true),
                    Address3 = table.Column<string>(maxLength: 50, nullable: true),
                    Telephone = table.Column<string>(nullable: true),
                    Mobile = table.Column<string>(nullable: true),
                    FaxNo = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    WebAddress = table.Column<string>(nullable: true),
                    ContactPerson = table.Column<string>(nullable: true),
                    IsVat = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.CompanyID);
                });

            migrationBuilder.CreateTable(
                name: "UserGroups",
                columns: table => new
                {
                    UserGroupID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupOfCompanyID = table.Column<int>(nullable: false),
                    CreatedUser = table.Column<string>(maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedUser = table.Column<string>(maxLength: 50, nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    UserGroupName = table.Column<string>(maxLength: 50, nullable: false),
                    IsDelete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroups", x => x.UserGroupID);
                });

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

            migrationBuilder.CreateTable(
                name: "UserPrivileges",
                columns: table => new
                {
                    UserPrivilegesID = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupOfCompanyID = table.Column<int>(nullable: false),
                    CreatedUser = table.Column<string>(maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedUser = table.Column<string>(maxLength: 50, nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    UserMasterID = table.Column<long>(nullable: false),
                    TransactionRightsID = table.Column<long>(nullable: false),
                    FormID = table.Column<long>(nullable: false),
                    TransactionTypeID = table.Column<int>(nullable: false),
                    IsAccess = table.Column<bool>(nullable: false),
                    IsPause = table.Column<bool>(nullable: false),
                    IsSave = table.Column<bool>(nullable: false),
                    IsModify = table.Column<bool>(nullable: false),
                    IsView = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPrivileges", x => x.UserPrivilegesID);
                });

            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    LocationID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupOfCompanyID = table.Column<int>(nullable: false),
                    CreatedUser = table.Column<string>(maxLength: 50, nullable: true),
                    CreatedDate = table.Column<DateTime>(nullable: false),
                    ModifiedUser = table.Column<string>(maxLength: 50, nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    CompanyID = table.Column<int>(nullable: false),
                    LocationCode = table.Column<string>(maxLength: 15, nullable: false),
                    LocationName = table.Column<string>(maxLength: 50, nullable: false),
                    Address1 = table.Column<string>(maxLength: 50, nullable: false),
                    Address2 = table.Column<string>(maxLength: 50, nullable: false),
                    Address3 = table.Column<string>(maxLength: 50, nullable: true),
                    Telephone = table.Column<string>(maxLength: 50, nullable: true),
                    Mobile = table.Column<string>(maxLength: 50, nullable: true),
                    FaxNo = table.Column<string>(maxLength: 50, nullable: true),
                    Email = table.Column<string>(maxLength: 50, nullable: true),
                    ContactPersonName = table.Column<string>(maxLength: 100, nullable: true),
                    OtherBusinessName = table.Column<string>(maxLength: 100, nullable: true),
                    LocationPrefixCode = table.Column<string>(maxLength: 3, nullable: true),
                    LoyaltyPrefixCode = table.Column<string>(maxLength: 50, nullable: true),
                    TypeOfBusiness = table.Column<string>(maxLength: 50, nullable: true),
                    CostingMethod = table.Column<string>(maxLength: 50, nullable: true),
                    CostCentreID = table.Column<int>(nullable: false),
                    IsVat = table.Column<bool>(nullable: false),
                    IsStockLocation = table.Column<bool>(nullable: false),
                    IsDelete = table.Column<bool>(nullable: false),
                    IsHeadOffice = table.Column<bool>(nullable: false),
                    UploadPath = table.Column<string>(nullable: true),
                    DownloadPath = table.Column<string>(nullable: true),
                    LocalUploadPath = table.Column<string>(nullable: true),
                    BackupPath = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false),
                    LocationIP = table.Column<string>(maxLength: 50, nullable: true),
                    IsShowRoom = table.Column<bool>(nullable: false),
                    AccLedgerAccountID = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.LocationID);
                    table.ForeignKey(
                        name: "FK_Locations_Companies_CompanyID",
                        column: x => x.CompanyID,
                        principalTable: "Companies",
                        principalColumn: "CompanyID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Locations_CompanyID",
                table: "Locations",
                column: "CompanyID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Locations");

            migrationBuilder.DropTable(
                name: "UserGroups");

            migrationBuilder.DropTable(
                name: "UserMasters");

            migrationBuilder.DropTable(
                name: "UserPrivileges");

            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}
