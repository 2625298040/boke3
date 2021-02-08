<template>
  <JiageContent :title="title">
    <Card slot="main-content">
      <div class="infinite-list-wrapper" style="min-height: 450px">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="blogTitle">
            <div class="prompt">主题</div>
            <i-Input
              type="text"
              v-model="formInline.blogTitle"
              placeholder="请输入博客主题..."
              style="width: 300px"
              clearable
            >
              <Icon type="ios-school" slot="prepend" size="16"></Icon>
            </i-Input>
          </FormItem>
          <FormItem prop="blogAuthor">
            <div class="prompt">作者</div>
            <i-Input
              type="text"
              v-model="formInline.blogAuthor"
              placeholder="enter blog author..."
              style="width: 300px; color: #000"
              disabled
            >
              <Icon type="ios-person" slot="prepend" size="16"></Icon>
            </i-Input>
          </FormItem>

          <FormItem prop="blogContent">
            <div class="prompt">内容</div>
            <vue-editor v-model="formInline.blogContent"></vue-editor>
          </FormItem>
          <FormItem>
            <Button
              class="btn"
              type="success"
              size="large"
              long
              @click="handleBlog('formInline')"
              >发表文章</Button
            >
          </FormItem>
        </Form>
      </div>
      <Modal v-model="clickModal" @on-visible-change="handleVisible">
        <p slot="header" style="color: #57a3f3; text-align: center">
          <Icon type="ios-information-circle"></Icon>
          <span>发表文章</span>
        </p>
        <div style="text-align: center">
          <Form ref="pubInline" :model="pubInline" :rules="pubRuleInline">
            <FormItem prop="blogCategory">
              <i-Input
                type="text"
                v-model="pubInline.blogCategory"
                placeholder="请输入博客类别..."
                clearable
              >
                <Icon type="md-bookmark" slot="prepend" size="16" />
              </i-Input>
            </FormItem>
            <FormItem prop="blogTag">
              <i-Input
                type="text"
                v-model="pubInline.blogTag"
                placeholder="请输入博客标签..."
                clearable
              >
                <Icon type="md-pricetags" slot="prepend" size="16" />
              </i-Input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button
            type="primary"
            size="large"
            long
            :loading="modal_loading"
            @click="handleBlogSub('pubInline')"
            >发表文章</Button
          >
        </div>
      </Modal>
    </Card>
  </JiageContent>
</template>

<script>
import JiageContent from "@/components/JiageContent";
import { VueEditor } from "vue2-editor";

export default {
  data() {
    return {
      title: "发布文章",
      clickModal: false,
      modal_loading: false,
      formInline: {
        blogTitle: "",
        blogContent: "",
        blogAuthor: "",
      },
      ruleInline: {
        blogTitle: [
          {
            required: true,
            message: "请输入主题",
            trigger: "blur",
          },
        ],
        blogAuthor: [
          {
            required: true,
            message: "请输入作者",
            trigger: "blur",
          },
        ],
        blogContent: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur",
          },
        ],
      },
      pubInline: {
        blogCategory: "",
        blogTag: "",
      },
      pubRuleInline: {
        blogCategory: [
          {
            required: true,
            message: "请输入博客类别",
            trigger: "blur",
          },
        ],
        blogTag: [
          {
            required: true,
            message: "请输入博客标签",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {
    JiageContent,
    VueEditor,
  },
  created() {
    var _this = this;
    let user = JSON.parse(sessionStorage.getItem("user"));
    _this.formInline.blogAuthor = user["username"];
  },
  methods: {
    // 获取csrftoken
    getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
    // 博客发布
    handleBlog(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.clickModal = true;
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleBlogSub(name) {
      var _this = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          var title = _this.formInline.blogTitle;
          var author = _this.formInline.blogAuthor;
          var content = _this.formInline.blogContent;
          var category = _this.pubInline.blogCategory;
          var tag = _this.pubInline.blogTag;
          _this.$http
            .addBlog(
              title,
              author,
              content,
              category,
              tag,
              _this.getCookie("csrftoken")
            )
            .then((resp) => {
              if (resp.result.code === "200") {
                _this.$Message.success(resp.result.msg);
                _this.clickModal = false;
                _this.formInline.blogTitle = "";
                _this.formInline.blogContent = "";
                _this.pubInline.blogCategory = "";
                _this.pubInline.blogTag = "";
              } else {
                _this.$Message.error(resp.result.msg);
              }
            });
        } else {
          _this.$Message.error("Fail!");
        }
      });
    },
    handleVisible(bool) {
      var _this = this;
      if (bool === false) {
        _this.pubInline.blogCategory = "";
        _this.pubInline.blogTag = "";
      }
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
.prompt {
  font-size: 13px;
  font-weight: 600;
}
.btn {
  font-weight: 600;
}
</style>