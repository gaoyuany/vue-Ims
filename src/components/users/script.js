
export default {

  data () {
    return {
      usersList: [],
      total: 0,
      pagesize: 3,
      pagenum: 1,
      query: '',
      temp: '',
      usrAddForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      formLabelWidth: '120px',
      isShowUserDialog: false,
      userAddRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        email: [
          /*  */
          { pattern: /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+[/.][a-zA-Z0-9_-]+/, message: '请输入正确邮箱地址', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1[3|4|5|8][0-9]\d{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      },
      ShowEditUserDialog: false,
      userEditForm: {
        username: '',
        email: '',
        mobile: '',
        id: -1
      },
      // 分配角色dialog
      showAssignRoles: false,
      // 分配角色
      assignRolesName: {
        username: '',
        roles: [],
        rid: -1,
        id: -1
      },
      // 角色列表
      RolList: []
    }
  },
  created () {
    this.getUsersList(1, this.query)
    this.getRoleList()
  },
  methods: {
    async getUsersList (pagenum = 1, query = '') {
      const url = '/users'
      const config = {
        params: {
          query,
          pagenum,
          pagesize: 3
        }
      }
      try {
        const res = await this.$http.get(url, config)
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.usersList = res.data.data.users
          this.total = res.data.data.total
          this.pagenum = res.data.data.pagenum
        } else {
          this.$router.push('/login')
          localStorage.removeItem('token')
        }
      } catch (e) {
        console.log(e)
      }
    },
    pageChange (curpage) {
      this.getUsersList(curpage, this.query)
    },
    queryInfo () {
      if (!this.query.trim()) {
        return
      }
      this.getUsersList(this.pagenum, this.query)
    },
    async delUser (id) {
      try {
        // console.log(id)
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await this.$http.delete(`/users/${id}`)
        this.$message({
          type: 'success',
          message: '删除成功'
        })

        this.getUsersList()
        // console.log(id)
      } catch (e) {
        console.log(e)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    async changeUserState (cur) {
      try {
        const res = await this.$http.put(`users/${cur.id}/state/${cur.mg_state}`)
        // console.log(cur)
        // console.log(res)
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        // if (res.data.meta.status === 200) {
        //   this.getUsersList(1, this.query)
        // }
      } catch (e) {
        this.$message({
          type: 'info',
          message: '切换用户状态失败'
        })
      }
    },
    showUserDialog () {
      this.isShowUserDialog = true
    },
    async addUser () {
      try {
        await this.$refs.userAddFormRef.validate()
        const res = await this.$http.post('users', this.usrAddForm)
        console.log(res)
        if (res.data.meta.status === 200 || res.data.meta.status === 201) {
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        }
        this.getUsersList(1, this.curpage)
        this.isShowUserDialog = false
      } catch (e) {
        this.$message({
          type: 'danger',
          message: '创建失败'
        })
      }
    },
    closeAddUserDialog () {
      this.$refs.userAddFormRef.resetFields()
    },
    editUserInfo (info) {
      // console.log(info)
      this.ShowEditUserDialog = true
      for (let key in this.usrAddForm) {
        this.userEditForm[key] = info[key]
      }
      this.userEditForm.id = info.id
    },
    async editUser () {
      const {email, mobile} = this.userEditForm
      try {
        const res = await this.$http.put(`users/${this.userEditForm.id}`, {
          email,
          mobile
        })
        if (res.data.meta.status === 200) {
          this.ShowEditUserDialog = false
          this.getUsersList(1, this.query)
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 用户分配角色
    async assignRole (row) {
      // console.log(row)
      this.showAssignRoles = true
      const res = await this.$http.get(`/users/${row.id}`)
      // console.log(res)

      this.assignRolesName.username = row.username
      this.assignRolesName.rid = res.data.data.rid === -1 ? '' : res.data.data.rid
      this.assignRolesName.id = row.id
      // console.log(this.assignRolesName.roles)
    },
    // 获取所有角色列表
    async getRoleList () {
      const res = await this.$http.get(`/roles`)
      this.RolList = res.data.data
      // console.log(res)
    },
    // 点击确认分配角色
    async updateRole (id) {
      try {
        // console.log(id)
        const res = await this.$http.put(`users/${id}/role`, {
          rid: this.assignRolesName.rid
        })
        this.$message({
          type: 'success',
          message: res.data.meta.msg
        })
        // console.log(res)
      } catch (e) {
        console.log(e)
        this.$message({
          type: 'danger',
          message: '操作失败'
        })
      }
      this.showAssignRoles = false
      this.getUsersList(1, this.query)
    }
  }
}
