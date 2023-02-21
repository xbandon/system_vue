<template>
  <div>
    <div style="margin-top: 5px; margin-bottom: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>审批管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备更换</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审批记录" name="changing">
          <Changing/>
        </el-tab-pane>
        <el-tab-pane label="审批通过记录" name="changedSuc">
          <ChangedSuc/>
        </el-tab-pane>
        <el-tab-pane label="审批未通过记录" name="changedErr">
          <ChangedErr/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Changing from "@/components/Change/Changing.vue";
import ChangedSuc from "@/components/Change/ChangedSuc.vue";
import ChangedErr from "@/components/Change/ChangedErr.vue";

export default {
  name: "Change",
  components: {ChangedErr, ChangedSuc, Changing},
  data() {
    return {
      activeName: 'changing',
    }
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name
    }
  }
}
</script>