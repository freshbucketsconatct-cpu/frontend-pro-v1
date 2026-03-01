import { BASE_URL } from "@src/config/config";
import { clear } from "console";

export const apiRoutes = {
  login: {
    POST: {
      query: "Login",
      method: "POST",
      url: `${BASE_URL}/api/auth/login`,
    },
  },
  signup: {
    POST: {
      query: "Signup",
      method: "POST",
      url: `${BASE_URL}/api/auth`,
    },
  },
  getProducts: {
    POST: {
      query: "ProductsList",
      method: "GET",
      url: `${BASE_URL}/api/products`,
    },
  },
    getProductsByID: {
    GET: {
      query: "GetProduct",
      method: "GET",
      url: `${BASE_URL}/api/products`,
    },
  },
  addwishList: {
    POST: {
      query: "AddWishList",
      method: "POST",
      url: `${BASE_URL}/api/products/wishlist/add`,
    },
  },
  //here put wishlist id
  deletewishList: {
    DELETE: {
      query: "DeleteWishList",
      method: "DELETE",
      url: `${BASE_URL}/api/products/wishlist/remove`,
    },
  },
  clearwishList: {
    DELETE: {
      query: "ClearWishList",
      method: "DELETE",
      url: `${BASE_URL}/api/products/wishlist/clear`,
    },
  },
  getwishlistbyuserID: {
    GET: {
      query: "GetWishListByUserID",
      method: "GET",
      url: `${BASE_URL}/api/products/wishlist`,
    },
  },
};
