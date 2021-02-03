<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="houseID:" :span="2">
              <el-input clearable v-model="listQuery.houseId" :span="4"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="RoomID:">
              <el-input clearable v-model="listQuery.roomId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支付类型:">
              <el-select v-model="listQuery.rentedStatus" style="width: 100%" placeholder="支付类型" clearable class="filter-item">
                <el-option v-for="item in payTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支付金额:">
              <el-input clearable v-model="listQuery.payAmount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="支付状态:">
              <el-select v-model="listQuery.payStatus" placeholder="支付状态" style="width: 100%" clearable class="filter-item">
                <el-option v-for="item in payStatusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预计付款时间:">
              <el-date-picker v-model="listQuery.expectPayTime" style="width: 100%;" type="date" placeholder="请选择预计付款时间"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="实际付款时间:">
              <el-date-picker v-model="listQuery.realPayTime" style="width: 100%;" type="date" placeholder="请选择实际付款时间"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注:">
              <el-input clearable v-model="listQuery.remarks"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="20" align="right">
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            查询
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
            新增
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
      <el-table-column show-tooltip-when-overflow label="PayID" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="RoomID" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.roomId }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="HouseID" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.houseId }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="支付类型" prop="id" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.payTypeStr }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="预计支付时间" prop="id" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.expectPayTime }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="实际支付时间" prop="id" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.realPayTime }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="支付金额" prop="id" align="center" width="120">
        <template slot-scope="{row}">
          <span>{{ row.payAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="支付状态" prop="id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.payStatusStr }}</span>
        </template>
      </el-table-column>
      <el-table-column show-tooltip-when-overflow label="备注" prop="id" align="center" width="300">
        <template slot-scope="{row}">
          <span>{{ row.remarks }}</span>
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
        <el-form-item label="房源ID" prop="房源ID">
          <el-input clearable v-model="temp.houseId" placeholder="请填写房源ID"/>
        </el-form-item>
        <el-form-item label="房间ID" prop="房间ID">
          <el-input clearable v-model="temp.roomId" placeholder="请填写房间ID"/>
        </el-form-item>
        <el-form-item label="支付类型" prop="支付类型">
          <el-select v-model="temp.payType" placeholder="请选择支付类型" clearable class="filter-item" style="width: 100%">
            <el-option v-for="item in payTypeOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="预计付款时间" prop="预计付款时间">
          <el-date-picker v-model="temp.expectPayTime" style="width: 100%" type="date" placeholder="请选择预计付款时间"/>
        </el-form-item>
        <el-form-item label="实际付款时间" prop="实际付款时间">
          <el-date-picker v-model="temp.realPayTime" style="width: 100%" type="date" placeholder="请选择实际付款时间"/>
        </el-form-item>
        <el-form-item label="支付金额" prop="支付金额">
          <el-input clearable v-model="temp.payAmount" placeholder="请填写支付金额"/>
        </el-form-item>
        <el-form-item label="支付状态" prop="支付状态">
          <el-select v-model="temp.payStatus" placeholder="请选择支付状态" clearable class="filter-item" style="width: 100%">
            <el-option v-for="item in payStatusOptions" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="备注">
          <el-input clearable v-model="temp.remarks" placeholder="请填写备注"/>
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
import {selectByPage, add, update, deleteBatch} from '@/api/fangdichanhaixia/pay'
import waves from '@/directive/waves' // waves directive
import {parseTime} from '@/utils'
import Pagination from '@/components/Pagination'

const payTypeOptions = [
  {key: 1, display_name: '支付房东房租'},
  {key: 2, display_name: '收取租户房租'},
  {key: 3, display_name: '收取租户押金'},
  {key: 4, display_name: '退还租户押金'},
  {key: 5, display_name: '房屋公共维修'},
  {key: 6, display_name: '房屋水电燃气物业'}
]
const payStatusOptions = [
  {key: 1, display_name: '未支付'},
  {key: 2, display_name: '已支付'}
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
        roomId: null,
        payType: null,
        payTypeStr: null,
        expectPayTime: null,
        realPayTime: null,
        payAmount: null,
        payStatus: null,
        remarks: null,
        pageNum: 1,
        pageSize: 20
      },
      importanceOptions: [1, 2, 3],
      payStatusOptions,
      payTypeOptions,
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: null,
        houseId: null,
        roomId: null,
        payType: null,
        payTypeStr: null,
        expectPayTime: null,
        realPayTime: null,
        payAmount: null,
        payStatus: null,
        remarks: null
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
              title: '新增支付信息 成功',
              message: '新增支付信息 成功',
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
              title: '修改支付信息 成功',
              message: '修改支付信息 成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('此操作将删除该支付信息, 是否继续?', '提示', {
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
          title: '删除支付信息 成功',
          message: '删除支付信息 成功',
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
        const tHeader = ['HouseId', '支付地址', 'bossID', '房东名称', '房东电话号']
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
