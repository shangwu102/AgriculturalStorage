<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="value" placeholder="请选择" @change="chaxun">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="sousuo" placeholder="请输入控制器名称">''</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="chaxun">搜素</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :key="newdata.id"
      :data="newdata"
      style="width: 100%"
      border
      :row-style="{height: '64px'}"
    >
      <el-table-column
        prop="controllerStatus"
        label="状态"
        width="130"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.controllerStatus === 1" style="color: green;">
            <i class="el-icon-check" /> 正常
          </span>
          <span v-else style="color: red;">
            <i class="el-icon-close" /> 异常
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="controllerId"
        label="编号"
        width="70px"
      />
      <el-table-column
        prop="icon"
        label="图标"
        width="130"
      />
      <el-table-column
        prop="controllerName"
        label="控制器名称"
      />
      <el-table-column
        prop="controllerValue"
        label="数值"
        width="300"
      />
      <el-table-column
        prop="status"
        label="控制器状态"
      >
        <el-switch
          v-model="kzqzt"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button size="small" type="success" @click="shezhi(scope.row)">设置</el-button>
          <el-button size="small" type="primary">查看报表</el-button>
          <el-button size="small" type="warning" @click="chongmm(scope.row)">重命名</el-button>
          <el-drawer
            title="控制器设置列表"
            :visible.sync="table"
            direction="rtl"
            size="50%"
          >
            <div class="celan">
              <el-button type="primary" @click="xinzeng()">新增设置</el-button>
              <br>
              <br>
              <h3 class="el-icon-alarm-clock">定时</h3>
              <el-table :data="gridData1">
                <el-table-column property="controllerOpentime" label="开始时间" />
                <el-table-column property="controllerEndtime" label="结束时间" />
                <el-table-column property="controllerCount" label="循环次数" />
                <el-table-column property="controllerStatus" label="状态" />
                <el-table-column property="controllerCycle" label="循环周期" />
                <el-table-column width="140px" label="操作">
                  <template slot-scope="szscope">
                    <el-button size="small" type="warning" icon="el-icon-edit" @click="xuigai(szscope.row)" />
                    <el-button size="small" type="danger" icon="el-icon-delete" @click="shanchushezhi(szscope.row)" />
                  </template>
                </el-table-column>
              </el-table>
              <br>
              <h3 class="el-icon-refresh">循环</h3>
              <el-table :data="gridData2">
                <el-table-column property="controllerEndtype" label="循环结束类型" />
                <el-table-column property="controllerOpentime" label="开启时间" />
                <el-table-column property="controllerEndtime" label="关闭时间" />
                <el-table-column property="controllerCount" label="循环次数" />
                <el-table-column property="controllerTime" label="持续时间(分钟)" />
                <el-table-column property="controllerInterval" label="间隔(分钟)" />
                <el-table-column property="controllerStatus" label="状态" />
                <el-table-column property="controllerCycle" label="循环周期" />
                <el-table-column width="140px" label="操作">
                  <template slot-scope="szscope">
                    <el-button size="small" type="warning" icon="el-icon-edit" @click="xuigai(szscope.row)" />
                    <el-button size="small" type="danger" icon="el-icon-delete" @click="shanchushezhi(szscope.row)" />
                  </template>
                </el-table-column>
              </el-table>
              <br>
              <h3 class="el-icon-help">智能</h3>
              <el-table :data="gridData3">
                <el-table-column property="controllerOpenname" label="智能控制打开设备名称" />
                <el-table-column property="controllerControl" label="智能控制关闭设备名称" />
                <el-table-column property="controllerOpencondition" label="打开设备条件" />
                <el-table-column property="controllerValue" label="关闭设备条件" />
                <el-table-column property="controllerOpentime" label="开启时间" />
                <el-table-column property="controller_offcondition" label="关闭时间" />
                <el-table-column property="controllerConditionvalue" label="打开条件数值" />
                <el-table-column property="controllerOffvalue" label="关闭条件数值" />
                <el-table-column property="controllerStatus" label="状态" />
                <el-table-column width="140px" label="操作">
                  <template slot-scope="szscope">
                    <el-button size="small" type="warning" icon="el-icon-edit" @click="xuigai(szscope.row)" />
                    <el-button size="small" type="danger" icon="el-icon-delete" @click="shanchushezhi(szscope.row)" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-drawer>
          <el-dialog width="30vw" title="新增控制器设置" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="shujujianyan" class="xinzenshuju">
              <div class="if">
                <el-form-item label-width="130px" label="控制类型">
                  <el-select v-model="form.kzqType" placeholder="请选择">
                    <el-option
                      v-for="item in leixing"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type3'"
                  label-width="130px"
                  label="智能控制打开设备"
                  prop="controllerOpenname"
                >
                  <el-select v-model="form.controllerOpenname" placeholder="请选择">
                    <el-option
                      v-for="item in cgqmc"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type3'"
                  label-width="130px"
                  label="智能控制关闭设备"
                  prop="controllerControl"
                >
                  <el-select v-model="form.controllerControl" placeholder="请选择">
                    <el-option
                      v-for="item in cgqmc"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type3'"
                  label-width="130px"
                  label="打开设备条件"
                  prop="controllerOpencondition"
                >
                  <el-select v-model="form.controllerOpencondition" placeholder="请选择">
                    <el-option
                      v-for="item in tj"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type3'"
                  label-width="130px"
                  label="关闭设备条件"
                  prop="controllerValue"
                >
                  <el-select v-model="form.controllerValue" placeholder="请选择">
                    <el-option
                      v-for="item in tj"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type2'"
                  label-width="130px"
                  label="循环结束类型"
                  prop="controllerEndtype"
                >
                  <el-select v-model="form.controllerEndtype" placeholder="请选择">
                    <el-option
                      v-for="item in xhjslx"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label-width="130px"
                  label="开始时间"
                  prop="controllerOpentime"
                >
                  <el-date-picker
                    v-model="form.controllerOpentime"
                    type="datetime"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
                <el-form-item
                  label-width="130px"
                  label="关闭时间"
                  prop="controllerEndtime"
                >
                  <el-date-picker
                    v-model="form.controllerEndtime"
                    type="datetime"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type3'"
                  label-width="130px"
                  label="打开条件数值"
                  prop="controllerConditionvalue"
                >
                  <el-input v-model="form.controllerConditionvalue" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type3'"
                  label-width="130px"
                  label="关闭条件数值"
                  prop="controllerOffvalue"
                >
                  <el-input v-model="form.controllerOffvalue" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type2' || form.kzqType ==='type1'"
                  label-width="130px"
                  label="循环次数"
                  prop="controllerCount"
                >
                  <el-input v-model="form.controllerCount" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type2'"
                  label-width="130px"
                  label="持续时间分钟"
                  prop="controllerTime"
                >
                  <el-input v-model="form.controllerTime" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type2'"
                  label-width="130px"
                  label="间隔分钟"
                  prop="controllerInterval"
                >
                  <el-input v-model="form.controllerInterval" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item
                  label-width="130px"
                  label="状态"
                  prop="controllerStatus"
                >
                  <el-select v-model="form.controllerStatus" placeholder="请选择">
                    <el-option
                      v-for="item in zt"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type2' || form.kzqType ==='type1'"
                  label-width="130px"
                  label="循环周期"
                  prop="controllerCycle"
                >
                  <el-select v-model="form.controllerCycle" placeholder="请选择">
                    <el-option
                      v-for="item in xhzq"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="xinzengqr()">确 定</el-button>
                </div>
              </div>
            </el-form>
          </el-dialog>
          <el-dialog width="30vw" title="修改设置" :visible.sync="xuigaixs">
            <el-form :model="form" :rules="shujujianyan" class="xinzenshuju">
              <div class="if">
                <el-form-item label-width="130px" label="控制类型">
                  <el-select v-model="form.kzqType" placeholder="请选择">
                    <el-option
                      v-for="item in leixing"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type3'"
                  label-width="130px"
                  label="智能控制打开设备"
                  prop="controllerOpenname"
                >
                  <el-select v-model="form.controllerOpenname" placeholder="请选择">
                    <el-option
                      v-for="item in cgqmc"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type3'"
                  label-width="130px"
                  label="智能控制关闭设备"
                  prop="controllerControl"
                >
                  <el-select v-model="form.controllerControl" placeholder="请选择">
                    <el-option
                      v-for="item in cgqmc"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type3'"
                  label-width="130px"
                  label="打开设备条件"
                  prop="controllerOpencondition"
                >
                  <el-select v-model="form.controllerOpencondition" placeholder="请选择">
                    <el-option
                      v-for="item in tj"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type3'"
                  label-width="130px"
                  label="关闭设备条件"
                  prop="controllerValue"
                >
                  <el-select v-model="form.controllerValue" placeholder="请选择">
                    <el-option
                      v-for="item in tj"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type2'"
                  label-width="130px"
                  label="循环结束类型"
                  prop="controllerEndtype"
                >
                  <el-select v-model="form.controllerEndtype" placeholder="请选择">
                    <el-option
                      v-for="item in xhjslx"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  label-width="130px"
                  label="开始时间"
                  prop="controllerOpentime"
                >
                  <el-date-picker
                    v-model="form.controllerOpentime"
                    type="datetime"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
                <el-form-item
                  label-width="130px"
                  label="关闭时间"
                  prop="controllerEndtime"
                >
                  <el-date-picker
                    v-model="form.controllerEndtime"
                    type="datetime"
                    placeholder="选择日期时间"
                  />
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type3'"
                  label-width="130px"
                  label="打开条件数值"
                  prop="controllerConditionvalue"
                >
                  <el-input v-model="form.controllerConditionvalue" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type3'"
                  label-width="130px"
                  label="关闭条件数值"
                  prop="controllerOffvalue"
                >
                  <el-input v-model="form.controllerOffvalue" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type2' || form.kzqType ==='type1'"
                  label-width="130px"
                  label="循环次数"
                  prop="controllerCount"
                >
                  <el-input v-model="form.controllerCount" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type2'"
                  label-width="130px"
                  label="持续时间分钟"
                  prop="controllerTime"
                >
                  <el-input v-model="form.controllerTime" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type2'"
                  label-width="130px"
                  label="间隔分钟"
                  prop="controllerInterval"
                >
                  <el-input v-model="form.controllerInterval" placeholder="请输入内容" />
                </el-form-item>
                <el-form-item
                  label-width="130px"
                  label="状态"
                  prop="controllerStatus"
                >
                  <el-select v-model="form.controllerStatus" placeholder="请选择">
                    <el-option
                      v-for="item in zt"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="form.kzqType === 'type2' || form.kzqType ==='type1'"
                  label-width="130px"
                  label="循环周期"
                  prop="controllerCycle"
                >
                  <el-select v-model="form.controllerCycle" placeholder="请选择">
                    <el-option
                      v-for="item in xhzq"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="xuigaixs = false">取 消</el-button>
                  <el-button type="primary" @click="xuigaiqr()">确 定</el-button>
                </div>
              </div>
            </el-form>
          </el-dialog>
          <el-dialog title="重命名" :visible.sync="chongmmxs">
            <el-form :model="dangqianhangshuju" :rules="shujujianyan1" class="chongmingming">
              <el-form-item label="控制器名称" prop="controllerName">
                <el-input v-model="dangqianhangshuju.controllerName" placeholder="请输入内容" />
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="chongmmxs = false">取 消</el-button>
              <el-button type="primary" @click="chongmmqr()">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="yema">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="zhongjianshuju.length"
        :current-page.sync="dangqianyema"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import { kzqsbhq } from '@/api/kongzhishebei.js'
import { hqdskzq } from '@/api/kongzhishebei.js'
import { hqxhkzq } from '@/api/kongzhishebei.js'
import { hqznkzq } from '@/api/kongzhishebei.js'
import { chongmingming } from '@/api/kongzhishebei.js'
import { hqkzqmc } from '@/api/kongzhishebei.js'
import { xzdssz } from '@/api/kongzhishebei.js'
import { xzxhsz } from '@/api/kongzhishebei.js'
import { xzznsz } from '@/api/kongzhishebei.js'
export default {
  data() {
    const options = [{
      value: 1,
      label: '正常'
    },
    {
      value: 0,
      label: '警告'
    }
    ]
    const tableData = [
      {
        'status': '✅',
        'device_id': 1,
        'icon': '正常图标.png',
        'controller_name': '温度控制器',
        'value': 23.5,
        'controllerStatus': 1
      },
      {
        'status': '❌',
        'device_id': 2,
        'icon': '警告图标.png',
        'controller_name': '湿度控制器',
        'value': 68.2,
        'controllerStatus': 0
      },
      {
        'status': '⚠',
        'device_id': 3,
        'icon': '故障图标.png',
        'controller_name': '压力控制器',
        'value': null,
        'controllerStatus': 1
      },
      {
        'status': '✅',
        'device_id': 4,
        'icon': '正常图标.png',
        'controller_name': '气体控制器',
        'value': 15.3,
        'controllerStatus': 0
      },
      {
        'status': '✅',
        'device_id': 5,
        'icon': '正常图标.png',
        'controller_name': '温度控制器',
        'value': 22.8,
        'controllerStatus': 1
      },
      {
        'status': '❌',
        'device_id': 6,
        'icon': '警告图标.png',
        'controller_name': '湿度控制器',
        'value': 72.5,
        'controllerStatus': 0
      },
      {
        'status': '⚠',
        'device_id': 7,
        'icon': '故障图标.png',
        'controller_name': '压力控制器',
        'value': null,
        'controllerStatus': 1
      },
      {
        'status': '✅',
        'device_id': 8,
        'icon': '正常图标.png',
        'controller_name': '气体控制器',
        'value': 12.6,
        'controllerStatus': 0
      },
      {
        'status': '❌',
        'device_id': 9,
        'icon': '警告图标.png',
        'controller_name': '温度控制器',
        'value': 30.2,
        'controllerStatus': 1
      },
      {
        'status': '✅',
        'device_id': 10,
        'icon': '正常图标.png',
        'controller_name': '湿度控制器',
        'value': 55.4,
        'controllerStatus': 0
      },
      {
        'status': '⚠',
        'device_id': 11,
        'icon': '故障图标.png',
        'controller_name': '气压控制器',
        'value': null,
        'controllerStatus': 1
      },
      {
        'status': '✅',
        'device_id': 12,
        'icon': '正常图标.png',
        'controller_name': '风速控制器',
        'value': 5.4,
        'controllerStatus': 0
      },
      {
        'status': '❌',
        'device_id': 13,
        'icon': '警告图标.png',
        'controller_name': '温度控制器',
        'value': 29.9,
        'controllerStatus': 1
      }
    ]

    const newrukuxx = {
      kzqType: 'type1',
      controllerOpentime: '',
      controllerEndtime: '',
      controllerCount: '',
      controllerStatus: '',
      controllerCycle: '',
      controllerEndtype: '',
      controllerTime: '',
      controllerInterval: '',
      controllerOpenname: '',
      controllerControl: '',
      controllerOpencondition: '',
      controllerValue: '',
      controllerConditionvalue: '',
      controllerOffvalue: ''
    }
    const newrukuxxcz = {
      kzqType: 'type1',
      controllerOpentime: '',
      controllerEndtime: '',
      controllerCount: '',
      controllerStatus: '',
      controllerCycle: '',
      controllerEndtype: '',
      controllerTime: '',
      controllerInterval: '',
      controllerOpenname: '',
      controllerControl: '',
      controllerOpencondition: '',
      controllerValue: '',
      controllerConditionvalue: '',
      controllerOffvalue: ''
    }
    const newrukuxxjianyan = {
      controllerOpentime: [{ required: true, message: '请输入开启时间', trigger: 'blur' }],
      controllerEndtime: [{ required: true, message: '请输入关闭时间', trigger: 'blur' }],
      controllerCount: [{ required: true, message: '请输入循环次数', trigger: 'blur' }],
      controllerStatus: [{ required: true, message: '请输入状态', trigger: 'blur' }],
      controllerCycle: [{ required: true, message: '请输入循环周期', trigger: 'blur' }],
      controllerEndtype: [{ required: true, message: '请输入循环结束类型', trigger: 'blur' }],
      controllerTime: [{ required: true, message: '请输入持续时间(分钟)', trigger: 'blur' }],
      controllerInterval: [{ required: true, message: '请输入间隔(分钟)', trigger: 'blur' }],
      controllerOpenname: [{ required: true, message: '请输入智能控制打开设备名称', trigger: 'blur' }],
      controllerControl: [{ required: true, message: '请输入智能控制关闭设备名称', trigger: 'blur' }],
      controllerOpencondition: [{ required: true, message: '请输入打开设备条件', trigger: 'blur' }],
      controllerValue: [{ required: true, message: '请输入关闭设备条件', trigger: 'blur' }],
      controllerConditionvalue: [{ required: true, message: '请输入打开条件数值', trigger: 'blur' }],
      controllerOffvalue: [{ required: true, message: '请输入关闭条件数值', trigger: 'blur' }]

    }
    const newrukuxxjianyan1 = {
      controllerName: [{ required: true, message: '请输入控制器名称', trigger: 'blur' }]
    }
    const gridData1 = [
      // {
      //   'controllerOpentime': '00:00',
      //   'controllerEndtime': '01:00',
      //   'controllerCount': 5,
      //   'controllerStatus': 10,
      //   'controllerCycle': '正常'
      // },
      // {
      //   'sensorStart': '02:00',
      //   'sensorEnd': '03:00',
      //   'lessValue': 3,
      //   'bigValue': 12,
      //   'sensorStatus': '警报'
      // },
      // {
      //   'sensorStart': '04:00',
      //   'sensorEnd': '05:00',
      //   'lessValue': 1,
      //   'bigValue': 15,
      //   'sensorStatus': '正常'
      // }
    ]
    const gridData2 = [
      // {
      //   'controllerEndtype': '00:00',
      //   'controllerOpentime': '01:00',
      //   'controllerEndtime': 5,
      //   'controllerCount': 10,
      //   'controllerTime': '正常',
      //   'controllerInterval': 10,
      //   'controllerStatus': 10,
      //   'controllerCycle': 10

      // },
      // {
      //   'sensorStart': '02:00',
      //   'sensorEnd': '03:00',
      //   'lessValue': 3,
      //   'bigValue': 12,
      //   'sensorStatus': '警报'
      // },
      // {
      //   'sensorStart': '04:00',
      //   'sensorEnd': '05:00',
      //   'lessValue': 1,
      //   'bigValue': 15,
      //   'sensorStatus': '正常'
      // }
    ]
    const gridData3 = [
      // {
      //   'controller_type': '00:00',
      //   'controllerOpenname': '01:00',
      //   'controllerControl': 5,
      //   'controllerOpencondition': 10,
      //   'controllerValue': 10,
      //   'controllerOpentime': 10,
      //   'controller_offcondition': 10,
      //   'controllerConditionvalue': 10,
      //   'controllerOffvalue': 10,
      //   'controllerStatus': '正常'
      // },
      // {
      //   'sensorStart': '02:00',
      //   'sensorEnd': '03:00',
      //   'lessValue': 3,
      //   'bigValue': 12,
      //   'sensorStatus': '警报'
      // },
      // {
      //   'sensorStart': '04:00',
      //   'sensorEnd': '05:00',
      //   'lessValue': 1,
      //   'bigValue': 15,
      //   'sensorStatus': '正常'
      // }
    ]
    const leixing = [{
      value: 'type1',
      label: '定时'
    },
    {
      value: 'type2',
      label: '循环'
    },
    {
      value: 'type3',
      label: '智能'
    }
    ]
    const cgqmc = [{

    }]
    const tj = [
      {
        value: '大于',
        label: '大于'
      },
      {
        value: '小于',
        label: '小于'
      }
    ]
    const zt = [
      {
        value: '开启',
        label: '开启'
      },
      {
        value: '关闭',
        label: '关闭'
      }
    ]
    const xhjslx = [
      {
        value: '时间',
        label: '时间'
      },
      {
        value: '次数',
        label: '次数'
      }
    ]
    const xhzq = [
      {
        value: '1',
        label: '1'
      },
      {
        value: '2',
        label: '2'
      },
      {
        value: '3',
        label: '3'
      },
      {
        value: '4',
        label: '4'
      },
      {
        value: '5',
        label: '5'
      },
      {
        value: '6',
        label: '6'
      },
      {
        value: '7',
        label: '7'
      }
    ]
    return {
      options: options,
      value: '',
      sousuo: '',
      tableData: tableData,
      newdata: [],
      zhongjianshuju: '',
      dialogFormVisible: false,
      form: newrukuxx,
      fromcz: newrukuxxcz,
      shujujianyan: newrukuxxjianyan,
      shujujianyan1: newrukuxxjianyan1,
      table: false,
      dangqianyema: 1,
      activeName: 'chuangganqi',
      kzqzt: true,
      dangqianhangshuju: '',
      gridData1: gridData1,
      gridData2: gridData2,
      gridData3: gridData3,
      shezhidqhsj: '',
      xuigaixs: false,
      chongmmxs: false,
      leixing: leixing,
      cgqmc: cgqmc,
      tj: tj,
      zt: zt,
      xhjslx: xhjslx,
      xhzq: xhzq,
      cmmmc: ''
    }
  },
  async created() {
    try {
      const ref = await kzqsbhq()
      console.log('原始', this.tableData)
      console.log('数据', ref)
      this.tableData = ref.data.data
      console.log('修改后', this.tableData)
    } catch (error) {
      console.log('错误', error)
    }
    this.huqushuju()
    this.chaxun()
  },
  methods: {
    async chongmmqr() {
      if (!this.dangqianhangshuju.controllerName) {
        this.$message.error('请输入传感器名称')
        this.dangqianhangshuju.controllerName = this.cmmmc
      } else {
        try {
          const e = this.dangqianhangshuju
          console.log('重命名', e)
          const json = {
            id: e.id,
            controllerName: e.controllerName
          }
          const ref = await chongmingming(json)
          this.$message({
            message: '重命名成功',
            type: 'success'
          })
          console.log(json)
          console.log(ref)
        } catch (error) {
          console.log('错误', error)
        }
        console.log(this.dangqianhangshuju)
        this.chongmmxs = false
      }
    },
    chongmm(e) {
      this.cmmmc = e.controllerName
      this.chongmmxs = true
      this.dangqianhangshuju = e
      console.log('当前行', this.dangqianhangshuju)
    },
    async shanchushezhi(e) {
      try {
        const json = {
          id: e.id
        }
        const ref = await shanchu(json)
        console.log(json)
        console.log(ref)
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      } catch (error) {
        console.log('错误', error)
      }
      console.log('删除', e.id)
      this.shezhi(this.shezhidqhsj)
      this.shezhi(this.shezhidqhsj)
    },
    async xuigaiqr() {
      switch (this.form.kzqType) {
        case 'type1':
          if (!this.form.controllerOpentime ||
          !this.form.controllerEndtime ||
          !this.form.controllerCount ||
          !this.form.controllerStatus ||
          !this.form.controllerCycle) {
            this.$message.error('请输入全部数据')
          } else {
            try {
              const ref = await xzcgqsz(this.form)
              console.log('返回数据', ref.data.code)
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            } catch (error) {
              console.log('错误', error)
            }
            this.form = JSON.parse(JSON.stringify(this.fromcz))

            console.log('修改后的数据', this.form)
            this.xuigaixs = false
            this.shezhi(this.shezhidqhsj)
          }
          break

        case 'type2':
          if (!this.form.controllerOpentime ||
          !this.form.controllerEndtime ||
          !this.form.controllerCount ||
          !this.form.controllerStatus ||
          !this.form.controllerCycle ||
          !this.form.controllerTime ||
          !this.form.controllerInterval) {
            this.$message.error('请输入全部数据')
          } else {
            try {
              const ref = await xzcgqsz(this.form)
              console.log('返回数据', ref.data.code)
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            } catch (error) {
              console.log('错误', error)
            }
            this.form = JSON.parse(JSON.stringify(this.fromcz))
            console.log('修改后的数据', this.form)
            this.xuigaixs = false
            this.shezhi(this.shezhidqhsj)
          }
          break

        case 'type3':
          if (!this.form.controllerOpenname ||
          !this.form.controllerControl ||
          !this.form.controllerOpencondition ||
          !this.form.controllerValue ||
          !this.form.controllerOpentime ||
          !this.form.controllerEndtime ||
          !this.form.controllerConditionvalue ||
          !this.form.controllerOffvalue ||
          !this.form.controllerStatus) {
            this.$message.error('请输入全部数据')
          } else {
            try {
              const ref = await xzcgqsz(this.form)
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              console.log('返回数据', ref.data.code)
            } catch (error) {
              console.log('错误', error)
            }
            this.form = JSON.parse(JSON.stringify(this.fromcz))

            console.log('修改后的数据', this.form)
            this.xuigaixs = false
            this.shezhi(this.shezhidqhsj)
          }
          break
      }
    },
    xuigai(e) {
      this.xuigaixs = true
      console.log('修改', e)
      this.form.kzqType = e.kzqType
      this.form.controllerOpentime = e.controllerOpentime
      this.form.controllerEndtime = e.controllerEndtime
      this.form.controllerCount = e.controllerCount
      this.form.controllerStatus = e.controllerStatus
      this.form.controllerCycle = e.controllerCycle
      this.form.controllerEndtype = e.controllerEndtype
      this.form.controllerTime = e.controllerTime
      this.form.controllerInterval = e.controllerInterval
      this.form.controllerOpenname = e.controllerOpenname
      this.form.controllerControl = e.controllerControl
      this.form.controllerOpencondition = e.controllerOpencondition
      this.form.controllerValue = e.controllerValue
      this.form.controllerConditionvalue = e.controllerConditionvalue
      this.form.controllerOffvalue = e.controllerOffvalue
    },
    async shezhi(e) {
      this.shezhidqhsj = e
      console.log('当前行id', e.id)
      try {
        const json = {
          id: e.id
        }
        const ls = []
        for (let i = 0; i < this.tableData.length; i++) {
          ls.push(this.tableData[i])
        }
        this.cgqmc = ls
        const ref1 = await hqdskzq(json)
        const ref2 = await hqxhkzq(json)
        const ref3 = await hqznkzq(json)
        console.log('定时数据', ref1)
        console.log('循环数据', ref2)
        console.log('智能数据', ref3)
        this.gridData1 = ref1.data.data
        this.gridData2 = ref2.data.data
        this.gridData3 = ref3.data.data
        console.log('替换完的定时数据', this.gridData1)
        console.log('替换完的循环数据', this.gridData2)
        console.log('替换完的智能数据', this.gridData3)
      } catch (error) {
        console.log('错误', error)
      }
      this.table = true
      console.log('当前行数据', e)
      this.dangqianhangshuju = e
      console.log('新增那条数据的设置', this.dangqianhangshuju)
    },
    async xinzengqr() {
      switch (this.form.kzqType) {
        case 'type1':
          if (!this.form.controllerOpentime ||
          !this.form.controllerEndtime ||
          !this.form.controllerCount ||
          !this.form.controllerStatus ||
          !this.form.controllerCycle) {
            this.$message.error('请输入全部数据')
          } else {
            try {
              const form1 =
                {
                  id: this.dangqianhangshuju.id,
                  ...this.form
                }
              const ref = await xzdssz(form1)
              console.log('返回数据', ref.data.code)
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            } catch (error) {
              console.log('错误', error)
            }
            console.log(this.form)
            this.form = JSON.parse(JSON.stringify(this.fromcz))
            this.dialogFormVisible = false
            this.shezhi(this.shezhidqhsj)
          }
          break

        case 'type2':
          if (!this.form.controllerOpentime ||
          !this.form.controllerEndtime ||
          !this.form.controllerCount ||
          !this.form.controllerStatus ||
          !this.form.controllerCycle ||
          !this.form.controllerTime ||
          !this.form.controllerInterval) {
            this.$message.error('请输入全部数据')
          } else {
            try {
              const form1 =
                {
                  id: this.dangqianhangshuju.id,
                  ...this.form
                }
              const ref = await xzxhsz(form1)
              console.log('返回数据', ref.data.code)
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            } catch (error) {
              console.log('错误', error)
            }
            console.log(this.form)
            this.form = JSON.parse(JSON.stringify(this.fromcz))
            this.dialogFormVisible = false
            this.shezhi(this.shezhidqhsj)
          }
          break

        case 'type3':
          if (!this.form.controllerOpenname ||
          !this.form.controllerControl ||
          !this.form.controllerOpencondition ||
          !this.form.controllerValue ||
          !this.form.controllerOpentime ||
          !this.form.controllerEndtime ||
          !this.form.controllerConditionvalue ||
          !this.form.controllerOffvalue ||
          !this.form.controllerStatus) {
            this.$message.error('请输入全部数据')
          } else {
            try {
              const form1 =
                {
                  id: this.dangqianhangshuju.id,
                  ...this.form
                }
              const ref = await xzznsz(form1)
              console.log('返回数据', ref.data.code)
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            } catch (error) {
              console.log('错误', error)
            }
            console.log(this.form)
            this.form = JSON.parse(JSON.stringify(this.fromcz))
            this.dialogFormVisible = false
            this.shezhi(this.shezhidqhsj)
          }
          break
      }
    },
    async xinzeng() {
      try {
        const ref = await hqkzqmc()
        console.log('所有传感器名称', ref)
        const newcgqmc = []
        for (let i = 0; i < ref.data.data.length; i++) {
          newcgqmc.push({
            value: `${ref.data.data[i].controllerName}`,
            label: `${ref.data.data[i].controllerName}`
          })
        }
        this.cgqmc = newcgqmc
      } catch (error) {
        console.log('错误', error)
      }
      this.dialogFormVisible = true
      console.log('新增那条数据的设置', this.dangqianhangshuju)
    },
    huqushuju() {
      this.newdata = this.tableData
    },
    chaxun() {
      const newdata = []
      this.tableData.forEach(item => {
        if (item.controllerStatus === this.value && item.controllerName.includes(this.sousuo)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (item.controllerStatus === this.value && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && item.controllerName.includes(this.sousuo)) {
          newdata.push(item)
          console.log('搜索成功')
        } else if (this.value === '' && this.sousuo === '') {
          newdata.push(item)
          console.log('搜索成功')
        }
      }
      )
      console.log('搜索后的结果', newdata)
      this.zhongjianshuju = newdata
      console.log('中间', this.zhongjianshuju)
      this.dangqianyema = 1
      this.fenye(1)
    },
    handlePageChange(ym) {
      console.log(ym)
      this.currentPage = ym
      this.fenye(ym)
    },
    fenye(e) {
      this.newdata = []
      for (let i = (e - 1) * 10; i < ((e - 1) * 10) + 10; i++) {
        console.log(`第${e}页的数据${i}`, this.zhongjianshuju[i])
        if (this.zhongjianshuju[i] === undefined) {
          console.warn(`字段未定义，值为 undefined`)
          break
        } else {
          this.newdata.push(this.zhongjianshuju[i])
        }
      }
      console.log('分页数据', this.newdata)
    }
  }
}
</script>
<style>
.el-drawer__header {
  margin-bottom: 0;
}
</style>
<style scoped>
.chongmingming{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.el-select{
  width: 17vw;
}
.celan{
  padding: 20px;
}
.dialog-footer{
  text-align: right;
  padding-right: 30px;
}
.yema{
  /* border: 1px solid red; */
  /* position: absolute;
  bottom: 0px ;
  left: 40vw; */
  height: 6vh;
  min-height:6vh ;
  display: flex;
  justify-content: center;
  align-items:center;
}
.xinzenshuju{
  /* border: 7px solid red; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: content-box;
  max-height: 55vh;
  overflow-y: auto;
  /* padding: 30px; */
  /* border:  5px solid red; */
}
.el-input {
  width: 17vw;
}
.diyi{
  display: flex;
  flex-direction: column;
}
.dier{
  display: flex;
  flex-direction: column;
}
.app-container{
  padding: 0;
  /* position: relative; */
  height: calc(100vh - 50px);
  overflow-y: auto;
  /* border: 1px solid rgb(46, 251, 0); */
}
</style>

