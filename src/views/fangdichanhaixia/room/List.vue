<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="RoomID:">
              <el-input clearable v-model="listQuery.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="houseID:" :span="2">
              <el-input clearable v-model="listQuery.houseId" :span="4"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房间名称:">
              <el-input clearable v-model="listQuery.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="房间租住状态:">
              <el-select v-model="listQuery.rentedStatus" placeholder="房间租住状态" style="width: 100%" clearable class="filter-item">
                <el-option v-for="item in rentedStatusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="租房人名称:">
              <el-input clearable v-model="listQuery.rentPeopleName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="租房人电话:">
              <el-input clearable v-model="listQuery.rentPeoplePhoneNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同起止日期:">
              <el-date-picker v-model="temp.contracTimeArr" style="width: 100%" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="付款类型:">
              <el-select v-model="listQuery.payorType" placeholder="租住类型" clearable class="filter-item">
                <el-option v-for="item in payRentTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="合同编号:">
              <el-input clearable v-model="listQuery.contractCode"></el-input>
            </el-form-item>
          </el-col>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            查询
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
            新增
          </el-button>
          <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
            导出
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
      <el-table-column show-tooltip-when-overflow label="RoomID" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="HouseID" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.houseId }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="房间名称" prop="id" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="租住状态" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.rentedStatusStr }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="租房人名称" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.rentPeopleName }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="租房人电话" prop="id" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.rentPeoplePhoneNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="付款类型" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.payorTypeStr }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="合同编号" prop="id" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.contractCode }}</span>
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
      <el-table-column show-tooltip-when-overflow label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="100px" style="width: 400px; margin-left:50px;">
        <el-form-item label="对应的房间ID" prop="对应的房间ID">
          <el-input clearable v-model="temp.houseId" placeholder="请填写对应的房间ID"/>
        </el-form-item>
        <el-form-item label="房间名称" prop="房间名称">
          <el-input clearable v-model="temp.name" placeholder="请填写房间名称"/>
        </el-form-item>
        <el-form-item label="房间租住状态" prop="房间租住状态">
          <el-select v-model="temp.rentedStatus" placeholder="请选择房间租住状态" clearable class="filter-item" style="width: 100%">
            <el-option v-for="item in rentedStatusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="租房人名称" prop="租房人名称">
          <el-input clearable v-model="temp.rentPeopleName" placeholder="请填写租房人名称"/>
        </el-form-item>
        <el-form-item label="租房人电话" prop="租房人电话">
          <el-input clearable v-model="temp.rentPeoplePhoneNumber" placeholder="请填写租房人电话"/>
        </el-form-item>
        <el-form-item label="付款类型" prop="付款类型">
          <el-select v-model="temp.payorType" placeholder="请选择付款类型" clearable class="filter-item" style="width: 100%">
            <el-option v-for="item in payRentTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="合同起止日期:">
          <el-date-picker v-model="temp.contracTimeArr" style="width: 100%" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                          value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="合同编号" prop="合同编号">
          <el-input clearable v-model="temp.contractCode" placeholder="请填写合同编号"/>
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
import {selectByPage, add, update, deleteBatch} from '@/api/fangdichanhaixia/room'
import waves from '@/directive/waves' // waves directive
import {parseTime} from '@/utils'
import Pagination from '@/components/Pagination'
import {deleteRole} from "@/api/role"; // secondary package based on el-pagination

const payRentTypeOptions = [
  {key: 1, display_name: '年付'},
  {key: 2, display_name: '半年付'},
  {key: 3, display_name: '押一付三'},
  {key: 4, display_name: '押一付一'}
]
const rentedStatusOptions = [
  {key: 1, display_name: '待出租'},
  {key: 2, display_name: '已出租'}
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
        houseId: null,
        name: null,
        rentedStatus: null,
        rentPeopleName: null,
        rentPeoplePhoneNumber: null,
        payorType: null,
        contracTimeArr: null,
        contractCode: null,
        pageNum: 1,
        pageSize: 20
      },
      importanceOptions: [1, 2, 3],
      rentedStatusOptions,
      payRentTypeOptions,
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: null,
        houseId: null,
        name: null,
        rentedStatus: null,
        rentPeopleName: null,
        rentPeoplePhoneNumber: null,
        payorType: null,
        contracTimeArr: null,
        contractCode: null
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
              title: '新增房间信息 成功',
              message: '新增房间信息 成功',
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
              title: '修改房间信息 成功',
              message: '修改房间信息 成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将删除该房间信息, 是否继续?', '提示', {
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
          title: '删除房间信息 成功',
          message: '删除房间信息 成功',
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
        const tHeader = ['RoomID', 'HouseID', '房间名称', '租住状态', '租房人名称', '租房人电话', '付款类型', '合同编号', '合同编号', '房东名称', '房东电话号', '合同开始日期', '合同结束日期']
        const filterVal = ['id', 'houseId', 'name', 'rentedStatusStr', 'rentPeopleName', 'rentPeoplePhoneNumber', 'payorTypeStr', 'contractCode', 'contractStartTime', 'contractEndTime ']
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
