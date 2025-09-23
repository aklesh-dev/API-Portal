import {
  addCredit,
  getBlackList,
  getCompany,
  getLicence,
  getNID,
  getPanNo,
  getSelectedTableData,
  getTables,
  getUser,
  getUsers,
  getVoter,
  getVotersList,
  login,
  logout,
  register,
} from "@/api/api";
import type { Login, Signup } from "@/schema/Auth.schema";
import type { Credit } from "@/schema/Credit.schema";
import type { Licence } from "@/schema/Licence.schema";
import { NIDParamsSchema, type NIDParams } from "@/schema/NID.schema";
import type { OCR } from "@/schema/OCR.schema";
import { type PANID } from "@/schema/PANID.schema";
import { type Voter } from "@/schema/Voter.schema";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

// Fetch company data.
export const useCompanys = (id: OCR["company_id"]) => {
  return useQuery({
    queryKey: ["company", id],
    queryFn: () => getCompany(id),
    enabled: !!id,
  });
};

// Fetch NID data.
export const useNID = (params: NIDParams | null) => {
  const isValid = params ? NIDParamsSchema.safeParse(params).success : false;

  return useQuery({
    queryKey: ["nid", params],
    queryFn: () => getNID(params!),
    enabled: isValid,
    retry: (failureCount, error: any) => {
      const status = error?.status ?? error?.response?.status;

      if (status === 500 && failureCount < 2) {
        return true;
      }

      return false;
    },
    staleTime: 1000 * 60 * 5, //Cache for 5 min. → controls how long cached data is “fresh”.
  });
};

// Fetch pan data.
export const usePan = (pan_no: PANID["pan_no"] | null) => {
  // const isValid = pan_no ? panidSchema.safeParse(pan_no).success : false;
  return useQuery({
    queryKey: ["pan_no", pan_no],
    queryFn: () => getPanNo(pan_no!),
    enabled: !!pan_no,
    retry: 1,
  });
};

// Fetch voter details.
export const useVoter = ({ voter_id, dob, citizenship_no }: Voter) => {
  const payload = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries({ voter_id, dob, citizenship_no }).filter(([_, v]) => v)
  ) as Voter;

  // console.log("Voter payload:", payload);

  return useQuery({
    queryKey: ["voter", voter_id, dob, citizenship_no],
    queryFn: () => getVoter(payload),
    enabled: !!voter_id,
    retry: false,
  });
};

// Fetch licence details.
export const useLicence = ({ license_no, dob }: Licence) => {
  const payload = dob ? { license_no, dob } : { license_no };

  const isValid = !!license_no;

  return useQuery({
    queryKey: ["licence", license_no, dob],
    queryFn: () => getLicence(payload),
    enabled: isValid,
    retry: false,
  });
};

// Fetch blacklist details.
export const useBlackList = ({ borrower_name, date }: any) => {
  // build payload dynamically
  const payload: Record<string, string> = {};
  if (borrower_name) payload.borrower_name = borrower_name;
  if (date) payload.date = date;

  return useQuery({
    queryKey: ["blacklist", borrower_name || "", date || ""],
    queryFn: () => getBlackList(payload),
    enabled: Object.keys(payload).length > 0, // 👈 only run when at least 1 field exists
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

// register
export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Signup) => {
      return register(payload);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(`${data.username} created successfully.`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ username, password }: Login) => {
      const payload = {
        username,
        password,
      };

      return login(payload);
    },
    onSuccess: (data) => {
      sessionStorage.setItem("token", data.access_token);
      sessionStorage.setItem("token_type", data.token_type);
      // queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.refetchQueries({ queryKey: ["user"], exact: true });
    },
    onError: (error) => {
      console.error("Login error:", error.message);
    },
  });
};

// Fetch User details
export const useUser = () => {
  const token = sessionStorage.getItem("token");
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false,
    enabled: !!token,
  });
};

// Logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      sessionStorage.clear();
      // queryClient.invalidateQueries({queryKey: ["user"]})
      queryClient.setQueryData(["user"], null);
      toast.success("Logout successfully.");
      navigate(`/auth`);
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
};

// update credit point
export const useCredit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Credit) => addCredit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(`Credits updated successfully.`);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update credits");
    },
  });
};

// fetch users list
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    retry: false,
  });
};

// fetch tables
export const useTables = () => {
  return useQuery({
    queryKey: ["tables"],
    queryFn: getTables,
    retry: false,
  });
};

// fetch selected table data
export const useSelectedTable = (
  tableName: string,
  pageIndex: number,
  pageSize: number
) => {
  return useQuery({
    queryKey: ["tables", tableName, pageIndex, pageSize],
    queryFn: () => getSelectedTableData(tableName, pageIndex, pageSize),
    retry: false,
    enabled: !!tableName,
  });
};

// hook to fetch all data in parallel
export const useTableLists = (endpoints: string[]) => {
  return useQueries({
    queries: endpoints.map((endpoint) => {
      return {
        queryKey: ["tableData", endpoint],
        queryFn: () => getVotersList(endpoint),
        staleTime: 1000 * 60 * 5,
      };
    }),
  });
};
