<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <div></div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-form :model="user" status-icon :rules="rules" ref="user" label-width="100px"
                   class="demo-user">
            <el-form-item label="" prop="loginName" style="width: 400px">
              <el-input prefix-icon="el-icon-user" size="medium" placeholder="账户名"
                        v-model.trim="user.loginName"></el-input>
            </el-form-item>
            <el-form-item label="" prop="loginPassword" style="width: 400px">
              <el-input prefix-icon="el-icon-lock" size="medium" placeholder="密码"
                        v-model.trim="user.loginPassword"
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
      user: {
        loginName: '',
        loginPassword: ''
      },
      rules: {
        loginName: [{required: true, message: '账户名不能为空', trigger: 'blur'}],
        loginPassword: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.user.validate((valid) => {
        if (valid) {
          this.request.post('/login', this.user).then(res => {
            if (res.code === 200) {
              // 存储用户信息
              localStorage.setItem('user', JSON.stringify(res.data.data))
              // 跳转不同页面
              if (res.data.data.roleCode === 0) {
                this.$router.push('/View')
              } else if (res.data.data.roleCode === 1) {
                this.$router.push('/manageView')
              } else {
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
      this.$refs.user.resetFields();
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