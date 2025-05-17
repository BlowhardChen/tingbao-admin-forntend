<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <SwitchDark class="dark" />
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <h2 class="logo-text">婷宝美业后台管理系统</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from "./components/login-form.vue";
import SwitchDark from "@/components/switch-dark/index.vue";
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
