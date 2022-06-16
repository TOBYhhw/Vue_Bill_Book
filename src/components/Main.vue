<template>
  <div>
    <el-table
      v-loading="loading"
      :data="
        tableData.slice((currentPage - 1) * PageSize, currentPage * PageSize)
      "
      style="width: 100%"
    >
      <el-table-column label="ID" prop="Id"> </el-table-column>
      <el-table-column label="交易名称" prop="name"> </el-table-column>
      <el-table-column label="交易金额" prop="money"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-button type="primary" round @click="handleAdd"
            >点击添加新交易</el-button
          >
          <!-- 添加时候的弹出层 -->
          <el-dialog
            title=""
            :visible.sync="dialogFormVisible2"
            width="500px"
            top="200px"
          >
            <el-form :model="form2">
              <el-form-item label="交易名称" :label-width="formLabelWidth2">
                <el-input v-model="form2.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="交易金额" :label-width="formLabelWidth2">
                <el-input v-model="form2.money" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="备注:" :label-width="formLabelWidth2">
                <el-input
                  :disabled="true"
                  value="如果金额为正数不需要+,如果为负数加上-"
                >
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="handleSet2">确 定</el-button>
            </div>
          </el-dialog>
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"
            @keyup.native="searchlist(scope)"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
          <!-- 编辑时候的弹出层 -->
          <el-dialog
            title=""
            :visible.sync="dialogFormVisible1"
            width="500px"
            top="200px"
          >
            <el-form :model="form1">
              <el-form-item label="当前ID" :label-width="formLabelWidth1">
                <el-input
                  v-model="form1.Id"
                  auto-complete="off"
                  :disabled="true"
                >
                  <!-- 禁止输入 -->
                </el-input>
              </el-form-item>
              <el-form-item label="交易名称" :label-width="formLabelWidth1">
                <el-input v-model="form1.name" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="交易金额" :label-width="formLabelWidth1">
                <el-input v-model="form1.money" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="备注:" :label-width="formLabelWidth1">
                <el-input
                  :disabled="true"
                  value="如果金额为正数不需要+,如果为负数加上-"
                >
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="handleSet1">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="PageSize"
      layout="total, sizes, prev, pager, next,jumper"
      :total="totalCount"
    >
    </el-pagination>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "MainDoing",
  components: {},
  data() {
    return {
      tableData: [], //总数据
      loading: true, //数据未加载完时有加载的效果
      search: "", //拿到搜索框的内容
      currentPage: 1, //默认显示第几页
      totalCount: 1, //总条数，根据接口获取长度
      pageSizes: [6, 7, 8, 9, 10], //个数选择器，可修改
      PageSize: 10, //默认每页显示的条数，可修改
      dialogFormVisible1: false, //弹出层默认为关闭
      dialogFormVisible2: false, //添加的弹出
      //弹出层中的表单
      form1: {
        Id: "",
        name: "",
        money: "",
      },
      form2: {
        name: "",
        money: "",
      },
      formLabelWidth1: "70px",
      formLabelWidth2: "80px",
    };
  },
  methods: {
    //添加功能
    handleAdd() {
      this.dialogFormVisible2 = true;
    },
    handleSet2() {
      axios
        .get(
          ` http://127.0.0.1:3007/add?name=${this.form2.name}&money=${this.form2.money}`
        )
        .then(
          () => {
            this.$message("添加成功!");
            this.getData();
            this.form2.name = ""; //清空输入框的内容
            this.form2.money = ""; //清空输入框的内容
            this.dialogFormVisible2 = false; //关闭弹窗
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //向接口拿数据渲染到页面
    getData() {
      axios.get(" http://127.0.0.1:3007/getHistory").then(
        (response) => {
          console.log(response);
          this.tableData = response.data.data; //把数据赋值给tabledata
          this.totalCount = response.data.data.length; //把数据的长度赋值给totalcount
          this.loading = false; //移除加载特效
        },
        (error) => {
          console.log("err", error);
        }
      );
    },
    //分页
    //每页显示的条数
    handleSizeChange(val) {
      //改变每页显示的条数
      this.PageSize = val;
      //在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    //显示第几页
    handleCurrentChange(val) {
      //改变默认的页数
      this.currentPage = val;
    },
    //编辑功能
    handleEdit(index, row) {
      this.dialogFormVisible1 = true; //开启弹出层
      //对弹出层中的表单赋值
      console.log(index, row);
      this.form1.Id = row.Id;
    },
    handleSet1() {
      axios
        .get(
          ` http://127.0.0.1:3007/update?Id=${this.form1.Id}&name=${this.form1.name}&money=${this.form1.money}`
        )
        .then(
          () => {
            this.$message("修改成功!");
            this.getData();
            this.form1.name = ""; //清空输入框的内容
            this.form1.money = ""; //清空输入框的内容
            this.dialogFormVisible1 = false; //关闭弹窗
          },
          (error) => {
            console.log(error);
          }
        );
    },
    //删除功能
    handleDelete(index, row) {
      console.log(index, row);
      axios.get(` http://127.0.0.1:3007/delete/${row.Id}`).then(
        (response) => {
          console.log("请求成功", response);
          this.$message("删除成功!");
          this.getData();
        },
        (error) => {
          console.log("err", error);
        }
      );
    },
    //搜索功能
    searchlist(scope) {
      console.log("this", scope);
      axios
        .get(` http://127.0.0.1:3007/getHistoryByName?name=${this.search}`)
        .then(
          (response) => {
            console.log("请求成功", response.data.data);
            this.tableData = []; //把原数组清空
            this.tableData = response.data.data; //把搜索拿到的数据放进去
            this.totalCount = response.data.data.length; //把数据的长度赋值给totalcount
          },
          (error) => {
            console.log("err", error);
          }
        );
    },
  },
  //生命周期钩子，立刻调用接口并渲染到页面
  created() {
    this.getData();
  },
};
</script>
<style>
body {
  margin: 0;
}
.pagination {
  text-align: center;
}
</style>

