<template>
  <div>
    <div style="margin-top: 5px; margin-bottom: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/manageView' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>库存查看</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="background">
      <div style="padding: 30px 50px">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="设备名称：">
            <el-input v-model="equipmentName" placeholder="请输入设备名称" size="medium" clearable></el-input>
          </el-form-item>
        </el-form>
        <el-row type="flex" justify="end" style="margin-top: 10px">
          <el-button id="queryButton" type="primary" size="medium" @click="onSubmit">查询</el-button>
          <el-button id="resetButton" type="primary" size="medium" plain style="margin-left: 50px"
                     @click="onReset">清空
          </el-button>
        </el-row>
      </div>
    </div>

    <div class="background" style="margin-top: 30px">
      <div style="padding: 30px 20px">
        <el-table :data="tableData" border max-height="450px"
                  :header-cell-style="{background: 'whitesmoke', color:'dimgray', 'text-align': 'center', 'font-size': '13px'}"
                  :cell-style="{'text-align': 'center', 'font-size': '13px'}">
          <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
          <el-table-column prop="stockNum" label="库存数量"></el-table-column>
          <el-table-column prop="freeNum" label="在库数量"></el-table-column>
          <el-table-column prop="sendNum" label="派送中数量"></el-table-column>
          <el-table-column prop="useNum" label="使用中数量"></el-table-column>
          <el-table-column prop="scrapNum" label="报废数量"></el-table-column>
        </el-table>
      </div>
      <div style="padding-left: 25px; padding-right: 25px; padding-bottom: 30px; display: flex">
        <div style="margin: auto">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 15, 20, 25]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Stock",
  data() {
    return {
      tableData: [], //表格数据 默认为空
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      total: 0, //数据总数
      //查询列表
      equipmentName: ''
    }
  },
  created() {
    this.load()
  },
  methods: {
    //设置当前页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.load()
    },
    //设置每页显示条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    //查询
    async load() {
      await this.request.post('/mg/queryEquipmentStock', {
        'rows': this.pageSize,
        'page': this.currentPage,
        'equipmentName': this.equipmentName.trim()
      }).then(res => {
        this.tableData = res.list
        this.total = res.total
      })
    },
    onSubmit() {
      this.load()
      document.getElementById("queryButton").blur()
    },
    //重置
    async reset() {
      this.equipmentName = ''
    },
    onReset() {
      this.reset()
      this.load()
      document.getElementById("resetButton").blur()
    }
  }
}
</script>