<script>
import { S_login } from '@/http/api';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
// import button 

export default {
  name: 'App',
  components: {
    Header, Footer,
  },
  data() {
    return {
      isDark: false,
      isDisplay: false,
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
  mounted() {},
  methods: {
    // 深夜模式 切換
    darkModeToggle() {
      this.isDark = !this.isDark;
    },
    // 發起專案 驗證
    createProjectToggle() {
      this.isDisplay = true;
      const token = localStorage.getItem('nowsideToken');
      if (token) {
        this.isDisplay = false;
        this.$router.push({ path: '/create' });
      } else {
        this.isDisplay = true;
      }
    },
    // 登入視窗 顯示
    loginModalToggle() {
      this.isDisplay = true;
      const token = localStorage.getItem('nowsideToken');
      if (token) {
        this.isDisplay = false;
        this.$router.push({ path: '/account' });
      } else {
        this.isDisplay = true;
      }
    },
    // 登入視窗 關閉
    closeLoginModal() {
      this.isDisplay = false;
    },
    // 登入會員
    postLogin() {
      S_login(this.loginParams)
      .then(res =>{
        console.log('message：', res.data.message);
        console.log('token：', res.data.token);
        localStorage.setItem('nowsideToken', res.data.token);
        this.isDisplay = false;

        this.$notify({
          group: "foo",
          title: "Success",
          text: "登入成功，歡迎來到 Side Project Now。"
        }, 3500)
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 註冊會員
    toSignup() {
        this.isDisplay = false;
        this.$router.push({ path: '/signup' });
    },
  },
}
</script>

<template>
  <article :class="isDark ? 'dark' : ''">
    <NotificationGroup group="foo">
      <div
        class="flex fixed top-16 right-6 z-50 justify-end items-start pointer-events-none"
      >
        <div class="w-full max-w-sm">
          <Notification
            v-slot="{ notifications }"
            enter="transform ease-out duration-300 transition"
            enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
            enter-to="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-500"
            leave-from="opacity-100"
            leave-to="opacity-0"
            move="transition duration-500"
            move-delay="delay-300"
          >
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="flex overflow-hidden mx-auto mt-4 w-full max-w-sm bg-white dark:bg-[#333333] rounded-lg shadow-md"
            >
              <div class="flex justify-center items-center w-12 bg-C_green-500">
                <svg
                  class="w-6 h-6 text-white fill-current"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z"></path>
                </svg>
              </div>

              <div class="py-3 px-5 -mx-3">
                <div class="mx-3">
                  <span class="text-lg font-semibold text-C_green-500">{{ notification.title }}</span>
                  <p class=" text-gray-600 dark:text-C_blue-200">
                    {{ notification.text }}
                  </p>
                </div>
              </div>
            </div>
          </Notification>
        </div>
      </div>
    </NotificationGroup>
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
                      @keydown.enter="postLogin"
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
                <button
                  type="button"
                  class="mb-12 nowside-button-lightBlue-lg"
                  @click="toSignup"
                >
                  立即註冊
                </button>
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
        @create-projectT-toggle="createProjectToggle"
      ></Header>
      <router-view></router-view>
      <Footer></Footer>
    </section>
  </article>
</template>

<style></style>
