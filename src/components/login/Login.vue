<template>
<el-row  class="login" type="flex" justify="center" align="middle">
  <el-col :span="8" :xs="10" :sm="10" :md="10" :lg="10">
    <el-form label-position="top" :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="login-box">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
  </el-col>
</el-row>

</template>
<script>
// 导入axios
import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      // 非空校验
      this.$refs.loginForm.validate((valid) => {
        if (!valid) {
          return false
        }
          // 登录请求
        axios.post('http://localhost:8888/api/private/v1/login', this.loginForm)
        .then(res => {
          console.log(res.data)
          if(res.data.meta.status==200){
            localStorage.setItem('token',res.data.data.token)
            this.$router.push('/home')
            this.$message ({
              message: res.data.meta.msg,
              type: "success",
              duration: 800
            })
          }else{
            this.$message ({
              message: res.data.meta.msg,
              type: "error",
              duration: 1000
            })
          }
        })

      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style  lang="css" scoped>
  .login{
    background-color: #2D434C;
    height: 100%;
  }
  .el-form-item__label{
    text-align: left ;
  }
  .login-box {
    background-color: #fff;
    padding: 25px;
    border-radius: 10px;
    min-width: 300px;
  }
</style>
