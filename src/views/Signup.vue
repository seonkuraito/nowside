<script>
import { S_uploadProfile, S_signup, S_login, } from '@/http/api';
import default06 from '../assets/default-06.png';
import default07 from '../assets/default-07.png';
import default08 from '../assets/default-08.png';

export default {
  name: 'Signup',
  components: {},
  props: {
    NickName: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      isDark: false,
      defaultPicture: [
        {
          Id: 6,
          Title: 'default-06.png',
          Content: default06,
        },
        {
          Id: 7,
          Title: 'default-07.png',
          Content: default07,
        },
        {
          Id: 8,
          Title: 'default-08.png',
          Content: default08,
        },
      ],
      contactTime: [
        {
          Id: 1,
          Content: '00:00～03:00 AM',
        },
        {
          Id: 2,
          Content: '03:00～06:00 AM',
        },
        {
          Id: 3,
          Content: '06:00～09:00 AM',
        },
        {
          Id: 4,
          Content: '09:00～12:00 AM',
        },
        {
          Id: 5,
          Content: '12:00～03:00 PM',
        },
        {
          Id: 6,
          Content: '03:00～06:00 PM',
        },
        {
          Id: 7,
          Content: '06:00～09:00 PM',
        },
        {
          Id: 8,
          Content: '09:00～12:00 PM',
        },
      ],
      signupParams: {
        Account: '',
        Password: '',
        NickName: 'Mr. / Miss Sider',
        Gender: '',
        ProfilePicture: '',
        ContactTime: '09:00～12:00 PM',
      },
      Confirm: '',
      displayStep1: true,
      displayStep2: false,
      displayStep3: false,
      displayStep4: false,
      displayStep5: false,
    };
  },
  computed: {
    // Step2 下一步 disabled 條件
    isDisabledStep2() {
      return (this.signupParams.Password === this.Confirm && this.signupParams.Password !== '') ? false : true;
    },
    // Step2 下一步 disabled 樣式
    notAllowedStep2() {
      return (this.signupParams.Password === this.Confirm && this.signupParams.Password !== '') ? '' : 'cursor-not-allowed';
    },
    // Step4 下一步 disabled 條件
    isDisabledStep4() {
      return (this.signupParams.ProfilePicture === '') ? true : false;
    },
    // Step4 下一步 disabled 樣式
    notAllowedStep4() {
      return (this.signupParams.ProfilePicture === '') ? 'cursor-not-allowed' : '';
    },
    // 大頭貼 預覽
    profileImage() {
      let style = 'str';
      switch (this.profileStatus) {
        case false:
          style = `background-image: url('http://sideprojectnow.rocket-coding.com/Upload/ProfilePicture/${signupParams.ProfilePicture}')`;
          break
        case true:
          style = `background-image: url('http://sideprojectnow.rocket-coding.com/Upload/ProfilePicture/${signupParams.ProfilePicture}')`;
          break
      };
      return style;
    },
  },
  mounted() {
    if (this.NickName) this.signupParams.NickName = this.NickName;
  },
  methods: {
    // 註冊會員 圖片上傳
    uploadImage(e) {
      console.log(e.target.files[0]);
      const formdata = new FormData;
      formdata.append(e.target.files[0].name, e.target.files[0]);
      
      S_uploadProfile(formdata).then(res =>{
        console.log(res.data);
        this.signupParams.ProfilePicture = res.data.data.ProfilePicture;
        this.displayStep4 = !this.displayStep4;
        this.displayStep5 = !this.displayStep5;
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 註冊會員
    postSignup() {
      S_signup(this.signupParams).then(res =>{
        console.log(res.data.message);
        const loginParams = {
          Account: this.signupParams.Account,
          Password: this.signupParams.Password,
        };
        this.postLogin(loginParams);
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 登入會員
    postLogin(params) {
      S_login(params)
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
  <!-- Step1 暱稱 -->
  <article
    v-if="displayStep1 === true"
    class="flex overflow-hidden relative flex-col justify-center min-h-screen"
  >
    <div class="relative mx-auto min-w-[464px] nowside-shadow">
      <div class="mx-auto max-w-[384px]">
        <section class="my-8">
          <!-- LOGO -->
          <div class="my-12">
            <img
              src="../assets/logo-signup.svg"
              alt="logo"
              class="mx-auto max-h-[126px] align-middle"
            >
          </div>
          <!-- 暱稱 input -->
          <div class="flex flex-col justify-center items-center mb-14 text-C_blue-700 dark:text-C_blue-400">
            <p class="mb-8 text-3xl font-medium">
              歡迎進入腦塞 Project世界
            </p>
            <form class="flex relative justify-center items-center mb-8">
              <input
                id="NickName"
                v-model="signupParams.NickName"
                name="NickName"
                type="text"
                class="w-4/5 text-3xl font-medium text-center dark:bg-C_black focus:outline-none focus:ring-0"
              >
              <span class="inline-block absolute right-4 bottom-2 ml-1 text-3xl text-C_green-500 rounded material-icons">edit</span>
            </form>
            <p class="text-lg text-center text-C_blue-500 dark:text-C_blue-200">
              以下所填寫的資訊將有助於<br>幫助我們推薦適合你的專案項目
            </p>
          </div>
          <!-- 按鈕 -->
          <div>
            <button
              type="button"
              class="mb-12 nowside-button-darkBlue-lg"
              @click="displayStep1 = !displayStep1, displayStep2 = !displayStep2"
            >
              開始
            </button>
            <p class="flex justify-center text-sm text-C_blue-600 dark:text-C_blue-200">
              已經有腦塞project的帳戶了嗎？
              <router-link
                class="text-C_green-500"
                to="/"
              >
                立即登入
              </router-link>
            </p>
          </div>
        </section>
      </div>
    </div>
  </article>
  <!-- Step2 帳密 -->
  <article
    v-if="displayStep2 === true"
    class="flex overflow-hidden relative flex-col justify-center min-h-screen"
  >
    <div class="relative mx-auto min-w-[464px] nowside-shadow">
      <div class="mx-auto max-w-[384px]">
        <section class="my-8">
          <!-- 標題 -->
          <div class="my-12 text-center text-C_blue-700 dark:text-C_blue-400">
            <p class="text-3xl font-medium">
              請輸入註冊信箱、密碼
            </p>
          </div>
          <!-- 信箱密碼 input -->
          <div class="mb-14">
            <form>
              <div class="relative mb-8">
                <input
                  id="account"
                  v-model="signupParams.Account"
                  name="account" 
                  type="text"
                  class="peer nowside-peerInput"
                  placeholder="信箱"
                >
                <label
                  for="account"
                  class="nowside-peerLabel"
                  :class="[ signupParams.Account ? 'nowside-peerFilled' : '' ]"
                >信箱</label>
              </div>
              <div class="relative mb-8">
                <input
                  id="password"
                  v-model="signupParams.Password"
                  type="password"
                  name="password"     
                  class="peer nowside-peerInput"
                  placeholder="密碼"
                >
                <label
                  for="password"
                  class="nowside-peerLabel"
                  :class="[ signupParams.Password ? 'nowside-peerFilled' : '' ]"
                >密碼</label>
              </div>
              <div class="relative">
                <input
                  id="confirm"
                  v-model="Confirm"
                  type="password"
                  name="confirm"     
                  class="peer nowside-peerInput"
                  placeholder="確認密碼"
                >
                <label
                  for="confirm"
                  class="nowside-peerLabel"
                  :class="[ Confirm ? 'nowside-peerFilled' : '' ]"
                >確認密碼</label>
              </div>
            </form>
          </div>
          <!-- 按鈕 -->
          <div>
            <button
              :disabled="isDisabledStep2"
              :class="notAllowedStep2"
              type="button"
              class="mb-12 nowside-button-darkBlue-lg"
              @click="displayStep2 = !displayStep2, displayStep3 = !displayStep3"
            >
              下一步
            </button>
            <p class="flex justify-center text-xs text-C_blue-600 dark:text-C_blue-200">
              完成後，進一步填寫個人資料設定
            </p>
          </div>
        </section>
      </div>
    </div>
  </article>
  <!-- Step3 性別 -->
  <article
    v-if="displayStep3 === true"
    class="flex overflow-hidden relative flex-col justify-center min-h-screen"
  >
    <div class="relative mx-auto min-w-[464px] nowside-shadow">
      <div class="mx-auto max-w-[384px]">
        <section class="my-8">
          <!-- 標題 -->
          <div class="my-12 text-center text-C_blue-700 dark:text-C_blue-400">
            <p class="text-3xl font-medium">
              請問您的性別
            </p>
          </div>
          <!-- 性別 radio -->
          <div class="flex flex-col items-center mb-14 text-lg">
            <form class="mb-8">
              <input
                id="male"
                v-model="signupParams.Gender"
                value="男"
                name="gender"
                class="nowside-genderRadio"
                type="radio"
              >
              <label
                for="male"
                class="ml-2 text-C_blue-700 dark:text-C_blue-400"
              >男性</label>
            </form>
            <form class="mb-8">
              <input
                id="female"
                v-model="signupParams.Gender"
                value="女"
                name="gender"
                class="nowside-genderRadio"
                type="radio"
              >
              <label
                for="female"
                class="ml-2 text-C_blue-700 dark:text-C_blue-400"
              >女性</label>
            </form>
            <form>
              <input
                id="other" 
                v-model="signupParams.Gender"
                value="其他"
                name="gender"
                class="nowside-genderRadio"
                type="radio"
              >
              <label
                for="other"
                class="ml-2 text-C_blue-700 dark:text-C_blue-400"
              >其他</label>
            </form>
          </div>
          <!-- 按鈕 -->
          <div>
            <button
              type="button"
              class="mb-12 nowside-button-darkBlue-lg"
              @click="displayStep3 = !displayStep3, displayStep4 = !displayStep4"
            >
              下一步
            </button>
            <p class="flex justify-center text-xs text-C_blue-600 dark:text-C_blue-200">
              完成後，進一步填寫個人資料設定
            </p>
          </div>
        </section>
      </div>
    </div>
  </article>
  <!-- Step4 圖片 -->
  <article
    v-if="displayStep4 === true"
    class="flex overflow-hidden relative flex-col justify-center min-h-screen"
  >
    <div class="relative mx-auto min-w-[464px] nowside-shadow">
      <div class="mx-auto max-w-[384px]">
        <section class="my-8">
          <!-- 圖片輪播 -->
          <div class="my-12 text-C_gray-700">
            <div class="flex justify-around items-center mb-14 w-full">
              <span class="text-3xl text-C_blue-700 material-icons">arrow_back_ios</span>
              <button
                v-for="picture in defaultPicture"
                :key="picture.Id"
                type="button"
                class="overflow-hidden w-[96px] h-[96px] rounded-full border-2 hover:border-4 dark:hover:border-4 border-C_gray-300 hover:border-C_green-500 dark:border-C_gray-900 dark:hover:border-C_green-500"
                @click="signupParams.ProfilePicture = picture.Title"
              >
                <img
                  :src="picture.Content"
                  :alt="picture.Title"
                  class="align-middle"
                >
              </button>
              <span class="text-3xl text-C_blue-700 material-icons">arrow_forward_ios</span>
            </div>
          </div>
          <!-- 內容 -->
          <div class="mb-14 text-center">
            <p class="mb-6 text-3xl font-medium text-C_blue-700 dark:text-C_blue-400">
              請對您的大頭貼進行設定
            </p>
            <p class="text-lg text-C_blue-500 dark:text-C_blue-200">
              或是選擇我們提供的預設素材
            </p>
          </div>
          <!-- 按鈕 -->
          <div>
            <form>
              <input
                ref="uploadImage"
                type="file"
                class="hidden"
                @change="uploadImage"
              >
            </form>
            <button
              type="button"
              class="nowside-button-darkBlue-lg"
              @click="$refs.uploadImage.click()"
            >
              上傳
            </button>
            <button
              :disabled="isDisabledStep4"
              type="button"
              class="mb-12 nowside-button-lightBlue-lg"
              :class="notAllowedStep4"
              @click="displayStep4 = !displayStep4, displayStep5 = !displayStep5"
            >
              下一步
            </button>
            <p class="flex justify-center text-xs text-C_blue-600 dark:text-C_blue-200">
              完成後，進一步填寫個人資料設定
            </p>
          </div>
        </section>
      </div>
    </div>
  </article>
  <!-- Step5 時間 -->
  <article
    v-if="displayStep5 === true"
    class="flex overflow-hidden relative flex-col justify-center min-h-screen"
  >
    <div class="relative mx-auto min-w-[464px] nowside-shadow">
      <div class="mx-auto max-w-[384px]">
        <section class="my-8">
          <!-- 大頭貼 -->
          <div class="flex justify-around items-center my-12 w-full">
            <div
              class="flex overflow-hidden items-center w-[160px] h-[160px] bg-C_gray-100 dark:bg-[#333333] rounded-full nowside-backgroundImage"
              :style="{ 'background-image': `url('http://sideprojectnow.rocket-coding.com/Upload/ProfilePicture/${signupParams.ProfilePicture}')` }"
            ></div>
            <!-- <img> -->
          </div>
          <!-- 內容 -->
          <div class="mb-12 text-center">
            <p class="text-3xl font-medium text-C_blue-700 dark:text-C_blue-400">
              {{ signupParams.NickName }}，請提供您方便回復專案等相關問題的時段 :D
            </p>
          </div>
          <!-- 聯絡時間 input -->
          <div class="mb-14">
            <select
              id="contactTime"
              v-model="signupParams.ContactTime"
              name="contactTime"
              class="py-4 pl-6 w-full text-lg font-bold text-C_blue-700 dark:text-C_blue-200 indent-20 bg-C_gray-100 dark:bg-[#333333] rounded border border-C_gray-700 focus:border-C_green-500 dark:border-C_gray-900 focus:outline-none active:outline-none focus:ring-C_green-500 form-select"
            >
              <option
                v-for="time in contactTime"
                :key="time.Id"
                :value="time.Content"
              >
                {{ time.Content }}
              </option>
            </select>
          </div>
          <!-- 按鈕 -->
          <div>
            <router-link
              class="mb-12 nowside-button-darkBlue-lg"
              to="/account"
              @click="postSignup"
            >
              完成
            </router-link>
            <p class="flex justify-center text-xs text-C_blue-600 dark:text-C_blue-200">
              完成後，進一步填寫個人資料設定
            </p>
          </div>
        </section>
      </div>
    </div>
  </article>
</template>
