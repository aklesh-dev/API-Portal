import type { ColumnDef } from "@tanstack/react-table";

export const LicenceColumns: ColumnDef<any>[] = [
  {
    accessorFn: (row) => row.jsondata?.Image_base64,
    header: "Image",
    cell: ({ getValue }) => {
      const image = getValue<string | undefined>();

      const src = `data:image/png;base64,${image}`;

      if (!image) return <span>No image</span>;

      return (
        <img
          src={src}
          alt="Image"
          className="w-12 h-12 object-cover rounded-full"
        />
      );
    },
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "license_no",
    header: "License No",
  },
  {
    accessorKey: "citizenship_no",
    header: "Citizenship No",
  },
  {
    accessorKey: "parents_name",
    header: "Parents Name",
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "issued_date",
    header: "Issued Date",
  },
  {
    accessorKey: "expiry_date",
    header: "Expiry Date",
  },
  {
    accessorKey: "blood_group",
    header: "Blood Group",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
];
