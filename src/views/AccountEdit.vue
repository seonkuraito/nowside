<script>
import { S_getSkills, S_getUserInfo, S_editUserInfo, S_uploadProfile } from '@/http/api';
import multiselect from '@vueform/multiselect'

export default {
  name: 'AccountEdit',
  components: {
    multiselect,
  },
  data() {
    return {
      skillsData: [
        {
          Id: 0,
          skill: '',
        },
      ],
      accountParams: {
        ProfilePicture: '',
        NickName: '',
        Gender: '',
        Account: '',
        Fb: '',
        Ig: '',
        ProfileWebsite: '',
        ContactTime: '',
        WorkState: '',
        Language: '',
        Company: '',
        Industry: '',
        Position: '',
        JobDescription: '',
        Skills: null,
        SelfIntroduction: '',
      },
      password: '',
      confirm: '',
    };
  },
  computed: {},
  mounted() {
    this.getSkillsParams();
    this.getAccountParams();
  },
  methods: {
    // 取得技能列表
    getSkillsParams() {
      S_getSkills().then(res =>{
        console.log('技能列表', res.data.Skilldata);
        this.skillsData = res.data.Skilldata;

        const data = [];
        this.skillsData.forEach(function(item) {
          data.push({ value: item.Id, label: item.skill });
        });
        this.skillsData = data;
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 取得會員資料
    getAccountParams() {
      S_getUserInfo().then(res =>{
        console.log('取得會員資料', res.data.userdata);
        this.accountParams = res.data.userdata;

        const data = [];
        this.accountParams.Skills.forEach(function(item) {
          data.push(item.Id);
        });
        this.accountParams.Skills = data;
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 編輯會員資料 圖片上傳
    uploadImage(e) {
      console.log(e.target.files[0]);
      const formdata = new FormData;
      formdata.append(e.target.files[0].name, e.target.files[0]);
      
      S_uploadProfile(formdata).then(res =>{
        console.log('編輯會員資料 圖片上傳', res.data);
        this.accountParams.ProfilePicture = res.data.data.ProfilePicture;
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 編輯會員資料
    editAccountParams(){
      S_editUserInfo(this.accountParams).then(res =>{
        console.log('編輯會員資料', res.data);
        this.$router.push({ name: 'Account' });

        this.$notify({
          group: "foo",
          title: "Success",
          text: "編輯成功，會員資料已更新。"
        }, 3500)
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
}
</script>

<template>
  <article class="py-[180px] w-full h-full">
    <div class="py-14 px-10 nowside-container-lg nowside-shadow">
      <!-- 大頭貼 + 個人資料 -->
      <section class="flex justify-between items-center mb-[72px]">
        <!-- 【左】大頭貼 + 按鈕 -->
        <div class="relative h-[280px]">
          <div
            class="w-[280px] h-[280px] rounded-full nowside-backgroundImage"
            :style="{ 'background-image': `url('http://sideprojectnow.rocket-coding.com/Upload/ProfilePicture/${accountParams.ProfilePicture}')` }"
          ></div>
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
            class="flex absolute right-8 bottom-0 justify-center items-center w-[48px] h-[48px] bg-C_green-500 hover:bg-C_green-400 rounded-full border-4 border-white nowside-backgroundImage"
            @click="$refs.uploadImage.click()"
          >
            <span class="text-2xl text-white align-sub material-icons">
              monochrome_photos
            </span>
          </button>
        </div>
        <!-- 【右】個人資料 -->
        <div class="flex flex-col items-end min-w-[936px]">
          <!-- 寬度撐滿 -->
          <div class="mb-12 w-full text-xl font-medium text-C_blue-600 border-b-2 border-C_blue-400">
            個人資料
          </div>
          <!-- 寬度靠右 -->
          <ul class="w-[896px]">
            <!-- 暱稱 + 性別 -->
            <li class="flex flex-nowrap justify-between mb-12 h-[40]">
              <form class="flex justify-between items-center w-[648px]">
                <label
                  for="nickName"
                  class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
                >暱稱</label>
                <input
                  id="nickName"
                  v-model="accountParams.NickName"
                  name="nickName" 
                  type="text"
                  class="nowside-input"
                >
              </form>
              <form class="flex justify-between items-center w-[224px]">
                <label
                  for="gender"
                  class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
                >性別</label>
                <input
                  id="gender"
                  v-model="accountParams.Gender"
                  name="gender" 
                  type="text"
                  class="cursor-not-allowed nowside-input"
                  disabled
                >
              </form>
            </li>
            <!-- 信箱 -->
            <li class="mb-12 h-[40]">
              <form class="flex justify-between items-center">
                <label
                  for="account"
                  class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
                >信箱</label>
                <input
                  id="account"
                  v-model="accountParams.Account"
                  name="account" 
                  type="text"
                  class="nowside-input"
                >
              </form>
            </li>
            <!-- 密碼 -->
            <li class="mb-12 h-[40]">
              <form class="flex justify-between items-center">
                <label
                  for="password"
                  class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
                >密碼</label>
                <input
                  id="password"
                  v-model="password"
                  name="password" 
                  type="password"
                  class="nowside-input"
                >
              </form>
            </li>
            <!-- 確認密碼 -->
            <li class="mb-12 h-[40]">
              <form class="flex justify-between items-center">
                <label
                  for="confirm"
                  class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
                >確認密碼</label>
                <input
                  id="confirm"
                  v-model="confirm"
                  name="confirm" 
                  type="password"
                  class="nowside-input"
                >
              </form>
            </li>
            <!-- FB -->
            <li class="mb-12 h-[40]">
              <form class="flex justify-between items-center">
                <label
                  for="fb"
                  class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
                >FB</label>
                <input
                  id="fb"
                  v-model="accountParams.Fb"
                  name="fb" 
                  type="text"
                  class="nowside-input"
                >
              </form>
            </li>
            <!-- IG -->
            <li class="mb-12 h-[40]">
              <form class="flex justify-between items-center">
                <label
                  for="ig"
                  class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
                >IG</label>
                <input
                  id="ig"
                  v-model="accountParams.Ig"
                  name="ig" 
                  type="text"
                  class="nowside-input"
                >
              </form>
            </li>
            <!-- 個人網站 -->
            <li class="mb-12 h-[40]">
              <form class="flex justify-between items-center">
                <label
                  for="profileWebsite"
                  class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
                >個人網站</label>
                <input
                  id="profileWebsite"
                  v-model="accountParams.ProfileWebsite"
                  name="profileWebsite" 
                  type="text"
                  class="nowside-input"
                >
              </form>
            </li>
            <!-- 聯絡時間 -->
            <li>
              <form class="flex justify-between items-center">
                <label
                  for="contactTime"
                  class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
                >聯絡時間</label>
                <input
                  id="contactTime"
                  v-model="accountParams.ContactTime"
                  name="contactTime" 
                  type="text"
                  class="nowside-input"
                >
              </form>
            </li>
          </ul>
        </div>
      </section>
      <!-- 專業背景 -->
      <section class="flex flex-col items-end">
        <!-- 寬度撐滿 -->
        <div class="mb-12 w-full text-xl font-medium text-C_blue-600 border-b-2 border-C_blue-400">
          專業背景
        </div>
        <!-- 寬度 1176px 靠右 -->
        <ul class="mb-14 w-[1176px]">
          <!-- 目前狀態 + 語言 -->
          <li class="flex flex-nowrap justify-between mb-12 h-[40px]">
            <form class="flex justify-between items-center w-[728px]">
              <label
                for="workState"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >目前狀態</label>
              <input
                id="workState"
                v-model="accountParams.WorkState"
                name="workState" 
                type="text"
                class="nowside-input"
              >
            </form>
            <form class="flex justify-between items-center w-[424px]">
              <label
                for="language"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >語言</label>
              <input
                id="language"
                v-model="accountParams.Language"
                name="language" 
                type="text"
                class="nowside-input"
              >
            </form>
          </li>
          <!-- 公司 + 產業 -->
          <li class="flex flex-nowrap justify-between mb-12 h-[40px]">
            <form class="flex justify-between items-center w-[728px]">
              <label
                for="company"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >公司</label>
              <input
                id="company"
                v-model="accountParams.Company"
                name="company" 
                type="text"
                class="nowside-input"
              >
            </form>
            <form class="flex justify-between items-center w-[424px]">
              <label
                for="industry"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >產業</label>
              <input
                id="industry"
                v-model="accountParams.Industry"
                name="industry" 
                type="text"
                class="nowside-input"
              >
            </form>
          </li>
          <!-- 工作內容 + 職務 -->
          <li class="flex flex-nowrap justify-between mb-12 h-[40px]">
            <form class="flex justify-between items-center w-[728px]">
              <label
                for="position"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >工作內容</label>
              <input
                id="position"
                v-model="accountParams.Position"
                name="position" 
                type="text"
                class="nowside-input"
              >
            </form>
            <form class="flex justify-between items-center w-[424px]">
              <label
                for="jobDescription"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >職務</label>
              <input
                id="jobDescription"
                v-model="accountParams.JobDescription"
                name="jobDescription" 
                type="text"
                class="nowside-input"
              >
            </form>
          </li>
          <!-- 技能 -->
          <li class="mb-12">
            <form class="flex justify-between items-center">
              <label
                for="profileWebsite"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >技能</label>
              <multiselect
                v-model="accountParams.Skills"
                mode="tags"
                :classes="{
                  container: 'relative p-1 mx-auto w-full h-[140px] flex items-start justify-end box-border cursor-pointer border-2 border-C_gray-300 dark:border-C_gray-900 rounded bg-C_gray-100 dark:bg-[#333333] text-base leading-snug outline-none',
                  containerActive: 'border-2 ring-2 ring-C_green-500',
                  tag: 'flex items-center py-0.5 pl-2 mr-2 mb-2 text-C_blue-700 whitespace-nowrap bg-C_blue-200 rounded',
                  tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full bg-C_gray-100 dark:bg-[#333333]',
                }"
                :close-on-select="false"
                :searchable="true"
                :create-option="true"
                :options="skillsData"
              ></multiselect>
            </form>
          </li>
          <!-- 自我介紹 -->
          <li>
            <form class="flex justify-between items-center">
              <label
                for="selfIntroduction"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >自我介紹</label>
              <textarea
                id="selfIntroduction"
                v-model="accountParams.SelfIntroduction"
                class="nowside-textarea"
                name="selfIntroduction"
                rows="5"
                maxlength="1000"
              ></textarea>
            </form>
          </li>
        </ul>
        <!-- 儲存取消按鈕 -->
        <div class="flex justify-center w-full">
          <router-link
            class="flex justify-center items-center nowside-button-white-md"
            to="/account"
          >
            取消
          </router-link>
          <button
            class="flex justify-center items-center nowside-button-lightGreen-md"
            @click="editAccountParams"
          >
            <span class="mr-1 material-icons">bookmark_border</span>
            儲存
          </button>
        </div>
      </section>
    </div>
  </article>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
