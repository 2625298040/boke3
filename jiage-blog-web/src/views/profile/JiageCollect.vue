<template>
  <JiageContent :title="title">
    <Card slot="main-content">
      <div class="wrap" id="app" v-cloak>
        <div class="search_form">
          <div class="logo">天气查询</div>
          <div class="form_group">
            <input
              type="text"
              class="input_txt"
              placeholder="请输入要查询的城市"
              @keyup.enter="searchWerther"
              v-model="city"
            />
            <button class="input_sub">回车查询</button>
          </div>
        </div>
        <ul class="weather_list">
          <li v-for="(item, index) in weatherList" :key="index">
            <div class="info_type">
              <span style="font-size: 12px" class="iconfont">
                {{ item.date }}
                {{ item.low }}
                {{ item.high }}
                {{ item.fengli }}
                {{ item.fengxiang }}
                {{ item.type }}
              </span>
            </div>
            <div class="info_temp">
              <b></b>
              ~
              <b></b>
            </div>
            <div class="info_date"><span></span></div>

            <span></span>
          </li>
        </ul>
      </div>
    </Card>
  </JiageContent>
</template>

<script>
import JiageContent from "@/components/JiageContent";

export default {
  data() {
    return {
      title: "我的收藏",
      weatherList: [],
      key: "93772fb00599f71dac2d399b629ce803",
      city: "",
    };
  },
  components: {
    JiageContent,
  },
  methods: {
    searchWerther() {
      var tem = this;
      this.axios
        .get(
          "http://wthrcdn.etouch.cn/weather_mini?city=" +
            this.city +
            "&" +
            "key=" +
            this.key
        )
        .then(
          // this.weather().then(
          function (resp) {
            // console.log(resp);
            // console.log(resp.data.data.forecast);
            tem.weatherList = resp.data.data.forecast;
          },
          function (err) {
            // console.log(err);
            tem.weatherList = err;
          }
        );
    },
  },
};
</script>

<style>
</style>