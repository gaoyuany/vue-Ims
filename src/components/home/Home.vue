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
        <span>欢迎上海前端22期&nbsp;{{username}}</span><span @click="logout"> 退出</span>
        </div></el-col>
    </el-row>

  </el-header>
    <el-container>
      <!-- aside -->
      <el-aside class="home-aside" width="200px">
        <!-- 用户管理 -->
        <el-menu :router="true" default-active="1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
              <i class="el-icon-menu"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
          </el-submenu>
        <!-- 权限管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
              <span slot="title">角色列表</span>
            </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-menu"></i>
              <span slot="title">权限列表</span>
            </el-menu-item>
          </el-submenu>
        <!-- 商品管理 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="/goods">
              <i class="el-icon-menu"></i>
              <span slot="title">商品列表</span>
            </el-menu-item>
            <el-menu-item index="/params">
              <i class="el-icon-menu"></i>
              <span slot="title">分类参数</span>
            </el-menu-item>
            <el-menu-item index="/categories">
              <i class="el-icon-menu"></i>
              <span slot="title">商品分类</span>
            </el-menu-item>
          </el-submenu>
        <!-- 订单管理 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="/orders">
              <i class="el-icon-menu"></i>
              <span slot="title">订单列表</span>
            </el-menu-item>
          </el-submenu>
        <!-- 数据统计 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="/reports">
              <i class="el-icon-menu"></i>
              <span slot="title">数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- main -->
      <el-main class="home-main">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/users">用户管理</a></el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      username: 'admin'
    }
  },
  methods: {
    // handleOpen(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    // handleClose(key, keyPath) {
    //   console.log(key, keyPath);
    // },
    logout() {
      this.$router.push('/login')
      this.$message({
        type:'success',
        message:'退出成功',
        duration:1000
      }),
      localStorage.removeItem('token');
    }
  }
}
</script>

<style lang="less" scoped>
@mainColor:#545c64;
@headerColor:rgb(147, 152, 155);
.home-container{
  background-color: @headerColor;
  height: 100%;
  i {
    color: #fff;
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
    background-color: @mainColor;
  }
}
.el-menu{
  border-right: none;
}
.home-main{
  background-color: #eee;
}
.home-username{
  text-align: right;
  line-height: 60px;
  font-weight: bold;
}
.el-menu-item-group__title{
  padding: 0px 0 0px 20px;
}
/*面包屑*/
.el-breadcrumb{
  padding: 10px;
}
ul li div.el-submenu__title{
  font-size: 18px;
}
</style>
