<template>
  <div id="Claim">
    <div width="900px">
      <v-alert
      class="alert-box"
        type="warning"
        border="left"
        width="800px"
        v-if="alert"
        style="margin: auto; margin-bottom: 20px"
        dismissible
      >
        搜索返回结果太多,仅显示前30页！可以试试更精确地关键词哦(*^▽^*)
      </v-alert>
    </div>
    <div class="wrapper">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            个人学术档案
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2"> 文章 </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3"> 设置 </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <!-- card1 -->
          <v-stepper-content step="1" color="blue-grey lighten-5">
            <v-card class="mb-12" color="blue-grey lighten-5">
              <h3 style="margin-bottom: 20px">
                您可以跟踪自己文章的引用情况。个人学术档案还会出现在学术搜索结果中
              </h3>
              <h4 style="display: inline-block; margin-right: 45px">
                {{ email }}
              </h4>
              <v-btn
                color="primary"
                outlined
                small
                style="display: inline-block"
                width="100px"
                >切换账户</v-btn
              >
              <div class="card1">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container>
                    <v-col>
                      <v-text-field
                        style="display: inline-block; width: 450px"
                        v-model="form.name1"
                        :counter="10"
                        label="姓名"
                        hint="发表文章时使用的全名1"
                        persistent-hint
                        filled
                        shaped
                      ></v-text-field>
                      <v-text-field
                        style="display: inline-block; width: 450px"
                        v-if="namenum >= 2"
                        v-model="form.name2"
                        :counter="10"
                        label="姓名"
                        hint="发表文章时使用的全名2"
                        persistent-hint
                        filled
                        shaped
                      ></v-text-field>
                      <v-text-field
                        style="display: inline-block; width: 450px"
                        v-if="namenum >= 3"
                        v-model="form.name3"
                        :counter="10"
                        label="姓名"
                        hint="发表文章时使用的全名3"
                        persistent-hint
                        filled
                        shaped
                      ></v-text-field>

                      <v-btn
                        style="
                          display: inline-block;
                          margin-left: 30px;
                          text-align: center;
                        "
                        text
                        x-large
                        color="primary"
                        @click="addothername"
                      >
                        + 添加其他姓名
                      </v-btn>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="form.work"
                        label="工作单位"
                        hint="例如，北京航空航天大学物理学教授"
                        persistent-hint
                        filled
                        shaped
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="form.email"
                        label="验证电子邮件"
                        hint="例如，1195800097@qq.com"
                        persistent-hint
                        filled
                        shaped
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="form.area"
                        label="感兴趣的领域"
                        hint="例如，广义相对论、统一场论"
                        persistent-hint
                        filled
                        shaped
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="form.homepage"
                        label="首页（可选）"
                        hint="例如，广义相对论、统一场论"
                        persistent-hint
                        filled
                        shaped
                      ></v-text-field>
                    </v-col>
                  </v-container>

                  <!-- <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select> -->

                  <!-- <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox> -->
                </v-form>
              </div>
              <v-row align="center" justify="space-around">
                <v-btn
                  style="margin: auto; margin: 20px"
                  color="primary"
                  @click="e1 = 2"
                  >下一步</v-btn
                >
              </v-row>
            </v-card>
          </v-stepper-content>
          <!-- card2 -->
          <v-stepper-content step="2">
            <v-card class="mb-12" color="blue-grey lighten-5">
              <span class="card2tit" style="display: block">
                <h3 style="display: inline-block">添加您撰写的文章</h3>
                <span class="cntstyle"
                  >已选篇数：{{ selected_articlesid.length }}</span
                >
              </span>
              <v-text-field
                v-model="searchmsg"
                label="请输入"
                style="display: inline-block; width: 80%"
              >
              </v-text-field>
              <v-btn
                style="display: inline-block; position: absolute; right: 30px"
                rounded
                class="ma-2"
                color="primary"
                dark
                @click="search"
                >搜索<v-icon dark right>mdi-magnify</v-icon></v-btn
              >
              <div class="tabs">
                <v-card>
                  <v-tabs v-model="tab" centered fixed-tabs icons-and-text>
                    <v-tabs-slider></v-tabs-slider>

                    <v-tab href="#tab-1" class="primary--text">
                      文章
                      <v-icon>mdi-file-document-multiple</v-icon>
                    </v-tab>
                    <!-- 
                    <v-tab href="#tab-2" class="primary--text">
                      文章
                      <v-icon>mdi-file-document</v-icon>
                    </v-tab> -->
                  </v-tabs>

                  <v-tabs-items v-model="tab">
                    <v-tab-item v-for="i in 1" :key="i" :value="'tab-' + i">
                      <!-- <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card> -->
                      <v-card class="mx-auto" max-width="850px">
                        <v-list two-line class="liststyle">
                          <v-list-item-group
                            v-model="selected"
                            active-class="blue-grey lighten-4 blue-grey--text text--darken-4"
                            multiple
                            style="width: 800px"
                            v-if="grouplist.length != 0"
                          >
                            <template v-for="(item, index) in grouplist">
                              <v-list-item :key="item.id" style="width: 800px">
                                <template v-slot:default="{ active }">
                                  <v-list-item-content style="width: 800px">
                                    <v-list-item-title
                                      ><h3>
                                        {{ item.title }}
                                      </h3></v-list-item-title
                                    >

                                    <v-list-item-subtitle class="text--primary"
                                      ><h4 style="display: inline">关键词：</h4>
                                      {{
                                        item.keywords.toString()
                                      }}</v-list-item-subtitle
                                    >

                                    <v-list-item-subtitle
                                      ><h4 style="display: inline">摘要：</h4>
                                      {{ item.abstract }}</v-list-item-subtitle
                                    >
                                  </v-list-item-content>

                                  <v-list-item-action>
                                    <v-icon
                                      @click="addart(item.id, active)"
                                      v-if="active == false"
                                      color="blue-grey lighten-1"
                                    >
                                      mdi-star-plus-outline
                                    </v-icon>
                                    <v-icon
                                      v-else
                                      color="blue-grey darken-4"
                                      @click="delart(item.id, active)"
                                    >
                                      mdi-star-plus
                                    </v-icon>
                                  </v-list-item-action>
                                </template>
                              </v-list-item>

                              <v-divider
                                v-if="index < grouplist.length - 1"
                                :key="index"
                              ></v-divider>
                            </template>
                          </v-list-item-group>
                          <h4 style="text-align: center" v-else>
                            您还没有搜索任何文章哦~
                          </h4>
                        </v-list>
                      </v-card>

                      <!-- 页脚 -->
                      <div class="text-center">
                        <v-pagination
                          v-model="page"
                          :length="pagenum"
                          @next="nextpage"
                          @previous="prepage"
                          @input="getpage"
                        ></v-pagination>
                      </div>
                      <!-- button panel -->
                      <v-row justify="space-around">
                        <v-btn
                          style="margin: 50px"
                          color="primary"
                          @click="e1 = 1"
                          >返回</v-btn
                        >
                        <v-btn
                          style="margin: 50px"
                          color="primary"
                          @click="e1 = 3"
                          >继续</v-btn
                        >
                      </v-row>
                    </v-tab-item>
                  </v-tabs-items>
                </v-card>
              </div>
            </v-card>
          </v-stepper-content>
          <v-divider
            v-if="index < grouplist.length - 1"
            :key="index"
          ></v-divider>
          <!-- card 3 -->
          <v-stepper-content step="3">
            <v-card class="mx-auto" color="blue-grey lighten-4">
              <h1 style="padding: 20px">隐私设置</h1>
              <v-sheet class="pa-5" color="blue-grey lighten-4">
                <v-switch
                  v-model="switch1"
                  inset
                  :label="`我的邮箱公开可见`"
                ></v-switch>
                <v-switch
                  v-model="switch2"
                  inset
                  :label="`学者主页公开可见`"
                ></v-switch>
              </v-sheet>
            </v-card>
            <!-- button panel -->
            <v-row justify="space-around">
              <v-btn style="margin: 100px" color="primary" @click="e1 = 2"
                >返回</v-btn
              >
              <v-btn style="margin: 100px" color="primary" @click="submit"
                >完成</v-btn
              >
            </v-row>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </div>
</template>

<script>
// 学者认领页
import baseHeader from "../Header/BaseHeader.vue";
import { ref } from "vue";
export default {
  name: "Claim",
  data() {
    return {
      e1: 1,
      email: "1195800097@qq.com",
      alert: ref(false),
      form: {
        name1: "",
        name2: "",
        name3: "",
        work: "",
        email: "",
        area: "",
        homepage: "",
      },
      pagenum: 1,
      page: 1,
      index: 1,
      namenum: 1,
      switch1: true,
      switch2: true,
      ifshow: 1,
      searchmsg: "",
      articlenum: 2,
      tab: null,
      active: false,
      grouplist: [
        // {
        //     id:1,
        //     keywords: ['Brunch this weekend?'],
        //     author:['ycp'],
        //     abstract: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        //     title: 'Ali Connors',
        // },
      ],
      valid: true,
      selected: [],
      selected_articlesid: [],
    };
  },
  components: {
    baseHeader,
  },
  methods: {
    addothername() {
      console.log(this.namenum);
      this.namenum++;
    },
    addart(el1, el2) {
      if (!this.selected_articlesid.includes(el1)) {
        this.active = true;
        console.log("selected" + this.selected);
        this.selected_articlesid.push(el1);
        console.log("list:" + this.selected_articlesid);
      }
    },
    delart(el1, el2) {
      if (this.selected_articlesid.includes(el1)) {
        this.active = false;
        const index = this.selected_articlesid.indexOf(el1);
        if (index != -1) this.selected_articlesid.splice(index, 1);
        console.log("list:" + this.selected_articlesid);
      }
    },
    nextpage() {
      this.search();
      this.selected.splice(0, this.selected.length);
    },
    prepage() {
      this.search();
    },
    getpage() {
      // this.selected.splice(0,this.selected.length);
      this.search();
    },
    search() {
      // window.alert('searchmsg'+this.searchmsg);
      var arr1 = new Array();
      arr1.push(this.searchmsg);
      var arr2 = new Array();
      arr2.push("1");
      var arr3 = new Array();
      var data = {
        search_word: arr1,
        search_type: arr2,
        search_logic: arr3,
        page: this.page,
        size: 5,
        order_type: 0,
        order: 0,
      };
      console.log(JSON.stringify(data));
      console.log(window.localStorage.getItem("user_name"));
      this.$axios({
        url: "/search",
        method: "post",
        data: JSON.stringify(data),
        header: {
          "Content-Type": "application/json", //如果写成contentType会报错,如果不写这条也报错
          //Content type 'application/x-www-form-urlencoded;charset=UTF-8'...
        },
      })
        .then((res) => {
          /* res 是 response 的缩写 */
          console.log("搜索成功");
          console.log(res.data);
          if (res.data.n_page > 30) {
            this.alert = true;
            console.log(1);
            setTimeout(() => {
              this.alert = false;
            }, 1000);
            this.pagenum = 30;
          } else this.pagenum = res.data.n_page;
          this.grouplist = res.data.papers;
        })
        .catch((err) => {
          /* 请求若出现路由找不到等其它异常，则在终端输出错误信息 */
          console.log(err);
        });
      this.selected.splice(0, this.selected.length);
      var i = 0;
      for (i = 0; i < 5; i++) {
        if (this.selected_articlesid.includes(this.grouplist[i].id))
          this.selected.push(i);
      }
    },
    submit() {
      var sw1 = "1";
      var sw2 = "1";
      if (this.switch1 == false) sw1 = "0";
      if (this.switch2 == false) sw2 = "0";
      var str = this.selected_articlesid.toString();
      const formData = new FormData();
      formData.append("name1", this.form.name1);
      formData.append("name2", this.form.name2);
      formData.append("name3", this.form.name3);
      formData.append("org", this.form.work);
      formData.append("interests", this.form.area);
      formData.append("e_mail", this.form.email);
      formData.append("email_privacy", sw1);
      formData.append("home_privacy", sw2);
      formData.append("username", window.localStorage.getItem("user_name"));
      formData.append("paper_ids", str);
      var params = {
        name1: this.form.name1,
        name2: this.form.name2,
        name3: this.form.name3,
        org: this.form.work,
        interests: this.form.area,
        e_mail: this.form.email,
        email_privacy: sw1,
        home_privacy: sw2,
        username: window.localStorage.getItem("user_name"),
        paper_ids: str,
      };
      console.log("params", params);
      this.$axios({
        method: "post",
        url: "/claim_to_be_scholar",
        data: formData,
      })
        .then((res) => {
          console.log("认证成功", res.data);
          this.$router.push({
            name: 'home_focus'
          })
          window.alert("认证成功");
        })
        .catch((err) => {
          //请求若出现路由找不到等其它异常，则在终端输出错误信息
          console.log(err);
        });
    },
    addpaper() {
      // 添加文章
      var str = this.selected_articlesid.toString;
      var params1 = {
        scholar_id: 1,
        paper_id: str,
      };
      this.$axios({
        method: "post",
        url: "/add_paper_for_scholar",
        data: this.$qs.stringify({ params1 }),
      });
    },
  },
};
</script>

<style scoped lang="scss">
#Claim {
  /* background-color: #ECEFF1; */
  position: absolute;
  top: 20%;
  width: 95%;
  height: 100%;
  margin-bottom: 20%;
  bottom: 20%;
}
.wrapper {
  width: 70%;
  margin: auto;
}
.mb-12 {
  padding: 20px;
  width: 100%;
}
.cntstyle {
  display: inline-block;
  position: absolute;
  right: 30px;
}
.text-center {
  margin: 40px;
}
.liststyle {
  margin: 20px;
  width: 80%;
  padding: 20px;
}
.alert-box {
  left: vw(440);
  top: vh(100);
  position: fixed;
  z-index: 2000;
}
</style>