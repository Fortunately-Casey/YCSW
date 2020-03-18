/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
<template>
    <div class="patrol">
        <div class="top">
            <div class="tab" @click="choseTab(0)">
              <div class="tabber">
                <span class="announce"></span>
                &nbsp;通告发布
              </div>
              <div :class="chosedIndex === 0?'line':''"></div>
            </div>
            <div class="tab" @click="choseTab(1)">
              <div class="tabber">
                <span class="breakdown"></span>
                故障一览
              </div>
              <div :class="chosedIndex === 1?'line':''"></div>
            </div>
            <div class="tab" @click="choseTab(2)">
              <div class="tabber">
                <span class="statistics"></span>
                &nbsp;统计分析
              </div>
              <div :class="chosedIndex === 2?'line':''"></div>
            </div>
            <div class="tab" @click="choseTab(3)">
              <div class="tabber">
                <span class="locus"></span>
                轨迹查看
              </div>
              <div :class="chosedIndex === 3?'line':''"></div>
            </div>
            <span class="time" id="txtClock">
              <div class="timer">
                {{time}}
              </div>
            </span>
        </div>
        <m-announce v-if="chosedIndex === 0 ? true : false" :total="total" :page="page" :list="list" @closeTab="choseTab" @search="search"  @showAdd="addPatrol" @showEdit="editPatrol" @showDelete="deletePatrol" @showDetail="showDetail" @showPublish="showPublish" @pageSearch="pageSearch"></m-announce>
        <m-fault v-if="chosedIndex === 1 ? true : false" @closeTab="choseTab"></m-fault>
        <m-statistics v-if="chosedIndex === 2 ? true : false" @closeTab="choseTab"></m-statistics>
        <m-locus v-if="chosedIndex === 3 ? true : false" @closeTab="choseTab"></m-locus>
        <!-- 新增通告 -->
        <el-dialog
          :visible.sync="isShowAddPatrol"
          width="50%"
          :show-close="false"
          :close-on-click-modal="false"
          custom-class="bgc"
        >
          <div class="add-patrol" >
              <div class="header">
                新 增 通 告
                <i class="el-icon-close" @click="isShowAddPatrol = false"></i>
              </div>
              <div class="content">
                  <div class="patroler">
                    <div class="left">
                      巡查人:
                    </div>
                    <div class="right">
                      <div class="drop-down" ref="patroler">
                          <div class="dropdown-toggle" @click="showPatroler = !showPatroler">
                          {{!menus?patrolerOption.name:"已选择"+menus.split(',').length+'项'}}
                          <span class="cart"></span>
                          </div>
                          <ul class="dropdown-menu" v-show="showPatroler">
                              <li v-for="(item,index) in patrolerOptions" :key="index">
                                <el-checkbox-group
                                  v-model="patrolerChecked"
                                  @change="chosePatrol"
                                >
                                  <el-checkbox :label="item.UserName" :title="item.TrueName">
                                    {{item.TrueName}}
                                  </el-checkbox>
                                </el-checkbox-group>
                              </li>
                          </ul>
                      </div>
                    </div>
                  </div>
                  <div class="release">
                    <div class="left">
                      发布人:
                    </div>
                    <div class="right">
                      <input type="text" disabled="disabled" v-model="release">
                    </div>
                  </div>
                  <div class="date">
                    <div class="left">
                      发布日期:
                    </div>
                    <div class="right">
                      <input type="text" disabled="disabled" v-model="date">
                    </div>
                  </div>
                  <div class="title">
                    <div class="left">
                      标 题:
                    </div>
                    <div class="right">
                      <input type="text" v-model="title">
                    </div>
                  </div>
                  <div class="text">
                    <div class="left">
                      发布内容:
                    </div>
                    <div class="right">
                      <quill-editor
                        :value="text"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @change="alertValues($event)"
                      >
                      </quill-editor>
                    </div>
                  </div>
              </div>
              <div class="footer">
                <div class="confirm-patrol" @click="confirm(0)">确认并发布</div>
                <div class="confirm" @click="confirm(-1)">保 存</div>
                <div class="canncel" @click="isShowAddPatrol = false">取 消</div>
              </div>
          </div>
        </el-dialog>
        <!-- 编辑通告 -->
        <el-dialog
          :visible.sync="isShowEditPatrol"
          width="50%"
          :show-close="false"
          :close-on-click-modal="false"
          custom-class="bgc"
        >
         <div class="edit-patrol">
              <div class="header">
                通 告 编 辑
                <i class="el-icon-close" @click="isShowEditPatrol = false"></i>
              </div>
              <div class="content">
                  <div class="patroler">
                    <div class="left">
                      巡查人:
                    </div>
                    <div class="right">
                        <div class="drop-down" ref="editPatrol">
                          <div class="dropdown-toggle" @click="showEditPatrol = !showEditPatrol">
                          {{!editMenus?patrolerOption.name:"已选择"+editMenus.split(',').length+'项'}}
                          <span class="cart"></span>
                          </div>
                          <ul class="dropdown-menu" v-show="showEditPatrol">
                              <li v-for="(item,index) in patrolerOptions" :key="index">
                                <el-checkbox-group
                                  v-model="editObj.checked"
                                  @change="editChosePatrol"
                                >
                                  <el-checkbox :label="item.UserName" :title="item.TrueName">
                                    {{item.TrueName}}
                                  </el-checkbox>
                                </el-checkbox-group>
                              </li>
                          </ul>
                      </div>
                    </div>
                  </div>
                  <div class="release">
                    <div class="left">
                      发布人:
                    </div>
                    <div class="right">
                      <input type="text" disabled="disabled" v-model="release">
                    </div>
                  </div>
                  <div class="date">
                    <div class="left">
                      发布日期:
                    </div>
                    <div class="right">
                      <input type="text" disabled="disabled" v-model="date">
                    </div>
                  </div>
                  <div class="title">
                    <div class="left">
                      标 题:
                    </div>
                    <div class="right">
                      <input type="text" v-model="editTitle">
                    </div>
                  </div>
                  <div class="text">
                    <div class="left">
                      发布内容:
                    </div>
                    <div class="right">
                      <quill-editor
                        :value="editObj.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @change="editValues($event)"
                      >
                      </quill-editor>
                    </div>
                  </div>
              </div>
              <div class="footer">
                <div class="confirm-patrol" @click="editConfirm(0)">确认并发布</div>
                <div class="confirm" @click="editConfirm(-1)">保 存</div>
                <div class="canncel" @click="isShowEditPatrol = false">取 消</div>
              </div>
          </div>
        </el-dialog>
        <!-- 删除通告 -->
        <el-dialog
          :visible.sync="isShowDeletePatrol"
          width="40%"
          :show-close="false"
          custom-class="bgc"
        >
          <div class="delete-patrol">
            <div class="header">
              通 告 删 除
              <i class="el-icon-close" @click="isShowDeletePatrol = false"></i>
            </div>
            <div class="content">
                <p>确定要删除该通告信息吗？</p>
            </div>
            <div class="footer">
                <div class="canncel" @click="isShowDeletePatrol = false">取 消</div>
                <div class="confirm" @click="confirmDelete">确 定</div>
            </div>
          </div>
        </el-dialog>
        <!-- 通告详情 -->
        <el-dialog
          :visible.sync="isShowPatrolDetail"
          width="50%"
          :show-close="false"
          custom-class="bgc"
        >
         <div class="patrol-detail" >
              <div class="header">
                通 告 详 情
                <i class="el-icon-close" @click="isShowPatrolDetail = false"></i>
              </div>
              <div class="content">
                  <div class="patroler">
                    <div class="left">
                      巡查人:
                    </div>
                    <div class="right">
                      <input type="text" disabled="disabled" :value="detailObj.ReceiverUserName">
                    </div>
                  </div>
                  <div class="release">
                    <div class="left">
                      发布人:
                    </div>
                    <div class="right">
                      <input type="text" disabled="disabled" :value="detailObj.SenderUserName">
                    </div>
                  </div>
                  <div class="date">
                    <div class="left">
                      发布日期:
                    </div>
                    <div class="right">
                      <input type="text" disabled="disabled" :value="detailObj.SendTime">
                    </div>
                  </div>
                  <div class="title">
                    <div class="left">
                      标 题:
                    </div>
                    <div class="right">
                      <input type="text" disabled="disabled" :value="detailObj.Title">
                    </div>
                  </div>
                  <div class="text">
                    <div class="left">
                      发布内容:
                    </div>
                    <div class="textarea">
                      <p v-html="detailObj.Content"></p>
                    </div>
                  </div>
                  <div class="readers">
                    <div class="left">
                      阅读人员:
                    </div>
                    <div class="right">
                        <div class="read-top">
                          <div>
                            <span class="name">人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;员</span><span class="time">时&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;间</span>
                          </div>
                        </div>
                        <div class="table">
                          <div v-for="(item,index) in readList" :key="index"><span class="name">{{item.Reader}}</span><span class="time">{{item.ReadTime}}</span></div>
                        </div>
                    </div>
                  </div>
              </div>
          </div>
        </el-dialog>
        <!-- 发布通告 -->
        <el-dialog
          :visible.sync="isShowPublish"
          width="40%"
          :show-close="false"
          custom-class="bgc"
        >
          <div class="publish-patrol">
            <div class="header">
              通 告 发 布
              <i class="el-icon-close" @click="isShowPublish = false"></i>
            </div>
            <div class="content">
                <p>确定要发布该通告吗？</p>
            </div>
            <div class="footer">
                <div class="canncel" @click="isShowPublish = false">取 消</div>
                <div class="confirm" @click="publishConfirm">确 定</div>
            </div>
          </div>
        </el-dialog>
        <el-dialog
          :visible.sync="isShowBigImage"
          width="40%"
          :show-close="false"
          custom-class="bgc"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
        >
          <div class="big-image" :style="{backgroundImage:'url('+bigImageUrl+')',backgroundSize:'100%,100%'}">
            <div class="header">
              故 障 图 片
              <i class="el-icon-close" @click="closeBigImage"></i>
            </div>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import { getTime } from '@/common/utils/tool.js'
import { clearAllGraphic } from '@/common/mapServer/config.js'
import MAnnounce from './components/announce/Announce.vue'
import MFault from './components/fault/Fault.vue'
import MStatistics from './components/statistics/Statistics.vue'
import MLocus from './components/locus/Locus.vue'
import quillConfig from './quill-config'
import {
  GetMessageList,
  GetAPPUser,
  InsertMessage,
  UpdateMessage,
  UpdateMessage2,
  DeleteMessage,
  GetMessageReadeInfo
} from '@/api/patrol.js'
import { Permissions } from '@/api/user.js'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      chosedIndex: '',
      isShowAddPatrol: false,
      isShowEditPatrol: false,
      isShowDeletePatrol: false,
      isShowPatrolDetail: false,
      isShowPublish: false,
      showPatroler: false,
      patrolerOption: {
        name: '请选择'
      },
      showEditPatrol: false,
      patrolerOptions: [],
      patroler: '',
      release: '',
      date: '',
      title: '',
      text: '',
      editorOption: quillConfig,
      page: 1,
      total: 0,
      rows: 12,
      list: [],
      params: {
        Title: '',
        Status: '',
        ReceiverUserId: '',
        StartSendTime: '',
        EndSendTime: ''
      },
      editObj: {
        title: '',
        checked: [],
        content: ''
      },
      patrolerChecked: [],
      menus: '',
      editMenus: '',
      publishId: '',
      detailObj: {},
      deleteId: '',
      editTitle: '',
      readList: [],
      publishItem: {}
    }
  },
  created () {
    this.initTime()
    this.date = this.getTime(new Date())
    this.getMessageList()
    this.getAppUsers()
    this.getUserName()
  },
  computed: {
    ...mapGetters(['isShowBigImage', 'bigImageUrl'])
  },
  mounted () {
    document.addEventListener('click', this.hidePandel, false)
  },
  methods: {
    ...mapActions({
      showFaultLevel: 'setIsShowFaultLevel',
      setShowBigImage: 'setIsShowBigImage'
    }),
    initTime () {
      this.time = getTime()
      this.timer = setInterval(() => {
        this.time = getTime()
      }, 1000)
    },
    addPatrol () {
      (this.title = ''),
      (this.patrolerChecked = []),
      (this.menus = ''),
      (this.text = ''),
      (this.isShowAddPatrol = true)
    },
    editPatrol (item) {
      this.editObj.checked = item.ReceiverUserId.split(',')
      this.editObj.content = item.Content
      this.editObj.id = item.MessageId
      this.isShowEditPatrol = true
      this.editTitle = item.Title
      this.editMenus = this.editObj.checked.join(',')
    },
    deletePatrol (item) {
      this.deleteId = item.MessageId
      this.isShowDeletePatrol = true
    },
    showDetail (item) {
      var vm = this
      this.detailObj = item
      vm.readList = []
      GetMessageReadeInfo({
        MessageId: item.MessageId
      }).then(resp => {
        if (resp.data.success) {
          vm.readList = resp.data.rows
        }
      })

      this.isShowPatrolDetail = true
    },
    showPublish (item) {
      this.publishId = item.MessageId
      this.publishItem = item
      this.isShowPublish = true
    },
    updateOption (type, option) {
      if (type === 'patroler') {
        this.patrolerOption.name = option.name
        this.showPatroler = false
      }
    },
    closeBigImage () {
      this.setShowBigImage(false)
    },
    getAppUsers () {
      var vm = this
      GetAPPUser({}).then(resp => {
        if (resp.data.success) {
          vm.patrolerOptions = resp.data.rows
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        }
      })
    },
    getUserName () {
      var vm = this
      Permissions().then(resp => {
        if (resp.data.success) {
          this.release = resp.data.extraData
        }
      })
    },
    hidePandel (e) {
      if (this.$refs.patroler) {
        if (!this.$refs.patroler.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showPatroler = false
        }
      }
      if (this.$refs.editPatrol) {
        if (!this.$refs.editPatrol.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showEditPatrol = false
        }
      }
    },
    getTime (CurrentTime) {
      var timeStr
      if (CurrentTime) {
        timeStr =
          CurrentTime.getFullYear() +
          '-' +
          this.format2Len(CurrentTime.getMonth() + 1) +
          '-' +
          this.format2Len(CurrentTime.getDate())
      }
      return timeStr
    },
    format2Len (i) {
      return i < 10 ? '0' + i : i
    },
    choseTab (index) {
      this.chosedIndex = index
      if (this.chosedIndex === 1) {
        this.showFaultLevel(true)
      } else {
        this.showFaultLevel(false)
      }
      window.mapBase.removeLayer('GZPoints')
      clearAllGraphic()
    },
    chosePatrol (obj) {
      let arr = []
      for (var k in obj) {
        arr.push(obj[k])
      }
      this.menus = arr.join(',')
    },
    editChosePatrol (obj) {
      let arr = []
      for (var k in obj) {
        arr.push(obj[k])
      }
      this.editMenus = arr.join(',')
    },
    getMessageList () {
      var vm = this
      GetMessageList({
        Page: vm.page,
        Rows: vm.rows,
        ReceiverUserId: '',
        Status: '',
        StartSendTime: '',
        EndSendTime: ''
      }).then(resp => {
        if (resp.data.success) {
          vm.list = resp.data.rows
          vm.total = resp.data.total
        }
      })
    },
    confirm (status) {
      var vm = this
      if (vm.menus === '') {
        vm.$message({
          message: '巡查人员不能为空!',
          type: 'warning'
        })
        return
      }
      if (vm.title === '') {
        vm.$message({
          message: '标题不能为空!',
          type: 'warning'
        })
        return
      }
      if (vm.text === '') {
        vm.$message({
          message: '发布内容不能为空!',
          type: 'warning'
        })
        return
      }
      InsertMessage({
        ReceiverUserId: vm.menus,
        Title: vm.title,
        Content: vm.text,
        Status: status
      }).then(resp => {
        if (resp.data.success) {
          vm.$message({
            message: resp.data.rows,
            type: 'success'
          })
          vm.getMessageList()
          vm.isShowAddPatrol = false
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'error'
          })
        }
      })
    },
    editConfirm (status) {
      var vm = this
      UpdateMessage({
        ReceiverUserId: vm.editMenus,
        Title: vm.editTitle,
        Content: vm.editObj.content,
        Status: status,
        MessageId: vm.editObj.id
      }).then(resp => {
        if (resp.data.success) {
          vm.$message({
            message: resp.data.rows,
            type: 'success'
          })
          vm.getMessageList()
          vm.isShowEditPatrol = false
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'error'
          })
        }
      })
    },
    publishConfirm () {
      var vm = this
      UpdateMessage2({
        MessageId: vm.publishId,
        Title: vm.publishItem.Title,
        Content: vm.publishItem.Content,
        ReceiverUserId: vm.publishItem.ReceiverUserId
      }).then(resp => {
        if (resp.data.success) {
          vm.$message({
            message: resp.data.rows,
            type: 'success'
          })
          vm.getMessageList()
          vm.isShowPublish = false
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'error'
          })
        }
      })
    },
    confirmDelete () {
      var vm = this
      DeleteMessage({
        MessageId: vm.deleteId
      }).then(resp => {
        if (resp.data.success) {
          vm.$message({
            message: resp.data.rows,
            type: 'success'
          })
          vm.getMessageList()
          vm.isShowDeletePatrol = false
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'error'
          })
        }
      })
    },
    search (params) {
      var vm = this
      vm.params = params
      vm.page = 1
      GetMessageList({
        Page: vm.page,
        Rows: vm.rows,
        Title: vm.params.Title,
        Status: vm.params.Status,
        ReceiverUserId: vm.params.ReceiverUserId,
        StartSendTime: vm.params.StartSendTime,
        EndSendTime: vm.params.EndSendTime
      }).then(resp => {
        if (resp.data.success) {
          vm.list = resp.data.rows
          vm.total = resp.data.total
        }
      })
    },
    pageSearch (page) {
      var vm = this
      vm.page = page
      GetMessageList({
        Page: vm.page,
        Rows: vm.rows,
        Title: vm.params.Title,
        Status: vm.params.Status,
        ReceiverUserId: vm.params.ReceiverUserId,
        StartSendTime: vm.params.StartSendTime,
        EndSendTime: vm.params.EndSendTime
      }).then(resp => {
        if (resp.data.success) {
          vm.list = resp.data.rows
          vm.total = resp.data.total
        }
      })
    },
    alertValues (e) {
      if (e.text.length > 1000) {
        this.$message({
          message: '内容不可超过1000字符!',
          type: 'warning'
        })
        e.quill.deleteText(1000, 1, e.html)
      } else {
        this.text = e.html
      }
    },
    editValues (e) {
      if (e.text.length > 1000) {
        this.$message({
          message: '内容不可超过1000字符!',
          type: 'warning'
        })
        e.quill.deleteText(1000, 1, e.html)
      } else {
        this.editObj.content = e.html
      }
    }
  },
  components: {
    MAnnounce,
    MFault,
    MStatistics,
    MLocus
  },
  watch: {
    title (next, prev) {
      var vm = this
      if (next.length > 20) {
        vm.$message({
          message: '标题内容不能超过20个字符！',
          type: 'warning'
        })
        vm.title = prev
      }
    },
    editTitle (next, prev) {
      var vm = this
      if (next.length > 20) {
        vm.$message({
          message: '标题内容不能超过20个字符！',
          type: 'warning'
        })
        vm.editTitle = prev
      }
    }
  }
}
</script>
<style lang="less" scoped>
.patrol {
  width: 100%;
  height: 5%;
  //   background-color: #fff;
  /deep/.bgc {
    background-color: rgba(0, 0, 0, 0);
    -webkit-box-shadow: none;
  }
  .top {
    padding-left: 30px;
    height: 100%;
    background-color: #4886ff;
    .tab {
      height: 100%;
      line-height: 40px;
      margin-right: 40px;
      float: left;
      cursor: pointer;
      padding-left: 22px;
      font-size: 16px;
      color: #fff;
      position: relative;
      width: 100px;
      .tabber {
        height: 40px;
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        padding-left: 25px;
        .announce,
        .breakdown,
        .statistics,
        .locus {
          display: inline-block;
          width: 20px;
          height: 20px;
          position: absolute;
          left: 0;
          top: 12px;
        }
        .announce {
          background: url("../../../assets/icon/通知.png") no-repeat;
          background-size: 20px 17px;
        }
        .breakdown {
          background: url("../../../assets/icon/故障状态.png") no-repeat;
          background-size: 20px 20px;
          top: 10px;
        }
        .statistics {
          background: url("../../../assets/icon/统计.png") no-repeat;
          background-size: 20px 20px;
          top: 10px;
        }
        .locus {
          background: url("../../../assets/icon/Group3.png") no-repeat;
          background-size: 20px 20px;
          top: 10px;
        }
      }
      .line {
        width: 100%;
        height: 3px;
        background-color: #fff;
        position: absolute;
        left: 13px;
        bottom: 0;
      }
    }
    .time {
      width: 200px;
      height: 100%;
      float: right;
      color: #fff;
      line-height: 30px;
      font-size: 14px;
      font-family: "微软雅黑";
      position: relative;
      .timer {
        width: 200px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .big-image {
    width: 800px;
    height: 600px;
    border-radius: 6px 6px 0 0;
    .header {
      height: 25px;
      background-color: #4886ff;
      border-radius: 6px 6px 0 0;
      line-height: 25px;
      padding-left: 25px;
      color: #fff;
      font-size: 14px;
      position: relative;
      i {
        font-size: 18px;
        position: absolute;
        right: 16px;
        top: 5px;
        cursor: pointer;
      }
    }
  }
  .add-patrol,
  .edit-patrol,
  .delete-patrol,
  .patrol-detail,
  .publish-patrol {
    width: 840px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 6px;
    .header {
      height: 40px;
      background-color: #4886ff;
      border-radius: 6px 6px 0 0;
      line-height: 40px;
      padding-left: 40px;
      color: #fff;
      font-size: 16px;
      position: relative;
      i {
        font-size: 18px;
        position: absolute;
        right: 20px;
        top: 10px;
        cursor: pointer;
      }
    }
    .content {
      .patroler,
      .release,
      .date,
      .title,
      .readers {
        padding-top: 20px;
        width: 400px;
        height: 40px;
        float: left;
        .left {
          width: 115px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          float: left;
        }
        .right {
          width: 270px;
          position: relative;
          float: right;
          border: 1px solid #c2c2c2;
          margin-left: 10px;
          .drop-down {
            float: left;
            .dropdown-toggle {
              text-align: left;
              cursor: pointer;
              font-family: PingFangSC-Semibold;
              list-style-type: none;
              color: #5a5a5a;
              width: 270px;
              font-size: 14px;
              height: 40px;
              line-height: 40px;
              text-transform: none;
              padding-left: 20px;
              font-weight: 300;
              border-radius: 0;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              .cart {
                width: 0;
                position: relative;
                top: 18px;
                left: -30px;
                height: 0;
                margin-left: 2px;
                vertical-align: middle;
                border-top: 4px dashed;
                border-top: 4px solid gray;
                border-right: 4px solid transparent;
                border-left: 4px solid transparent;
                float: right;
              }
            }
            .dropdown-menu {
              position: absolute;
              top: 38px;
              left: 0;
              width: 270px;
              z-index: 1000;
              padding: 5px 0;
              margin: 2px 0 0;
              list-style: none;
              font-size: 14px;
              background-color: #fff;
              opacity: 0.9;
              border: 1px solid #ccc;
              box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
              height: 140px;
              overflow-y: auto;
              overflow-x: hidden;
              li {
                text-align: left;
                padding-left: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                a {
                  padding: 10px 30px;
                  display: block;
                  clear: both;
                  font-weight: normal;
                  line-height: 1;
                  color: #727272;
                  white-space: nowrap;
                  text-decoration: none;
                  text-align: left;
                }
                a:hover {
                  color: #fff;
                  text-decoration: none;
                }
                overflow: hidden;
                width: 100%;
                position: relative;
                margin: 0;
              }
              li:hover {
                background-color: #4785fe;
                color: #fff;
              }
            }
          }
          input {
            width: 250px;
            height: 40px;
            border: none;
            padding-left: 20px;
          }
        }
      }
      .title {
        width: 800px;
        .right {
          float: left;
          width: 670px;
          margin-left: 13px;
          input {
            width: 650px;
          }
        }
      }
      p {
        line-height: 50px;
        font-size: 15px;
        padding-left: 40px;
      }
      .text {
        width: 840px;
        padding-top: 20px;
        float: left;
        overflow: hidden;
        .left {
          width: 115px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          float: left;
        }
        .right {
          width: 840px;
          margin: 0 auto;
        }
        .textarea {
          float: left;
          width: 650px;
          height: 100px;
          resize: none;
          padding: 10px;
          margin-left: 13px;
          margin-bottom: 10px;
          overflow-y: auto;
          border: 1px solid #c1c1c1;
          background-color: #eaeae3;
          p {
            padding: 0;
            height: 20px;
            line-height: 20px;
          }
        }
      }
    }
    .footer {
      float: left;
      height: 40px;
      position: relative;
      margin-left: 80px;
      margin-bottom: 10px;
      margin-top: 10px;
      .canncel,
      .confirm-patrol,
      .confirm {
        width: 120px;
        height: 40px;
        border-radius: 5px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        float: left;
        margin: 0 55px;
      }
      .confirm-patrol {
        background-color: #3dba61;
        color: #fff;
      }
      .confirm {
        background-color: #4a86fd;
        color: #fff;
      }
      .canncel {
        left: 180px;
        width: 118px;
        height: 38px;
        border: 1px solid #bfbfbf;
      }
    }
  }
  .delete-patrol {
    width: 600px;
    height: 200px;
    .header {
      background-color: #e3292a;
    }
    .footer {
      margin-top: 40px;
      .cancel {
        left: 50px;
      }
      .confirm {
        left: 260px;
        background-color: #e3292a;
      }
    }
  }
  .patrol-detail {
    .content {
      .readers {
        width: 840px;
        height: 130px;
        .right {
          width: 670px;
          float: left;
          margin-left: 13px;
          .read-top {
            div {
              height: 25px;
              line-height: 25px;
              border-bottom: 1px solid #c1c1c1;
              .name {
                width: 40%;
                float: left;
                text-align: center;
                box-sizing: border-box;
              }
              .time {
                width: 60%;
                float: left;
                text-align: center;
              }
            }
          }
          .table {
            max-height: 90px;
            overflow-y: auto;
            div {
              height: 25px;
              line-height: 25px;
              border-bottom: 1px solid #c1c1c1;
              .name {
                width: 40%;
                float: left;
                text-align: center;
                box-sizing: border-box;
              }
              .time {
                width: 60%;
                float: left;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
  .publish-patrol {
    width: 600px;
    height: 200px;
    .footer {
      margin-top: 40px;
      .cancel {
        left: 50px;
      }
      .confirm {
        left: 260px;
      }
    }
  }
}
</style>
