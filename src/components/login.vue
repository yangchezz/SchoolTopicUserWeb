<template>
  <el-row v-loading="loading">
    <el-col :md="24" :sm="24" :xs="24"
            style="background:url('http://pic1.win4000.com/wallpaper/8/54587289a518f.jpg') no-repeat 100%;background-size:cover;">
      <el-col :md="{span:5,offset:17}" :xs="{span:20,offset:2}" :sm="{span:14,offset:10}" class="loginDiv">
        <el-col :md="{span:22,offset:1}" :sm="{span:16,offset:4}" :xs="24" class="form">
          <el-form :label-position="'right'" :model="Student" class="form-login">
            <div class="login-head">
              <img src="../../static/school.jpg" style="max-height: 80px;width:auto" alt="">
            </div>
            <el-input
              type="text"
              class="form-login-input"
              placeholder="学号(12位)"
              autofocus
              maxlength="12"
              v-model="Student.studentId">
            </el-input>
            <el-input
              type="password"
              class="form-login-input"
              placeholder="登录密码(身份证后六位或学号)"
              maxlength="12"
              v-model="Student.password">
            </el-input>
            <el-button type="info" class="index-join-game" @click="login">登录答题</el-button>
            <div class="back_index">
              <!--            <span @click.self="backIndex">回到首页</span>-->
            </div>
          </el-form>
        </el-col>
      </el-col>
    </el-col>


    <!--    提示对话框-->
    <el-dialog
      title="答题须知"
      :visible.sync="showDialog"
      :before-close="handleClose"
      :width="calDialogWidth()">
      <div style="text-align: left;line-height: 30px;">
        <b>考试时间：</b>60分钟(超出时间自动提交)
        <br>
        <br>
        <b> 题目设置：</b>
        80道（40道单选，1分每题。20道多选，2分每题（多选漏选不得分）。20道单选，1分每题。总分100分。）
        <br>
        <br>
        <b>注意事项：</b>
        答题过程中请勿刷新答题页面，同时不能离开答题页面进行答题，否则会自动提交答案，考试资格每人两次，最后成绩以最高分为主！祝您取得好成绩！
      </div>
      <div slot="footer" class="buttons">
        <el-button type="warning" @click="cancelTest">取消答题</el-button>
        <el-button type="primary" @click="toTest" v-text="testWord" :disabled="clickAble"></el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  const axios = require("axios");
  const qs = require("qs");
  export default {
    name: "login",
    data() {
      return {
        Student: {//登录的学生信息
          studentId: '',
          password: ''
        },
        loading: false,
        showDialog: false,
        testWord: '我要答题',
        time: 3,
        event: null,
        clickAble: true
      }
    },
    methods: {
      //登录答题
      login() {
        if (!this.checkStudent()) {
          this.$message({
            type: "error",
            message: "登录信息不合法"
          });
          return false;
        } else {
          //开始登录
          this.$message({
            type: 'success',
            message: "登录中..."
          });
          this.loading = true;
          //检查是不是18级的学生
          //提交信息
          this.submitForm();
        }
      },
      checkStudent() {//检查学生的信息
        //检验学号
        let regx = /\d{12}/g;
        if (!regx.test(this.Student.studentId)) {
          return false;
        }
        //校验密码
        regx = /[\d,\w]{1,16}/g;
        return regx.test(this.Student.password);
      },
      submitForm() {
        // 发送登录请求
        axios.post(this.$URL.Login, qs.stringify({
          studentId: this.Student.studentId,
          studentPassword: this.$MD5(this.Student.password)
        })).then((success) => {
          let result = success.data;
          if (result.result && result.code === 200) {
            this.$message({
              type: "success",
              message: result.message
            });
            //存储token
            localStorage.removeItem("token");
            localStorage.removeItem("TIME");
            localStorage.removeItem("Answer");
            localStorage.removeItem("SUBMIT");
            localStorage.setItem("token", result.data);
            //显示对话框
            let self = this;
            if (this.event != null) {
              window.clearInterval(this.event);
            }
            this.event = setInterval(() => {
              this.testWord = self.time + "s";
              self.time--;
              if (self.time < 0) {
                self.clickAble = false;
                self.testWord = "我要答题";
                window.clearInterval(self.event);
              }
            }, 1000);
            //显示对话框
            this.showDialog = true;
          } else if (result.code === 400) {
            localStorage.setItem("token", result.data);
            this.$router.push({path: '/Head/Grade'});
          } else if (result.code === 404) {
            this.$message({
              type: "warning",
              message: result.message
            });
            this.loading = false;
          } else {
            this.$message({
              type: "warning",
              message: result.message
            })
          }
        }).catch((error) => {
          console.log(error);
          this.$message({
            type: "error",
            message: "请求异常"
          })
        });
      },
      cancelTest() {
        this.showDialog = false;
        this.loading = false;
        this.Student.studentId = "";
        this.clickAble = false;
        this.time = 3;
        this.Student.password = "";
      },
      toTest() {
        this.showDialog = false;
        this.$router.push({path: "/Head/Answer"});
      },
      handleClose() {
        this.loading = true;
      },
      calDialogWidth() { //计算dialog的宽度
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "90%" :
          /iPhone|iPad|iPod/i.test(navigator.userAgent)
            ? '70%' : '40%';
      }
    },
    created() {
      let type = this.$route.query.type;
      if (type === "alert") {
        this.$message({
          type: 'error',
          message: "请先登录!"
        })
      }
      document.removeEventListener("visibilitychange", () => {

      })
    }
  }
</script>

<style scoped>

  .loginDiv {
    position: relative;
  }

  .form {
    margin: 60% auto;
  }

  .form-login {
    padding: 30px 20px 0 20px;
    border: solid #ccc 1px;
    /*box-shadow: 5px 5px 5px #ccc;*/
    border-radius: 5px;
    background-color: #fff;
  }

  .form-login-input {
    margin: 15px auto;
    border-radius: 4px;
    width: 100%;
    background-color: #409EFF;
    border-color: #ccc;
  }

  .index-join-game {
    width: 100%;
    margin: 20px 0;
    background-color: #409EFF;
    color: white;
  }

  .login-head {
    height: 50px;
    margin-bottom: 35px;
    font-size: 16px;
    line-height: 50px;
    text-align: center;
  }

  .login-head span {

  }

  .back_index {
    padding-bottom: 10px;
    font-size: 14px;
    color: #545c64;
    cursor: pointer;
  }

  .buttons {
    text-align: right;
  }

  .button {
    text-align: center;
  }

  @media screen and  (max-width: 1000px) {
    .form {
      margin: 40% auto;
    }
  }
</style>
