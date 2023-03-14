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
        <el-dropdown-item>注销登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>

    <el-dialog title="个人信息" :visible.sync="userCenter" @close="resetForm()" width="30%">
      <el-form :model="userInfo" :rules="formRules" ref="userForm" label-width="80px">
        <el-form-item label="姓名" prop="userName">
          <el-input v-model.trim="userInfo.userName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="账户名" prop="loginName">
          <el-input v-model.trim="userInfo.loginName" placeholder="允许输入5-10个字符" autocomplete="off"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="userInfo.email" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="telephoneNumber">
          <el-input v-model.trim="userInfo.telephoneNumber" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleCode">
          <el-input v-model.trim="userInfo.roleCode" autocomplete="off" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userCenter = false">取 消</el-button>
        <el-button type="primary" style="margin-left: 30px" @click="userCenter = false">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改密码" :visible.sync="password" @close="resetPass()" width="30%">
      <el-form :model="form" :rules="passRules" ref="passForm" label-width="100px">
        <el-form-item label="原密码" prop="srcPass">
          <el-input v-model.trim="form.srcPass" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPass">
          <el-input v-model.trim="form.newPass" placeholder="允许输入8-16位数字和英文字母" autocomplete="off"
                    clearable></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPass">
          <el-input v-model.trim="form.confirmPass" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="password = false">取 消</el-button>
        <el-button type="primary" style="margin-left: 30px" @click="password = false">确 定</el-button>
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
    const validateSrcPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('原密码不能为空'));
      } else {
        if (this.form.srcPass !== this.userInfo.loginPassword) {
          callback(new Error('原密码错误'))
        } else {
          this.$refs.passForm.validateField('newPass');
        }
        callback();
      }
    };
    const validateSConfirmPass = (rule, value, callback) => {
      if (value !== this.form.newPass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      userCenter: false,
      userInfo: {
        userCode: '',
        userName: '',
        loginName: '',
        loginPassword: '',
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
        ]
      },
      password: false,
      form: {
        srcPass: '',
        newPass: '',
        confirmPass: ''
      },
      passRules: {
        srcPass: [
          {validator: validateSrcPass, trigger: 'blur'}
        ],
        newPass: [
          {required: true, message: '新密码不能为空', trigger: 'blur'},
          {min: 8, max: 16, message: '密码长度不符', trigger: 'change'},
          {pattern: /^[0-9a-zA-Z]*$/g, message: '密码格式错误', trigger: 'change'}
        ],
        confirmPass: [
          {validator: validateSConfirmPass, trigger: 'change'}
        ]
      },
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      await this.request.post('', {}).then(res => {
        this.userInfo = res.list
      })
    },
    resetForm() {
      this.$refs.userForm.resetFields()
    },
    resetPass(){
      this.$refs.passForm.resetFields()
    }
  }
}
</script>

<style scoped>
.el-input {
  width: 300px;
}
</style>