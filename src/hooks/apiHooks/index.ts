import { useMutation } from "react-query";
import useAxios from "../useAxios";
import { apiRoutes } from "./route";
import {
  ILoginRequest,
  ILoginResponce,
} from "@src/utils/@types/ILoginResponce";
import e from "cors";

const { login, signup , getProducts , getProductsByID , addwishList , deletewishList ,clearwishList , getwishlistbyuserID } = apiRoutes;

export const useUserLogin = () => {
  const { url, method } = login.POST;
  const callApi = useAxios();
  return useMutation<ILoginResponce, string, ILoginRequest>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response as ILoginResponce;
  });
};

export const useUserSignup = () => {
  const { url, method } = signup.POST;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response;
  });
};

export const useProductList = () => {
  const { url, method } = getProducts.POST;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response;
  });
};

export const useProductById = () => {
  const { url, method } = getProductsByID.GET;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url:`${url}/${data.id}`,
      data,
    });
    return response;
  });
};

export const useAddWishList = () => {
  const { url, method } = addwishList.POST;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response;
  });
}

export const useDeleteWishList = () => {
  const { url, method } = deletewishList.DELETE;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url:`${url}/${data.wishlistId}`,
      data,
    });
    return response;
  });
}

export const useClearWishList = () => {
  const { url, method } = clearwishList.DELETE;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response;
  });
}

export const useGetWishListByUserID = () => {
  const { url, method } = getwishlistbyuserID.GET;
  const callApi = useAxios();
  return useMutation<any, string, any>(async (data) => {
    const response = await callApi({
      method,
      url:`${url}/${data.userId}`,
      data,
    });
    return response;
  });
}