<template>
  <div>
    <div class="background" style="margin-top: 10px">
      <div style="padding: 30px 50px">
        <el-form :inline="true" class="demo-form-inline" label-width="110px">
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
              <el-form-item label="更换设备名称：">
                <el-input v-model.trim="equipmentName" placeholder="请输入更换设备名称" size="medium"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="更换设备型号：">
                <el-input v-model.trim="equipmentType" placeholder="请输入更换设备型号" size="medium"
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

    <div class="background" style="margin-top: 30px">
      <div style="padding: 30px 20px">
        <el-table :data="tableData" border
                  :header-cell-style="{background: 'whitesmoke', color:'dimgray', 'text-align': 'center', 'font-size': '13px'}"
                  :cell-style="{'text-align': 'center', 'font-size': '13px'}">
          <el-table-column prop="srcEquipmentName" label="原设备名称"></el-table-column>
          <el-table-column prop="srcEquipmentType" label="原设备型号"></el-table-column>
          <el-table-column prop="equipmentName" label="更换设备名称"></el-table-column>
          <el-table-column prop="equipmentType" label="更换设备型号"></el-table-column>
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
  name: "ApprovedSuc",
  data() {
    return {
      tableData: [], //表格数据 默认为空
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
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
      await this.request.post('/mg/queryChangedSucInfos', {
        'rows': this.pageSize,
        'page': this.currentPage,
        'applyUser': this.applyUser,
        'approvalUser': this.approvalUser,
        'equipmentName': this.equipmentName,
        'equipmentType': this.equipmentType,
        'receiveStatusCode': this.receiveStatusCode
      }).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    onSubmit() {
      document.getElementById("queryButton").blur()
      this.load()
    },
    //重置
    async reset() {
      this.applyUser = '',
          this.approvalUser = '',
          this.equipmentName = '',
          this.equipmentType = '',
          this.receiveStatusCode = ''
    },
    onReset() {
      document.getElementById("resetButton").blur()
      this.reset()
      this.load()
    },
  }
}
</script>