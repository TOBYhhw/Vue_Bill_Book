<template>
  <div class="view" v-loading="loading">
    <div class="top">
      <div class="zhongji">
        <h2>余额:{{ mes.balance }}</h2>
      </div>
    </div>
    <div class="bottom">
      <div class="shouru">
        <h2>收入:{{ mes.earning }}</h2>
        <el-progress
          color="green"
          type="circle"
          :percentage="
            ((mes.earning / (mes.earning + mes.expend)) * 100).toFixed(2)
          "
        ></el-progress>
      </div>
      <div class="zhichu">
        <h2>支出:{{ mes.expend }}</h2>
        <el-progress
          color="red"
          type="circle"
          :percentage="
            ((mes.expend / (mes.earning + mes.expend)) * 100).toFixed(2)
          "
        ></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutAll",
  data() {
    return {
      mes: [],
      loading: true,
    };
  },
  methods: {},
  created() {
    this.get();
  },
};
</script>

<style>
.view {
  margin: 0 auto;

  width: 1000px;
}
.shouru {
  float: left;
  padding: 0 170px;
  color: green;
}
.zhichu {
  float: left;
  padding: 0 170px;
  color: red;
}
.zhongji {
  margin: 0 auto;
  width: 200px;
  text-align: center;
  line-height: 50px;

  border-radius: 30px;
}
.top {
  height: 100px;
  border-radius: 30px 30px 0 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.22), 0 0 6px rgba(0, 0, 0, 0.14);
  border: 0 solid;
}
.bottom {
  height: 500px;
  border-radius: 0 0 30px 30px;
  border: 0 solid;
  box-shadow: 0 2px 4px 1px rgba(0, 0, 0, 0.12), 0 0 6px 1px rgba(0, 0, 0, 0.14);
}
</style>