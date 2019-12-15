<template>
  <el-row>
    <el-col :md="{span:8,offset:8}" :sm="{span:12,offset:6}" :xs="{span:22,offset:1}" style="background-color:#fff;">
      <!--题目的主体部分-->
      <div v-loading="loading">
        <div class="question" :md="24" :sm="24" :xs="24" v-show="Config.TOPIC_INDEX>=0">
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
                <span ref="time" v-text="Config.NOW + ' s'"></span>
              </p>
            </div>
          </div>

          <!--题目和答案的部分-->
          <div>
            <!--每个题目的部分-->
            <div style="padding-bottom: 15px;">
              <div class="question-item" v-show="Config.TOPIC_INDEX >= 0 && Config.TOPIC_INDEX <= Config.MAX_TOPIC_NUM">
                <!--题目的信息-->
                <div class="question-message">
                  <p>
                    <!--题目的序号-->
                    <span class="question-index" v-text="(Config.TOPIC_INDEX + 1)+'.'"></span>
                    <!--问题的内容-->
                    <span class="question-content" v-text="topic.topicText"></span>
                  </p>
                </div>
                <div class="options">
                  <!--单选部分-->
                  <div v-show="topic.topicType === 1" style="padding-left:15px;">
                    <!--答案部分-->
                    <el-radio-group v-model="RADIO_ANSWER" @change="radioAnswerChange">
                      <div>
                        <el-radio label="A" class="question-radio itemText">
                          {{topic.topicOptionA}}
                        </el-radio>
                      </div>
                      <div>
                        <el-radio label="B" class="question-radio itemText">
                          {{topic.topicOptionB}}
                        </el-radio>
                      </div>
                      <div>
                        <el-radio label="C" class="question-radio itemText">
                          {{topic.topicOptionC}}
                        </el-radio>
                      </div>
                      <div v-show="topic.topicOptionD !== null">
                        <el-radio label="D" class="question-radio itemText">
                          {{topic.topicOptionD}}
                        </el-radio>
                      </div>
                    </el-radio-group>
                  </div>
                  <!--多选部分-->
                  <div v-show="topic.topicType === 3" style="padding-left:15px;">
                    <el-checkbox-group v-model="MULTIPART_ANSWER" @change="multipartAnswerChange">
                      <div>
                        <el-checkbox label="A" class="checkbox-item itemText">
                          <span class="itemText" v-text="topic.topicOptionA"></span>
                        </el-checkbox>
                      </div>
                      <div>
                        <el-checkbox label="B" class="checkbox-item itemText">
                          {{topic.topicOptionB}}
                        </el-checkbox>
                      </div>
                      <div>
                        <el-checkbox label="C" class="checkbox-item itemText">
                          {{topic.topicOptionC}}
                        </el-checkbox>
                      </div>
                      <div class="">
                        <el-checkbox label="D" class="checkbox-item itemText">
                          {{topic.topicOptionD}}
                        </el-checkbox>
                      </div>
                      <div v-show="topic.topicOptionE !== null">
                        <el-checkbox label="E" class="checkbox-item itemText">
                          {{topic.topicOptionE}}
                        </el-checkbox>
                      </div>
                    </el-checkbox-group>
                  </div>
                  <!--判断对错部分-->
                  <div v-show="topic.topicType ===2" style="padding-left:15px;">
                    <!--答案部分-->
                    <el-radio-group v-model="JUDGE_ANSWER" @change="judgeAnswerChange">
                      <div>
                        <el-radio label="×" class="question-radio">错</el-radio>
                      </div>
                      <div>
                        <el-radio label="√" class="question-radio">对</el-radio>
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
                <el-button type="primary" size="medium" @click="prevTopic">上一题</el-button>
              </div>
              <div class="question-button" v-show="Config.TOPIC_INDEX < Config.MAX_TOPIC_NUM - 1">
                <el-button type="warning" size="medium" @click="nextTopic">下一题</el-button>
              </div>
              <div class="question-button" v-show="Config.TOPIC_INDEX  >= Config.MAX_TOPIC_NUM - 1">
                <el-button type="success" size="medium" @click="confirmSubmit">提交答案</el-button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </el-col>


    <el-dialog
      title="提示"
      :visible.sync="showSubmitDialog"
      :width="calDialogWidth()">
      <div>
        确认提交答案？
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showSubmitDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitAnswer">确 定</el-button>
      </div>
    </el-dialog>


  </el-row>
</template>

<script>
  const axios = require("axios");
  const qs = require('qs');

  export default {
    name: "answer",
    data() {
      return {
        RADIO_ANSWER: 'A',//单选按钮的值
        MULTIPART_ANSWER: ['A'],//多选按钮的值
        JUDGE_ANSWER: "√",
        loading: true,
        topics: [//问题的数组

        ],
        topic: {
          topicText: '',
          topicType: 1,
          topicOptionA: '',
          topicOptionB: '',
          topicOptionC: '',
          topicOptionD: '',
          topicOptionE: '',
          topicAnswer: []
        }, // 当前的问题
        Config: {
          MAX_TIME: 3600,
          NOW: 3600,
          MAX_TOPIC_NUM: 80,
          TOPIC_INDEX: -1
        },
        TOKEN: null,
        showSubmitDialog: false,
        Interval: null
      }
    },
    methods: {
      radioAnswerChange(val) {
        this.topics[this.Config.TOPIC_INDEX].topicAnswer = val;
      },
      multipartAnswerChange(val) {
        this.topics[this.Config.TOPIC_INDEX].topicAnswer = val;
      },
      judgeAnswerChange(val) {
        this.topics[this.Config.TOPIC_INDEX].topicAnswer = val;
      },
      prevTopic() {
        if (this.Config.TOPIC_INDEX > 0) {
          this.storageAnswer();
          this.Config.TOPIC_INDEX--;
          this.topic = this.topics[this.Config.TOPIC_INDEX];
          this.setAnswer();
        }
      },
      nextTopic() {
        if (this.Config.TOPIC_INDEX < this.Config.MAX_TOPIC_NUM) {
          this.storageAnswer();
          if (this.Config.TOPIC_INDEX < this.topics.length - 1) {
            this.Config.TOPIC_INDEX++;
            this.topic = this.topics[this.Config.TOPIC_INDEX];
            this.setAnswer();
          } else {
            this.loadTopic();
          }
        }
      },
      confirmSubmit() {
        this.storageAnswer();
        this.showSubmitDialog = true;
      },
      loadTopic() {
        this.loading = true;
        axios.get(this.$URL.LoadTopic, {
          params: {
            topicIndex: this.Config.TOPIC_INDEX + 2, // -1 + 2 = 1 第一题
            token: this.TOKEN
          }
        }).then((success) => {
          let res = success.data;
          if (res.result) {
            this.topics.push(res.data);
            this.Config.TOPIC_INDEX++;
            this.topic = res.data;
            //重置答案
            this.resetAnswer();
          } else {
            this.$message({
              type: "warning",
              message: res.message
            });
            if (res.code === 400) {
              this.$router.push({path: "/Head/Grade"});
            }
          }
          this.loading = false;
        }).catch((error) => {
          console.log(error);
          this.$message({
            type: "error",
            message: "请求异常"
          });
          this.loading = false;
        })

      },
      submitAnswer() {
        this.loading = true;
        if (this.topics === undefined || this.topics.length === 0) {
          return;
        }
        let judgeAnswer = "";
        let radioAnswer = "";
        let multipartAnswer = "";
        //封装答案
        for (let t of this.topics) {
          switch (t.topicType) {
            case 1:
              radioAnswer += (t.topicId + t.topicAnswer);
              break;
            case 2:
              judgeAnswer += (t.topicId + t.topicAnswer);
              break;
            case 3:
              multipartAnswer += (t.topicId + t.topicAnswer.toString().replace("[", "").replace("]", "").replace(/,/g, ""));
              break;
            default:
              break;
          }
        }
        //开始提交数据
        //清楚定时器
        window.clearInterval(this.Interval);
        axios.get(this.$URL.CalAnswer, {
          params: {
            radioAnswer: radioAnswer.trim(),
            judgeAnswer: judgeAnswer.trim(),
            multipartAnswer: multipartAnswer.trim(),
            token: this.TOKEN
          }
        }).then((success) => {
          let res = success.data;
          if (res.result) {
            this.$message({
              type: "success",
              message: "提交成功"
            });
            //清除答案数据
            localStorage.removeItem("TIME");
            localStorage.removeItem("Answer");
            //取消注册事件
            document.removeEventListener("visibilitychange", function () {

            });
            this.$router.push({path: "/Head/Grade"});
          } else {
            //不是重复提交  是重复提交就隐藏掉消息
            if (res.message !== "你本次已经答题完成") {
              this.$message({
                type: "warning",
                message: res.message
              });
              setTimeout(() => {
                this.$router.push({path: "/Head/Login"});
              }, 1000);
            } else {
              console.log("重复提交隐藏数据");
            }

            this.showSubmitDialog = false;
          }
        }).catch((error) => {
          console.log(error);
          this.$message({
            type: "error",
            message: "请求异常"
          });
          this.showSubmitDialog = false;
          this.loading = false;
        })
      },
      startCalTime() {
        let that = this;
        this.Interval = setInterval(() => {
          that.Config.NOW--;
          if (this.Config.NOW <= 0) {
            //提交数据
            this.storageAnswer();
            this.submitAnswer();
            window.clearInterval(that.Interval);
          }
        }, 1000)
      },
      storageAnswer() {
        switch (this.topic.topicType) {
          case 1:
            this.topics[this.Config.TOPIC_INDEX].topicAnswer = this.RADIO_ANSWER;
            break;
          case 2:
            this.topics[this.Config.TOPIC_INDEX].topicAnswer = this.JUDGE_ANSWER;
            break;
          case 3:
            this.topics[this.Config.TOPIC_INDEX].topicAnswer = this.MULTIPART_ANSWER;
            break;
          default:
            break;
        }
      },
      resetAnswer() {
        switch (this.topic.topicType) {
          case 1:
            this.RADIO_ANSWER = 'A';
            break;
          case 2:
            this.JUDGE_ANSWER = '×';
            break;
          case 3:
            this.MULTIPART_ANSWER = ['A'];
            break;
          default:
            break;
        }
      },
      setAnswer() {
        switch (this.topic.topicType) {
          case 1:
            this.RADIO_ANSWER = this.topic.topicAnswer;
            break;
          case 2:
            this.JUDGE_ANSWER = this.topic.topicAnswer;
            break;
          case 3:
            this.MULTIPART_ANSWER = this.topic.topicAnswer;
            break;
          default:
            break;
        }
      },
      calDialogWidth() {
        return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ? "90%" : "30%";
      }
    },
    created() {
      this.TOKEN = localStorage.getItem("token");
      if (this.TOKEN == null || this.TOKEN === undefined) {
        this.$route.push({path: "/Head/Login"});
      } else {
        let time = localStorage.getItem("TIME");
        if (time != null) {
          this.loading = true;
          this.topics = JSON.parse(localStorage.getItem("Answer"));
          this.Config.NOW = time;
          this.submitAnswer();
          localStorage.removeItem("TIME");
          localStorage.removeItem("Answer");
          return;
        }
        this.loadTopic();
        this.startCalTime();
      }

      let that = this;


      window.onbeforeunload = () => {
        that.storageAnswer();
        localStorage.setItem("TIME", that.Config.NOW);
        localStorage.setItem("Answer", JSON.stringify(that.topics));
        return "确认离开当前页面? 这将触发自动提交！";
      };

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          // 页面被挂起
          that.storageAnswer();
          if (localStorage.getItem("SUBMIT") == null) {
            localStorage.setItem("SUBMIT", "200");
            document.removeEventListener("visibilitychange", function () {

            });
            that.submitAnswer();
          }
        }
        else {
          // 页面呼出
        }
      });

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
    margin: 30% 0 0 0;
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
    flex: 0.5;
    padding: 0 10%;
  }

  .question-buttons button {
    width: 100%;
    border-radius: 0;
  }

  .checkbox-item {
    margin: 0;
    outline: none;
    text-overflow: ellipsis;
    white-space: normal;
    line-height: 25px;
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
