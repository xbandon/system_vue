<template>
  <div>
    <div style="margin-top: 5px; margin-bottom: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>主页</el-breadcrumb-item>
        <el-breadcrumb-item>员工管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="background">
      <div style="padding: 30px 50px">
        <el-form :inline="true" class="demo-form-inline">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="员工姓名：">
                <el-input v-model.trim="userName" placeholder="请输入员工姓名" size="medium" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="角色：">
                <el-select v-model="roleCode" placeholder="请选择角色" size="medium" clearable>
                  <el-option label="仓库管理员" value="1"></el-option>
                  <el-option label="普通员工" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="就职状态：">
                <el-select v-model="accountStatusCode" placeholder="请选择就职状态" size="medium" clearable>
                  <el-option label="在职" value="0"></el-option>
                  <el-option label="离职" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="入职时间：">
                <el-date-picker
                    v-model="entryTime"
                    type="date"
                    placeholder="请选择日期"
                    size="medium">
                </el-date-picker>
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
          <el-button type="primary" style="font-size: 13px" @click="dialogFormVisible=true">新增员工 <i
              class="el-icon-circle-plus-outline"></i></el-button>
          <el-button id="delButton" type="danger" style="font-size: 13px" @click="ifDelete">批量删除 <i
              class="el-icon-remove-outline"></i></el-button>
        </div>
        <el-table :data="tableData" border max-height="450px"
                  :header-cell-style="{background: 'whitesmoke', color:'dimgray', 'text-align': 'center', 'font-size': '13px'}"
                  :cell-style="{'text-align': 'center', 'font-size': '13px'}"
                  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="操作" width="150px">
            <template v-slot="{row}">
              <el-link type="primary" :underline="false" @click="handleRole(row)">授权</el-link>
              |
              <el-link type="warning" :underline="false" @click="handleReset(row)">密码重置</el-link>
              |
              <el-link type="danger" :underline="false" @click="handleQuit(row)" :disabled="quitFlg(row)">离职</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="userCode" label="员工编号" v-if="false"></el-table-column>
          <el-table-column prop="userName" label="员工姓名"></el-table-column>
          <el-table-column prop="loginName" label="账户名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="telephoneNumber" label="手机号码"></el-table-column>
          <el-table-column prop="role" label="角色"></el-table-column>
          <el-table-column prop="accountStatusCode" label="就职状态码" v-if="false"></el-table-column>
          <el-table-column prop="accountStatus" label="就职状态"></el-table-column>
          <el-table-column prop="entryTime" label="入职时间"></el-table-column>
          <el-table-column prop="quitTime" label="离职时间"></el-table-column>
          <el-table-column prop="updateUser" label="更新人"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间" width="200px"></el-table-column>
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

    <el-dialog title="新增员工" :visible.sync="dialogFormVisible" @close="closeReset" width="30%">
      <el-form :model="form" :rules="formRules" ref="addForm" label-width="80px">
        <el-form-item label="员工姓名" prop="userName">
          <el-input v-model.trim="form.userName" autocomplete="off" placeholder="请输入员工姓名" style="width: 300px"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="账户名" prop="loginName">
          <el-input v-model.trim="form.loginName" autocomplete="off" placeholder="请输入账户名（3-8位数字、字母、下划线）"
                    minlength="3" maxlength="8" show-word-limit
                    style="width: 300px"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="form.email" autocomplete="off" placeholder="请输入邮箱" style="width: 300px"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="telephoneNumber">
          <el-input v-model.trim="form.telephoneNumber" autocomplete="off" placeholder="请输入手机号码"
                    style="width: 300px" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleCode">
          <el-select v-model="form.roleCode" placeholder="请选择角色" style="width: 300px" clearable>
            <el-option label="仓库管理员" value="1"></el-option>
            <el-option label="普通员工" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button id="addButton" type="primary" style="margin-left: 30px" @click="onAdd">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="20%">
      <span>是否确认删除？</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button id="onDelButton" type="primary" style="margin-left: 30px" @click="onDelete">确 定</el-button>
            </span>
    </el-dialog>

    <el-dialog title="员工授权" :visible.sync="roleFormVisible" @close="roleReset" width="30%">
      <el-form :model="role" :rules="roleRules" ref="roleForm" label-width="80px">
        <el-form-item label="角色" prop="role">
          <el-select v-model="role.role" placeholder="请选择角色" style="width: 300px" clearable>
            <el-option label="仓库管理员" value="1"></el-option>
            <el-option label="普通员工" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button id="sButton" type="primary" style="margin-left: 30px" @click="onSetRole">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="resetVisible" width="20%">
      <span>是否确认重置？</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="resetVisible = false">取 消</el-button>
            <el-button id="rButton" type="primary" style="margin-left: 30px" @click="onResetPassword">确 定</el-button>
            </span>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="quitVisible" width="20%">
      <span>是否为该员工办理离职？</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="quitVisible = false">取 消</el-button>
            <el-button id="qButton" type="primary" style="margin-left: 30px" @click="onQuit">确 定</el-button>
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
      //获取当前登录人员信息
      user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
      tableData: [], //表格数据 默认为空
      currentPage: 1, //当前页
      pageSize: 10, //每页显示条数
      total: 0, //数据总数
      //查询列表
      userName: '',
      roleCode: '',
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
          {pattern: /^\w+$/, message: '账户名格式错误', trigger: 'blur'},
          {min: 3, max: 8, message: '账户名长度不符', trigger: 'change'}
        ],
        email: [
          {type: 'email', message: '邮箱格式错误', trigger: 'blur'}
        ],
        telephoneNumber: [
          {pattern: /^1[3578]\d{9}$/, message: '手机号码格式错误', trigger: 'blur'}
        ],
        roleCode: [
          {required: true, message: '角色不能为空', trigger: 'change'}
        ]
      },
      //删除对话框
      dialogVisible: false,
      //存储批量删除所选数据
      multipleSelection: [],
      //员工授权对话框
      roleFormVisible: false,
      role: [],
      //表单校验规则
      roleRules: {
        role: [{required: true, message: '角色不能为空', trigger: 'change'}]
      },
      resetVisible: false, //密码重置对话框
      quitVisible: false, //离职对话框
      keyId: '' //主键
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
        'accountStatusCode': this.accountStatusCode,
        'entryTime': filter.dateFormat(this.entryTime, 'yyyy-MM-dd')
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
      this.userName = '',
          this.roleCode = '',
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
        'roleCode': this.form.roleCode,
        'loginUserCode': this.user.userCode
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          //关闭新增对话框
          this.dialogFormVisible = false
          //刷新页面
          this.reload()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onAdd() {
      document.getElementById("addButton").blur()
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
    //判断是否选择数据
    ifDelete() {
      document.getElementById("delButton").blur()
      if (this.multipleSelection.length === 0) {
        this.$message.error("请至少选择一条数据")
      } else {
        this.dialogVisible = true
      }
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
        if (res.code === 200) {
          this.$message.success(res.msg)
          //关闭删除对话框
          this.dialogVisible = false
          //刷新页面
          this.reload()
        } else {
          this.$message.error(res.msg)
          //关闭删除对话框
          this.dialogVisible = false
        }
      })
    },
    onDelete() {
      document.getElementById("onDelButton").blur()
      this.delete()
    },
    //授权对话框数据回显
    handleRole(row) {
      this.roleFormVisible = true
      this.role = row
      this.keyId = row.userCode
    },
    //授权
    async setRole() {
      await this.request.post('/mg/editRole', {
        'userCode': this.keyId,
        'roleCode': this.role.role,
        'loginUserCode': this.user.userCode
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          //关闭授权对话框
          this.roleFormVisible = false
          //刷新页面
          this.reload()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onSetRole() {
      document.getElementById("sButton").blur()
      this.$refs.roleForm.validate(flg => {
        if (flg) {
          this.setRole()
        }
      })
    },
    //关闭授权对话框后重置表单
    roleReset() {
      this.$refs.roleForm.resetFields()
    },
    //获取主键
    handleReset(row) {
      this.resetVisible = true
      this.keyId = row.userCode
    },
    //密码重置
    async resetPassword() {
      await this.request.post('/mg/resetPassword', {
        'userCode': this.keyId,
        'loginUserCode': this.user.userCode
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          //关闭密码重置对话框
          this.resetVisible = false
          //刷新页面
          this.reload()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onResetPassword() {
      document.getElementById("rButton").blur()
      this.resetPassword()
    },
    //获取主键
    handleQuit(row) {
      this.quitVisible = true
      this.keyId = row.userCode
    },
    //离职
    async quit() {
      await this.request.post('/mg/quitUser', {
        'userCode': this.keyId,
        'loginUserCode': this.user.userCode
      }).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg)
          //关闭离职对话框
          this.quitVisible = false
          //刷新页面
          this.reload()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    onQuit() {
      document.getElementById("qButton").blur()
      this.quit()
    },
    quitFlg(row) {
      if (row.accountStatusCode === 1) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>