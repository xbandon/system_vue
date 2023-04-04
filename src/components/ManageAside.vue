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
      <el-menu-item index="manageStock">库存查看</el-menu-item>
      <el-menu-item index="manageEquipment">设备查看</el-menu-item>
      <el-submenu index="1-2">
        <template slot="title">审批管理</template>
        <el-menu-item index="manageApply">设备申请</el-menu-item>
        <el-menu-item index="manageChange">设备更换</el-menu-item>
      </el-submenu>
      <el-menu-item index="manageScrap">报废记录</el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
export default {
  name: "ManageAside",
  props: {
    isCollapse: Boolean
  }
}
</script>