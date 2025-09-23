import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import toast from "react-hot-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

import NIDForm from "./Form/NIDForm/NIDForm";
import OCRForm from "./Form/OCRForm";
import PANIDForm from "./Form/PANIDForm";
import ElectionForm from "./Form/VoterForm";
import LicenceForm from "./Form/LicenceForm";
import BlackListForm from "./Form/BlackListForm";
import { useEffect } from "react";
import DataViewerForm from "./Form/DataViewerForm";

interface APIPortalProps {
  id: string;
  label: string;
  formComponent: () => React.JSX.Element;
}

const items: APIPortalProps[] = [
  { id: "nid", label: "NID", formComponent: NIDForm },
  { id: "ocr", label: "OCR", formComponent: OCRForm },
  { id: "panId", label: "PAN ID", formComponent: PANIDForm },
  { id: "election", label: "Voter ID", formComponent: ElectionForm },
  { id: "licence", label: "Licence", formComponent: LicenceForm },
  { id: "blacklist", label: "BlackList", formComponent: BlackListForm },
  { id: "dataViewer", label: "Data Viewer", formComponent: DataViewerForm },
];

const FormSchema = z.object({
  items: z.string(),
});

const STORAGE_KEY = "active-tab";

const APIPortalItems = () => {
  const savedTab = sessionStorage.getItem(STORAGE_KEY) || "nid";

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { items: savedTab },
  });

  const selectedItem = form.watch("items");

  function onValueChange(val: string) {
    form.setValue("items", val);
    sessionStorage.setItem(STORAGE_KEY, val);
    // toast.success(`Selected Tab: ${val}`);
  }

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) form.setValue("items", saved);
  }, [form]);

  return (
    <section className="flex flex-col gap-4 items-center mt-2 p-1 w-full">
      <Tabs
        defaultValue="nid"
        value={selectedItem}
        onValueChange={onValueChange}
        className="w-full"
      >
        {/* Tab Headers */}
        <div className="grid place-items-center mb-4">
          <TabsList className="w-2/3 max-md:w-full">
            {items.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className="cursor-pointer"
              >
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab Content */}
        {items.map((item) => (
          <TabsContent key={item.id} value={item.id}>
            <div className="w-full">
              <item.formComponent />
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default APIPortalItems;
