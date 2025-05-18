import { defineStore } from "pinia";
import { UserState } from "@/stores/interface";
import piniaPersistConfig from "@/config/piniaPersist";
import { Login } from "@/api/interface/login";

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    token: "",
    userInfo: {} as Login.UserAccountInfo
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo: Login.UserAccountInfo) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig("user")
});
