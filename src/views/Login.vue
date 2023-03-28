<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <div></div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="" prop="loginName" style="width: 400px">
              <el-input prefix-icon="el-icon-user" size="medium" placeholder="账户名"
                        v-model.trim="ruleForm.loginName"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password" style="width: 400px">
              <el-input prefix-icon="el-icon-lock" size="medium" placeholder="密码"
                        v-model.trim="ruleForm.password"
                        show-password></el-input>
            </el-form-item>
            <el-form-item>

            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" style="width: 300px" @click="submitForm()">登 录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="6">
        <div></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        loginName: '',
        password: ''
      },
      rules: {
        loginName: [{required: true, message: '账户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.request.post('/login', {
            'loginName': this.ruleForm.loginName,
            'loginPassword': this.ruleForm.password
          }).then(res => {
            if (res.code === 200) {
              // 存储用户信息
              localStorage.setItem('user',JSON.stringify(res.result.data))
              // 跳转不同页面
              if (res.result.data.roleCode === 0 || res.result.data.roleCode === 1){
                this.$router.push('/manageView')
              }else{
                this.$router.push('/userView')
              }
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
}
</script>

<style scoped>
.el-row {
  background: linear-gradient(to bottom right, whitesmoke, #B3C0D1);
  height: 100vh;
  display: flex;
  align-items: center;
}
</style>