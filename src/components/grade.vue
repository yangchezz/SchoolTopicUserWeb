<template>
  <el-row>
    <el-col :md="{span:12,offset:6}" :sm="24" :xs="24" style="padding:0 5px;">
      <!--个人成绩部分-->
      <el-col :md="24" :sm="{span:22,offset:1}" :xs="{span:22,offset:1}" class="personal-grade">
        <el-col :md="24" :sm="24" :xs="24">
          <el-button type="primary" style="width:100%;border-radius:0;background-color:#909399;border-color: #ccc">
            <i class="el-icon-tickets"></i>&nbsp;我的成绩
          </el-button>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <!--学生的名字部分-->
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              名字
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="Student.studentName" class="grade_value">
            </el-col>
          </el-row>
          <!--院系部分-->
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              院系
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="academy.academyName" class="grade_value">
            </el-col>
          </el-row>
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              专业
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="Student.studentMajor" class="grade_value">
            </el-col>
          </el-row>
          <!--分数部分-->
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              班级
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="stuClass.className" class="grade_value">
            </el-col>
          </el-row>
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              民族
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="Student.studentNation" class="grade_value">
            </el-col>
          </el-row>
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              分数
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="Student.studentGrade" class="grade_value">
            </el-col>
          </el-row>
          <!--时间部分-->
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              时间
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="Student.studentSpendTime+' s'" class="grade_value">
            </el-col>
          </el-row>
        </el-col>
      </el-col>


      <!-- 院系成绩部分-->
      <el-col :md="24" :sm="{span:22,offset:1}" :xs="{span:22,offset:1}" class="academyGrade">
        <el-col :md="24" :sm="24" :xs="24">
          <el-button type="primary" style="width:100%;border-radius:0;background-color:#909399;border-color: #ccc">
            <i class="el-icon-tickets"></i>&nbsp;学院成绩
          </el-button>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <!--学生的名字部分-->
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              院系
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="academy.academyName" class="grade_value">
            </el-col>
          </el-row>
          <!--院系部分-->
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              院参与率
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="(academy.academyJoinCount / academy.academyStudentCount).toFixed(6) + '%'" class="grade_value">
            </el-col>
          </el-row>
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              院平均分
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="(academy.academyGradeSum / academy.academyJoinCount).toFixed(6)" class="grade_value">
            </el-col>
          </el-row>
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              院平均时间
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="(academy.academyTimeSum / academy.academyJoinCount).toFixed(6) +' s' " class="grade_value">
            </el-col>
          </el-row>
        </el-col>
      </el-col>


      <!--班级成绩部分-->
      <el-col :md="24" :sm="{span:22,offset:1}" :xs="{span:22,offset:1}" class="classGrade">
        <el-col :md="24" :sm="24" :xs="24">
          <el-button type="primary" style="width:100%;border-radius:0;background-color:#909399;border-color: #ccc">
            <i class="el-icon-tickets"></i>&nbsp;班级成绩
          </el-button>
        </el-col>
        <el-col :md="24" :sm="24" :xs="24">
          <!--学生的名字部分-->
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              班级名
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="stuClass.className" class="grade_value">
            </el-col>
          </el-row>
          <!--院系部分-->
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              总分
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="stuClass.classGradeSum" class="grade_value">
            </el-col>
          </el-row>
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              参与率
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="(stuClass.classJoinCount / stuClass.classStudentCount).toFixed(6) + '%'" class="grade_value">
            </el-col>
          </el-row>
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              平均分
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text="stuClass.classGradeSum / stuClass.classJoinCount" class="grade_value">
            </el-col>
          </el-row>
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              平均时间
            </el-col>
            <el-col :md="12" :sm="12" :xs="12" v-text=" (stuClass.classTimeSum / stuClass.classJoinCount).toFixed(6)  + ' s'" class="grade_value">
            </el-col>
          </el-row>
          <!--分数部分-->
        </el-col>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
  const axios = require("axios");
  export default {
    name: "grade",
    data() {
      return {
        loading: true,
        Student: {
          studentAcademy: '',
          studentClass: '',
          studentGender: '',
          studentGrade: '',
          studentId: '',
          studentMajor: '',
          studentName: '',
          studentNation: '',
          studentSpendTime: ''
        },
        academy: {
          academyName: ''
        },
        stuClass: {},
        grade_type: true,
        id: null,
        token: ''
      }
    },
    methods: {
      //加载学生的成绩
      loadStudentsGrade() {
        axios.get("/Student/getStudent", {
          params: {
            token: this.token
          }
        }).then((success) => {
          let res = success.data;
          if (res.result && res.status === 200) {
            this.Student = success.data.data;
            this.academy = this.Student.academy;
            this.stuClass = this.Student.stuClass;
            this.loading = false;
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            });
            setTimeout(() => {
              this.$router.push({path: "/Head/Login"});
            }, 1000);
          }
        }).catch((error) => {
          console.log(error);
          this.$message({
            type: 'error',
            message: "请求异常"
          })
        });
      }
    },
    created() {
      this.token = localStorage.getItem("token");
      //数据为空
      if (this.token == null) {
        this.$message({
          type: "error",
          message: "请求异常"
        });
        this.$router.push({path: "/Head/Login"});
        return;
      }

      //回调函数
      function removeBack() {
        console.log("事件清除");
      }

      this.loadStudentsGrade();
      //清除注册事件
      document.removeEventListener("visibilitychange", removeBack);
    },
    beforeUpdate() {
    }
  }
</script>

<style scoped>
  .personal-grade {
    margin-top: 50px;
    margin-bottom: 70px;
    background-color: #eee;
    font-size: 14px;
    box-shadow: 5px 5px 5px #ccc;
  }


  .grade-buttons button {
    width: 100%;
    border-radius: 0;
  }

  .self_grade {
    border-bottom: solid #ccc 1px;
    line-height: 27px;
  }

  .grade_title {
    padding: 5px 0;
    border-right: solid #ccc 1px;
  }

  .grade_value {
    padding: 5px 0;
  }

  .academyGrade {
    margin-bottom: 70px;
    background-color: #eee;
    font-size: 14px;
    box-shadow: 5px 5px 5px #ccc;
  }

  .classGrade {
    margin-bottom: 100px;
    background-color: #eee;
    font-size: 14px;
    box-shadow: 5px 5px 5px #ccc;
  }

  @media screen and (max-width: 1000px) {
    .personal-grade {
      margin-top: 80px;
    }
  }

</style>
