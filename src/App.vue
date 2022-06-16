<template>
  <el-container>
    <el-header>
      <div class="date">
        <h2>Hi~~{{ getTimeState }}</h2>
      </div>
      <div class="Head">
        <h2>TOBY的共享账单本</h2>
      </div>
      <div class="time">
        <h2>当前日期为:{{ time }}</h2>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <div class="person-center-left">
          <el-menu default-active="account" class="menu">
            <router-link :key="item.key" v-for="item of navs" :to="item.path">
              <el-menu-item :index="item.key" class="menu-router">
                <template>
                  <div style="border-bottom: 1px solid #d9d9d9">
                    <i :class="item.value"></i>
                    <span slot="title">{{ item.name }}</span>
                  </div>
                </template>
              </el-menu-item>
            </router-link>
          </el-menu>
        </div>
        <el-radio-group v-model="direction"> </el-radio-group>
        <el-button
          class="rili"
          @click="drawer = true"
          type="primary"
          style="margin-left: 16px"
        >
          点击打开在线日历
        </el-button>
        <el-drawer
          title="在线日历"
          :visible.sync="drawer"
          :direction="direction"
          :before-close="handleClose"
        >
          <span>
            <el-calendar v-model="value"> </el-calendar>
          </span>
        </el-drawer>
      </el-aside>
      <el-container>
        <router-view></router-view>

        <el-footer></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      navs: [
        {
          name: "信息",
          path: "/Main",
          value: "iconfont icontabs_xinxi",
          key: "Main",
        },
        {
          name: "统计",
          path: "/AboutAll",
          value: "iconfont icontabs_tongji",
          key: "AboutAll",
        },
      ],
      drawer: false,
      direction: "rtl",
      value: new Date(),
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
  },
  computed: {
    time() {
      return (
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate()
      );
    },
    getTimeState() {
      // 获取当前时间
      let timeNow = new Date();
      // 获取当前小时
      let hours = timeNow.getHours();
      // 设置默认文字
      let state = ``;
      // 判断当前时间段
      if (hours > 6 && hours <= 10) {
        state = `早上好!`;
      } else if (hours > 10 && hours <= 14) {
        state = `中午好!`;
      } else if (hours > 14 && hours <= 18) {
        state = `下午好!`;
      } else if (hours > 18 && hours <= 24) {
        state = `晚上好!`;
      } else if (hours >= 0 && hours <= 6) {
        state = `晚上好!`;
      }
      return state;
    },
  },
};
</script>
<style >
.el-header {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
  border-radius: 30px 30px 0 0;
}
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.date {
  float: left;
  width: 30%;
  text-align: center;
  line-height: 30px;
}
.time {
  float: left;
  width: 30%;
  text-align: center;
  line-height: 30px;
}
.Head {
  background-color: #fff;
  width: 40%;
  text-align: center;
  float: left;
  line-height: 30px;
  border-radius: 40px;
}
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
.rili {
  position: absolute;
  left: 10px;
  top: 176px;
}
</style>


