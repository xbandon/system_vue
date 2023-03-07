<template>
  <div>
    <div style="margin-top: 5px; margin-bottom: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>字典维护</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="background">
      <div style="padding: 30px 50px">
        <el-form :inline="true" class="demo-form-inline">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="字典类型：">
                <el-select v-model="dicTypeCode" placeholder="请选择字典类型" size="medium" clearable>
                  <el-option label="用户角色" value="7"></el-option>
                  <el-option label="登录状态" value="1"></el-option>
                  <el-option label="账户状态" value="2"></el-option>
                  <el-option label="设备状态" value="3"></el-option>
                  <el-option label="审批状态" value="4"></el-option>
                  <el-option label="接收状态" value="5"></el-option>
                  <el-option label="就职状态" value="6"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="字典内容：">
                <el-input v-model.trim="dicValue" placeholder="请输入字典内容" size="medium" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="字典状态：">
                <el-select v-model="delFlag" placeholder="请选择字典状态" size="medium" clearable>
                  <el-option label="已启用" value="0"></el-option>
                  <el-option label="已停用" value="1"></el-option>
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
        <div style="margin-bottom: 15px">
          <el-button type="primary" style="font-size: 13px" @click="dialogFormVisible=true">新增字典 <i
              class="el-icon-circle-plus-outline"></i></el-button>
        </div>
        <el-table :data="tableData" border max-height="450px"
                  :header-cell-style="{background: 'whitesmoke', color:'dimgray', 'text-align': 'center', 'font-size': '13px'}"
                  :cell-style="{'text-align': 'center', 'font-size': '13px'}">
          <el-table-column label="操作" width="150px">
            <template v-slot="{row}">
              <el-link type="primary" :underline="false" @click="handleEdit(row)">编辑</el-link>
              |
              <el-link type="danger" :underline="false" @click="handleEditFlag(row)">
                <span v-if="row.delFlag === '0'">停用</span>
                <span v-if="row.delFlag === '1'">启用</span>
              </el-link>
            </template>
          </el-table-column>
          <el-table-column prop="keyId" label="主键" v-if="false"></el-table-column>
          <el-table-column prop="dicType" label="字典类型"></el-table-column>
          <el-table-column prop="dicTypeCode" label="字典类型编码" v-if="false"></el-table-column>
          <el-table-column prop="dicValue" label="字典内容"></el-table-column>
          <el-table-column prop="delFlag" label="字典状态">
            <template v-slot="{row}">
              <div v-if="row.delFlag === '0'">已启用</div>
              <div v-if="row.delFlag === '1'">已停用</div>
            </template>
          </el-table-column>
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
              :page-sizes="[10, 15, 20, 25]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog title="新增字典" :visible.sync="dialogFormVisible" @close="closeReset" width="30%">
      <el-form :model="form" :rules="formRules" ref="addForm" label-width="100px">
        <el-form-item label="字典类型：" prop="dicTypeCode">
          <el-select v-model="form.dicTypeCode" placeholder="请选择字典类型" style="width: 300px" clearable>
            <el-option label="用户角色" value="7"></el-option>
            <el-option label="登录状态" value="1"></el-option>
            <el-option label="账户状态" value="2"></el-option>
            <el-option label="设备状态" value="3"></el-option>
            <el-option label="审批状态" value="4"></el-option>
            <el-option label="接收状态" value="5"></el-option>
            <el-option label="就职状态" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="字典内容：" prop="dicValue">
          <el-input v-model.trim="form.dicValue" placeholder="请输入字典内容" style="width: 300px" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button id="okButton" type="primary" style="margin-left: 30px" @click="onAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改字典" :visible.sync="editDialogFormVisible" @close="editReset" width="30%">
      <el-form :model="editForm" :rules="editRules" ref="editForm" label-width="100px">
        <el-form-item label="字典类型：" prop="dicType">
          <el-select v-model="editForm.dicType" style="width: 300px" clearable
                     disabled>
          </el-select>
        </el-form-item>
        <el-form-item label="字典类型编码：" prop="dicType" v-if="false">
          <el-select v-model="editForm.dicTypeCode"></el-select>
        </el-form-item>
        <el-form-item label="字典内容：" prop="dicValue">
          <el-input v-model.trim="editForm.dicValue" placeholder="请输入字典内容" style="width: 300px"
                    clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button id="eButton" type="primary" style="margin-left: 30px" @click="onEdit">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
      <span>是否确认操作？</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button id="OkButton" type="primary" style="margin-left: 30px" @click="onEditFlag">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Dictionary",
  inject: ["reload"],
  data() {
    return {
      tableData: [], //表格数据 默认为空
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      total: 0, //数据总数
      //查询列表
      dicTypeCode: '',
      dicValue: '',
      delFlag: '',
      //新增对话框
      dialogFormVisible: false,
      //新增列表
      form: {
        dicTypeCode: '',
        dicValue: ''
      },
      //表单校验规则
      formRules: {
        dicTypeCode: [{required: true, message: '字典类型不能为空', trigger: ['blur', 'change']}],
        dicValue: [{required: true, message: '字典内容不能为空', trigger: 'blur'}]
      },
      //修改对话框
      editDialogFormVisible: false,
      //修改列表
      editForm: [],
      keyId: '',
      //表单校验规则
      editRules: {
        dicValue: [{required: true, message: '字典内容不能为空', trigger: 'blur'}]
      },
      //
      dialogVisible: false,
      flag: ''
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
      await this.request.post('/mg/queryDictionaryInfos', {
        'rows': this.pageSize,
        'page': this.currentPage,
        'dicTypeCode': this.dicTypeCode,
        'dicValue': this.dicValue,
        'delFlag': this.delFlag
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
      this.dicTypeCode = '',
          this.dicValue = '',
          this.delFlag = ''
    },
    onReset() {
      this.reset()
      this.load()
      document.getElementById("resetButton").blur()
    },
    //新增
    async add() {
      await this.request.post('/mg/addDictionaryInfo', {
        'dicTypeCode': this.form.dicTypeCode,
        'dicValue': this.form.dicValue
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
    onAdd() {
      document.getElementById("okButton").blur()
      this.$refs.addForm.validate(flg => {
        if (flg) {
          this.add()
        }
      })
    },
    //关闭新增对话框后重置表单
    closeReset() {
      this.$refs.addForm.resetFields()
    },
    //数据回显
    handleEdit(row) {
      this.editDialogFormVisible = true
      this.editForm = row
      this.keyId = row.keyId
    },
    //修改
    async edit() {
      await this.request.post('/mg/editDictionaryInfo', {
        'keyId': this.keyId,
        'dicTypeCode': this.editForm.dicTypeCode,
        'dicValue': this.editForm.dicValue
      }).then(res => {
        if (res.success) {
          this.$message({
            showClose: true,
            message: '操作成功！',
            type: 'success'
          })
          this.editDialogFormVisible = false
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
    onEdit() {
      document.getElementById("eButton").blur()
      this.$refs.editForm.validate(flg => {
        if (flg) {
          this.edit()
        }
      })
    },
    editReset(){
      this.reload()
    },
    //传入数据
    handleEditFlag(row) {
      this.dialogVisible = true
      this.keyId = row.keyId
      if (row.delFlag === '0') {
        this.flag = '1'
        console.log(this.flag)
      } else {
        this.flag = '0'
      }
    },
    //启用/停用
    async editFlag() {
      await this.request.post('/mg/editDictionaryDelFlag', {
        'keyId': this.keyId,
        'delFlag': this.flag
      }).then(res => {
        if (res.success) {
          this.$message({
            showClose: true,
            message: '操作成功！',
            type: 'success'
          })
          this.dialogVisible = false
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
    onEditFlag() {
      document.getElementById("OkButton").blur()
      this.editFlag()
    }
  }
}
</script>