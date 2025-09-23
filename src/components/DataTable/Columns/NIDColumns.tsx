import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    header: "Image",
    accessorFn: (row) => row.jsondata?.potrait,
    cell: ({ getValue }) => {
      const portraitBase64 = getValue<string | undefined>();

      if (!portraitBase64) return <span>No Image</span>;

      return (
        <img
          src={`data:image/png;base64,${portraitBase64}`}
          alt="NID Portrait"
          className="w-12 h-12 object-cover rounded-full"
        />
      );

    // const src = `data:image/png;base64,${portraitBase64}`;

    // return (
    //   <Dialog>
    //     <DialogTrigger asChild>
    //       <img
    //         src={src}
    //         alt="NID Portrait"
    //         className="w-12 h-12 object-cover rounded cursor-pointer hover:opacity-80 transition"
    //       />
    //     </DialogTrigger>
    //     <DialogContent className="flex items-center justify-center">
    //       <img
    //         src={src}
    //         alt="NID Portrait Large"
    //         className="max-h-[80vh] max-w-[90vw] object-contain rounded-md"
    //       />
    //     </DialogContent>
    //   </Dialog>
    // );
      
    },
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
  },

  {
    accessorKey: "nin",
    header: "National ID",
  },
  {
    accessorKey: "nin_status",
    header: "Status",
  },
  {
    accessorKey: "dob",
    header: "Date of birth",
  },
  {
    accessorKey: "citizenship_issue_date",
    header: "Citizenship issed date",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "district",
    header: "District",
  },
  {
    accessorKey: "municipality",
    header: "Municipality",
  },
  {
    accessorKey: "ward_no",
    header: "Ward No",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
];
