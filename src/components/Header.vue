<script>
import { S_login } from '@/http/api';

export default {
  name: 'Header',
  data() {
    return {
      isDark: false,
      isDisplay: true,
      loginParams: {
        Account: '',
        Password: '',
      },
    };
  },
  computed: {},
  methods: {
    // 深夜模式 切換
    darkModeToggle() {
      this.isDark = !this.isDark;
      this.$emit('dark-mode-emit');
    },
    // 登入視窗 顯示
    loginModalToggle() {
      const token = localStorage.getItem('nowsideToken');
      if (token) {
        this.$router.push({ path: '/account' });
      } else {
        this.isDisplay = !this.isDisplay;
      }
    },
    // 登入視窗 關閉
    closeLoginModal() {
      this.isDisplay = !this.isDisplay;
    },
    // 登入會員
    postLogin() {
      S_login(this.loginParams)
      .then(res =>{
        console.log('message：', res.data.message);
        console.log('token：', res.data.token);
        localStorage.setItem('nowsideToken', res.data.token);
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
}
</script>

<template>
  <!-- LoginModal -->
  <article
    v-if="isDisplay === true"
    class="flex fixed top-0 left-0 z-50 justify-center items-center w-screen h-screen"
  >
    <!-- Modal-Overlay -->
    <section
      class="absolute top-0 left-0 w-full h-full bg-white/30 dark:bg-C_gray-900/30 backdrop-blur-md"
      @click="closeLoginModal"
    ></section>
    <!-- Modal-Window -->
    <section class="relative mx-auto min-w-[464px] nowside-shadow">
      <div class="my-8 mx-auto max-w-[384px]">
        <div class="my-8">
          <!-- LOGO + 信箱密碼 input -->
          <div class="mb-14 text-C_gray-700">
            <!-- LOGO -->
            <div class="mb-12">
              <img
                src="../assets/logo-login.svg"
                alt="logo"
                class="mx-auto max-h-[126px] align-middle"
              >
            </div>
            <!-- 信箱密碼 input -->
            <div class="mb-4">
              <form class="relative mb-6">
                <input
                  id="account"
                  v-model="loginParams.Account"
                  name="account" 
                  type="text"
                  class="peer nowside-peerInput"
                  placeholder="信箱"
                >
                <label
                  for="account"
                  class="nowside-peerLabel"
                  :class="[ loginParams.Account ? 'nowside-peerFilled' : '' ]"
                >信箱</label>
              </form>
              <form class="relative">
                <input
                  id="password"
                  v-model="loginParams.Password"
                  type="password"
                  name="password"     
                  class="peer nowside-peerInput"
                  placeholder="密碼"
                >
                <label
                  for="password"
                  class="nowside-peerLabel"
                  :class="[ loginParams.Password ? 'nowside-peerFilled' : '' ]"
                >密碼</label>
              </form>
            </div>
            <!-- 記住帳號密碼 checkbox -->
            <div class="flex justify-between">
              <form class="flex items-center pl-2">
                <input
                  id="remember"
                  type="checkbox"
                  class="nowside-checkbox"
                >
                <label
                  for="remember"
                  class="text-sm"
                >記住帳號密碼</label>
              </form>
              <div class="pr-2">
                <span class="text-sm text-C_green-500">忘記密碼？</span>
              </div>
            </div>
          </div>
          <!-- 登入註冊按鈕 + 底部文字 -->
          <div>
            <button
              type="button"
              class="nowside-button-darkBlue-lg"
              @click="postLogin"
            >
              登入
            </button>
            <router-link
              class="mb-12 nowside-button-lightBlue-lg"
              to="/signup"
            >
              立即註冊
            </router-link>
            <p class="flex justify-center text-xs text-C_blue-600">
              沒有信箱？立即註冊
            </p>
          </div>
        </div>
      </div>
    </section>
  </article>
  <!-- Header -->
  <article
    class="flex fixed z-40 justify-center items-center w-screen h-[60px] text-lg text-C_blue-700 dark:text-white bg-white dark:bg-black shadow-md dark:shadow-gray-800"
  >
    <div class="mr-36 w-[196px]">
      <router-link to="/">
        <img
          src="../assets/logo-header.svg"
          alt="logo-header"
          class="mx-auto align-middle"
        >
      </router-link>
    </div>
    <ul class="flex justify-between items-center w-[950px]">
      <!-- 成功案例 -->
      <li>
        <router-link
          class="font-medium active:text-C_green-500 border-b-4 border-C_blue-300/0 hover:border-C_green-300/100"
          to="/success"
        >
          成功案例
        </router-link>
      </li>
      <!-- 瀏覽專案 -->
      <li>
        <router-link
          class="font-medium active:text-C_green-500 border-b-4 border-C_blue-300/0 hover:border-C_green-300/100"
          to="/project"
        >
          瀏覽專案
        </router-link>
      </li>
      <!-- 發起專案 -->
      <li>
        <router-link
          class="font-medium active:text-C_green-500 border-b-4 border-C_blue-300/0 hover:border-C_green-300/100"
          to="/create"
        >
          發起專案
        </router-link>
      </li>
      <!-- 深夜模式 -->
      <li>
        <button @click="darkModeToggle">
          <span
            class="text-2xl align-sub material-icons"
            :class="isDark ? 'text-orange-400' : ''"
            v-text="isDark ? 'light_mode' : 'dark_mode'"
          ></span>
        </button>
      </li>
      <!-- 訊息 -->
      <li>
        <router-link to="/accountmessage">
          <span class="text-2xl align-sub material-icons">notifications</span>
        </router-link>
      </li>
      <!-- 登入 -->
      <li>
        <button @click="loginModalToggle">
          <span class="text-2xl align-sub material-icons">account_circle</span>
        </button>
      </li>
    </ul>
  </article>
</template>
