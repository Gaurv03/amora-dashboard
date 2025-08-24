import { apiCall } from "./api";

export const adminLogin = async (data: any) => {
    const response = await apiCall<any, any>("/admin/login", "post", data);
    return response;
};

export const systemMetrics = async () => {
    const response = await apiCall<any, any>("/admin/systemMetrics", "get");
    return response;
};

export const userProfiles = async (data: any) => {
    const params = new URLSearchParams();
    params.append("search", data.search);
    params.append("page", data.page);
    params.append("pageSize", data.pageSize);
    const response = await apiCall<any, any>(`/admin/userProfiles?${params.toString()}`, "get");
    return response;
};

export const getUserProfileById = async (data: any) => {
    const params = new URLSearchParams();
    params.append("userId", data.userId);
    const response = await apiCall<any, any>(`/admin/getUserProfileById?${params.toString()}`, "get");
    return response;
};

export const deleteUserProfile = async (data: any) => {
    const response = await apiCall<any, any>("/admin/userProfiles", "delete", data);
    return response;
};

export const updateUserStatus = async (data: any) => {
    const response = await apiCall<any, any>("/admin/userProfiles/status", "put", data);
    return response;
};

export const updateUserData = async (data: any) => {
    const response = await apiCall<any, any>("/admin/userProfiles", "put", data);
    return response;
};