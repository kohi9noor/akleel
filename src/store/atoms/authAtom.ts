import { UserType } from "@/types/user";
import { atom, selector } from "recoil";

export interface AuthAtom {
  userInfo: undefined | UserType;
}

const userInfo: AuthAtom = {
  userInfo: {
    id: 0,
    email: "",
  },
};

export const authState = atom<UserType | undefined>({
  key: "authState",
  default: undefined,
});

export const AuthListState = selector<UserType | undefined>({
  key: "authUserInfo",
  get: ({ get }) => {
    const userInfo = get(authState);
    console.log(userInfo);
    return userInfo;
  },
});
