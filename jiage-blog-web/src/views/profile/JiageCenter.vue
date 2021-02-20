<template>
  <JiageContent :title="title">
    <Card slot="main-content">
      <div class="infinite-list-wrapper" style="min-height: 450px">
        <Layout>
          <el-tabs
            v-model="activeName"
            @tab-click="handleClick"
            style="background-color: #ffffff"
          >
            <!-- <el-tab-pane label="修改头像" name="first"> </el-tab-pane> -->
            <el-tab-pane label="个人信息" name="second">
              <Content class="i-content">
                <div class="profile">
                  <p>
                    ID：{{ perosnInfo.username }}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;
                    &nbsp;
                    <!-- <span class="vip">开通会员</span> -->
                  </p>
                  <p>Email：{{ perosnInfo.email }}</p>
                  <p>Gender：{{ perosnInfo.gender }}</p>
                  <p>Mobile：{{ perosnInfo.mobile }}</p>
                  member:
                  <span style="font-size: 15px; color: red">{{ sum1 }}</span>
                  <Sider hide-trigger class="sider" style="height: 10px">
                    <div class="avatar-box">
                      <img
                        class="avatar"
                        :src="api + '/media/' + perosnInfo.portrait"
                        width="150"
                      />
                    </div>
                    <div class="click-avatar">
                      <span @click="upload = true">修改头像</span>
                    </div>
                  </Sider>
                </div>
              </Content>
            </el-tab-pane>
            <el-tab-pane label="账户" name="third">
              <p style="font-size: 30px">
                <span>总金额 {{ sum }}</span>
              </p>
              <form :action="api + '/pay/'" method="post">
                <!-- <input
                  type="text"
                  name="price"
                  :value="10"
                  placeholder="请输入支付的金额"
                /> -->
                <!-- :value="数字" value='字符串'-->
                <input type="radio" name="price" value="5" checked />
                5元
                <input type="radio" name="price" value="15" checked />
                15元
                <input type="radio" name="price" value="30" checked />
                30元
                <br />
                <input type="submit" value="去支付" @click="pay_result()" />
              </form>
              <!-- <p></p> -->
              <p>-------------------------------------</p>
              <div v-for="(item, index) in list" :key="index">
                <p>
                  {{ dateFormat("YYYY-mm-dd HH:MM", item.create_time) }}
                  ---
                  {{ item.money }}元
                </p>
              </div>

              <!-- <p>
                金额{{ this.list.money }}----- 创建时间{{
                
              </p> -->

              <!-- {{ listone.create_time }} -->
            </el-tab-pane>
            <!-- <el-tab-pane label="定时任务补偿" name="fourth"
              >定时任务补偿</el-tab-pane
            > -->
          </el-tabs>
        </Layout>
      </div>
      <Modal v-model="upload" title="上传头像">
        <Upload
          ref="upload"
          type="drag"
          :before-upload="handleUpload"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :on-exceeded-size="handleMaxSize"
          :max-size="2048"
          :data="data"
          :format="['jpg', 'png', 'jpeg']"
          :on-format-error="handleFormatError2"
          :action="api + '/api/uploadAvatar'"
        >
          <div style="padding: 20px 0">
            <Icon
              type="ios-cloud-upload"
              size="52"
              style="color: #3399ff"
            ></Icon>
            <p>Click or drag picture here to upload</p>
          </div>
        </Upload>
        <div slot="footer">
          <Button type="primary" @click="cancelBtn">取消</Button>
        </div>
      </Modal>
    </Card>
  </JiageContent>
</template>

<script>
import JiageContent from "@/components/JiageContent";

export default {
  data() {
    return {
      title: "个人中心",
      upload: false,
      author: "",
      pwd: "",
      perosnInfo: [],
      list: [],
      file: "",
      data: "",
      sum: 0,
      sum1: 0,
      api: this.api,
      time: new Date(),
      activeName: "second",
    };
  },
  components: {
    JiageContent,
  },
  inject: ["reload"],
  created() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    this.author = user["username"];
    this.pwd = user["password"];
    this.getSelfInfo();
    this.pay();
    this.data = { author: this.author };
  },
  filters: {
    // formatTimer: function (value) {
    //   let date = new Date(value);
    //   let y = date.getFullYear();
    //   let MM = date.getMonth() + 1;
    //   MM = MM < 10 ? "0" + MM : MM;
    //   let d = date.getDate();
    //   d = d < 10 ? "0" + d : d;
    //   let h = date.getHours();
    //   h = h < 10 ? "0" + h : h;
    //   let m = date.getMinutes();
    //   m = m < 10 ? "0" + m : m;
    //   let s = date.getSeconds();
    //   s = s < 10 ? "0" + s : s;
    //   return y + "-" + MM + "-" + d + " " + h + ":" + m;
    // },
    zero: function (data) {
      return (
        data.getFullYear() +
        "年" +
        (data.getMonth() + 1) +
        "月" +
        data.getDate() +
        "日" +
        "星期" +
        data.getDay() +
        "," +
        data.getHours() +
        "点" +
        data.getMinutes() +
        "分" +
        data.getSeconds() +
        "秒"
      );
    },
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    dateFormat(fmt, date) {
      let ret = "";
      date = new Date(date);
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },

    pay() {
      this.$http.list().then((resp) => {
        if (resp.result.code === "200") {
          this.list = resp.result.list_one;
          let sum = 0;
          this.list.forEach((item) => {
            //遍历money这个字段，并累加
            if (item.status == 2) sum += parseFloat(item.money);
          });

          //返回
          this.sum = sum;
          if (this.sum >= 0 && this.sum < 10) {
            this.sum1 = "一级会员";
          } else if (this.sum >= 10 && this.sum < 20) {
            this.sum1 = "二级会员";
          } else if (this.sum >= 20 && this.sum < 30) {
            this.sum1 = "三级会员";
          } else if (this.sum >= 30 && this.sum <= 40) {
            this.sum1 = "四级会员";
          } else if (this.sum >= 40 && this.sum <= 50) {
            this.sum1 = "五级会员";
          } else if (this.sum >= 50 && this.sum <= 60) {
            this.sum1 = "六级会员";
          } else if (this.sum >= 60 && this.sum <= 70) {
            this.sum1 = "七级会员";
          } else if (this.sum >= 70 && this.sum <= 80) {
            this.sum1 = "八级会员";
          }

          // this.list = this.time - this.list.create_time;
          // let listone = resp.result.list_one[0];
          // console.log(listone);
          // console.log(listone.create_time);
          // console.log(this.time);
          // let aa = this.time - listone.create_time;
          // console.log(aa);
          // console.log(this.item);
          // console.log(this.list.create_time);
          // console.log(this.time);
        }
      });
    },
    getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
    // tijiao() {
    //   this.$http.userLogin(username, password, this.getCookie("csrftoken")).then((resp) => {
    //           if (resp.result.code === "200") {
    //                     this.router.push({
    //                 path: "/account/center",
    //              });
    //        }
    // },
    getSelfInfo() {
      this.$http
        .centerManage(this.author, this.getCookie("csrftoken"))
        .then((resp) => {
          if (resp.result.code === "200") {
            this.perosnInfo = resp.result.data;
          }
        });
    },
    handleUpload(file) {
      this.file = file;
      return true;
    },
    uploadSuccess(res) {
      //上传成功
      this.$Message.info(res.result.msg);
      if (res.result.code == 200) {
        this.$http
          .userLogin(this.author, this.pwd, this.getCookie("csrftoken"))
          .then((resp) => {
            if (resp.result.code === "200") {
              var obj = {
                username: this.author,
                password: this.pwd,
                avatar: resp.result.avatar,
              };
              sessionStorage.setItem("user", JSON.stringify(obj));
            }
          });
      }
      this.reload();
    },
    handleFormatError2() {
      this.$Message.error("文件格式不正确,请上传jpg、jpeg、png格式文件");
    },
    uploadError(error) {
      this.$Message.info(error);
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: "文件 " + file.name + " 太大，不能超过 2M。",
      });
    },
    cancelBtn() {
      this.upload = false;
    },
  },
  mounted() {
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.time = new Date(); // 修改数据date
    }, 1000);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
};
</script>

<style scoped lang="scss">
.avatar-box {
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 16px auto 0;
}
.sider {
  min-height: 450px;
  background: #fff;
}
.i-content {
  background: #fff;
}
.click-avatar {
  padding-top: 20px;
  cursor: pointer;
  font-size: 15px;
  text-align: center;
  color: #3399ea;
}
.profile {
  border: solid 1px #ded4d4;
  border-radius: 5px;
  padding: 20px;
  min-height: 450px;
}
.profile p {
  padding-bottom: 15px;
}
.vip {
  font-size: 12px;
  color: #3399ea;
  cursor: pointer;
}
</style>