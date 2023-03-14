<template>
  <div>
    <div style="margin-top: 5px; margin-bottom: 20px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/manageView' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>审批管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备申请</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审批记录" name="approving">
          <Approving/>
        </el-tab-pane>
        <el-tab-pane label="审批通过记录" name="approvedSuc">
          <ApprovedSuc/>
        </el-tab-pane>
        <el-tab-pane label="审批未通过记录" name="approvedErr">
          <ApprovedErr/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import Approving from "@/components/Apply/Approving.vue";
import ApprovedSuc from "@/components/Apply/ApprovedSuc.vue";
import ApprovedErr from "@/components/Apply/ApprovedErr.vue";

export default {
  name: "Apply",
  components: {ApprovedErr, ApprovedSuc, Approving},
  data() {
    return {
      activeName: 'approving',
    }
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name
    }
  }
}
</script>