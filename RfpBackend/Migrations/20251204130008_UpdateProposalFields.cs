using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RfpBackend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProposalFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AiRecommendation",
                table: "Proposals");

            migrationBuilder.DropColumn(
                name: "ExtractedJson",
                table: "Proposals");

            migrationBuilder.DropColumn(
                name: "RawEmailContent",
                table: "Proposals");

            migrationBuilder.RenameColumn(
                name: "WarrantyMonths",
                table: "Proposals",
                newName: "SpecMatchScore");

            migrationBuilder.RenameColumn(
                name: "TotalPrice",
                table: "Proposals",
                newName: "Warranty");

            migrationBuilder.RenameColumn(
                name: "ReceivedAt",
                table: "Proposals",
                newName: "ProposalText");

            migrationBuilder.RenameColumn(
                name: "PaymentTerms",
                table: "Proposals",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "AiScore",
                table: "Proposals",
                newName: "RiskFactor");

            migrationBuilder.AddColumn<int>(
                name: "FinalScore",
                table: "Proposals",
                type: "INTEGER",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FinalScore",
                table: "Proposals");

            migrationBuilder.RenameColumn(
                name: "Warranty",
                table: "Proposals",
                newName: "TotalPrice");

            migrationBuilder.RenameColumn(
                name: "SpecMatchScore",
                table: "Proposals",
                newName: "WarrantyMonths");

            migrationBuilder.RenameColumn(
                name: "RiskFactor",
                table: "Proposals",
                newName: "AiScore");

            migrationBuilder.RenameColumn(
                name: "ProposalText",
                table: "Proposals",
                newName: "ReceivedAt");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "Proposals",
                newName: "PaymentTerms");

            migrationBuilder.AddColumn<string>(
                name: "AiRecommendation",
                table: "Proposals",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExtractedJson",
                table: "Proposals",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "RawEmailContent",
                table: "Proposals",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }
    }
}
