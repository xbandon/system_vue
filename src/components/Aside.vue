<template>
  <el-menu :default-openeds="[]"
           text-color="#fff" active-text-color="#ffd04b"
           :collapse-transition="false"
           :collapse="isCollapse"
           router>

    <div style="height: 60px; line-height: 60px; text-align: center;">
      <img src="../assets/logo.png" style="height: 20px; position: relative; top: 4px; margin-right: 4px"
           alt="logo">
      <b style="color: white" v-show="!isCollapse">设备管理系统</b>
    </div>

    <el-submenu index="1">
      <template slot="title"><i class="el-icon-monitor"></i><span slot="title">设备管理</span></template>
      <el-menu-item index="queryStock">库存查看</el-menu-item>
      <el-menu-item index="queryEquipment">设备查看</el-menu-item>
      <el-submenu index="1-2">
        <template slot="title">审批管理</template>
        <el-menu-item index="1-2-1">设备申请</el-menu-item>
        <el-menu-item index="1-2-2">设备更换</el-menu-item>
      </el-submenu>
      <el-menu-item index="1-3">报废记录</el-menu-item>
    </el-submenu>
    <el-menu-item index="queryUser">
      <template slot="title"><i class="el-icon-user"></i><span slot="title">员工管理</span></template>
    </el-menu-item>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-setting"></i><span slot="title">系统设置</span></template>
      <el-menu-item index="3-1">权限管理</el-menu-item>
      <el-menu-item index="3-2">字典维护</el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean
  }
}
</script>