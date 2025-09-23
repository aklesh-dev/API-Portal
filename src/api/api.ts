import axiosInstance from "@/lib/axios";
import type { Login, Signup } from "@/schema/Auth.schema";
import type { Credit } from "@/schema/Credit.schema";
import type { NIDParams } from "@/schema/NID.schema";
import type { OCR } from "@/schema/OCR.schema";
import type { PANID } from "@/schema/PANID.schema";
import type { Voter } from "@/schema/Voter.schema";

export const getCompany = async (id: OCR["company_id"]) => {
  const res = await axiosInstance.get(`/api/v1/company`, {
    params: { company_id: id },
  });
  return res.data;
};

export const getNID = async (params: NIDParams): Promise<object> => {
  const res = await axiosInstance.get(`/api/v1/nid/`, {
    params,
  });
  return res.data;
};

export const getPanNo = async (pan_no: PANID["pan_no"]) => {
  const res = await axiosInstance.get(`/api/v1/pan`, {
    params: { pan_no },
  });
  return res.data;
};

export const getVoter = async (params: Voter) => {
  const res = await axiosInstance.get(`/api/v1/voter`, {
    params,
  });
  return res.data;
};

export const getLicence = async (params: any) => {
  const res = await axiosInstance.get(`/api/v1/license`, {
    params,
  });
  return res.data;
};

export const getBlackList = async (params: any) => {
  const res = await axiosInstance.get(`/api/v1/blacklist`, {
    params,
  });
  return res.data;
};

// register
export const register = async (payload: Signup) => {
  const res = await axiosInstance.post(`/register`, {
    username: payload.username,
    password: payload.password,
    email: payload.email,
    full_name: payload.fullName,
  });
  return res.data;
};

// Login
export const login = async (credentials: Login) => {
  const data = new URLSearchParams();

  for (const key of Object.keys(credentials) as Array<keyof Login>) {
    data.append(key, credentials[key]);
  }

  const res = await axiosInstance.post(`/token`, data, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return res.data;
};

// Fetch user
export const getUser = async () => {
  const res = await axiosInstance.get(`/users/me`);
  return res.data;
};

export const logout = async () => {
  try {
    const res = await axiosInstance.post("/logout");
    return res.data;
  } catch (error: any) {
    console.error(`Error in logout api:`, error);
    throw error;
  }
};

// add credit point.
export const addCredit = async (payload: Credit) => {
  const res = await axiosInstance.post(`/api/v1/admin/credits/update`, payload);
  return res.data;
};

// fetch users lists
export const getUsers = async () => {
  const res = await axiosInstance.get(`/api/v1/admin/users`);
  return res.data;
};

// fetch list of tables.
export const getTables = async () => {
  const res = await axiosInstance.get(`/tables`);
  return res.data;
};

// fetch selected table data
export const getSelectedTableData = async (
  tableName: string,
  pageIndex: number,
  pageSize: number
) => {
  const params = new URLSearchParams();
  params.append("start", (pageIndex * pageSize).toString());
  params.append("length", pageSize.toString());

  const res = await axiosInstance.get(`/table/${tableName}`, {
    params,
  });
  return res.data;
};

// public table api
export const getVotersList = async (tableName: string) => {
  const res = await axiosInstance.get(`/table_name/${tableName}`);
  return res.data;
};
