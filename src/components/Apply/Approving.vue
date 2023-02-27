<template>
  <div>
    <div class="background" style="margin-top: 10px">
      <div style="padding: 30px 50px">
        <el-form :inline="true" class="demo-form-inline" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="申请人：">
                <el-input v-model.trim="userName" placeholder="请输入申请人姓名" size="medium"
                          clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="设备名称：">
                <el-input v-model.trim="equipmentName" placeholder="请输入设备名称" size="medium"
                          clearable></el-input>
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
          <el-table-column label="操作" prop="keyId">
            <template v-slot:="{row}">
              <el-link type="primary" :underline="false" @click=query(row.keyId,row.equipmentName)>查看<i
                  class="el-icon-view el-icon--right"></i></el-link>
            </template>
          </el-table-column>
          <el-table-column prop="keyId" label="主键" v-if="false"></el-table-column>
          <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
          <el-table-column prop="userName" label="申请人"></el-table-column>
          <el-table-column prop="applyReason" label="申请原因"></el-table-column>
          <el-table-column prop="applyTime" label="申请时间"></el-table-column>
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

    <el-dialog title="空闲设备库存" :visible.sync="dialogTableVisible" width="50%">
      <div>
        <el-table :data="gridData" border stripe
                  :header-cell-style="{color:'gray', 'text-align': 'center', 'font-size': '13px'}"
                  :cell-style="{'text-align': 'center', 'font-size': '13px'}">
          <el-table-column type="index" width="55">
            <template scope="scope">
              <el-radio :label="scope.$index"
                        v-model="radio"
                        @change.native="getCurrentRow(scope.row)">&nbsp;
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column property="equipmentName" label="设备名称"></el-table-column>
          <el-table-column property="equipmentType" label="设备型号"></el-table-column>
        </el-table>
      </div>
      <div style="display: flex">
        <div slot="footer" class="dialog-footer" style="padding-top: 30px; margin: auto">
          <el-button id="passButton" type="primary" style="font-size: 13px" @click="onPass">通 过</el-button>
          <el-button type="danger" style="margin-left: 70px; font-size: 13px" @click="dialogFormVisible = true">驳 回
          </el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="申请驳回" :visible.sync="dialogFormVisible" @close="closeReset" width="30%">
      <el-form :model="form" :rules="formRules" ref="form" label-width="80px">
        <el-form-item label="备注" prop="approvalLog">
          <el-input v-model.trim="form.approvalLog" placeholder="请输入申请驳回原因"
                    autocomplete="off"
                    style="width: 300px"
                    type="textarea" :rows="2"
                    maxlength="20" show-word-limit clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button id="okButton" type="primary" style="margin-left: 30px" @click="unPass">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Approving",
  inject: ["reload"],
  data() {
    return {
      tableData: [], //表格数据 默认为空
      currentPage: 1, //当前页
      pageSize: 5, //每页显示条数
      total: 0, //数据总数
      //查询列表
      userName: '',
      equipmentName: '',
      dialogTableVisible: false, //查看对话框
      gridData: [], //对话框内表格数据
      radio: '', //是否选中某个单选框
      //传入参数
      keyId: '',
      eName: '',
      eType: '',
      approvalStatusCode: '',
      dialogFormVisible: false, //申请驳回对话框
      form: {
        approvalLog: ''
      },
      //表单校验规则
      formRules: {
        approvalLog: [{required: true, message: '申请驳回原因不能为空', trigger: 'blur'}]
      }
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
      await this.request.post('/mg/queryApprovingInfos', {
        'rows': this.pageSize,
        'page': this.currentPage,
        'userName': this.userName,
        'equipmentName': this.equipmentName
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
          this.equipmentName = ''
    },
    onReset() {
      this.reset()
      this.load()
      document.getElementById("resetButton").blur()
    },
    //查询空闲设备
    async queryFree() {
      await this.request.post('/mg/queryFreeEquipments', {
        'equipmentName': this.eName
      }).then(res => {
        this.gridData = res.list
      })
    },
    //获取主键，设备名称
    query(keyId, eName) {
      this.dialogTableVisible = true
      this.keyId = keyId
      this.eName = eName
      this.queryFree()
    },
    //获取设备型号
    getCurrentRow(row) {
      this.eType = row.equipmentType
    },
    async pass() {
      await this.request.post('/mg/approveApplications', {
        'keyId': this.keyId,
        'equipmentType': this.eType,
        'approvalStatusCode': this.approvalStatusCode,
        'approvalLog': this.form.approvalLog
      }).then(res => {
        if (res.success) {
          this.$message({
            showClose: true,
            message: '操作成功！',
            type: 'success'
          })
          this.dialogTableVisible = false
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
    onPass() {
      document.getElementById("passButton").blur()
      //判断是否选择数据
      if (this.radio === '') {
        this.$message({
          showClose: true,
          message: "请选择一条数据！",
          type: 'error'
        })
      } else {
        this.approvalStatusCode = 1
        this.pass()
      }
    },
    unPass() {
      document.getElementById("okButton").blur()
      this.$refs.form.validate(flg => {
        if (flg) {
          this.approvalStatusCode = 2
          this.pass()
        }
      })
    },
    //关闭申请驳回对话框后重置表单
    closeReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>