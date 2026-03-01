"use client";
import { selectAuthToken, selectUser } from "@src/redux/reducers/authSlice";
import { useAppSelector } from "@src/redux/store";

const useAuth = () => {
  const authToken = useAppSelector(selectAuthToken);
  const user = useAppSelector(selectUser);

  const isLoggedIn = !!authToken;
  console.log("hello login is here");
  //const modelType = user?.modelType ?? null;

  return { isLoggedIn, user };
};

export default useAuth;
