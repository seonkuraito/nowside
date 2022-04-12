<script>
import { S_login } from '@/http/api';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header, Footer,
  },
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
  computed: {
    // 背景圖 切換
    backgroundImage() {
      let style = 'str';
      switch (this.isDark) {
        case false:
          style = 'background-image: linear-gradient(45deg, #DFF5F1 5% , #ffffff 40%, #A7CBEA 150%); background-attachment: fixed;';
          break
        case true:
          style = 'background-image: linear-gradient(to right bottom, #62a79f, #4a8b8c, #356f77, #255461, #173b49, #17303e, #162633, #131c27, #181d25, #1c1d23, #1f1f22, #202020); background-attachment: fixed;';
          break
      };
      return style;
    },
  },
  methods: {
    // 深夜模式 切換
    darkModeToggle() {
      this.isDark = !this.isDark;
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
        this.$router.push({ path: '/account' });
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
}
</script>

<template>
  <article :class="isDark ? 'dark' : ''">
    <section
      class="w-full h-full"
      :style="backgroundImage"
    >
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
                    src="./assets/logo-login.svg"
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
      <Header
        @dark-mode-emit="darkModeToggle"
        @login-modal-emit="loginModalToggle"
      ></Header>
      <router-view></router-view>
      <Footer></Footer>
    </section>
  </article>
</template>

<style></style>
