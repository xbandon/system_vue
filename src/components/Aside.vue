<template>
  <el-menu :default-openeds="[]"
           text-color="black" active-text-color="dimgray"
           :collapse-transition="false"
           :collapse="isCollapse"
           router>

    <div style="height: 60px; line-height: 60px; text-align: center;">
      <img src="../assets/logo.png" style="height: 20px; position: relative; top: 4px; margin-right: 4px"
           alt="logo">
      <b style="color: black" v-show="!isCollapse">备品仓库网站</b>
    </div>

    <el-submenu index="1">
      <template slot="title"><i class="el-icon-monitor"></i><span slot="title">设备管理</span></template>
      <el-menu-item index="stock">库存查看</el-menu-item>
      <el-menu-item index="equipment">设备查看</el-menu-item>
      <el-submenu index="1-2">
        <template slot="title">审批管理</template>
        <el-menu-item index="apply">设备申请</el-menu-item>
        <el-menu-item index="change">设备更换</el-menu-item>
      </el-submenu>
      <el-menu-item index="scrap">报废记录</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-setting"></i><span slot="title">系统管理</span></template>
      <el-menu-item index="user">员工管理</el-menu-item>
      <el-menu-item index="dictionary">字典维护</el-menu-item>
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