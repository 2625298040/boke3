<template>
  <JiageContent :title="title">
    <Card slot="main-content">
      <div class="infinite-list-wrapper" style="min-height: 450px">
        <Layout>
          <!-- <Sider hide-trigger width="150" class="sider">
            <div class="cate-list">
              <Tag
                class="tag-list"
                type="dot"
                color="error"
                v-for="(item, index) in cateList"
                :key="index"
                :checkable="true"
                :name="item"
                @on-change="tabToPage(item)"
                >{{ item }}</Tag
              >
            </div>
          </Sider> -->
          <Content style="padding: 16px">
            <div
              v-for="item in dataArr"
              :key="item.id"
              style="
                width: 200px;
                height: 200px;
                float: left;
                border: 1px solid red;
              "
            >
              <!-- <h3
                style="text-align: center"
                class="title"
                @click="goBlogDetailPage(item.id)"
              >
                {{ item.title }}
              </h3> -->

              <h3
                style="text-align: center"
                class="title"
                v-if="auth"
                @click="goBlogDetailPage(item.id)"
              >
                {{ item.title }}
              </h3>

              <router-link v-else to="/account/login">
                <h3 style="text-align: center" class="title">
                  {{ item.title }}
                </h3></router-link
              >
              <!-- <div class="info">
                <p>
                  <i>
                    作者：{{ item.author }} &nbsp;&nbsp; 发表时间：{{
                      item.join_time
                    }}
                    &nbsp;&nbsp; 分类：{{ item.category }}
                    &nbsp;&nbsp; 标签：
                    <span
                      class="tag"
                      v-for="(item, index) in item.tags"
                      :key="index"
                      >{{ item }}&nbsp;&nbsp;</span
                    >
                  </i>
                </p>
                <div v-html="$options.filters.capitalize(item.content)"></div>
                <br />
                <div class="blog-base-info">
                  <Poptip
                    trigger="hover"
                    :title="item.author"
                    placement="right"
                  >
                    <Avatar
                      class="avatar-img"
                      :src="api + '/media/' + item.portrait"
                      size="small"
                    />
                    <div class="api" slot="content">
                      <Avatar
                        :src="api + '/media/' + item.portrait"
                      />&nbsp;&nbsp;
                      <a class="person-info">访问主页</a>
                    </div>
                  </Poptip>
                  <i>
                    &nbsp;
                    <a class="person-info">{{ item.author }}</a>
                  </i>
                  <span class="blog-info">
                    阅读数
                    <span class="dight">{{ item.visit }}</span>
                    &nbsp;&nbsp;|&nbsp;&nbsp; 评论数
                    <span class="dight">{{ item.comment_count }}</span>
                  </span>
                </div>
              </div> -->
            </div>
          </Content>
        </Layout>
      </div>
    </Card>
  </JiageContent>
</template>
<script>
import JiageContent from "@/components/JiageContent";

export default {
  name: "JiageIndex",
  data() {
    return {
      //  title: "博客首页",
      title: "",
      dataArr: [],
      cateList: [],
      api: this.api,
      auth: true,
      list: [],
    };
  },
  created() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      this.username = user["username"];
    } else {
      this.auth = false;
    }

    this.listOfBlog();
    this.listCategory();
    this.pay();
  },
  components: {
    JiageContent,
  },
  methods: {
    pay() {
      this.$http.list().then((resp) => {
        if (resp.result.code === "200") {
          this.list = resp.result.list_one[0];
          // console.log(this.list.money);
          //    "list_one": [
          //     {
          //         "id": 1,
          //         "money": "10.0",
          //         "order_num": "x21613612337.8232715",
          //         "create_time": "2021-01-19T01:38:57.826Z",
          //         "status": 2
          //     }
          // ]
        }
      });
    },
    listOfBlog() {
      var _this = this;
      _this.$http.listOfBlog().then((resp) => {
        if (resp.result.code === "200") {
          _this.dataArr = resp.result.data;
        }
      });
    },
    goBlogDetailPage(id) {
      this.$router.push({
        name: "Details",
        query: { blogId: id },
      });
    },
    listCategory() {
      this.$http.getCategory().then((resp) => {
        if (resp.result.code === "200") {
          this.cateList = resp.result.all_cate;
        }
      });
    },
    tabToPage(name) {
      this.$router.push({
        name: "Cate",
        query: { cateName: name },
      });
    },
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      if (value.length > 200) {
        return value.slice(0, 200) + "...";
      }
      return value;
    },
  },
};
</script>

<style scoped>
.layout {
  min-width: 1420px;
}
.ivu-breadcrumb > span:last-child {
  font-weight: normal;
  color: #999;
}
.title {
  font-weight: 600;
  cursor: pointer;
}
.title:hover {
  color: #b50d0d;
}
.info {
  color: #888383;
}
.tag {
  color: #f97311;
}
.person-info {
  font-size: 12px;
  text-decoration: none;
}
.avatar-img {
  cursor: pointer;
}
h3 {
  font-size: 22px;
}
.blog-info {
  float: right;
}
.dight {
  color: #4b82e4;
}
.sider {
  background: #fff;
}
.tag-list {
  width: 135px;
}
</style>
