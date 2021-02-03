<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="OpLogId:">
              <el-input clearable v-model="listQuery.id"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="操作类型:">
              <el-select v-model="listQuery.type" placeholder="操作类型" clearable class="filter-item" style="width: 100%">
                <el-option v-for="item in opTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="操作人:">
              <el-input clearable v-model="listQuery.creatorName"/>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="操作时间:" >
              <el-date-picker v-model="listQuery.createTimeArr" style="width: 130%" type="datetimerange" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"
                              value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="16" align="center">
            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
              查询
            </el-button>
            <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
              导出
            </el-button>
          </el-col>
        </el-row>
      </el-form>

    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column show-tooltip-when-overflow label="OpLogID" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="操作类型" width="120px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.typeStr }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="操作人" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.creatorName }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="操作时间" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.createTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="操作前的旧值" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contentOld }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="操作后的新值" min-width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contentNew }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import {fetchPv, createArticle, updateArticle} from '@/api/article'
import {selectByPage} from '@/api/fangdichanhaixia/oplog'
import waves from '@/directive/waves' // waves directive
import {parseTime} from '@/utils'
import Pagination from '@/components/Pagination'

const opTypeOptions = [
  {key: 1, display_name: '新增老板信息'},
  {key: 2, display_name: '修改老板信息'},
  {key: 3, display_name: '删除老板信息'},
  {key: 4, display_name: '新增房源信息'},
  {key: 5, display_name: '修改房源信息'},
  {key: 6, display_name: '删除房源信息'},
  {key: 7, display_name: '新增房间信息'},
  {key: 8, display_name: '修改房间信息'},
  {key: 9, display_name: '删除房间信息'},
  {key: 10, display_name: '新增支付信息'},
  {key: 11, display_name: '修改支付信息'},
  {key: 11, display_name: '删除支付信息'},
  {key: 11, display_name: '登录系统'},
  {key: 12, display_name: '退出系统'}
]


export default {
  name: 'ComplexTable',
  components: {Pagination},
  directives: {waves},
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        id: null,
        type: null,
        typeStr: null,
        creatorName: null,
        contentOld: null,
        contentNew: null,
        createTimeArr: null,
        pageNum: 1,
        pageSize: 20
      },
      opTypeOptions,
      showReviewer: false,
      temp: {
        id: null,
        type: null,
        typeStr: null,
        creatorName: null,
        contentOld: null,
        contentNew: null
      },
      importanceOptions: [1, 2, 3],
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{required: true, message: 'type is required', trigger: 'change'}],
        timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
        title: [{required: true, message: 'title is required', trigger: 'blur'}]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      selectByPage(this.listQuery).then(response => {
        this.list = response.content.data
        this.total = response.content.totalCount

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.pageNum = 1
      console.log(this.listQuery)
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        status: 'published',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          add(this.temp).then(response => {
            this.dialogFormVisible = false
            this.$notify({
              title: '新增操作日志信息 成功',
              message: '新增操作日志信息 成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          update(this.temp).then(response => {
            this.dialogFormVisible = false
            this.$notify({
              title: '修改操作日志信息 成功',
              message: '修改操作日志信息 成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将删除该操作日志信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const ids = []
          ids.push(row.id)
          this.deleteData(ids)
          this.handleFilter()
        })
    },
    deleteData(ids) {
      deleteBatch(ids).then(response => {
        this.$notify({
          title: '删除操作日志信息 成功',
          message: '删除操作日志信息 成功',
          type: 'success',
          duration: 2000
        })
        this.handleFilter()
      })
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
