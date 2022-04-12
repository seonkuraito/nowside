import{_ as P,S as w,j,k as y,l as k,x as I}from"./index.5456a364.js";import{p as D,q as m,r as p,o as d,c as u,b as e,j as V,g as r,v as c,m as g,F as _,f,d as x,w as S,e as n,t as b}from"./vendor.faa2a958.js";const v={name:"ProjectEdit",components:{multiselect:D},props:{projectId:{type:String,default:""}},data(){return{GroupNum:[{Value:1,Content:"1 \u4EBA"},{Value:2,Content:"2 \u4EBA"},{Value:3,Content:"3 \u4EBA"},{Value:4,Content:"4 \u4EBA"},{Value:5,Content:"5 \u4EBA"},{Value:6,Content:"6 \u4EBA"},{Value:7,Content:"7 \u4EBA"},{Value:8,Content:"8 \u4EBA"},{Value:9,Content:"9 \u4EBA"},{Value:10,Content:"10 \u4EBA"},{Value:11,Content:"11 \u4EBA"},{Value:12,Content:"12 \u4EBA"},{Value:13,Content:"13 \u4EBA"},{Value:14,Content:"14 \u4EBA"}],skillsData:[{Id:0,skill:""}],classData:[{Id:0,ProjectType:""}],detailParams:{Id:0,ProjectName:"",ProjectContext:"",GroupPhoto:"",InitDate:"",GroupDeadline:"",FinishedDeadline:"",GroupNum:0,PartnerCondition:"",PartnerSkills:null,ProjectTypeId:[],ProjectState:""}}},computed:{groupDeadline(){return m().add(7,"days").format("YYYY/MM/DD")}},mounted(){this.getSkillsParams(),this.getClassParams(),this.getDetailParams()},methods:{getSkillsParams(){w().then(o=>{console.log("\u6280\u80FD\u5217\u8868",o.data.Skilldata),this.skillsData=o.data.Skilldata;const t=[];this.skillsData.forEach(function(l){t.push({value:l.Id,label:l.skill})}),this.skillsData=t}).catch(o=>{console.log(o)})},getClassParams(){j().then(o=>{console.log("\u5C08\u6848\u985E\u5225\u5217\u8868",o.data.Classdata),this.classData=o.data.Classdata}).catch(o=>{console.log(o)})},getDetailParams(){y(this.projectId).then(o=>{console.log("\u5C08\u6848\u8A73\u7D30",o.data.userdata),this.detailParams=o.data.userdata,this.detailParams.ProjectTypeId=o.data.userdata.ProjectTypeId[0].Id;const t=[];this.detailParams.PartnerSkills.forEach(function(l){t.push(l.Id)}),this.detailParams.PartnerSkills=t}).catch(o=>{console.log(o)})},uploadImage(o){console.log(o.target.files[0]);const t=new FormData;t.append(o.target.files[0].name,o.target.files[0]),k(t).then(l=>{console.log("\u65B0\u589E\u5C08\u6848\u8CC7\u6599 \u5716\u7247\u4E0A\u50B3",l.data),this.detailParams.GroupPhoto=l.data.data.ProfilePicture}).catch(l=>{console.log(l)})},putProjectParams(){this.detailParams.FinishedDeadline=new Date(this.detailParams.FinishedDeadline).toISOString(),I(this.projectId,this.detailParams).then(o=>{console.log("\u7DE8\u8F2F\u5C08\u6848\u8A73\u7D30\u5167\u5BB9",o.data),this.$router.push({name:"ProjectView",params:{projectId:this.projectId}}),this.$notify({group:"foo",title:"Success",text:"\u7DE8\u8F2F\u6210\u529F\uFF0C\u5C08\u6848\u5DF2\u6210\u529F\u66F4\u65B0\u3002"},3500)}).catch(o=>{console.log(o)})},timeFormat(o){return m(o).format("YYYY/MM/DD")},optionSelected(o){var t;return o.Id===((t=this.detailParams.ProjectTypeId[0])==null?void 0:t.Id)}}},T={class:"py-[180px] w-full h-full"},N={class:"py-24 px-14 mb-28 nowside-container-lg nowside-shadow"},G={class:"flex flex-col justify-center items-center mb-24"},F={class:"relative mb-20 h-[415px]"},U=e("span",{class:"text-2xl text-white align-sub material-icons"},"monochrome_photos",-1),Y=[U],M={class:"flex relative items-center w-[415px]"},E=e("span",{class:"inline-block absolute right-4 bottom-2 text-3xl text-C_green-500 rounded material-icons"},"edit",-1),B={class:"flex flex-nowrap justify-between mb-12 h-[40px]"},q={class:"flex justify-between items-center w-[570px]"},z=e("label",{for:"projectTypeId",class:"mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"},"\u5C08\u6848\u7A2E\u985E",-1),A=["value","selected"],L={class:"flex justify-between items-center w-[570px]"},O=e("label",{for:"groupNum",class:"mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"},"\u5718\u968A\u4EBA\u6578",-1),H=["value"],J={class:"flex flex-nowrap justify-between mb-12 h-[40px]"},K={class:"flex justify-between items-center w-[570px]"},Q=e("label",{for:"groupDeadline",class:"mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"},[n("\u53C3\u52A0"),e("br"),n("\u622A\u6B62\u65E5")],-1),R=["value"],W={class:"flex justify-between items-center w-[570px]"},X=e("label",{for:"finishedDeadline",class:"mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"},[n("\u5C08\u6848"),e("br"),n("\u7D50\u675F\u65E5")],-1),Z={class:"flex justify-between items-center mb-12"},$=e("label",{for:"projectContext",class:"mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"},"\u5C08\u6848\u5167\u5BB9",-1),ee={class:"flex justify-between items-center mb-12"},te=e("label",{for:"PartnerCondition",class:"mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"},"\u5925\u4F34\u689D\u4EF6",-1),oe={class:"flex justify-between items-center mb-12"},ae=e("label",{for:"PartnerSkills",class:"mr-5 min-w-[96px] text-lg font-medium text-C_blue-500 dark:text-C_blue-400"},"\u5925\u4F34\u6280\u80FD",-1),se={class:"flex justify-center"},le=e("span",{class:"mr-1 material-icons"},"reply",-1),re=n(" \u53D6\u6D88 "),ne=e("span",{class:"mr-1 material-icons"},"ios_share",-1),ie=n(" \u5132\u5B58 "),de=[ne,ie];function ue(o,t,l,ce,s,i){const h=p("multiselect"),C=p("router-link");return d(),u("article",T,[e("div",N,[e("section",G,[e("div",F,[e("div",{class:"w-[415px] h-[415px] rounded-full shadow-xl dark:shadow-gray-800 nowside-backgroundImage",style:V({"background-image":`url('http://sideprojectnow.rocket-coding.com/Upload/GroupPicture/${s.detailParams.GroupPhoto}')`})},null,4),e("form",null,[e("input",{ref:"uploadImage",type:"file",class:"hidden",onChange:t[0]||(t[0]=(...a)=>i.uploadImage&&i.uploadImage(...a))},null,544)]),e("button",{type:"button",class:"flex absolute right-16 bottom-0 justify-center items-center w-[48px] h-[48px] bg-C_green-500 hover:bg-C_green-400 rounded-full border-4 border-white nowside-backgroundImage",onClick:t[1]||(t[1]=a=>o.$refs.uploadImage.click())},Y)]),e("form",M,[r(e("input",{id:"projectName","onUpdate:modelValue":t[2]||(t[2]=a=>s.detailParams.ProjectName=a),name:"projectName",type:"text",class:"w-full text-3xl font-medium text-center text-C_blue-400 dark:bg-C_black focus:outline-none focus:ring-0"},null,512),[[c,s.detailParams.ProjectName]]),E])]),e("section",null,[e("ul",null,[e("li",B,[e("form",q,[z,r(e("select",{id:"projectTypeId","onUpdate:modelValue":t[3]||(t[3]=a=>s.detailParams.ProjectTypeId=a),name:"projectTypeId",class:"w-full tracking-wide text-C_blue-600 dark:text-C_blue-200 bg-C_gray-100 dark:bg-[#333333] rounded border border-C_gray-300 focus:border-C_green-500 dark:border-C_gray-900 focus:ring-C_green-500 form-select"},[(d(!0),u(_,null,f(s.classData,a=>(d(),u("option",{key:a.Id,value:a.Id,selected:a.Id===s.detailParams.ProjectTypeId},b(a.ProjectType),9,A))),128))],512),[[g,s.detailParams.ProjectTypeId]])]),e("form",L,[O,r(e("select",{id:"projectTypeId","onUpdate:modelValue":t[4]||(t[4]=a=>s.detailParams.GroupNum=a),name:"projectTypeId",class:"w-full tracking-wide text-C_blue-600 dark:text-C_blue-200 bg-C_gray-100 dark:bg-[#333333] rounded border-2 border-C_gray-300 focus:border-C_green-500 dark:border-C_gray-900 focus:ring-2 focus:ring-C_green-500 form-select"},[(d(!0),u(_,null,f(s.GroupNum,a=>(d(),u("option",{key:a.Value,value:a.Value},b(a.Content),9,H))),128))],512),[[g,s.detailParams.GroupNum]])])]),e("li",J,[e("form",K,[Q,e("input",{id:"groupDeadline",value:i.groupDeadline,name:"groupDeadline",type:"text",class:"cursor-not-allowed nowside-input",disabled:""},null,8,R)]),e("form",W,[X,r(e("input",{id:"finishedDeadline","onUpdate:modelValue":t[5]||(t[5]=a=>s.detailParams.FinishedDeadline=a),name:"finishedDeadline",type:"date",class:"nowside-input form-input"},null,512),[[c,s.detailParams.FinishedDeadline]])])]),e("li",Z,[$,r(e("textarea",{id:"projectContext","onUpdate:modelValue":t[6]||(t[6]=a=>s.detailParams.ProjectContext=a),class:"nowside-textarea",name:"projectContext",rows:"5",maxlength:"1000"},null,512),[[c,s.detailParams.ProjectContext]])]),e("li",ee,[te,r(e("textarea",{id:"PartnerCondition","onUpdate:modelValue":t[7]||(t[7]=a=>s.detailParams.PartnerCondition=a),class:"nowside-textarea",name:"PartnerCondition",rows:"5",maxlength:"1000"},null,512),[[c,s.detailParams.PartnerCondition]])]),e("li",oe,[ae,x(h,{modelValue:s.detailParams.PartnerSkills,"onUpdate:modelValue":t[8]||(t[8]=a=>s.detailParams.PartnerSkills=a),mode:"tags",classes:{container:"relative p-1 mx-auto w-full h-[140px] flex items-start justify-end box-border cursor-pointer border-2 border-C_gray-300 dark:border-C_gray-900 rounded bg-C_gray-100 dark:bg-[#333333] text-base leading-snug outline-none",containerActive:"border-2 ring-2 ring-C_green-500",tag:"flex items-center py-0.5 pl-2 mr-2 mb-2 text-C_blue-700 whitespace-nowrap bg-C_blue-200 rounded",tagsSearch:"absolute inset-0 border-0 outline-none focus:ring-0 appearance-none p-0 text-base font-sans box-border w-full bg-C_gray-100 dark:bg-[#333333]"},"close-on-select":!1,searchable:!0,"create-option":!0,options:s.skillsData},null,8,["modelValue","classes","options"])])])])]),e("div",null,[e("section",se,[x(C,{class:"flex justify-center items-center py-2 mr-6 w-[196px] text-lg font-bold text-C_blue-700 bg-white hover:bg-C_gray-100 rounded border-2 border-C_blue-400 shadow-lg",to:{name:"ProjectView",params:{projectId:l.projectId}}},{default:S(()=>[le,re]),_:1},8,["to"]),e("button",{class:"flex justify-center items-center py-2 w-[196px] text-lg font-bold text-white bg-C_green-500 hover:bg-C_green-400 rounded shadow-lg",onClick:t[9]||(t[9]=(...a)=>i.putProjectParams&&i.putProjectParams(...a))},de)])])])}var ge=P(v,[["render",ue]]);export{ge as default};
