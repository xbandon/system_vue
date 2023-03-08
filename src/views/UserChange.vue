<template>
  <div>
    <div style="margin-top: 5px; margin-bottom: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/userView' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>设备更换记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="background">
      <div style="padding: 30px 50px">
        <el-form :inline="true" class="demo-form-inline">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="设备名称：">
                <el-input v-model.trim="equipmentName" placeholder="请输入设备名称" size="medium" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="审批状态：">
                <el-select v-model="approvalStatusCode" placeholder="请选择审批状态" size="medium" clearable>
                  <el-option label="未审批" value="1"></el-option>
                  <el-option label="审批通过" value="2"></el-option>
                  <el-option label="审批未通过" value="3"></el-option>
                </el-select>
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
      <div style="padding: 20px 20px">
        <el-table :data="tableData" border max-height="450px"
                  :header-cell-style="{background: 'whitesmoke', color:'dimgray', 'text-align': 'center', 'font-size': '13px'}"
                  :cell-style="{'text-align': 'center', 'font-size': '13px'}">
          <el-table-column label="操作" width="150px">
            <template v-slot="{row}">
              <el-link type="primary" :underline="false" @click="onReceive(row)">
                <span v-if="row.receiveStatusCode === 1">接收</span>
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="keyId" label="主键" v-if="false"></el-table-column>
          <el-table-column prop="srcEquipmentName" label="原设备名称"></el-table-column>
          <el-table-column prop="srcEquipmentType" label="原设备型号"></el-table-column>
          <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
          <el-table-column prop="equipmentType" label="设备型号"></el-table-column>
          <el-table-column prop="applyReason" label="申请原因"></el-table-column>
          <el-table-column prop="applyTime" label="申请时间"></el-table-column>
          <el-table-column prop="approvalStatusCode" label="审批状态码" v-if="false"></el-table-column>
          <el-table-column prop="approvalStatus" label="审批状态"></el-table-column>
          <el-table-column prop="approvalUser" label="审批人"></el-table-column>
          <el-table-column prop="approvalLog" label="审批备注"></el-table-column>
          <el-table-column prop="approvalTime" label="审批时间"></el-table-column>
          <el-table-column prop="receiveStatusCode" label="接收状态码" v-if="false"></el-table-column>
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
  name: "UserChange",
  inject: ["reload"],
  data() {
    return {
      tableData: [], //表格数据 默认为空
      currentPage: 1, //当前页
      pageSize: 5, //每页显示条数
      total: 0, //数据总数
      //查询列表
      equipmentName: '',
      approvalStatusCode: '',
      receiveStatusCode: '',
      //接收列表
      keyId: '',
      equipmentType: ''
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
      await this.request.post('/user/queryChangeRecords', {
        'rows': this.pageSize,
        'page': this.currentPage,
        'equipmentName': this.equipmentName,
        'approvalStatusCode': this.approvalStatusCode,
        'receiveStatusCode': this.receiveStatusCode,
        'userCode': 3
      }).then(res => {
        this.tableData = res.list
        this.total = res.total
      })
    },
    onSubmit() {
      document.getElementById("queryButton").blur()
      this.load()
    },
    //重置
    async reset() {
      this.equipmentName = '',
          this.approvalStatusCode = '',
          this.receiveStatusCode = ''
    },
    onReset() {
      document.getElementById("resetButton").blur()
      this.reset()
      this.load()
    },
    //接收
    async receive() {
      await this.request.post('/user/receiveChangeEquipment', {
        'rows': this.pageSize,
        'page': this.currentPage,
        'keyId': this.keyId,
        'equipmentType': this.equipmentType
      }).then(res => {
        if (res.success) {
          this.$message({
            showClose: true,
            message: '操作成功！',
            type: 'success'
          })
          //刷新页面
          this.reload()
        } else if (!res.error) {
          this.$message({
            showClose: true,
            message: res.errMsg,
            type: 'error'
          })
        }
      })
    },
    onReceive(row) {
      this.keyId = row.keyId
      this.equipmentType = row.equipmentType
      this.receive()
    }
  }
}
</script>