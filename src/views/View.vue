<template>
  <div class="home">
    <el-container style="min-height: 100vh; border: 1px solid #eee; background-color: #f5f7fa">
      <el-aside :width="sideWidth + 'px'">
        <Aside :isCollapse="isCollapse"/>
      </el-aside>

      <el-container>
        <el-header>
          <Header :collapseBtnClass="collapseBtnClass" :collapse="collapse"/>
        </el-header>

        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";

export default {
  name: 'View',
  components: {Header, Aside},
  data() {
    return {
      collapseBtnClass: 'el-icon-s-fold', //导航栏收缩按钮图标 默认收缩
      isCollapse: false, //导航栏是否收缩 默认展开
      sideWidth: 200, //导航栏宽度 默认200px
    }
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
    }
  }
}
</script>
