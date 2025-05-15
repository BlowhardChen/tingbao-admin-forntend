import { defineStore } from "pinia";
import { GlobalUser, UserState } from "../interface";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: "",
    userInfo: null
  }),

  actions: {
    // 存储toke
    setToken(token: string) {
      this.token = token;
    },

    // 移除token
    removeToken() {
      this.token = "";
    },

    // 存储用户信息
    setUserInfoData(user: GlobalUser) {
      this.userInfo = user;
    },

    // 移除用户信息
    removeUserInfoData() {
      this.userInfo = null;
    }
  }
});
