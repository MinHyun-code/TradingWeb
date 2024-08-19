import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';

// ParamError Class
export type paramError = {
  field: string;
  value: object;
  reason: string;
};

// ApiResponse Class
type apiResponse<T = unknown> = {
  data: T;
  error: string;
  message: string;
  paramErrors: paramError[];
  timestamp: string;
  txId: string;
};

const axiosInstance = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.response.use((response: AxiosResponse<apiResponse, unknown>) => {
  
  const { error, message } = response.data;

  console.debug("axios ok error :::", error);
  console.debug("axios ok message :::", message);

  return response;
},
(error: AxiosError) => {
  
  const { status } = error.response as AxiosResponse<apiResponse, unknown>;

  if(status == 401) {
    console.log('401 error');
  }

  if(status == 403) {
    console.log('403 error');
  }

  if(status == 500) {
    console.log('500 error');
  }

  return error;
})

export default axiosInstance;