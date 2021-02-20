<template>
  <Footer class="layout-footer-center">
    <p>{{ dateFormat("YYYY-mm-dd HH:MM", time) }}</p>
  </Footer>
</template>

<script>
export default {
  data() {
    return {
      time: new Date(),
    };
  },
  methods: {
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
  },
};
</script>

<style scoped>
.layout-footer-center {
  text-align: center;
  min-width: 1420px;
}
</style>