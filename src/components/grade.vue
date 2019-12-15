<template>
  <el-row>
    <el-col v-loading="loading" :md="{span:12,offset:6}" :sm="24" :xs="24" style="padding:0 5px;background-color:#fff;">
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
            <el-col :md="12" :sm="12" :xs="12" v-text="academy.academyName == null ? '' : academy.academyName"
                    class="grade_value">
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
          <el-row class="self_grade" v-if="grade != null && grade !== undefined">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              成绩一
            </el-col>
            <el-col :md="12" :sm="12" :xs="12"
                    v-text="grade[0].studentGrade === undefined ? '' : grade[0].studentGrade + ' 分'"
                    class="grade_value">
            </el-col>
          </el-row>
          <!--分数部分-->
          <el-row class="self_grade">
            <el-col :md="12" :sm="12" :xs="12" class="grade_title">
              答题时间一
            </el-col>
            <el-col :md="12" :sm="12" :xs="12"
                    v-text="grade[0].studentSpendTime  === undefined ? '' :grade[0].studentSpendTime + ' s'"
                    class="grade_value">
            </el-col>
          </el-row>
          <div v-if="grade.length >= 2">
            <el-row class="self_grade">
              <el-col :md="12" :sm="12" :xs="12" class="grade_title">
                成绩二
              </el-col>
              <el-col :md="12" :sm="12" :xs="12" v-text="grade[1].studentGrade + ' 分'" class="grade_value">
              </el-col>
            </el-row>
            <!--分数部分-->
            <el-row class="self_grade">
              <el-col :md="12" :sm="12" :xs="12" class="grade_title">
                答题时间二
              </el-col>
              <el-col :md="12" :sm="12" :xs="12" v-text="grade[1].studentSpendTime + ' s'" class="grade_value">
              </el-col>
            </el-row>
          </div>
          <div v-if="grade.length < 2">
            <el-row class="self_grade">
              <el-col :md="12" :sm="12" :xs="12" class="grade_title">
                成绩二
              </el-col>
              <el-col :md="12" :sm="12" :xs="12" class="grade_value">
                暂无数据
              </el-col>
            </el-row>
            <!--分数部分-->
            <el-row class="self_grade">
              <el-col :md="12" :sm="12" :xs="12" class="grade_title">
                答题时间二
              </el-col>
              <el-col :md="12" :sm="12" :xs="12" class="grade_value">
                暂无数据
              </el-col>
            </el-row>
          </div>
        </el-col>


        <el-dialog
          title="提示"
          v-loading="loading"
          :visible.sync="showDialog"
          style="text-align: left"
          :width="calDialogWidth()">
          <span>你确认要再次参加答题吗？</span>
          <div slot="footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="getNextTopicToken">确 定</el-button>
          </div>
        </el-dialog>

      </el-col>


      <el-col class="next-answer" :xs="{span:22,offset:1}" :md="{span:12,offset:6}" v-show="grade.length < 2">
        <el-button type="primary" @click="showDialog = true" style="width: 100%;">再次答题</el-button>
      </el-col>

      <!--&lt;!&ndash; 院系成绩部分&ndash;&gt;-->
      <!--<el-col :md="24" :sm="{span:22,offset:1}" :xs="{span:22,offset:1}" class="academyGrade">-->
      <!--<el-col :md="24" :sm="24" :xs="24">-->
      <!--<el-button type="primary" style="width:100%;border-radius:0;background-color:#909399;border-color: #ccc">-->
      <!--<i class="el-icon-tickets"></i>&nbsp;学院成绩-->
      <!--</el-button>-->
      <!--</el-col>-->
      <!--<el-col :md="24" :sm="24" :xs="24">-->
      <!--&lt;!&ndash;学生的名字部分&ndash;&gt;-->
      <!--<el-row class="self_grade">-->
      <!--<el-col :md="12" :sm="12" :xs="12" class="grade_title">-->
      <!--院系-->
      <!--</el-col>-->
      <!--<el-col :md="12" :sm="12" :xs="12" v-text="academy.academyName" class="grade_value">-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--&lt;!&ndash;院系部分&ndash;&gt;-->
      <!--<el-row class="self_grade">-->
      <!--<el-col :md="12" :sm="12" :xs="12" class="grade_title">-->
      <!--院参与率-->
      <!--</el-col>-->
      <!--<el-col :md="12" :sm="12" :xs="12"-->
      <!--v-text="(academy.academyJoinCount / academy.academyStudentCount).toFixed(6) + '%'"-->
      <!--class="grade_value">-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row class="self_grade">-->
      <!--<el-col :md="12" :sm="12" :xs="12" class="grade_title">-->
      <!--院平均分-->
      <!--</el-col>-->
      <!--<el-col :md="12" :sm="12" :xs="12" v-text="(academy.academyGradeSum / academy.academyJoinCount).toFixed(6)"-->
      <!--class="grade_value">-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row class="self_grade">-->
      <!--<el-col :md="12" :sm="12" :xs="12" class="grade_title">-->
      <!--院平均时间-->
      <!--</el-col>-->
      <!--<el-col :md="12" :sm="12" :xs="12"-->
      <!--v-text="(academy.academyTimeSum / academy.academyJoinCount).toFixed(6) +' s' " class="grade_value">-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--</el-col>-->
      <!--</el-col>-->


      <!--&lt;!&ndash;班级成绩部分&ndash;&gt;-->
      <!--<el-col :md="24" :sm="{span:22,offset:1}" :xs="{span:22,offset:1}" class="classGrade">-->
      <!--<el-col :md="24" :sm="24" :xs="24">-->
      <!--<el-button type="primary" style="width:100%;border-radius:0;background-color:#909399;border-color: #ccc">-->
      <!--<i class="el-icon-tickets"></i>&nbsp;班级成绩-->
      <!--</el-button>-->
      <!--</el-col>-->
      <!--<el-col :md="24" :sm="24" :xs="24">-->
      <!--&lt;!&ndash;学生的名字部分&ndash;&gt;-->
      <!--<el-row class="self_grade">-->
      <!--<el-col :md="12" :sm="12" :xs="12" class="grade_title">-->
      <!--班级名-->
      <!--</el-col>-->
      <!--<el-col :md="12" :sm="12" :xs="12" v-text="stuClass.className" class="grade_value">-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--&lt;!&ndash;院系部分&ndash;&gt;-->
      <!--<el-row class="self_grade">-->
      <!--<el-col :md="12" :sm="12" :xs="12" class="grade_title">-->
      <!--总分-->
      <!--</el-col>-->
      <!--<el-col :md="12" :sm="12" :xs="12" v-text="stuClass.classGradeSum" class="grade_value">-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row class="self_grade">-->
      <!--<el-col :md="12" :sm="12" :xs="12" class="grade_title">-->
      <!--参与率-->
      <!--</el-col>-->
      <!--<el-col :md="12" :sm="12" :xs="12"-->
      <!--v-text="(stuClass.classJoinCount / stuClass.classStudentCount).toFixed(6) + '%'"-->
      <!--class="grade_value">-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row class="self_grade">-->
      <!--<el-col :md="12" :sm="12" :xs="12" class="grade_title">-->
      <!--平均分-->
      <!--</el-col>-->
      <!--<el-col :md="12" :sm="12" :xs="12" v-text="(stuClass.classGradeSum / stuClass.classJoinCount).toFixed(6)"-->
      <!--class="grade_value">-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--<el-row class="self_grade">-->
      <!--<el-col :md="12" :sm="12" :xs="12" class="grade_title">-->
      <!--平均时间-->
      <!--</el-col>-->
      <!--<el-col :md="12" :sm="12" :xs="12"-->
      <!--v-text=" (stuClass.classTimeSum / stuClass.classJoinCount).toFixed(6)  + ' s'" class="grade_value">-->
      <!--</el-col>-->
      <!--</el-row>-->
      <!--分数部分-->
      <!--</el-col>-->
      <!--</el-col>-->
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
          studentId: '',
          studentMajor: '',
          studentName: '',
          studentNation: '',
        },
        academy: {
          academyName: ''
        },
        grade: [
          {
            studentGrade: 0,
            studentSpendTime: 0
          },
          {
            studentGrade: 0,
            studentSpendTime: 0
          }
        ],
        stuClass: {
          className: ''
        },
        grade_type: true,
        id: null,
        token: '',
        showDialog: false
      }
    },
    methods: {
      //加载学生的成绩
      loadStudentsGrade() {
        this.loading = true;
        axios.get(this.$URL.LoadGrade, {
          params: {
            token: this.token
          }
        }).then((success) => {
          let res = success.data;
          if (res.result) {
            if (res.data.studentId === 201912345678) {
              this.$message({
                type: "warning",
                message: "暂无成绩"
              });
              this.$router.push({path: "/Head/Login"});
            } else {
              if (res.data != null) {
                this.Student = res.data;
              }
              if (res.data.academy != null) {
                this.academy = res.data.academy;
              }
              if (res.data.stuClass != null) {
                this.stuClass = res.data.stuClass;
              }
              this.grade = res.data.gradeList;
              if (this.grade.length === 0) {
                this.$message({
                  type: "warning",
                  message: "暂无成绩"
                });
                setTimeout(() => {
                  this.$router.push({path: "/Head/Login"});
                }, 1000);
              }
              //判断学生成绩是否合法
              this.loading = false;
            }
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
      ,
      getNextTopicToken() {
        this.loading = true;
        axios.get(this.$URL.GetToken, {
          params: {
            token: this.token
          }
        }).then((success) => {
          let res = success.data;
          if (res.result) {
            //替换新的token
            localStorage.removeItem("token");
            localStorage.setItem("token", res.data);
            this.$message({
              type: "success",
              message: "获取成功"
            });
            //清除事件和答案
            localStorage.removeItem("TIME");
            localStorage.removeItem("SUBMIT");
            localStorage.removeItem("Answer");
            setTimeout(() => {
              this.$router.push({path: "/Head/Answer"});
            }, 1000);
          } else {
            this.$message({
              type: "warning",
              message: res.message
            });
            this.loading = false;
          }
        }).catch((error) => {
          console.log(error);
          this.$message({
            type: "error",
            message: "请求异常"
          });
        })
      },
      calDialogWidth() {
        return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "90%" : "30%";
      }
    },
    created() {
      this.token = localStorage.getItem("token");
      //清楚答案信息
      localStorage.removeItem("TIME");
      localStorage.removeItem("Answer");
      //数据为空
      if (this.token == null) {
        this.$message({
          type: "error",
          message: "登录过期"
        });
        this.$router.push({path: "/Head/Login"});
        return;
      }
      this.loadStudentsGrade();
      localStorage.setItem("SUBMIT", "200");
      //取消注册事件
      window.onunload = null;
      document.removeEventListener("visibilitychange", () => {
        console.log("事件移除成功");
      });
    },
    beforeUpdate() {
    }
  }
</script>

<style scoped>
  .personal-grade {
    margin-top: 30px;
    margin-bottom: 20px;
    background-color: #eee;
    font-size: 14px;
    box-shadow: 5px 5px 5px #ccc;
    border-radius: 5px;
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
      margin-top: 30px;
    }
  }

</style>
