<template>
  <div class="rights">
     <!-- 面包屑S -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a :to="{path: '/roles'}">权限管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑E -->
    <!-- 表格S -->
    <template>
    <el-table
    :data="rightsList"
    style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod">
        </el-table-column>
        <el-table-column
          prop="authName"
          label="权限名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径"
          width="180">
        </el-table-column>
        <el-table-column
          prop="level"
          label="层级">
          <template slot-scope="scope">
            <span v-if="scope.row.level=='0'">一级</span>
            <span v-else-if="scope.row.level=='1'">二级</span>
            <span v-else>三级</span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 表格E -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      rightsList: []
    }
  },
  methods: {
    indexMethod (index) {
      return index
    },
    getRightsList () {
      this.$http.get(`rights/${'list'}`).then(res => {
        console.log(res)
        this.rightsList = res.data.data
      })
    }
  },
  created () {
    this.getRightsList()
  }
}
</script>
