<template>
  <div>
    <div style="margin-top: 5px; margin-bottom: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>设备查看</el-breadcrumb-item>
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
        <div style="margin-bottom: 15px">
          <el-button type="primary" style="font-size: 13px" @click="dialogFormVisible=true">设备申请 <i
              class="el-icon-circle-plus-outline"></i></el-button>
        </div>
        <el-table :data="tableData" border max-height="450px"
                  :header-cell-style="{background: 'whitesmoke', color:'dimgray', 'text-align': 'center', 'font-size': '13px'}"
                  :cell-style="{'text-align': 'center', 'font-size': '13px'}">
          <el-table-column label="操作" width="150px">
            <template v-slot="{row}">
              <el-link type="primary" :underline="false" @click="handleChange(row)">更换 </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="keyId" label="设备编号" v-if="false"></el-table-column>
          <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
          <el-table-column prop="equipmentType" label="设备型号"></el-table-column>
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

    <el-dialog title="设备申请" :visible.sync="dialogFormVisible" @close="closeReset" width="30%">
      <el-form :model="form" :rules="formRules" ref="applyForm" label-width="80px">
        <el-form-item label="设备名称" prop="equipmentName">
          <el-select v-model.trim="form.equipmentName" placeholder="请输入设备名称" style="width: 300px" clearable>
            <el-option v-for="item in options" :value="item.equipmentName">
              {{ item.equipmentName }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请原因" prop="applyReason">
          <el-input v-model.trim="form.applyReason"
                    autocomplete="off" placeholder="请输入申请原因"
                    style="width: 300px"
                    type="textarea" :rows="2"
                    maxlength="20" show-word-limit clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button id="okButton" type="primary" style="margin-left: 30px" @click="onApply">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="设备更换" :visible.sync="changeFormVisible" @close="changeReset" width="30%">
      <el-form :model="change" :rules="changeRules" ref="changeForm" label-width="80px">
        <el-form-item label="设备名称" prop="equipmentName">
          <el-select v-model.trim="change.equipmentName" placeholder="请输入设备名称" style="width: 300px" clearable>
            <el-option v-for="item in options" :value="item.equipmentName">
              {{ item.equipmentName }}
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="更换原因" prop="applyReason">
          <el-input v-model.trim="change.applyReason"
                    autocomplete="off" placeholder="请输入更换原因"
                    style="width: 300px"
                    type="textarea" :rows="2"
                    maxlength="20" show-word-limit clearable>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeFormVisible = false">取 消</el-button>
        <el-button id="cButton" type="primary" style="margin-left: 30px" @click="onChange">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

export default {
  name: "UserEquipment",
  inject: ["reload"],
  data() {
    return {
      tableData: [], //表格数据 默认为空
      currentPage: 1, //当前页
      pageSize: 5, //每页显示条数
      total: 0, //数据总数
      //查询列表
      equipmentName: '',
      //下拉框
      options: [],
      //申请对话框
      dialogFormVisible: false,
      //申请列表
      form: {
        equipmentName: '',
        applyReason: ''
      },
      //表单校验规则
      formRules: {
        equipmentName: [
          {required: true, message: '设备名称不能为空', trigger: ['blur', 'change']}
        ],
        applyReason: [
          {required: true, message: '申请原因不能为空', trigger: 'blur'}
        ]
      },
      //更换对话框
      changeFormVisible: false,
      //更换列表
      srcEquipmentName: '',
      srcEquipmentType: '',
      change: {
        equipmentName: '',
        applyReason: ''
      },
      //表单校验规则
      changeRules: {
        equipmentName: [
          {required: true, message: '设备名称不能为空', trigger: ['blur', 'change']}
        ],
        applyReason: [
          {required: true, message: '更换原因不能为空', trigger: 'blur'}
        ]
      },
    }
  },
  created() {
    this.load()
    this.getOptions()
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
      await this.request.post('/user/queryUserEquipments', {
        'rows': this.pageSize,
        'page': this.currentPage,
        'equipmentName': this.equipmentName,
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
      this.equipmentName = ''
    },
    onReset() {
      document.getElementById("resetButton").blur()
      this.reset()
      this.load()
    },
    //下拉框
    async getOptions() {
      this.request.post("/user/queryEquipmentName").then(res => {
        console.log(res)
        this.options = res.list;
      });
    },
    //申请
    async apply() {
      await this.request.post('/user/applyEquipment', {
        'equipmentName': this.form.equipmentName,
        'applyReason': this.form.applyReason
      }).then(res => {
        if (res.success) {
          this.$message({
            showClose: true,
            message: '操作成功！',
            type: 'success'
          })
          this.dialogFormVisible = false
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
    onApply() {
      document.getElementById("okButton").blur()
      this.$refs.applyForm.validate(flg => {
        if (flg) {
          this.apply()
        }
      })
    },
    //关闭申请对话框后重置表单
    closeReset() {
      this.$refs.applyForm.resetFields()
    },
    handleChange(row) {
      this.changeFormVisible = true
      this.srcEquipmentName = row.equipmentName
      this.srcEquipmentType = row.equipmentType
    },
    //更换
    async changeEquipment() {
      await this.request.post('/user/changeEquipment', {
        'srcEquipmentName': this.srcEquipmentName,
        'srcEquipmentType': this.srcEquipmentType,
        'equipmentName': this.change.equipmentName,
        'applyReason': this.change.applyReason
      }).then(res => {
        if (res.success) {
          this.$message({
            showClose: true,
            message: '操作成功！',
            type: 'success'
          })
          this.changeFormVisible = false
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
    onChange() {
      document.getElementById("cButton").blur()
      this.$refs.changeForm.validate(flg => {
        if (flg) {
          this.changeEquipment()
        }
      })
    },
    //关闭更换对话框后重置表单
    changeReset() {
      this.$refs.changeForm.resetFields()
    },
  }
}
</script>