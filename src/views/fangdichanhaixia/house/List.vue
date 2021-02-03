<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="houseID:" :span="2">
              <el-input clearable v-model="listQuery.id" :span="4"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="bossID:">
              <el-input clearable v-model="listQuery.bossId"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房源地址:">
              <el-input clearable v-model="listQuery.address"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房东名称:">
              <el-input clearable v-model="listQuery.ownerName"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="房东电话号:">
              <el-input clearable v-model="listQuery.ownerPhoneNumber"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收款人名称:">
              <el-input clearable v-model="listQuery.payeeName"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收款人手机号:">
              <el-input clearable v-model="listQuery.payeePhoneNumber"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="租住类型:">
              <el-select v-model="listQuery.rentType" placeholder="租住类型" style="width: 100%;" clearable class="filter-item">
                <el-option v-for="item in rentTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="合同编号:">
              <el-input clearable v-model="listQuery.contractCode"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="付款类型:">
              <el-select v-model="listQuery.payorType" placeholder="付款类型" style="width: 100%;" clearable class="filter-item">
                <el-option v-for="item in payRentTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同起止日期:">
              <el-date-picker v-model="listQuery.contracTimeArr" type="daterange" style="width: 100%;" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"
              value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收款账号:">
              <el-input clearable v-model="listQuery.payeeAccount"/>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="24">
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            Search
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
            Add
          </el-button>
          <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
            Export
          </el-button>
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
      <el-table-column show-tooltip-when-overflow label="HouseID" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="房源地址" prop="id" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="BossID" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.bossId }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="房东名称" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.ownerName }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="房东电话号" prop="id" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.ownerPhoneNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="收款人名称" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.payeeName }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="收款人手机号" prop="id" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.payeePhoneNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="合同开始日期" prop="id" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.contractStartTime }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="合同结束日期" prop="id" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.contractEndTime }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="合同编号" prop="id" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.contractCode }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="租住类型" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.rentedTypeStr }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="付款类型" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.payorTypeStr }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="收款账号" prop="id" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.payeeAccount }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="房源地址" prop="房源地址">
          <el-input clearable v-model="temp.address" placeholder="请填写房源地址"/>
        </el-form-item>
        <el-form-item label="BossId" prop="BossId">
          <el-input clearable v-model="temp.bossId" placeholder="请填写BossId"/>
        </el-form-item>
        <el-form-item label="房东名称" prop="房东名称">
          <el-input clearable v-model="temp.ownerName" placeholder="请填写房东名称"/>
        </el-form-item>
        <el-form-item label="房东电话号" prop="房东电话号">
          <el-input clearable v-model="temp.ownerPhoneNumber" placeholder="请填写房东电话号"/>
        </el-form-item>
        <el-form-item label="收款人名称" prop="收款人名称">
          <el-input clearable v-model="temp.payeeName" placeholder="请填写收款人名称"/>
        </el-form-item>
        <el-form-item label="收款人手机号" prop="收款人手机号">
          <el-input clearable v-model="temp.payeePhoneNumber" placeholder="请填写收款人手机号"/>
        </el-form-item>
        <el-form-item label="合同起止日期:">
          <el-date-picker v-model="temp.contracTimeArr" style="width: 100%" type="daterange" range-separator="至"  start-placeholder="开始日期" end-placeholder="结束日期"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="合同编号" prop="合同编号">
          <el-input clearable v-model="temp.contractCode" placeholder="请填写合同编号"/>
        </el-form-item>
        <el-form-item label="租住类型" prop="租住类型">
          <el-select v-model="temp.rentedType" placeholder="请选择租住类型" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in rentTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="付款类型" prop="付款类型">
          <el-select v-model="temp.payorType" placeholder="请选择付款类型" clearable class="filter-item" style="width: 130px">
            <el-option v-for="item in payRentTypeOptions" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="收款账号" prop="收款账号">
          <el-input clearable v-model="temp.payeeAccount" placeholder="请填收款账号"/>
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
        <el-table-column show-tooltip-when-overflow prop="key" label="Channel"/>
        <el-table-column show-tooltip-when-overflow prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {fetchPv} from '@/api/article'
import {selectByPage, add, update, deleteBatch} from '@/api/fangdichanhaixia/house'
import waves from '@/directive/waves' // waves directive
import {parseTime} from '@/utils'
import Pagination from '@/components/Pagination'

const payRentTypeOptions = [
  {key: 1, display_name: '年付'},
  {key: 2, display_name: '半年付'},
  {key: 3, display_name: '押一付三'},
  {key: 4, display_name: '押一付一'}
]
const rentTypeOptions = [
  {key: 1, display_name: '整租'},
  {key: 2, display_name: '合租'}
]

// arr to obj, such as { CN : "China", US : "USA" }
const payRentTypeKeyValue = payRentTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

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
    },
    payRentTypeFilter(type) {
      return payRentTypeKeyValue[type]
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
        contracTimeArr:null,
        rentedType: null,
        contractCode: null,
        payeeAccount: null,
        payorType: null,
        pageNum: 1,
        pageSize: 20
      },
      importanceOptions: [1, 2, 3],
      rentTypeOptions,
      payRentTypeOptions,
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
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
        payorType: null
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
              title: '新增房源信息 成功',
              message: '新增房源信息 成功',
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
              title: '修改房源信息 成功',
              message: '修改房源信息 成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将删除该房源信息, 是否继续?', '提示', {
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
          title: '删除房源信息 成功',
          message: '删除房源信息 成功',
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
        const tHeader = ['HouseId', '房源地址', 'bossID', '房东名称', '房东电话号']
        const filterVal = ['id', 'address', 'bossId', 'bossId', 'bossId']
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
