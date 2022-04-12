<script>
import {
  S_getSkills,
  S_getProjectClass,
  S_getProjectDetail,

  S_uploadGroupPic,
  S_uploadProjectBanner,
  S_uploadProjectPics,
  S_checkSussessProject,
} from '@/http/api';
import multiselect from '@vueform/multiselect'
import moment from 'moment';

export default {
  name: 'CreateSuccess',
  components: {
    multiselect,
  },
  props: {
    projectId: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      GroupNum: [
        {
          Value: 1,
          Content: '1 人',
        },
        {
          Value: 2,
          Content: '2 人',
        },
        {
          Value: 3,
          Content: '3 人',
        },
        {
          Value: 4,
          Content: '4 人',
        },
        {
          Value: 5,
          Content: '5 人',
        },
        {
          Value: 6,
          Content: '6 人',
        },
        {
          Value: 7,
          Content: '7 人',
        },
        {
          Value: 8,
          Content: '8 人',
        },
        {
          Value: 9,
          Content: '9 人',
        },
        {
          Value: 10,
          Content: '10 人',
        },
        {
          Value: 11,
          Content: '11 人',
        },
        {
          Value: 12,
          Content: '12 人',
        },
        {
          Value: 13,
          Content: '13 人',
        },
        {
          Value: 14,
          Content: '14 人',
        },
      ],
      skillsData: [
        {
          Id: 0,
          skill: '',
        },
      ],
      classData: [
        {
          Id: 0,
          ProjectType: '',
        },
      ],
      detailParams: {
        Id: 0,
        ProjectName: '',
        ProjectContext: '',
        GroupPhoto: '',
        InitDate: '',
        GroupDeadline: '',
        FinishedDeadline: '',
        GroupNum: 0,
        PartnerCondition: '',
        PartnerSkills: [],
        ProjectTypeId: [],
        ProjectState: '',
        Organizer: [], // 發起人資訊
        Applicants: [], // 參與人資訊
      },
      successParams: {
        ProjectName: '',
        GroupPhoto: '',
        ProjectWebsite: '',
        ProjectBanner: '',
        ProjectPhotos: '',
        ProjectExperience: ''
      },
    };
  },
  computed: {
    // 參加截止日
    groupDeadline() {
      return moment(this.detailParams.GroupDeadline).format('YYYY/MM/DD');
    },
    // 參加截止日
    finishedDeadline() {
      return moment(this.detailParams.FinishedDeadline).format('YYYY/MM/DD');
    },
  },
  mounted() {
    this.getSkillsParams();
    this.getClassParams();
    this.getDetailParams();
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
    // 取得專案類別列表
    getClassParams() {
      S_getProjectClass().then(res =>{
        console.log('專案類別列表', res.data.Classdata);
        this.classData = res.data.Classdata;
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 取得專案詳細
    getDetailParams() {
      S_getProjectDetail(this.projectId).then(res =>{
        console.log('專案詳細', res.data.userdata);
        this.detailParams = res.data.userdata;
        this.detailParams.ProjectTypeId = res.data.userdata.ProjectTypeId[0].Id;
        this.successParams.ProjectName = this.detailParams.ProjectName;
        this.successParams.GroupPhoto = this.detailParams.GroupPhoto;

        const data = [];
        this.detailParams.PartnerSkills.forEach(function(item) {
          data.push(item.Id);
        });
        this.detailParams.PartnerSkills = data;
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 完成專案資料 圖片上傳
    uploadImage(e) {
      console.log(e.target.files[0]);
      const formdata = new FormData;
      formdata.append(e.target.files[0].name, e.target.files[0]);
      
      S_uploadGroupPic(formdata).then(res =>{
        console.log('完成專案資料 圖片上傳', res.data);
        this.successParams.GroupPhoto = res.data.data.ProfilePicture;
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 完成專案資料 封面上傳
    uploadBanner(e) {
      console.log(e.target.files[0]);
      const formdata = new FormData;
      
      formdata.append(e.target.files[0].name, e.target.files[0]);
      
      S_uploadProjectBanner(formdata).then(res =>{
        console.log('完成專案資料 封面上傳', res.data);
        this.successParams.ProjectBanner = res.data.data.ProfilePicture;
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 完成專案資料 內容上傳
    uploadPhotos(e) {
      console.log(e.target.files);
      const formdata = new FormData;
      Array.from(e.target.files).forEach( function(pic) {
        formdata.append(pic.name, pic);
      });
      
      S_uploadProjectPics(formdata).then(res =>{
        console.log('完成專案資料 內容上傳', res.data);
        this.successParams.ProjectPhotos = res.data.data.ProfilePicture;
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 完成專案資料
    postProjectParams() {
      S_checkSussessProject(this.projectId, this.successParams).then(res =>{
        console.log('完成專案資料', res);
        this.$router.push({ name: 'Success' });

        this.$notify({
          group: "foo",
          title: "Success",
          text: "恭喜您，專案已成功完成。"
        }, 3500)
      })
      .catch(error => {
        console.log(error);
      });
    },
    // 時間格式
    timeFormat(date) {
      const time = moment(date).format('YYYY.MM.DD');
      return time;
    },
  },
}
</script>

<template>
  <article class="py-[180px] w-full h-full">
    <div class="py-24 px-14 mb-28 nowside-container-lg nowside-shadow">
      <!-- 專案圖片 -->
      <section class="flex flex-col justify-center items-center mb-24">
        <div class="relative mb-20 h-[415px]">
          <div
            class="w-[415px] h-[415px] rounded-full shadow-xl dark:shadow-gray-800 nowside-backgroundImage"
            :style="{ 'background-image': `url('http://sideprojectnow.rocket-coding.com/Upload/GroupPicture/${successParams.GroupPhoto}')` }"
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
            class="flex absolute right-16 bottom-0 justify-center items-center w-[48px] h-[48px] bg-C_green-500 hover:bg-C_green-400 rounded-full border-4 border-white nowside-backgroundImage"
            @click="$refs.uploadImage.click()"
          >
            <span class="text-2xl text-white align-sub material-icons">monochrome_photos</span>
          </button>
        </div>
        <form class="flex relative items-center w-[415px]">
          <input
            id="projectName"
            v-model="detailParams.ProjectName"
            name="projectName"
            type="text"
            class="w-full text-3xl font-medium text-center text-C_blue-400 dark:bg-C_black focus:outline-none focus:ring-0"
          >
          <span class="inline-block absolute right-4 bottom-2 text-3xl text-C_green-500 rounded material-icons">edit</span>
        </form>
      </section>
      <!-- 專案詳細 -->
      <section>
        <ul>
          <!-- 上傳封面 + 內容圖片 -->
          <li class="flex flex-nowrap justify-between mb-12 h-[40px]">
            <form class="flex relative justify-between items-center w-[514px]">
              <label
                for="uploadBanner"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >上傳封面</label>
              <input
                ref="uploadBanner"
                type="file"
                class="hidden"
                @change="uploadBanner"
              >
              <input
                v-model="successParams.ProjectBanner"
                type="text"
                class="w-full tracking-wide text-C_blue-600 dark:text-C_blue-200 bg-C_gray-100 dark:bg-[#333333] rounded border-2 border-C_gray-300 focus:border-C_green-500 dark:border-C_gray-900 focus:ring-2 focus:ring-C_green-500 form-input"
                disabled
              >
              <button
                type="button"
                class="flex absolute -right-[56px] bottom-0 justify-center items-center w-[40px] h-[40px] bg-C_blue-500 hover:bg-C_blue-400 dark:bg-C_blue-400 dark:hover:bg-C_blue-300 rounded-full nowside-backgroundImage"
                @click="$refs.uploadBanner.click()"
              >
                <span class="text-xl text-white material-icons">file_upload</span>
              </button>
            </form>
            <form class="flex relative justify-between items-center mr-[56px] w-[514px]">
              <label
                for="uploadPhotos"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >內容圖片</label>
              <input
                ref="uploadPhotos"
                type="file"
                class="hidden"
                multiple
                @change="uploadPhotos"
              >
              <input
                v-model="successParams.ProjectPhotos"
                type="text"
                class="w-full tracking-wide text-C_blue-600 dark:text-C_blue-200 bg-C_gray-100 dark:bg-[#333333] rounded border-2 border-C_gray-300 focus:border-C_green-500 dark:border-C_gray-900 focus:ring-2 focus:ring-C_green-500 form-input"
                disabled
              >
              <button
                type="button"
                class="flex absolute -right-[56px] bottom-0 justify-center items-center w-[40px] h-[40px] bg-C_blue-500 hover:bg-C_blue-400 dark:bg-C_blue-400 dark:hover:bg-C_blue-300 rounded-full nowside-backgroundImage"
                @click="$refs.uploadPhotos.click()"
              >
                <span class="text-xl text-white material-icons">file_upload</span>
              </button>
            </form>
          </li>
          <!-- 專案網址 -->
          <li class="flex flex-nowrap justify-between mb-12 h-[40px]">
            <form class="flex justify-between items-center w-full">
              <label
                for="projectWebsite"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >專案網址</label>
              <input
                id="projectWebsite"
                v-model="successParams.ProjectWebsite"
                name="projectWebsite" 
                type="text"
                class="nowside-input"
              >
            </form>
          </li>
          <!-- 學到什麼 -->
          <li class="flex justify-between items-center mb-12">
            <label
              for="projectExperience"
              class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
            >學到什麼</label>
            <textarea
              id="projectExperience"
              v-model="successParams.ProjectExperience"
              class="nowside-textarea"
              name="projectExperience"
              rows="5"
              maxlength="1000"
            ></textarea>
          </li>
          <!-- 專案種類 + 團隊人數 -->
          <li class="flex flex-nowrap justify-between mb-12 h-[40px]">
            <form class="flex justify-between items-center w-[570px]">
              <label
                for="groupDeadline"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >專案種類</label>
              <select
                id="projectTypeId"
                v-model="detailParams.ProjectTypeId"
                name="projectTypeId"
                class="w-full tracking-wide text-C_blue-600 dark:text-C_blue-200 bg-C_gray-100 dark:bg-[#333333] rounded border border-C_gray-300 focus:border-C_green-500 dark:border-C_gray-900 focus:ring-C_green-500 cursor-not-allowed form-select"
                disabled
              >
                <option
                  v-for="type in classData"
                  :key="type.Id"
                  :value="type.Id"
                  :selected="(type.Id === detailParams.ProjectTypeId) ?true :false"
                >
                  {{ type.ProjectType }}
                </option>
              </select>
            </form>
            <form class="flex justify-between items-center w-[570px]">
              <label
                for="finishedDeadline"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >團隊人數</label>
              <select
                id="projectTypeId"
                v-model="detailParams.GroupNum"
                name="projectTypeId"
                class="w-full tracking-wide text-C_blue-600 dark:text-C_blue-200 bg-C_gray-100 dark:bg-[#333333] rounded border-2 border-C_gray-300 focus:border-C_green-500 dark:border-C_gray-900 focus:ring-2 focus:ring-C_green-500 cursor-not-allowed form-select"
                disabled
              >
                <option
                  v-for="num in GroupNum"
                  :key="num.Value"
                  :value="num.Value"
                >
                  {{ num.Content }}
                </option>
              </select>
            </form>
          </li>
          <!-- 參加截止日 + 專案結束日 -->
          <li class="flex flex-nowrap justify-between mb-12 h-[40px]">
            <form class="flex justify-between items-center w-[570px]">
              <label
                for="groupDeadline"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >參加<br>截止日</label>
              <input
                id="groupDeadline"
                v-model="groupDeadline"
                name="groupDeadline" 
                type="text"
                class="cursor-not-allowed nowside-input"
                disabled
              >
            </form>
            <form class="flex justify-between items-center w-[570px]">
              <label
                for="finishedDeadline"
                class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
              >專案<br>結束日</label>
              <input
                id="finishedDeadline"
                v-model="finishedDeadline"
                name="finishedDeadline" 
                type="text"
                class="cursor-not-allowed nowside-input"
                disabled
              >
            </form>
          </li>
          <!-- 專案內容 -->
          <li class="flex justify-between items-center mb-12">
            <label
              for="projectContext"
              class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
            >專案內容</label>
            <textarea
              id="projectContext"
              v-model="detailParams.ProjectContext"
              class="cursor-not-allowed resize-none nowside-textarea"
              name="projectContext"
              rows="5"
              maxlength="1000"
              disabled
            ></textarea>
          </li>
          <!-- 夥伴技能 -->
          <li class="flex justify-between items-center mb-12">
            <label
              for="PartnerSkills"
              class="mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"
            >夥伴技能</label>
            <multiselect
              v-model="detailParams.PartnerSkills"
              mode="tags"
              :classes="{
                container: 'relative p-1 mx-auto w-full h-[140px] flex items-start justify-end box-border cursor-pointer border-2 border-C_gray-300 dark:border-C_gray-900 rounded bg-C_gray-100 dark:bg-[#333333] text-base leading-snug outline-none',
                containerDisabled: 'cursor-not-allowed',
                containerActive: 'border-2 ring-2 ring-C_green-500',
                tag: 'flex items-center py-0.5 pl-2 mr-2 mb-2 text-C_blue-700 whitespace-nowrap bg-C_blue-200 rounded dark:opacity-30',
                tagDisabled: 'pr-2 cursor-not-allowed',
                tagsSearch: 'absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full bg-C_gray-100 dark:bg-[#333333]',
              }"
              :close-on-select="false"
              :searchable="true"
              :create-option="true"
              :options="skillsData"
              option
              handle-tag-remove
              disabled
            ></multiselect>
          </li>
        </ul>
      </section>
    </div>
    <div>
      <!-- 按鈕 -->
      <section class="flex justify-center">
        <router-link
          class="flex justify-center items-center py-2 mr-6 w-[196px] text-lg font-bold text-C_blue-700 bg-white hover:bg-C_gray-100 rounded border-2 border-C_blue-400 shadow-lg dark:opacity-30"
          to="/"
        >
          <span class="mr-1 material-icons">reply</span>
          取消
        </router-link>
        <router-link
          class="flex justify-center items-center py-2 w-[196px] text-lg font-bold text-white bg-C_green-500 hover:bg-C_green-400 rounded shadow-lg dark:opacity-80"
          to="/project"
          @click="postProjectParams"
        >
          <span class="mr-1 material-icons">ios_share</span>
          完成專案
        </router-link>
      </section>
    </div>
  </article>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
