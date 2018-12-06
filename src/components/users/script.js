
import axios from 'axios'
export default {

  data () {
    return {
      usersList: [],
      total: 0,
      pagesize: 3,
      pagenum: 1,
      query: ''
    }
  },
  created () {
    this.getUsersList()
  },
  methods: {
    async getUsersList (pagenum = 1, query = '') {
      const url = 'http://localhost:8888/api/private/v1/users'
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
      const res = await axios.get(url, config)
      console.log(res);
      
      if(res.data.meta.status === 200){
        this.usersList = res.data.data.users
        this.total = res.data.data.total
        this.pagenum = res.data.data.pagenum
      } else {
        this.$router.push('/login')
        localStorage.removeItem('token')
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
    }
  }
}
