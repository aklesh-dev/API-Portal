import toast from "react-hot-toast";
import { Button } from "./ui/button";


export const SessionExpiredToast = ({ id }: { id: string }) => (
  <div className="max-w-sm w-full bg-white shadow-lg rounded-lg flex items-center justify-between p-4 gap-4">
    <span className="text-sm font-medium text-gray-900">
      Session expired! Please login again.
    </span>
    <Button
      size="sm"
      onClick={() => {
        toast.dismiss(id);
        window.location.href = "/auth";
      }}
    >
      Login
    </Button>
  </div>
);

