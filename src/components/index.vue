<template>
    <el-row>
      <el-col :md="24" :sm="24" :xs="24">
        <img class="index_img" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571640753036&di=ce35e143747a92c61c6771f7fb96335d&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ffcb5a770721a801213466d09aa8.jpg%401280w_1l_2o_100sh.jpg" alt="背景主题">
      </el-col>
      <el-col  :md="{span:12,offset:6}" :sm="24" :xs="24">
        <div class="index-title">
          <h2>江西师范大学2019级答题</h2>
        </div>
      </el-col>
      <el-col  :md="{span:12,offset:6}" :sm="20" :xs="20" :offset="2">
        <el-button type="info" class="index-join-game" @click="joinGame">
          报名参赛
        </el-button>
      </el-col>
    </el-row>
</template>

<script>
    export default {
      name: "index",
      data(){
        return{
          activeIndex:"1"
        }
      },
      methods:{
        joinGame(){
          this.$router.push({path:'Login'});
        }
      },
      beforeUpdate() {

      }
    }
</script>

<style scoped>

  .index-join-game{
    width:100%;
    margin-top: 50px;
    background-color: #545c64;
    margin-bottom: 100px;
  }
  .index-title{
    margin: 40px 0;
  }
  .index_img{
    width:100%;
    height: 500px;
  }


  @media screen and (max-width: 1000px){
    .index-join-game{
      width:100%;
      margin-top: 50px;
      background-color: #545c64;
    }
    .index-title{
      font-size: 16px;
    }
    .index_img{
      height: 200px;
    }
  }
</style>
