<template>
  <el-row>
    <!--导航栏-->
    <el-col :md="24" :sm="24" :xs="24">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        class="question-head"
        active-text-color="#ffd04b"
      >
        江西师范大学2019级校规校纪知识考试
      </el-menu>
    </el-col>
    <el-col :md="24" :sm="24" :xs="24" style="background-color:#fff;">
      <router-view/>
    </el-col>
    <!--结尾栏-->
    <el-col class="endDiv" :md="24" :sm="24" :xs="24">
      <div class="footer" align="center" style="width: 100%">
        <!--        版权所有 <a-->
        <!--        href="https://baike.baidu.com/item/%E6%B1%9F%E8%A5%BF%E5%86%9C%E4%B8%9A%E5%A4%A7%E5%AD%A6%E8%BD%AF%E4%BB%B6%E5%AD%A6%E9%99%A2%E9%9D%92%E8%97%A4%E5%B7%A5%E4%BD%9C%E5%AE%A4"-->
        <!--        target="blank" style="color:#ccc">江西农业大学软件学院青藤工作室</a> ©青藤设计-->
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "head",
    data() {
      return {
        activeIndex: '1'
      }
    }
  }
</script>

<style scoped>
  .footer {
    background-color: #545c64;
    color: #fff;
    font-size: 12px;
    height: 50px;
    position: fixed;
    bottom: 0;
  }

  .question-head {
    font-size: 24px;
    line-height: 60px;
    color: white;
  }

  .endDiv {
    width: 100%;
  }

  @media screen and (max-width: 1000px) {
    .footer {
      font-size: 12px;
    }

    .question-head {
      font-size: 18px;
    }
  }
</style>
