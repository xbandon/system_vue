<template>
  <div>
    <div class="background" style="margin-top: 10px">
      <div style="padding: 30px 50px">
        <el-form :inline="true" class="demo-form-inline" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="申请人：">
                <el-input v-model.trim="applyUser" placeholder="请输入申请人姓名" size="medium"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="审批人：">
                <el-input v-model.trim="approvalUser" placeholder="请输入审批人姓名" size="medium"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="设备名称：">
                <el-input v-model.trim="equipmentName" placeholder="请输入设备名称" size="medium"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="设备型号：">
                <el-input v-model.trim="equipmentType" placeholder="请输入设备型号" size="medium"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="接收状态：">
                <el-select v-model="receiveStatusCode" placeholder="请选择接收状态" size="medium" clearable>
                  <el-option label="未接收" value="1"></el-option>
                  <el-option label="已接收" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-row type="flex" justify="end" style="margin-top: 10px">
          <el-button id="queryButton" type="primary" size="medium" @click="onSubmit">查询</el-button>
          <el-button id="resetButton" type="primary" size="medium" plain style="margin-left: 50px"
                     @click="onReset">清空
          </el-button>
        </el-row>
      </div>
    </div>

    <div class="background" style="margin-top: 50px">
      <div style="padding: 30px 20px">
        <el-table :data="tableData" border stripe
                  :header-cell-style="{background: 'lightgray', color:'gray', 'text-align': 'center', 'font-size': '13px'}"
                  :cell-style="{'text-align': 'center', 'font-size': '13px'}">
          <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
          <el-table-column prop="equipmentType" label="设备型号"></el-table-column>
          <el-table-column prop="applyUser" label="申请人"></el-table-column>
          <el-table-column prop="applyReason" label="申请原因"></el-table-column>
          <el-table-column prop="applyTime" label="申请时间"></el-table-column>
          <el-table-column prop="approvalUser" label="审批人"></el-table-column>
          <el-table-column prop="approvalTime" label="审批时间"></el-table-column>
          <el-table-column prop="receiveStatus" label="接收状态"></el-table-column>
          <el-table-column prop="receiveTime" label="接收时间"></el-table-column>
        </el-table>
      </div>
      <div style="padding-left: 25px; padding-right: 25px; padding-bottom: 30px; display: flex">
        <div style="margin: auto">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
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
  name: "ApprovedSuc",
  data() {
    return {
      tableData: [], //表格数据 默认为空
      currentPage: 1, //当前页
      pageSize: 5, //每页显示条数
      total: 0, //数据总数
      //查询列表
      applyUser: '',
      approvalUser: '',
      equipmentName: '',
      equipmentType: '',
      receiveStatusCode: ''
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
      await this.request.post('/mg/queryApprovedSucInfos', {
        'rows': this.pageSize,
        'page': this.currentPage,
        'applyUser': this.applyUser,
        'approvalUser': this.approvalUser,
        'equipmentName': this.equipmentName,
        'equipmentType': this.equipmentType,
        'receiveStatusCode': this.receiveStatusCode
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
      this.userName = '',
          this.approvalUser = '',
          this.equipmentName = '',
          this.equipmentType = '',
          this.receiveStatusCode = ''
    },
    onReset() {
      this.reset()
      this.load()
      document.getElementById("resetButton").blur()
    },
  }
}
</script>