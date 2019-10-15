<template>
    <el-row>
      <el-col :md="24" :sm="24" :xs="24">
        <img class="index_img" src="https://i.loli.net/2017/08/21/599a521472424.jpg" alt="背景主题">
      </el-col>
      <el-col  :md="{span:12,offset:6}" :sm="24" :xs="24">
        <div class="index-title">
          <h1>江西农业大学2018级新生党团基本知识竞赛</h1>
        </div>
        <div class="index-introduce-part" align="left">
          <span style=line-height:150%;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;为了深入学习贯彻习近平新时代中国特色社会主义思想和党的十九大精神，庆祝中华人民共和国成立70周年，纪念“五四”爱国主义运动100周年，深入开展“爱国•奋斗”精神教育，引导青年学生爱国、励志、求真、力行，树立报国理想，培养家国情怀，成为德智体美劳全面发展的社会主义建设者和接班人。我校开展2018级新生“青春心向党•建功新时代”党团基本知识竞赛。</span>
        </div>
        <div class="index-introduce-part" align="left">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>奖项设置</b>：</span>90分以上一等奖；80至90分二等奖；70至80分三等奖。
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

  .index-introduce-part{
    padding:0 25px;
    margin-top: 20px;
  }
  .index-join-game{
    width:100%;
    margin-top: 50px;
    background-color: #545c64;
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
