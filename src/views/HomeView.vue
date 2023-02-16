<template>
  <div class="home">
    <el-container style="min-height: 100vh; border: 1px solid #eee; background-color: #f5f7fa">
      <el-aside :width="sideWidth + 'px'" style="box-shadow: 2px 0 6px rgb(0, 21, 41, 35%)">
        <el-menu :default-openeds="[]" style="height: 100%; overflow-x: hidden"
                 background-color="rgb(48, 65, 86)" text-color="#fff" active-text-color="#ffd04b"
                 :collapse-transition="false"
                 :collapse="isCollapse">

          <div style="height: 60px; line-height: 60px; text-align: center;">
            <img src="../assets/logo.png" style="height: 20px; position: relative; top: 4px; margin-right: 4px"
                 alt="logo">
            <b style="color: white" v-show="!isCollapse">设备管理系统</b>
          </div>

          <el-submenu index="1">
            <template slot="title"><i class="el-icon-monitor"></i><span slot="title">设备管理</span></template>
            <el-menu-item index="1-4">库存查看</el-menu-item>
            <el-menu-item index="1-1">设备查看</el-menu-item>
            <el-submenu index="1-2">
              <template slot="title">审批管理</template>
              <el-menu-item index="1-2-1">设备申请</el-menu-item>
              <el-menu-item index="1-2-2">设备更换</el-menu-item>
            </el-submenu>
            <el-menu-item index="1-3">报废记录</el-menu-item>

          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-user"></i><span slot="title">员工管理</span></template>
            <el-menu-item index="2-1">员工查看</el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i><span slot="title">系统设置</span></template>
            <el-menu-item index="3-1">用户管理</el-menu-item>
            <el-menu-item index="3-2">字典维护</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="font-size: 20px; display: flex">
          <div style="flex: 1;">
            <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
          </div>

          <el-dropdown style="cursor: pointer">
            <span style="margin-right: 30px">Admin</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>注销登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <div style="margin-top: 5px; margin-bottom: 20px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">设备管理</el-breadcrumb-item>
              <el-breadcrumb-item>设备查看</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <div class="background">
            <div style="padding: 25px 100px; position: relative">
              <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <el-form-item label="设备名称：">
                        <el-input v-model="formInline.equipmentName" placeholder="请输入搜索内容" clearable></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <el-form-item label="设备型号：">
                        <el-input v-model="formInline.equipmentType" placeholder="请输入搜索内容" clearable></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <el-form-item label="设备状态：">
                        <el-select v-model="formInline.equipmentStatusCode" placeholder="请选择搜索内容" clearable>
                          <el-option label="在库" value="0"></el-option>
                          <el-option label="派送中" value="1"></el-option>
                          <el-option label="使用中" value="2"></el-option>
                          <el-option label="报废" value="3"></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple">
                      <el-form-item label="使用人：">
                        <el-input v-model="formInline.userName" placeholder="请输入搜索内容" clearable></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <div class="grid-content bg-purple">
                      <el-form-item label="入库时间：">
                        <el-date-picker
                            v-model="formInline.insertTime"
                            align="right"
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col>
                    <div class="grid-content bg-purple">
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button type="primary" plain style="margin-left: 30px">清空</el-button>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>

          <div class="background" style="margin-top: 50px">
            <div style="padding: 30px 25px">
              <div style="margin-bottom: 15px">
                <el-button type="primary">新增设备 <i class="el-icon-circle-plus-outline"></i></el-button>
                <el-button type="danger">批量删除 <i class="el-icon-remove-outline"></i></el-button>
              </div>
              <el-table :data="tableData" border stripe
                        :header-cell-style="{background: 'lightgray', color:'gray', 'text-align': 'center'}"
                        :cell-style="{'text-align': 'center'}">
                <el-table-column prop="equipmentName" label="设备名称"></el-table-column>
                <el-table-column prop="equipmentType" label="设备型号"></el-table-column>
                <el-table-column prop="equipmentStatus" label="设备状态"></el-table-column>
                <el-table-column prop="userName" label="使用人"></el-table-column>
                <el-table-column prop="insertTime" label="入库时间"></el-table-column>
              </el-table>
            </div>
            <div style="padding-left: 25px; padding-right: 25px; padding-bottom: 30px; display: flex">
              <div style="margin: auto">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[1, 5, 10, 20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: 'HomeView',
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold', //导航栏按钮图标 默认收缩
      isCollapse: false, //导航栏是否收缩 默认展开
      sideWidth: 200, //导航栏宽度 默认200px
      tableData: [], //表格数据 默认为空
      currentPage: 1, //当前页
      pageSize: 5, //每页显示条数
      total: 0, //数据总数
      //查询列表
      formInline: {
        equipmentName: '',
        equipmentType: '',
        equipmentStatusCode: '',
        userName: '',
        insertTime: ''
      },
      //日期选择器
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
    }
  },
  created() {
    this.load()
  },
  methods: {
    //点击收缩导航栏
    collapse() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
      } else {
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
      }
    },
    //请求数据
    load() {
      request.post('/mg/queryEquipmentInfos')
      fetch("http://localhost:8070/mg/queryEquipmentInfos", {
        method: 'post',
        body: JSON.stringify({
          "rows": this.pageSize,
          "page": this.currentPage,
          "equipmentName": this.formInline.equipmentName,
          "equipmentType": this.formInline.equipmentType,
          "equipmentStatusCode": this.formInline.equipmentStatusCode,
          "userName": this.formInline.userName,
          "insertTime": this.formInline.insertTime
        })
      }).then(res => res.json()).then(res => {
        this.tableData = res.list
        this.total = res.total
      })
    },
    //设置当前页
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.load()
    },
    //设置每页显示条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    onSubmit() {
      this.load()
    },
  }
}
</script>
