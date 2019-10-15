<template>
  <el-row>
    <el-col :md="{span:8,offset:8}" :sm="22" :xs="22" :offset="1" style="min-height: 500px;"
            v-loading="loading">
      <!--题目的主体部分-->
      <div class="question" :md="24" :sm="24" :xs="24" v-show="questionIndex>=0">
        <div class="game-message">
          <div class="messageItem wordItem">
            <p>
              <i class="el-icon-warning"></i>
              <span>请勿离开或刷新此页面！</span>
            </p>
          </div>
          <div class="messageItem timeItem" style="padding-top:4px;">
            <p>
              <i class="el-icon-loading"></i>
              <span ref="time" v-text="TIME+'s'"></span>
            </p>
          </div>
        </div>
        <!--每个题目的部分-->
        <div style="padding-bottom: 15px;">
          <div class="question-item">
            <!--题目的信息-->
            <div class="question-message">
              <p>
                <!--题目的序号-->
                <span class="question-index" v-text="questionIndex+1+'.'"></span>
                <!--问题的内容-->
                <span class="question-content" v-text="question.topicText"></span>
              </p>
            </div>
            <div class="options">
              <!--单选部分-->
              <div v-show="questionType===1" style="padding-left:15px;">
                <!--答案部分-->
                <el-radio-group v-model="radio" @change="radioChange">
                  <div>
                    <el-radio v-model="radio" label="A" class="question-radio itemText">
                      {{question.topicOptionA}}
                    </el-radio>
                  </div>
                  <div>
                    <el-radio v-model="radio" label="B" class="question-radio itemText">
                      {{question.topicOptionB}}
                    </el-radio>
                  </div>
                  <div>
                    <el-radio v-model="radio" label="C" class="question-radio itemText">
                      {{question.topicOptionC}}
                    </el-radio>
                  </div>
                  <div v-show="question.topicOptionD !== null">
                    <el-radio v-model="radio" label="D" class="question-radio itemText">
                      {{question.topicOptionD}}
                    </el-radio>
                  </div>
                </el-radio-group>
              </div>
              <!--多选部分-->
              <div v-show="questionType===3" style="padding-left:15px;">
                <el-checkbox-group v-model="checkbox" @change="checkChange">
                  <div>
                    <el-checkbox label="A" class="checkbox-item itemText" v-model="checkbox">
                      <span class="itemText" v-text="question.topicOptionA"></span>
                    </el-checkbox>
                  </div>
                  <div>
                    <el-checkbox label="B" class="checkbox-item itemText" v-model="checkbox">
                      {{question.topicOptionB}}
                    </el-checkbox>
                  </div>
                  <div>
                    <el-checkbox label="C" class="checkbox-item itemText" v-model="checkbox">
                      {{question.topicOptionC}}
                    </el-checkbox>
                  </div>
                  <div class="">
                    <el-checkbox label="D" class="checkbox-item itemText" v-model="checkbox">
                      {{question.topicOptionD}}
                    </el-checkbox>
                  </div>
                  <div v-show="question.topicOptionE !== null">
                    <el-checkbox label="E" class="checkbox-item itemText" v-model="checkbox">
                      {{question.topicOptionE}}
                    </el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
              <!--判断对错部分-->
              <div v-show="questionType===2" style="padding-left:15px;">
                <!--答案部分-->
                <el-radio-group v-model="judge" @change="radioTwoChange">
                  <div>
                    <el-radio v-model="judge" label="×" class="question-radio">错</el-radio>
                  </div>
                  <div>
                    <el-radio v-model="judge" label="√" class="question-radio">对</el-radio>
                  </div>
                </el-radio-group>
              </div>
            </div>
          </div>
        </div>
        <!--题目的父类-->
        <!--题目的控制部分-->
        <div class="question-buttons">
          <div class="question-button">
            <el-button type="primary" size="medium" @click="lastQuestion">上一题</el-button>
          </div>
          <div class="question-button" v-show="questionIndex < MAX_TOPIC - 1">
            <el-button type="warning" size="medium" @click="nextQuestion">下一题</el-button>
          </div>
          <div class="question-button" v-show="questionIndex === MAX_TOPIC -1">
            <el-button type="success" size="medium" @click="confirmSubmit">提交答案</el-button>
          </div>
        </div>
      </div>
    </el-col>


  </el-row>
</template>

<script>
  const axios = require("axios");
  const qs = require('qs');

  export default {
    name: "answer",
    data() {
      return {
        radio: 'A',//单选按钮的值
        checkbox: ['A'],//多选按钮的值
        judge: "√",
        loading: true,
        questionType: 0,//正在显示的题目的类型
        questionIndex: -1,//正在显示的题号
        questionArray: [],//存储题号的数组
        questions: [//问题的数组

        ],
        question: {
          topicText: '',
          topicOptionA: '',
          topicOptionB: '',
          topicOptionC: '',
          topicOptionD: '',
          topicOptionE: ''
        }, // 当前的问题
        answers: [//存储答案的部分

        ],
        TIME: 3600,//答题的时间
        time: null,//答题计时器
        id: null,
        token: '',
        MAX_TOPIC: 80,
        changePage: false
      }
    },
    methods: {
      radioChange(val) {//单选按钮的值点击事件
        this.radio = val;
        this.answers[this.questionIndex] = this.radio;
      },
      checkChange(val) {//多选按钮的值点击事件
        if(val.length !== 0){
          this.checkbox = val;
          this.answers[this.questionIndex] = this.checkbox;
        }else{
          this.checkbox = ['A'];
          this.answers[this.questionIndex] = this.checkbox;
        }
      },
      radioTwoChange(val) {//判断题答案改变事件
        this.judge = val;
        this.answers[this.questionIndex] = this.judge;
      },
      nextQuestion() {//下一个问题的入口
        //存储答案
        if (this.questionType === 1) {
          this.answers[this.questionIndex] = this.radio;
          this.radio = 'A';
        } else if (this.questionType === 3) {
          //判断多选题的答案
          if (this.checkbox.length === 0) { // 多选题没选答案
            this.answers[this.questionIndex] = ['Z'];
          } else {
            this.answers[this.questionIndex] = this.checkbox;
          }
          this.checkbox = ['A'];
        } else if (this.questionType === 2) {
          this.answers[this.questionIndex] = this.judge;
          this.judge = "√";
        }
        if (this.questionIndex < this.MAX_TOPIC) {
          //加载下一题的题目
          if (this.questionIndex < this.questions.length - 1) {  //如果下一题的的下表小于已经加载的题号
            this.question = this.questions[++this.questionIndex];
            this.questionType = this.question.topicType;
            //匹配选中的值
            if (this.questionType === 1) {//单选
              this.radio = this.answers[this.questionIndex];
            } else if (this.questionType === 3) {//多选
              this.checkbox = this.answers[this.questionIndex];
            } else if (this.questionType === 2) {//判断
              this.judge = this.answers[this.questionIndex];
            }
            return;
          }
          this.loadNextQuestion(this.questionIndex + 2);
        }
      },
      confirmSubmit() {//确认提交事件
        //先保存答案
        if (this.questionType === 1) {//单选
          this.answers[this.questionIndex] = this.radio;
        } else if (this.questionType === 3) {//多选
          this.answers[this.questionIndex] = this.checkbox;
        } else if (this.questionType === 2) {//判断
          this.answers[this.questionIndex] = this.judge;
        }

        this.$confirm("确认提交答案？").then(() => {
          this.submitAnswer();
        }).catch(() => {
          this.$message({
            type: "warning",
            message: "已取消提交"
          });
        })
      },
      loadNextQuestion(index) {//获得下一个问题   如果学生已经有了成绩 就会直接返回到成绩页面
        this.loading = true;
        axios.get("/Topic/getTopic", {
          params: {
            token: this.token,
            topicIndex: index
          }
        }).then((success) => {
          let result = success.data;
          //跳转页面
          if (result.result) { // 获取题目成功
            //获取题目的数据
            this.questionType = result.data.topicType;//设置题目的类型
            this.questions.push(result.data);
            this.question = result.data;
            this.questionArray.push(result.data.topicId);
            this.questionIndex++;
            //更新值
            if (this.questionType === 1) {//单选
              this.radio = 'A';
            } else if (this.questionType === 3) {//多选
              this.checkbox = ['A']
            } else if (this.questionType === 2) {//判断
              this.judge = '√';
            }
            this.loading = false;
          } else {
            if (result.message === "用户不存在") {
              this.$router.push({path: "/Head/Login"});
            } else if (result.message === "已经作答") {
              this.$router.push({path: "/Head/Grade"});
            }
          }
        }).catch((error) => {
          console.log(error);
          this.$message({
            type: 'error',
            message: "请求失败"
          });
          this.loading = false;
        })
      },
      lastQuestion() {//上一个问题的显示
        this.loading = true;
        //临界值的判断
        if (this.questionIndex > 0) {
          //先保存值
          if (this.questionType === 1) {//单选
            this.answers[this.questionIndex] = this.radio;
          } else if (this.questionType === 3) {//多选
            this.answers[this.questionIndex] = this.checkbox;
          } else if (this.questionType === 2) {//判断
            this.answers[this.questionIndex] = this.judge;
          }
          //开跳转到下一个问题
          this.question = this.questions[--this.questionIndex];
          this.questionType = this.question.topicType;
          console.log(this.questionIndex);
          //修改选中的值
          if (this.questionType === 1) {//单选
            this.radio = this.answers[this.questionIndex];
          } else if (this.questionType === 3) {//多选
            this.checkbox = this.answers[this.questionIndex];
          } else if (this.questionType === 2) {//判断
            this.judge = this.answers[this.questionIndex];
          }
        } else {
          this.$message({
            type: 'warning',
            message: "当前已经是最后一题了"
          });
        }
        this.loading = false;
      },
      submitAnswer() {//提交答案
        //开始提交答案
        this.loading = true;
        window.clearInterval(this.time);
        let radioAnswer = "";
        let multipartAnswer = "";
        let judgeAnswer = "";
        //根据回答了多少题获取答案
        for (let i = 0; i < this.answers.length; i++) {
          if (i < 40) {
            radioAnswer += (this.questionArray[i] + "" + this.answers[i]);
          } else if (i < 60) {
            multipartAnswer += (this.questionArray[i] + "" + (this.answers[i].toString().replace(/,/g, "")));
          } else if (i < 80) {
            judgeAnswer += (this.questionArray[i] + "" + this.answers[i]);
          }
        }
        //清空答案
        this.questionArray = [];
        this.answers = [];
        //发送请求计算分数
        axios.get("/Topic/calScore", {
          params: {
            token: this.token,
            radioAnswer: radioAnswer,
            multipartAnswer: multipartAnswer,
            judgeAnswer: judgeAnswer
          }
        }).then((success) => {
          let res = success.data;
          if (res.result && res.status === 200) {
            this.$message({
              type: "success",
              message: res.message
            });
            setTimeout(() => {
              this.$router.push({path: "/Head/Grade"});
            }, 1000);
            this.loading = false;
          } else {
            this.$message({
              type: "warning",
              message: res.message
            });
            setTimeout(() => {
              this.$router.push({path: "/Head/Login"})
            }, 1000);
          }
        }).catch((error) => {
          console.log(error);
          this.$message({
            type: "error",
            message: "请求异常"
          });
          this.loading = false;
        });
      },
      calTime() {//计算时间
        let t = parseInt(this.TIME);
        let span = this.$refs["time"];
        if (this.time != null) {
          window.clearInterval(this.time);
          span.innerHTML = 0 + "s";
          //提交答案
          return;
        }
        let self = this;
        let flag = true;
        this.time = window.setInterval(function () {
          t--;
          span.innerHTML = t + "s";
          if (t < 1) {
            //提交答案
            //清除token
            console.log("time in");
            console.log(t);
            if (flag) {
              self.submitAnswer();
              flag = false;
              window.clearInterval(self.time);
            }
          }
        }, 1000);
      }
    },
    created() {//创建实例时
      this.token = localStorage.getItem("token");
      if (this.token == null) {
        this.$router.push({path: '/Head/Login'});
        return
      }
      this.loadNextQuestion(1);


      let self = this;
      let submit = false;


      //注册页面的刷新事件
      window.addEventListener("beforeunload", function () {
        //页面刷新时先保存答案
        if (self.questionType === 0) {//单选
          self.answers[self.questionIndex] = self.radio;
        } else if (self.questionType === 1) {//多选
          self.answers[self.questionIndex] = self.checkbox;
        } else if (self.questionType === 2) {//判断
          self.answers[self.questionIndex] = self.judge;
        }
        //提交答案
        if (!submit) {
          self.submitAnswer();
          window.clearInterval(self.time);
          submit = false;
        }
      });

      function removeBack() {

      }

      function remove() {
        // 用户离开了当前页面
        if (document.visibilityState === 'hidden') {
          submit = true;
          if (this.questionType === 0) {//单选
            self.answers[self.questionIndex] = self.radio;
          } else if (self.questionType === 1) {//多选
            self.answers[self.questionIndex] = self.checkbox;
          } else if (self.questionType === 2) {//判断
            self.answers[self.questionIndex] = self.judge;
          }
        }
        // 用户打开或回到页面
        if (document.visibilityState === 'visible') {
          // document.title = '页面可见';
          if (submit) {
            //数据不一致
            if (this.answers === undefined || this.questionArray === undefined ||
              this.answers.length === 0 || this.questionArray.length === 0 ||
              this.answers.length !== this.questionArray.length) {
              return;
            }

            self.submitAnswer();
            window.clearInterval(self.time);
            //清除事件
            document.removeEventListener("visibilitychange", removeBack);
          }
        }
      }

      //页面切换的事件
      document.addEventListener('visibilitychange', remove);
    },
    beforeUpdate() {
    },
    mounted() {//渲染完成时
      this.loading = false;
      //计算时间
      this.calTime();
    },
    beforeDestroy() {//销毁示例时
    }
  }
</script>

<style scoped>
  .question {
    text-align: left;
    background-color: #fff;
    border-radius: 5px;
    border: solid #ccc 1px;
    margin: 150px 0 150px 0;
    min-height: 260px;
    padding-bottom: 20px;
  }

  .question-radio {
    outline: none;
    text-overflow: ellipsis;
    white-space: normal;
    padding: 7px 0;
    font-size: 24px;
  }


  span {
    text-overflow: ellipsis;
    white-space: normal;
  }

  .question-radio :hover {
    background-color: white;
  }

  .game-message {
    border-radius: 5px 5px 0 0;
    background-color: #545c64;
    display: flex;
  }

  .game-message p {
    padding: 0 10px;
    margin: 5px auto;
    color: red;
  }

  .question-message {
    padding-left: 10px;
  }

  .messageItem {
    text-align: center;
  }

  .wordItem {
    flex: 2;
  }

  .timeItem {
    flex: 1;
  }


  .question-buttons {
    border-top: solid 1px #ccc;
    padding-top: 20px;
    margin-top: 0;
    display: flex;
    text-align: center;
  }

  .question-button {
    text-align: center;
    flex: 1;
    padding: 0 10%;
  }

  .question-buttons button {
    width: 100%;
    border-radius: 0;
  }

  .checkbox-item {
    margin: 7px 0;
    outline: none;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 30px;
  }


  .itemText {
    word-wrap: break-word;
    padding: 5px 0;
  }

  .options {
    overflow-x: auto;
  }

  @media screen and (max-width: 1000px) {
    .question {
      margin: 110px 0 80px 0;
    }
  }

</style>
