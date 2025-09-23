import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLogout, useUser } from "@/hooks/useHooks";
import CreditDialog from "./CreditDialog";
import { Link } from "react-router";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";

const Navbar = () => {
  const { data: user, isLoading, error } = useUser();
  const { mutate: logoutMutation, isPending } = useLogout();

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Something went wrong!");
    }
  }, [error]);

  const isAdmin = user?.role === "admin";

  return (
    <div className="h-[53px] flex items-center justify-between p-2 border-b shadow-background ">
      {/* Left side */}
      <div className="flex gap-2 items-center">
        <h1 className="text-xl font-semibold max-sm:hidden">
          <Link to={`/`}>API Services Portal</Link>
        </h1>
      </div>

      {/* Right side */}
      <div className="flex gap-4 mr-3 items-center">
        <span className="flex items-center gap-1">
          Welcome{" "}
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : (
            <span className="font-medium">
              {isAdmin ? (
                "Admin"
              ) : (
                <span className="capitalize">{user?.username || "User"}</span>
              )}
            </span>
          )}
        </span>

        <span className="flex items-center gap-1">
          Credits:{" "}
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-blue-700" />
          ) : (
            <span className="font-medium text-blue-700">
              {user?.credit_points ?? "N/A"}
            </span>
          )}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>
              Credits:{" "}
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-blue-700" />
              ) : (
                <span className="font-medium text-blue-700">
                  {user?.credit_points ?? "N/A"}
                </span>
              )}
            </DropdownMenuLabel>
            {isAdmin && (
              <DropdownMenuItem asChild>
                <CreditDialog />
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant={"destructive"}
              onClick={() => logoutMutation()}
              disabled={isPending}
              className="cursor-pointer active:scale-95"
            >
              {isPending ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
