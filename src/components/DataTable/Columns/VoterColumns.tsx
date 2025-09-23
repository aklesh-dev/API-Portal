import type { ColumnDef } from "@tanstack/react-table";

export const VoterColumns: ColumnDef<any>[] = [
  {
    accessorKey: "voter_id",
    header: "Voter Id"
  },
  {
    accessorKey: "full_name",
    header: "Full Name"
  },
  {
    accessorKey: "dob",
    header: "Date of birth"
  },
  {
    accessorKey: "gender",
    header: "Gender"
  },
  {
    accessorKey: "citizenship_no",
    header: "Citizenship no"
  },
  {
    accessorKey: "father_name",
    header: "Father Name"
  },
  {
    accessorKey: "mother_name",
    header: "Mother Name"
  },
  {
    accessorKey: "spouse_name",
    header: "Spouse Name"
  },
  {
    accessorKey: "province",
    header: "Province"
  },
  {
    accessorKey: "district",
    header: "District"

  },
  {
    accessorKey: "house_of_representatives_constituency_no",
    header: "House Of Representatives Constituency No"
  },
  {
    accessorKey: "provincial_assembly_constituency_no",
    header: "Provincial Assembly Constituency No"
  },
  {
    accessorKey: "municipality",
    header: "Muncipality"
  },
  {
    accessorKey: "ward_no",
    header: "Ward No"
  },
  {
    accessorKey: "polling_station",
    header: "Polling Station"
  },
  {
    accessorKey: "serial_no",
    header: "Serial No"
  },
]