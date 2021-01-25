<template>
  <div class="app-container">
    <div class="filter-container">
      <el-sl-panel style="border-left: 60px;margin-left: 70px" class="filter-item">houseID:</el-sl-panel>
      <el-input v-model="listQuery.id" placeholder="houseID" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-sl-panel style="border-left: 60px;margin-left: 70px" class="filter-item">bossID:</el-sl-panel>
      <el-input v-model="listQuery.name" placeholder="bossID" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-sl-panel style="border-left: 60px;margin-left: 70px" class="filter-item">房源地址:</el-sl-panel>
      <el-input v-model="listQuery.phoneNumber" placeholder="房源地址" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-sl-panel style="border-left: 60px;margin-left: 70px" class="filter-item">房东名称:</el-sl-panel>
      <el-input v-model="listQuery.id" placeholder="房东名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-sl-panel style="border-left: 60px;margin-left: 70px" class="filter-item">房东电话号:</el-sl-panel>
      <el-input v-model="listQuery.name" placeholder="房东电话号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-sl-panel style="border-left: 60px;margin-left: 70px" class="filter-item">收款人名称:</el-sl-panel>
      <el-input v-model="listQuery.phoneNumber" placeholder="收款人名称" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-sl-panel style="border-left: 60px;margin-left: 70px" class="filter-item">收款人手机号:</el-sl-panel>
      <el-input v-model="listQuery.id" placeholder="收款人手机号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-sl-panel style="border-left: 60px;margin-left: 70px" class="filter-item">租住类型:</el-sl-panel>
      <el-input v-model="listQuery.name" placeholder="租住类型" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-sl-panel style="border-left: 60px;margin-left: 70px" class="filter-item">合同编号:</el-sl-panel>
      <el-input v-model="listQuery.name" placeholder="合同编号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-sl-panel style="border-left: 60px;margin-left: 70px" class="filter-item">付款类型:</el-sl-panel>
      <el-input v-model="listQuery.name" placeholder="付款类型" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-sl-panel style="border-left: 60px;margin-left: 70px" class="filter-item">收款账号:</el-sl-panel>
      <el-input v-model="listQuery.name" placeholder="收款账号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-sl-panel style="border-left: 60px;margin-left: 70px" class="filter-item">合同起止时间:</el-sl-panel>
      <el-input v-model="listQuery.phoneNumber" placeholder="合同起止时间" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        Add
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox>
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
      <el-table-column label="HouseID" prop="id"  align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.houseId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房源地址" prop="id"  align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="BossID" prop="id"  align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.bossId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房东名称" prop="id"  align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.ownerName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房东电话号" prop="id"  align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.ownerPhoneNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收款人名称" prop="id"  align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.payeeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收款人手机号" prop="id"  align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.payeePhoneNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同开始日期" prop="id"  align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.contractStartTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同结束日期" prop="id"  align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.contractEndTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="合同编号" prop="id"  align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.contractCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="租住类型" prop="id"  align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.rentedTypeStr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="付款类型" prop="id"  align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.payorTypeStr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收款账号" prop="id"  align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.payeeAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <!--          <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'published')">
                      Publish
                    </el-button>-->
          <!--          <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'draft')">
                      Draft
                    </el-button>-->
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="房源地址" prop="房源地址">
          <el-input v-model="temp.name" placeholder="请填写姓名"/>
        </el-form-item>
        <el-form-item label="BossId" prop="BossId">
          <el-input v-model="temp.phoneNumber" placeholder="请填写手机号码"/>
        </el-form-item>
        <el-form-item label="房东名称" prop="房东名称">
          <el-date-picker v-model="temp.createTime" type="datetime" placeholder="请选择上任时间" />
        </el-form-item>
        <el-form-item label="房东电话号" prop="房东电话号">
          <el-input v-model="temp.name" placeholder="请填写姓名"/>
        </el-form-item>
        <el-form-item label="收款人名称" prop="收款人名称">
          <el-input v-model="temp.phoneNumber" placeholder="请填写手机号码"/>
        </el-form-item>
        <el-form-item label="收款人手机号" prop="收款人手机号">
          <el-date-picker v-model="temp.createTime" type="datetime" placeholder="请选择上任时间" />
        </el-form-item>
        <el-form-item label="合同开始日期" prop="合同开始日期">
          <el-input v-model="temp.name" placeholder="请填写姓名"/>
        </el-form-item>
        <el-form-item label="合同结束日期" prop="合同结束日期">
          <el-input v-model="temp.phoneNumber" placeholder="请填写手机号码"/>
        </el-form-item>
        <el-form-item label="合同编号" prop="合同编号">
          <el-date-picker v-model="temp.createTime" type="datetime" placeholder="请选择上任时间" />
        </el-form-item>
        <el-form-item label="租住类型" prop="租住类型">
          <el-input v-model="temp.name" placeholder="请填写姓名"/>
        </el-form-item>
        <el-form-item label="手机号码" prop="手机号码">
          <el-input v-model="temp.phoneNumber" placeholder="请填写手机号码"/>
        </el-form-item>
        <el-form-item label="上任时间" prop="上任时间">
          <el-date-picker v-model="temp.createTime" type="datetime" placeholder="请选择上任时间" />
        </el-form-item>
        <el-form-item label="付款类型" prop="付款类型">
          <el-input v-model="temp.name" placeholder="请填写姓名"/>
        </el-form-item>
        <el-form-item label="收款账号" prop="收款账号">
          <el-input v-model="temp.phoneNumber" placeholder="请填写手机号码"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          保存
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { fetchPv } from '@/api/article'
import { selectByPage, add, update} from '@/api/fangdichanhaixia/house'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
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
        bossId: null,
        address: null,
        ownerName: null,
        ownerPhoneNumber: null,
        payeeName: null,
        payeePhoneNumber: null,
        contractStartTime: null,
        contractEndTime: null,
        rentedType: null,
        contractCode: null,
        payeeAccount: null,
        pageNum: 1,
        pageSize: 20
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        remark: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: 'published'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
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
    /* getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },*/
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
              title: '新增老板信息 成功',
              message: '新增老板信息 成功',
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
              title: '修改老板信息 成功',
              message: '修改老板信息 成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: 'Success',
        message: 'Delete Successfully',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
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
