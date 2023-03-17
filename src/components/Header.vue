<template>
  <div style="font-size: 20px; display: flex">
    <div style="flex: 1;">
      <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
    </div>

    <el-dropdown style="cursor: pointer">
      <span style="margin-right: 30px">Admin</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <el-link :underline="false" @click="userCenter=true">个人信息</el-link>
        </el-dropdown-item>
        <el-dropdown-item>
          <el-link :underline="false" @click="password=true">修改密码</el-link>
        </el-dropdown-item>
        <el-dropdown-item @click.native="logout">注销登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="个人信息" :visible.sync="userCenter" @close="resetForm()" width="30%">
      <el-form :model="userInfo" :rules="formRules" ref="userForm" label-width="80px">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model.trim="userInfo.userName" placeholder="请输入姓名" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="账户名" prop="loginName">
          <el-input v-model.trim="userInfo.loginName" placeholder="允许输入5-10个字符" autocomplete="off"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="userInfo.email" placeholder="请输入邮箱" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="telephoneNumber">
          <el-input v-model.trim="userInfo.telephoneNumber" placeholder="请输入手机号码" autocomplete="off"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleName">
          <el-input v-model.trim="userInfo.roleName" autocomplete="off" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userCenter = false">取 消</el-button>
        <el-button type="primary" style="margin-left: 30px" @click="editUserInfo">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="password" @close="resetPass()" width="30%">
      <el-form :model="form" :rules="passRules" ref="passForm" label-width="100px">
        <el-form-item label="原密码" prop="srcPass">
          <el-input v-model.trim="form.srcPass" placeholder="请输入原密码" autocomplete="off" show-password
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model.trim="form.newPass" placeholder="请输入新密码（8-16位数字和英文字母）" autocomplete="off"
                    show-password clearable></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPass">
          <el-input v-model.trim="form.confirmPass" placeholder="请再次输入新密码" autocomplete="off" show-password
                    clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="password = false">取 消</el-button>
        <el-button type="primary" style="margin-left: 30px" @click="editPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    collapseBtnClass: String,
    collapse: Function
  },
  data() {
    const validateSConfirmPass = (rule, value, callback) => {
      if (value !== this.form.newPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      //个人中心
      userCenter: false,
      //个人信息
      userInfo: {
        userCode: '1',
        userName: '张三',
        loginName: 'zs',
        loginPassword: '123456',
        email: '123@qq.com',
        telephoneNumber: '13456789032',
        roleName: '普通员工'
      },
      //表单校验规则
      formRules: {
        userName: [
          {required: true, message: '员工姓名不能为空', trigger: 'change'}
        ],
        loginName: [
          {required: true, message: '账户名不能为空', trigger: 'change'},
          {
            min: 5,
            max: 10,
            message: '账户名长度不符',
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
        roleCode: [{required: true}]
      },
      //修改密码
      password: false,
      //密码信息
      form: {
        srcPass: '',
        newPass: '',
        confirmPass: ''
      },
      //表单校验规则
      passRules: {
        srcPass: [
          {required: true, message: '新密码不能为空', trigger: 'change'}
        ],
        newPass: [
          {required: true, message: '新密码不能为空', trigger: 'change'},
          {min: 8, max: 16, message: '密码长度不符', trigger: 'change'},
          {pattern: /^[0-9a-zA-Z]*$/g, message: '密码格式错误', trigger: 'change'}
        ],
        confirmPass: [
          {required: true, validator: validateSConfirmPass, trigger: 'blur'}
        ]
      },
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    //获取个人信息
    async getUserInfo() {
      await this.request.post('/getUserInfo', {}).then(res => {
        this.userInfo = res.list
      })
    },
    //修改个人信息
    async editUserInfo() {
      await this.request.post('/user/editUserInfo', {}).then(res => {

      })
    },
    resetForm() {
      this.$refs.userForm.resetFields()
    },
    //修改密码
    async editPassword() {
      await this.request.post('/user/editPassword', {}).then(res => {

      })
    },
    resetPass() {
      this.$refs.passForm.resetFields()
    },
    //注销登录
    async logout() {
      await this.request.post('/logout', {}).then(res => {

      })
    },
  }
}
</script>

<style scoped>
.el-input {
  width: 300px;
}
</style>