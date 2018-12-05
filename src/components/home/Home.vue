<template>
<el-container class="home-container">
  <!-- header -->
  <el-header class="home-header">
    <el-row :gutter="10">
      <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4"><div class="grid-content bg-purple">
          <img src="../../assets/images/logo.png" alt="">
        </div></el-col>
      <el-col :xs="12" :sm="14" :md="15" :lg="15" :xl="18"><div class="grid-content bg-purple-light home-header-title">
        电商后台管理系统</div></el-col>
      <el-col :xs="8" :sm="6" :md="5" :lg="5" :xl="2"><div class="grid-content bg-purple home-username">
        <span>欢迎上海前端22期&nbsp;{{username}}</span>
        </div></el-col>
    </el-row>

  </el-header>
    <el-container>
      <!-- aside -->
      <el-aside class="home-aside" width="200px">Aside</el-aside>
      <!-- main -->
      <el-main class="home-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      username: 'admin'
    }
  }
}
</script>

<style lang="css" scoped>
.home-container{
  background-color: #eee;
  height: 100%;
}
.home-header-title{
  /* padding: 0; */
  font-size: 30px;
  font-weight: bold;
  color: #fff;
  line-height: 60px;
  text-align: center;
}
.home-header img{
  margin-top: 5px;
  height: 50px;
  width: 180px;
}
.home-aside{
  background-color: #ccc;
}
.home-main{
  background-color: #aaa;
}
.home-username{
  text-align: right;
  line-height: 60px;
  font-weight: bold;
}
</style>
