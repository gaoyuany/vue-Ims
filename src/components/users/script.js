
import axios from 'axios'
export default {

  data () {
    return {
      usersList: [],
      total: 0,
      pagesize: 3,
      pagenum: 1,
      query: '',
      temp: ''
    }
  },
  created () {
    this.getUsersList()
  },
  methods: {
    async getUsersList (pagenum = 1, query = '') {
      const url = '/users'
      const config = {
        params: {
          query,
          pagenum,
          pagesize: 3
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
      try {
        const res = await axios.get(url, config)
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
      this.getUsersList(curpage)
    },
    queryInfo () {
      if (!this.query.trim()) {
        return
      }
      this.getUsersList(this.pagenum, this.query)
    },
    async delUser (id) {
      try {
        // const res = await axios.delete(`/users/${id}`)
        // console.log(id)
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await axios.delete(`/users/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
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
    }
  }
}
