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

    <el-menu-item index="userEquipment"><i class="el-icon-monitor"></i><span slot="title">设备查看</span></el-menu-item>
    <el-menu-item index="userApply"><i class="el-icon-coin"></i><span slot="title">设备申请记录</span></el-menu-item>
    <el-menu-item index="userChange"><i class="el-icon-sort"></i><span slot="title">设备更换记录</span></el-menu-item>

  </el-menu>
</template>

<script>
export default {
  name: "UserAside",
  props: {
    isCollapse: Boolean
  }
}
</script>