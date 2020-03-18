<template>
    <div class="announce">
       <div class="header">
         <div class="title">
              <div class="left">
                  标 题:
              </div>
              <div class="right">
                  <input type="text" v-model="title">
              </div>
         </div>
         <div class="status">
              <div class="left">
                收发状态:
              </div>
              <div class="right">
                   <div class="drop-down" ref="status">
                        <div class="dropdown-toggle" @click="showStatus = !showStatus">
                        {{statusOption.name}}
                        <span class="cart"></span>
                        </div>
                        <ul class="dropdown-menu" v-show="showStatus">
                            <li v-for="(option,index) in statusOptions" :key="index">
                                <a href="javascript:void(0)" @click="updateOption('status',option)" :title="option.name">
                                    {{ option.name }}
                                </a>
                            </li>
                        </ul>
                    </div>
              </div>
         </div>
         <div class="personnel">
              <div class="left">
                  巡检人员:
              </div>
              <div class="right">
                  <div class="drop-down" ref="personel">
                        <div class="dropdown-toggle" @click="showPersonel = !showPersonel">
                        {{personelOption.TrueName}}
                        <span class="cart"></span>
                        </div>
                        <ul class="dropdown-menu" v-show="showPersonel">
                            <li v-for="(option,index) in personelOptions" :key="index">
                                <a href="javascript:void(0)" @click="updateOption('personel',option)" :title="option.TrueName">
                                    {{ option.TrueName }}
                                </a>
                            </li>
                        </ul>
                    </div>
              </div>
         </div>
         <div class="date">
              <div class="left">
                  发布日期:
              </div>
              <div class="right">
                  <el-date-picker
                      class="annouce-date"
                      v-model="date"
                      type="daterange"
                      range-separator="~"
                      start-placeholde="开始日期"
                      end-placeholde="结束日期"
                  >
                  </el-date-picker>
              </div>
         </div>
         <div class="search-button" @click="onSearch">
              查&nbsp;&nbsp;询
          </div>
          <div class="add-button" @click="addPersonnel">
              新增通告
          </div>
       </div>
       <div class="table">
            <div class="thead">
                <div class="index">序号</div>
                <div class="title">标题</div>
                <div class="patrol">巡查人</div>
                <div class="announcer">发布人</div>
                <div class="date">发布日期</div>
                <div class="readers">阅读人员</div>
                <div class="status">发布状态</div>
                <div class="options">操作</div>
            </div>
            <ul class="list">
                <li v-for="(item,index) in list" :key="index" :class="index%2==0?'':'gray'">
                    <div class="index">{{index+1}}</div>
                    <div class="title" :title="item.Title">{{item.Title}}</div>
                    <div class="patrol" :title="item.ReceiverUserName">{{item.ReceiverUserName}}</div>
                    <div class="announcer" :title="item.SenderUserName">{{item.SenderUserName}}</div>
                    <div class="date" :title="item.SendTime">{{item.SendTime}}</div>
                    <div class="readers" :title="item.Readers">{{item.Readers}}</div>
                    <div class="status">
                        <span class="isPublished" v-if="item.Status !== -1">已发布</span>
                        <span class="publish" @click="publishPatrol(item)" v-if="item.Status === -1">发布通告</span>
                    </div>
                    <div class="options">
                        <span class="edit" @click="editPatrol(item)" v-if="item.Status === -1"> 编辑 </span>
                        <span class="detail" @click="getDetail(item)"> 详情 </span>
                        <span class="delete" @click="deletePatrol(item)" v-if="item.Status === -1"> 删除 </span>
                    </div>
                </li>
            </ul>
            <div class="paging">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="12"
                    :total="total"
                    @current-change="changePage"
                    center
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { GetMessageList, GetAPPUser } from '@/api/patrol.js'
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    page: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      title: '',
      date: '',
      showStatus: false,
      statusOption: {
        name: '全部',
        id: ''
      },
      statusOptions: [
        {
          name: '全部',
          id: ''
        },
        {
          name: '未发布',
          id: -1
        },
        {
          name: '已发布',
          id: 0
        }
      ],
      showPersonel: false,
      personelOption: {
        TrueName: '全部',
        UserName: ''
      },
      personelOptions: []
    }
  },
  created () {
    this.getAppUsers()
  },
  mounted () {
    document.addEventListener('click', this.hidePandel, false)
  },
  methods: {
    format2Len (i) {
      return i < 10 ? '0' + i : i
    },
    getTime (CurrentTime) {
      var timeStr =
        CurrentTime.getFullYear() +
        '-' +
        this.format2Len(CurrentTime.getMonth() + 1) +
        '-' +
        this.format2Len(CurrentTime.getDate())
      return timeStr
    },
    onSearch () {
      this.$emit('search', {
        Title: this.title,
        Status: this.statusOption.id,
        ReceiverUserId: this.personelOption.UserName,
        StartSendTime: this.date ? this.getTime(this.date[0]) : '',
        EndSendTime: this.date ? this.getTime(this.date[1]) : ''
      })
    },
    updateOption (type, option) {
      if (type === 'status') {
        this.statusOption.name = option.name
        this.statusOption.id = option.id
        this.showStatus = false
      }
      if (type === 'personel') {
        this.personelOption.UserName = option.UserName
        this.personelOption.TrueName = option.TrueName
        this.showPersonel = false
      }
    },
    addPersonnel () {
      this.$emit('showAdd')
    },
    editPatrol (item) {
      this.$emit('showEdit', item)
    },
    deletePatrol (item) {
      this.$emit('showDelete', item)
    },
    getDetail (item) {
      this.$emit('showDetail', item)
    },
    publishPatrol (item) {
      this.$emit('showPublish', item)
    },
    changePage (page) {
      this.$emit('pageSearch', page)
    },
    getAppUsers () {
      var vm = this
      GetAPPUser({}).then(resp => {
        if (resp.data.success) {
          vm.personelOptions = resp.data.rows
          vm.personelOptions.unshift({
            TrueName: '全部',
            UserName: ''
          })
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        }
      })
    },
    hidePandel (e) {
      if (this.$refs.status) {
        if (!this.$refs.status.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showStatus = false
        }
      }
      if (this.$refs.personel) {
        if (!this.$refs.personel.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showPersonel = false
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.announce {
  width: 98%;
  background: #fff;
  position: absolute;
  left: 15px;
  top: 6%;
  height: 92%;
  z-index: 999;
  box-shadow: 0px 0px 3px 1px #adbfd3;
  .header {
    height: 80px;
    .personnel,
    .title,
    .date,
    .status {
      padding-top: 20px;
      width: 265px;
      height: 40px;
      float: left;
      .left {
        width: 90px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        float: left;
      }
      .right {
        width: 170px;
        position: relative;
        float: left;
        border: 1px solid #c2c2c2;
        border-radius: 6px;
        input {
          width: 150px;
          height: 38px;
          border: none;
          padding-left: 20px;
          border-radius: 6px;
        }
        .drop-down {
          float: left;
          .dropdown-toggle {
            text-align: left;
            cursor: pointer;
            font-family: PingFangSC-Semibold;
            list-style-type: none;
            color: #5a5a5a;
            width: 170px;
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
            width: 170px;
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
            li {
              text-align: center;
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
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
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
            }
          }
        }
        .annouce-date {
          width: 280px;
        }
      }
    }
    .search-button {
      float: left;
      width: 100px;
      height: 40px;
      border-radius: 6px;
      background-color: #4886ff;
      color: #fff;
      text-align: center;
      line-height: 40px;
      margin: 20px 0 0 20px;
      cursor: pointer;
    }
    .add-button {
      float: right;
      width: 100px;
      height: 40px;
      border-radius: 6px;
      background-color: #40bb60;
      color: #fff;
      text-align: center;
      line-height: 40px;
      margin: 20px 0 0 20px;
      cursor: pointer;
      margin-right: 20px;
    }
    .date {
      width: 415px;
      .right {
        width: 300px;
        border: none;
      }
    }
  }
  .table {
    font-size: 14px;
    margin: 20px 20px 0 20px;
    .thead {
      height: 40px;
      background-color: #4886ff;
      .index,
      .patrol,
      .announcer,
      .title,
      .date,
      .readers,
      .status,
      .options {
        float: left;
        line-height: 40px;
        color: #fff;
        text-align: center;
      }
      .index {
        width: 5%;
        padding-left: 2%;
      }
      .patrol {
        width: 8%;
        padding-left: 2%;
      }
      .announcer {
        width: 8%;
        padding-left: 2%;
      }
      .title {
        width: 10%;
        padding-left: 2%;
      }
      .date {
        width: 10%;
        padding-left: 5%;
      }
      .readers {
        width: 12%;
        padding-left: 5%;
      }
      .status {
        width: 12%;
        padding-left: 2%;
      }
      .options {
        width: 12%;
        padding-left: 3%;
      }
    }
    .list {
      list-style-type: none;
      li {
        height: 40px;
        .index,
        .patrol,
        .announcer,
        .date,
        .readers,
        .title,
        .status,
        .options {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 40px;
          float: left;
          line-height: 40px;
          color: #606060;
          text-align: center;
        }
        .index {
          width: 5%;
          padding-left: 2%;
        }
        .patrol {
          width: 8%;
          padding-left: 2%;
        }
        .announcer {
          width: 8%;
          padding-left: 2%;
        }
        .date {
          width: 10%;
          padding-left: 5%;
        }
        .readers {
          width: 12%;
          padding-left: 5%;
        }
        .title {
          width: 10%;
          padding-left: 2%;
        }
        .status {
          width: 12%;
          padding-left: 2%;
          .isPublished {
            font-size: 14px;
            height: 28px;
            line-height: 28px;
            color: #40bb60;
          }
          .isRead {
            font-size: 14px;
            height: 28px;
            line-height: 28px;
            color: #4785fe;
          }
          .publish {
            border: 1px solid #4a86fd;
            border-radius: 5px;
            color: #4a86fd;
            font-size: 14px;
            text-align: center;
            display: block;
            width: 80px;
            height: 28px;
            line-height: 28px;
            margin: 0 auto;
            margin-top: 5px;
            cursor: pointer;
          }
        }
        .options {
          width: 12%;
          padding-left: 3%;
          .edit {
            color: #40bb60;
            cursor: pointer;
          }
          .delete {
            color: red;
            cursor: pointer;
          }
          .detail {
            color: #4886ff;
            cursor: pointer;
          }
        }
      }
      .gray {
        background-color: #e9e9e9;
      }
    }
  }
  .paging {
    margin-top: 50px;
    text-align: center;
  }
}
</style>
