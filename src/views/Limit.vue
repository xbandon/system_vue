<template>
  <div>
    <div style="margin-top: 5px; margin-bottom: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="background">
      <div style="padding: 30px 50px">
        <el-form :inline="true" class="demo-form-inline">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="账户名：">
                <el-input v-model.trim="userName" placeholder="请输入员工姓名" size="medium" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="登录状态：">
                <el-select v-model="onlineStatusCode" placeholder="请选择登录状态" size="medium" clearable>
                  <el-option label="离线" value="1"></el-option>
                  <el-option label="在线" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="账户状态：">
                <el-select v-model="accountStatusCode" placeholder="请选择账户状态" size="medium" clearable>
                  <el-option label="可用" value="0"></el-option>
                  <el-option label="停用" value="1"></el-option>
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
      <div style="padding: 20px 20px">
        <div style="margin-bottom: 15px">
          <el-button type="primary" style="font-size: 13px" @click="dialogFormVisible=true">新增员工 <i
              class="el-icon-circle-plus-outline"></i></el-button>
          <el-button id="deleteButton" type="danger" style="font-size: 13px" @click="ifDelete">批量删除 <i
              class="el-icon-remove-outline"></i></el-button>
        </div>
        <el-table :data="tableData" border stripe max-height="450px"
                  :header-cell-style="{background: 'lightgray', color:'gray', 'text-align': 'center', 'font-size': '13px'}"
                  :cell-style="{'text-align': 'center', 'font-size': '13px'}"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="操作">
            <el-link type="primary" :underline="false">密码重置<i class="el-icon-refresh el-icon--right"></i></el-link>
          </el-table-column>
          <el-table-column prop="userCode" label="员工编号" v-if="false"></el-table-column>
          <el-table-column prop="userName" label="员工姓名"></el-table-column>
          <el-table-column prop="loginName" label="账户名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="telephoneNumber" label="手机号码"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column prop="onlineStatus" label="登录状态"></el-table-column>
          <el-table-column prop="accountStatusCode" label="就职状态码" v-if="false"></el-table-column>
          <el-table-column prop="accountStatus" label="就职状态"></el-table-column>
          <el-table-column prop="entryTime" label="入职时间"></el-table-column>
          <el-table-column prop="quitTime" label="离职时间"></el-table-column>
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

    <el-dialog title="新增员工" :visible.sync="dialogFormVisible" @close="closeReset" width="30%">
      <el-form :model="form" :rules="formRules" ref="addForm" label-width="80px">
        <el-form-item label="员工姓名" prop="userName">
          <el-input v-model.trim="form.userName" autocomplete="off" style="width: 300px" clearable></el-input>
        </el-form-item>
        <el-form-item label="账户名" prop="loginName">
          <el-input v-model.trim="form.loginName" autocomplete="off" placeholder="允许输入数字、英文字母和下划线"
                    style="width: 300px"
                    maxlength="10" show-word-limit clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="form.email" autocomplete="off" style="width: 300px" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="telephoneNumber">
          <el-input v-model.trim="form.telephoneNumber" autocomplete="off" style="width: 300px" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleCode">
          <el-select v-model="form.roleCode" placeholder="请选择角色" style="width: 300px" clearable>
            <el-option label="管理员" value="1"></el-option>
            <el-option label="普通用户" value="2"></el-option>
          </el-select>
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
            <el-button id="OkButton" type="primary" style="margin-left: 30px" @click="onDelete">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
import filter from "@/common/filter";

export default {
  name: "User",
  inject: ["reload"],
  data() {
    return {
      tableData: [], //表格数据 默认为空
      currentPage: 1, //当前页
      pageSize: 5, //每页显示条数
      total: 0, //数据总数
      //日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      //查询列表
      userName: '',
      roleCode: '',
      onlineStatusCode: '',
      accountStatusCode: '',
      entryTime: '',
      //新增对话框
      dialogFormVisible: false,
      //新增列表
      form: {
        userName: '',
        loginName: '',
        email: '',
        telephoneNumber: '',
        roleCode: ''
      },
      //表单校验规则
      formRules: {
        userName: [
          {required: true, message: '员工姓名不能为空', trigger: 'blur'}
        ],
        loginName: [
          {required: true, message: '账户名不能为空', trigger: 'blur'},
          {
            pattern: /^[0-9a-zA-Z_]*$/g,
            message: '请输入正确的账户名',
            trigger: 'change'
          },
        ],
        email: [
          {type: 'email', message: '请输入正确的邮箱地址', trigger: 'change'}
        ],
        telephoneNumber: [
          {
            pattern: /^1[3578]\d{9}$/,
            message: '请输入正确的手机号码',
            trigger: 'change'
          }
        ],
        roleCode: [
          {required: true, message: '角色不能为空', trigger: 'change'}
        ]
      },
      //删除对话框
      dialogVisible: false,
      //存储批量删除所选数据
      multipleSelection: []
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
      await this.request.post('/mg/queryUserInfos', {
        'rows': this.pageSize,
        'page': this.currentPage,
        'userName': this.userName,
        'roleCode': this.roleCode,
        'onlineStatusCode': this.onlineStatusCode,
        'accountStatusCode': this.accountStatusCode,
        'entryTime': filter.dateFormat(this.entryTime, 'yyyy-MM-dd')
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
      this.userName = '',
          this.roleCode = '',
          this.onlineStatusCode = '',
          this.accountStatusCode = '',
          this.entryTime = ''
    },
    onReset() {
      document.getElementById("resetButton").blur()
      this.reset()
      this.load()
    },
    //新增
    async add() {
      await this.request.post('/mg/addUserInfo', {
        'userName': this.form.userName,
        'loginName': this.form.loginName,
        'email': this.form.email,
        'telephoneNumber': this.form.telephoneNumber,
        'roleCode': this.form.roleCode
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
    //获取批量删除所选数据
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //批量删除
    async delete() {
      await this.request.post('/mg/deleteUserInfo', {
        'list': this.multipleSelection,
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
    //判断是否选择数据
    ifDelete() {
      document.getElementById("deleteButton").blur()
      if (this.multipleSelection.length === 0) {
        this.$message({
          showClose: true,
          message: "请至少选择一条数据！",
          type: 'error'
        })
      } else {
        this.dialogVisible = true
      }
    },
    onDelete() {
      document.getElementById("OkButton").blur()
      this.delete()
    }
  }
}
</script>