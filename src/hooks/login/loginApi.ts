import axiosInstance from '@/configs/axios/axiosConfig';

export interface loginData {
  email: string;
  password: string;
  authLogin: string;
}


export const loginFunc = () => {
  

  const loginProcess = async (param: loginData) => {
    
    try {
      const response = await axiosInstance.post(`https://ymjm.synology.me:28081/auth/login`, param);

      console.log(response);

    } catch (error) {
      console.log(error);
    }
  }
  return {
    loginProcess
  }
}
