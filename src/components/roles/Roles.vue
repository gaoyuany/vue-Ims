<template>
  <div class="roles">
    <!-- 面包屑S -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a :to="{path: '/roles'}">权限管理</a>
      </el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 面包屑E -->
    <!-- 表格S -->
    <template>
  <el-table
    :data="rolesList"
    style="width: 100%;" class="rolesTable">
    <el-table-column type="expand">
      <template slot-scope="scope">
        <el-row v-for="level1 in scope.row.children" :key="level1.id" class="level1">
          <!-- 一级菜单 -->
          <el-col :span="4"><el-tag closable>{{ level1.authName }}</el-tag><i class="el-icon-arrow-right"></i></el-col>
          <!-- 二级菜单 -->
          <el-col :span="20">
            <el-row v-for="level2 in level1.children" :key="level2.id">
              <!-- 二级菜单 -->
              <el-col :span="4"><el-tag type="success" closable>{{ level2.authName }}</el-tag><i class="el-icon-arrow-right"></i></el-col>
              <!-- 三级菜单 -->
              <el-col :span="20">
                 <el-tag class="level3" v-for="level3 in level2.children" :key="level3.id" type="warning" closable>{{ level3.authName }}</el-tag>

              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column
      type="index"
      :index="indexMethod">
    </el-table-column>
    <el-table-column
      label="角色名称"
      prop="roleName">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="roleDesc">
    </el-table-column>
    <el-table-column
      label="操作"
      prop="desc">
      <!-- 操作中的标签 -->
      <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click="editRolesInfo(scope.row)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button size="mini" type="danger" plain @click="delRoles(scope.row.id)">
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button size="mini" type="success" plain      @click="isShowRolDialog(scope.row)">
            <i class="el-icon-check">分配权限</i>
          </el-button>
        </template>
    </el-table-column>
  </el-table>
</template>
    <!-- 表格E -->
    <!--  编辑角色信息 -->
    <!-- 编辑用户dialog -->
  <el-dialog title="编辑用户" :visible.sync="ShowEditRolesDialog">
    <el-form :model="RolesEditForm" :label-width="formLabelWidth">
      <el-form-item label="角色名称" prop="username">
        <el-input v-model="RolesEditForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="email">
        <el-input v-model="RolesEditForm.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="ShowEditRolesDialog = false">取 消</el-button>
      <el-button type="primary" @click="editRoles">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 分配权限dialog S-->
  <el-dialog title="分配权限" :visible.sync="isShowRolInfoDialog">
    <!-- 树形结构 -->
    <!-- 数据参数说明
    :data 树形结构数据源
    show-checkbox 节点是否可以被选择
    node-key 树节点用来唯一标识的属性
    :default-expanded-keys 默认展开节点的数组
    :default-checked-keys 勾选的节点的 key 的数组
    :props  配置选项
     -->
    <el-tree
    ref="tree"
  :data="RolesData"
  show-checkbox
  node-key="id"
  :default-expanded-keys="[1,2,3]"
  :default-checked-keys="[5]"
  :default-expand-all="true"
  :props="defaultProps">
</el-tree>

  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="assignRights">确 定</el-button>
  </div>
</el-dialog>
  <!-- 分配权限dialog S-->

  </div>
</template>
<script>
export default {
  data () {
    return {
      rolesList: [],
      indexMethod: 0,
      ShowEditRolesDialog: false,
      RolesEditForm: {
        roleName: '',
        roleDesc: '',
        id: -1
      },
      formLabelWidth: '100px',
      isShowRolInfoDialog: false,
      // 树形结构数据
      RolesData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 当前诶分配权限的角色id
      currentId: -1
    }
  },
  created () {
    this.getRolesList()
    this.getRolTreeList()
  },
  methods: {
    getRolesList () {
      this.$http.get('roles').then(res => {
        // console.log(res.data)
        this.rolesList = res.data.data
      })
    },
    async delRoles (id) {
      try {
        // console.log(id)
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await this.$http.delete(`roles/${id}`)
        // console.log(res)
        this.getRolesList()
      } catch (e) {
        console.log(e)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
      // .then(() => {
      //   this.$message({
      //     type: 'success',
      //     message: '删除成功!'
      //   })
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })
    },
    editRolesInfo (row) {
      this.ShowEditRolesDialog = true
      for (const key in row) {
        this.RolesEditForm[key] = row[key]
      }
    },
    async editRoles () {
      // console.log(this.RolesEditForm)
      try {
        const res = await this.$http.put(`roles/${this.RolesEditForm.id}`, {
          roleName: this.RolesEditForm.roleName,
          roleDesc: this.RolesEditForm.roleDesc
        })
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.ShowEditRolesDialog = false
          this.getRolesList()
        } else {
          this.$message({
            type: 'waring',
            message: res.data.meta.msg
          })
        }
        // console.log(res)
      } catch (e) {
        this.$message({
          type: 'waring',
          message: '编辑失败'
        })
      }
    },
    // 分配权限点击事件
    isShowRolDialog (row) {
      this.isShowRolInfoDialog = true
      // 提取已被选中状态的数据节点
      this.$nextTick(() => {
        this.currentId = row.id
        // console.log(this.currentId)
        // console.log(row)
        const checkedKeys = []
        row.children.forEach(level1 => {
          level1.children.forEach(level2 => {
            level2.children.forEach(level3 => {
              checkedKeys.push(level3.id)
            })
          })
        })
        // console.log(checkedKeys)

        this.$refs.tree.setCheckedKeys(checkedKeys)
      })
    },
    // 获取属性显示列表
    async getRolTreeList () {
      const res = await this.$http.get(`rights/tree`)
      // console.log(res)
      this.RolesData = res.data.data
    },
    // 给角色分配权限
    async assignRights () {
      try {
        // console.log(1)
        const getChecked = this.$refs.tree.getCheckedKeys()
        const getHalfChecked = this.$refs.tree.getHalfCheckedKeys()
        const mainKeys = [...getChecked, ...getHalfChecked]
        // console.log(mainKeys)

        // console.log(mainKeys.join(','))
        const res = await this.$http.post(`roles/${this.currentId}/rights`, {
          rids: mainKeys.join(',')
        })

        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        this.getRolesList()
        this.isShowRolInfoDialog = false
      } catch (e) {
        this.$message({
          type: 'success',
          message: '更新失败'
        })
      }
    }
  }
}
</script>
<style scoped lang="less">
.rolesTable{
  // min-width: 950px;
}
.level1{
  padding:10px;
  border-bottom: 1px dotted #ccc;
  &:last-child {
    border-bottom: none;
  }
}
.rolesTable span{
  margin: 5px;
  cursor: pointer;
}
</style>
