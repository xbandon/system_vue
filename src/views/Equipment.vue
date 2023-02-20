<template>
  <div>
    <div style="margin-top: 5px; margin-bottom: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备查看</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="background">
      <div style="padding: 30px 50px">
        <el-form :inline="true" class="demo-form-inline">
          <el-row type="flex" justify="space-around">
            <el-col :span="6">
              <el-form-item label="设备名称：">
                <el-input v-model.trim="equipmentName" placeholder="请输入设备名称" size="medium" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="设备型号：">
                <el-input v-model.trim="equipmentType" placeholder="请输入设备型号" size="medium" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="设备状态：">
                <el-select v-model="equipmentStatusCode" placeholder="请选择设备状态" size="medium" clearable>
                  <el-option label="在库" value="0"></el-option>
                  <el-option label="派送中" value="1"></el-option>
                  <el-option label="使用中" value="2"></el-option>
                  <el-option label="报废" value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="使用人：">
                <el-input v-model.trim="userName" placeholder="请输入使用人" size="medium" clearable></el-input>
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
      <div style="padding: 20px 20px">
        <div style="margin-bottom: 15px">
          <el-button type="primary" style="font-size: 13px" @click="dialogFormVisible=true">新增设备 <i
              class="el-icon-circle-plus-outline"></i></el-button>
          <el-button type="danger" style="font-size: 13px" @click="dialogVisible=true">批量删除 <i
              class="el-icon-remove-outline"></i></el-button>
        </div>
        <el-table :data="tableData" border stripe
                  :header-cell-style="{background: 'lightgray', color:'gray', 'text-align': 'center', 'font-size': '13px'}"
                  :cell-style="{'text-align': 'center', 'font-size': '13px'}">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="keyId" label="设备编号" v-if="false"></el-table-column>
          <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
          <el-table-column prop="equipmentType" label="设备型号"></el-table-column>
          <el-table-column prop="equipmentStatus" label="设备状态"></el-table-column>
          <el-table-column prop="userName" label="使用人"></el-table-column>
          <el-table-column prop="insertUser" label="入库人"></el-table-column>
          <el-table-column prop="insertTime" label="入库时间"></el-table-column>
          <el-table-column prop="updateUser" label="更新人"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
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

    <el-dialog title="新增设备" :visible.sync="dialogFormVisible" @close="closeReset" width="30%">
      <el-form :model="form" :rules="formRules" ref="addForm" label-width="80px">
        <el-form-item label="设备名称" prop="equipmentName">
          <el-input v-model.trim="form.equipmentName" autocomplete="off" style="width: 300px" clearable></el-input>
        </el-form-item>
        <el-form-item label="设备型号" prop="equipmentType">
          <el-input v-model.trim="form.equipmentType" autocomplete="off" placeholder="请输入数字和英文字母"
                    style="width: 300px" maxlength="8" show-word-limit clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button id="okButton" type="primary" style="margin-left: 30px" @click="onAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" style="margin-left: 30px" @click="onDelete">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Equipment",
  inject: ["reload"],
  data() {
    return {
      tableData: [], //表格数据 默认为空
      currentPage: 1, //当前页
      pageSize: 5, //每页显示条数
      total: 0, //数据总数
      //查询列表
      equipmentName: '',
      equipmentType: '',
      equipmentStatusCode: '',
      userName: '',
      //新增对话框
      dialogFormVisible: false,
      //新增列表
      form: {
        equipmentName: '',
        equipmentType: ''
      },
      //表单校验规则
      formRules: {
        equipmentName: [
          {required: true, message: '设备名称不能为空', trigger: 'blur'}
        ],
        equipmentType: [
          {required: true, message: '设备型号不能为空', trigger: 'blur'},
          {
            pattern: /^[0-9a-zA-Z]*$/g,
            message: '允许输入数字和英文字母',
            trigger: 'blur'
          },
        ]
      },
      //删除对话框
      dialogVisible: false
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
      await this.request.post('/mg/queryEquipmentInfos', {
        'rows': this.pageSize,
        'page': this.currentPage,
        'equipmentName': this.equipmentName,
        'equipmentType': this.equipmentType,
        'equipmentStatusCode': this.equipmentStatusCode,
        'userName': this.userName
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
      this.equipmentName = '',
          this.equipmentType = '',
          this.equipmentStatusCode = '',
          this.userName = ''
    },
    onReset() {
      this.reset()
      this.load()
      document.getElementById("resetButton").blur()
    },
    //新增
    async add() {
      await this.request.post('/mg/addEquipmentInfo', {
        'equipmentName': this.form.equipmentName,
        'equipmentType': this.form.equipmentType
      }).then(res => {
        if (res.success) {
          this.$message({
            showClose: true,
            message: '操作成功！',
            type: 'success'
          })
          this.dialogFormVisible = false
        } else if (!res.error) {
          this.$message({
            showClose: true,
            message: res.errMsg,
            type: 'error'
          })
          document.getElementById("okButton").blur()
        }
      })
    },
    onAdd() {
      this.$refs.addForm.validate(flg => {
        if (flg) {
          this.add()
        }
      })
    },
    //关闭新增对话框后重置表单并刷新页面
    closeReset() {
      this.$refs.addForm.resetFields()
      this.reload()
    },
    onDelete() {
    }
  }
}
</script>