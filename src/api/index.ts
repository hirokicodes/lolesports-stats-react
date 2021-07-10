import axios from "axios";

export const AppAPI = {
  get: async (params: LeaguepediaQueryParams) => {
    const url = process.env.REACT_APP_API_URL;
    const axiosRes = await axios.get(url!, { params });
    return axiosRes.data;
  },
  getRoute: async (path: string, params: any = {}) => {
    const url = process.env.REACT_APP_API_URL + path;
    const axiosRes = await axios.get(url!, { params });
    return axiosRes.data;
  },
  getRouteFunc: async (path: string, params: any = {}) => {
    return async () => {
      const url = process.env.REACT_APP_API_URL + path;
      const axiosRes = await axios.get(url!, { params });
      return axiosRes.data;
    };
  },
};

export enum LeaguepediaQueries {
  TOURNAMENTS = "",
}

interface LeaguepediaQueryParams {
  tables: string;
  fields: string;
  where?: string;
  joinOn?: string;
  orderBy?: string;
  limit?: number;
  offset?: number;
}
