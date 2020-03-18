<template>
    <div class="library">
        <div class="top">
            <span class="time" id="txtClock">
              <div class="timer">
                {{time}}
              </div>
            </span>
        </div>
        <m-table @addLibrary="addLibrary" @showDetail="showDetail" @showDelete="showDelete" @showEditer="showEditer" @showDownLoad="showDownLoad" ref="table"></m-table>
        <el-dialog
          :visible.sync="isShowAddLibrary"
          width="50%"
          :show-close="false"
          custom-class="bgc"
        >
            <div class="add-library">
                <div class="header">
                    新 增 图 件 库
                    <i class="el-icon-close" @click="isShowAddLibrary = false"></i>
                </div>
                <div class="content">
                    <div class="project-name">
                        <div class="left">
                            工程名称:
                        </div>
                        <div class="right">
                            <input type="text" v-model="obj.ProjectName">
                        </div>
                    </div>
                    <div class="library-name">
                        <div class="left">
                            图件库名称:
                        </div>
                        <div class="right">
                            <input type="text" v-model="libraryname">
                        </div>
                    </div>
                    <div class="type">
                        <div class="left">图件库类型</div>
                        <div class="right">
                            <div class="drop-down" ref="addType">
                              <div class="dropdown-toggle" @click="showType = !showType">
                              {{obj.TKType}}
                              <span class="cart"></span>
                              </div>
                              <ul class="dropdown-menu" v-show="showType">
                                  <li v-for="(option,index) in typeOptions" :key="index">
                                      <a href="javascript:void(0)" @click="updateOption('type',option)">
                                          {{ option.TKType }}
                                      </a>
                                  </li>
                              </ul>
                          </div>
                        </div>
                    </div>
                    <div class="upload">
                        <div class="left">
                            上传文件
                        </div>
                        <div class="right">
                            <el-upload
                                ref="upload"
                                action="/api/DocumentManage/UpLoadFile"
                                :file-list="fileList"
                                :auto-upload="false"
                                :disabled="false"
                                :on-success="addSuccess"
                                :on-error="uploadError"
                                :data="obj"
                                :on-change="addFileChange"
                                :on-remove="addFileRemove"
                            >
                                <el-button
                                    slot="trigger"
                                    size="small"
                                    type="primary"
                                >
                                    选取文件
                                </el-button>
                            </el-upload>
                        </div>
                    </div>
                    <div class="note">
                        <div class="left">
                            备注
                        </div>
                        <textarea name="" id="" cols="60" rows="5" class="textarea" v-model="note"></textarea>
                    </div>
                </div>
                <div class="footer">
                  <div class="cancel" @click="isShowAddLibrary = false">取 消</div>
                  <div class="save" @click="save">保 存</div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
          :visible.sync="isShowDetail"
          width="50%"
          :show-close="false"
          custom-class="bgc"
        >
            <div class="library-detail">
                <div class="header">
                   图 件 库 详 情
                    <i class="el-icon-close" @click="isShowDetail = false"></i>
                </div>
                <div class="content">
                    <div class="project-name">
                        <div class="left">
                            工程名称:
                        </div>
                        <div class="right">
                            <input type="text" :value="detail.ProjectName" disabled="disabled">
                        </div>
                    </div>
                    <div class="library-name">
                        <div class="left">
                            图件库名称:
                        </div>
                        <div class="right">
                            <input type="text" :value="detail.TKName" disabled="disabled">
                        </div>
                    </div>
                    <div class="type">
                        <div class="left">图件库类型</div>
                        <div class="right">
                            <input type="text" :value="detail.TKType" disabled="disabled">
                        </div>
                    </div>
                    <div class="uploaded-file">
                      <div class="left">
                        已有文件
                      </div>
                      <div class="right">
                          <div class="uploaded-list">
                            <div class="download-top">
                              <div class="index">序 号</div>
                              <div class="name">文&nbsp;&nbsp; 件&nbsp;&nbsp; 名</div>
                            </div>
                            <ul class="download-list">
                              <li v-for="(item,index) in uploadedList" :key="index">
                                <div class="index">{{index + 1}}</div>
                                <div class="name" :title="item.DocumentName">{{item.DocumentName}}</div>
                              </li>
                            </ul>
                          </div>
                      </div>
                    </div>
                    <div class="note">
                        <div class="left">
                            备注
                        </div>
                        <textarea name="" id="" cols="60" rows="5" class="textarea" :value="detail.Remark" disabled="disabled"></textarea>
                    </div>
                </div>
            </div>
        </el-dialog>
        <!-- 资料编辑 -->
        <el-dialog
          :visible.sync="isShowEditerLibrary"
          width="45%"
          :show-close="false"
          custom-class="bgc"
        >
            <el-dialog
              :visible.sync="isShowDeleteFile"
              width="28%"
              custom-class="bgc"
              :append-to-body="true"
            >
              <p :style="{fontSize:'18px',marginBottom:'30px'}">确认删除该文件吗？</p>
              <el-button @click="isShowDeleteFile = false">取&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 消</el-button>
              <el-button type="primary" @click="uploadedDelete">确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;定</el-button>
            </el-dialog>

            <div class="library-editer">
                <div class="header">
                   编 辑 资 料
                   <i class="el-icon-close" @click="isShowEditerLibrary = false"></i>
                </div>
                <div class="content">
                    <div class="project-name">
                        <div class="left">
                            工程名称:
                        </div>
                        <div class="right">
                            <input type="text" :value="editer.ProjectName" disabled="disabled">
                        </div>
                    </div>
                    <div class="library-name">
                        <div class="left">
                            图件库名称:
                        </div>
                        <div class="right">
                            <input type="text" v-model="editer.TKName" >
                        </div>
                    </div>
                    <div class="type">
                        <div class="left">图件库类型</div>
                        <div class="right">
                            <div class="drop-down" ref="editType">
                              <div class="dropdown-toggle" @click="showEdit = !showEdit">
                              {{editerOption.TKType}}
                              <span class="cart"></span>
                              </div>
                              <ul class="dropdown-menu" v-show="showEdit">
                                  <li v-for="(option,index) in typeOptions" :key="index">
                                      <a href="javascript:void(0)" @click="uploadEditer('type',option)">
                                          {{ option.TKType }}
                                      </a>
                                  </li>
                              </ul>
                          </div>
                        </div>
                    </div>
                    <div class="uploaded-file">
                      <div class="left">
                        已有文件
                      </div>
                      <div class="right">
                          <div class="uploaded-list">
                            <div class="download-top">
                              <div class="index">序 号</div>
                              <div class="name">文&nbsp;&nbsp; 件&nbsp;&nbsp; 名</div>
                              <div class="option">操&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;作</div>
                            </div>
                            <ul class="download-list">
                              <li v-for="(item,index) in uploadedList" :key="index">
                                <div class="index">{{index + 1}}</div>
                                <div class="name" :title="item.DocumentName">{{item.DocumentName}}</div>
                                <div class="option" @click="deleteUploadedFile(item)">删 除</div>
                              </li>
                            </ul>
                          </div>
                      </div>
                    </div>
                    <div class="upload">
                        <div class="left">
                            新增文件
                        </div>
                        <div class="right">
                            <el-upload
                                ref="addFile"
                                action="/api/DocumentManage/UpLoadFile"
                                :file-list="uploadFileList"
                                :auto-upload="false"
                                :disabled="false"
                                :data="editObj"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :on-change="editFileChange"
                                :on-remove="editFileRemove"
                            >
                                <el-button
                                    slot="trigger"
                                    size="small"
                                    type="primary"
                                >
                                    选取文件
                                </el-button>
                            </el-upload>
                        </div>
                    </div>
                    <div class="note">
                        <div class="left">
                            备注
                        </div>
                        <textarea name="" id="" cols="60" rows="5" class="textarea" v-model="editer.Remark" ></textarea>
                    </div>
                </div>
                <div class="footer">
                  <div class="cancel" @click="isShowEditerLibrary = false">取 消</div>
                  <div class="save" @click="editerLibrary">保 存</div>
                </div>
            </div>
        </el-dialog>
        <!-- 资料删除 -->
        <el-dialog
          :visible.sync="isShowDeleteLibrary"
          width="35%"
          :show-close="false"
          custom-class="bgc"
        >
            <div class="library-delete">
                <div class="header">
                     删 除 资 料
                    <i class="el-icon-close" @click="isShowDeleteLibrary = false"></i>
                </div>
                <div class="content">
                  <p>确认删除吗？</p>
                </div>
                <div class="footer">
                  <div class="cancel" @click="isShowDeleteLibrary = false">取 消</div>
                  <div class="save" @click="deleteLibrary">删 除</div>
                </div>
            </div>
        </el-dialog>
        <el-dialog
          :visible.sync="isShowDownLoad"
          width="40%"
          :show-close="false"
          custom-class="bgc"
        >
          <div class="download">
            <div class="header">
              资料下载
              <i class="el-icon-close" @click="close"></i>
            </div>
            <div class="content">
              <div class="download-top">
                <div class="index">序 号</div>
                <div class="name">文 件 名</div>
                <div class="option">操 作</div>
              </div>
              <ul class="download-list">
                <li v-for="(item,index) in downloadList" :key="index">
                  <div class="index">{{index + 1}}</div>
                  <div class="name" :title="item.DocumentName">{{item.DocumentName}}</div>
                  <a :href="'/api'+item.DocumentStoreName" download="" class="option" >下载</a>
                </li>
              </ul>
            </div>
            <div class="footer">
              <div class="download-all" @click="downLoadAll">批量下载</div>
              <div class="close" @click="close">关 闭</div>
            </div>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import { getTime } from '@/common/utils/tool.js'
import MTable from './components/Table.vue'
import {
  GetDocunmentTypeInfo,
  InsertDocumentManageInfo,
  GetDocumentManageDetail,
  DeleteDocummentManage,
  EditDocummentManage,
  GetDocumentDetail,
  DownLoadTK,
  DeleteDocumentDetailInfo
} from '@/api/library.js'
import axios from 'axios'
export default {
  data () {
    return {
      time: '',
      timer: '',
      note: '',
      isShowAddLibrary: false,
      isShowDetail: false,
      isShowDeleteLibrary: false,
      isShowEditerLibrary: false,
      isShowDownLoad: false,
      libraryname: '',
      typeOption: {
        TKType: '请选择'
      },
      showType: false,
      typeOptions: [],
      fileList: [],
      formDate: '',
      mainId: 1,
      obj: {
        ProjectName: '',
        TKType: '请选择',
        ID: ''
      },
      editObj: {},
      detail: {},
      deleteItem: {},
      editer: {},
      editerOption: {
        TKType: '请选择'
      },
      showEdit: false,
      isSearch: false,
      downloadList: [],
      downloadObj: {},
      uploadedList: [],
      isShowDeleteFile: false,
      deleteUploadedObj: {},
      uploadFileList: [],
      addFileLength: 0,
      uploadFileLength: 0
    }
  },
  computed: {},
  created () {
    this.initTime()
    this.getDocunmentTypeInfo()
  },
  mounted () {
    this.selectedOption = this.selected
    document.addEventListener('click', this.hidePandel, false)
  },
  methods: {
    initTime () {
      this.time = getTime()
      this.timer = setInterval(() => {
        this.time = getTime()
      }, 1000)
    },
    addLibrary (value) {
      var vm = this
      vm.obj.ProjectName = ''
      vm.libraryname = ''
      vm.obj.TKType = '请选择'
      vm.note = ''
      vm.fileList = []
      vm.addFileLength = 0
      this.isShowAddLibrary = value
    },
    showDetail (value) {
      var vm = this
      this.isShowDetail = value.showDetail
      this.detail = value.item
      GetDocumentDetail({
        ID: value.item.ID
      }).then(resp => {
        if (resp.data.success) {
          vm.uploadedList = resp.data.rows
        }
      })
    },
    updateOption (type, option) {
      if (type === 'type') {
        this.obj.TKType = option.TKType
        this.showType = false
      }
    },
    uploadEditer (type, option) {
      if (type === 'type') {
        this.editerOption.TKType = option.TKType
        this.showEdit = false
      }
    },
    getDocunmentTypeInfo () {
      GetDocunmentTypeInfo({}).then(resp => {
        if (resp.data.success) {
          this.typeOptions = resp.data.rows
        }
      })
    },
    downLoad (item) {},
    downLoadAll () {
      var vm = this
      DownLoadTK({
        ProjectName: vm.downloadObj.ProjectName,
        TKType: vm.downloadObj.TKType,
        TKName: vm.downloadObj.TKName
      }).then(resp => {
        if (resp.data.success) {
          var download = document.createElement('iframe')
          download.src = 'http://10.11.222.52:14451/' + resp.data.rows
          download.style.display = 'none'
          document.body.appendChild(download)
        } else {
          vm.$message({
            message: '下载失败！',
            type: 'warning'
          })
        }
      })
    },
    addFileChange (file) {
      this.addFileLength++
    },
    addFileRemove (file) {
      this.addFileLength--
    },
    addSuccess (resp) {
      var vm = this
      if (resp.success) {
        vm.$refs.table.getDocumentManageInfo()
        vm.isShowAddLibrary = false
      }
      vm.$message({
        message: '新增图件库成功!',
        type: 'success'
      })
    },
    uploadSuccess (resp) {
      var vm = this
      if (resp.success) {
        if (vm.isSearch) {
          vm.$refs.table.search()
        } else {
          vm.$refs.table.getDocumentManageInfo()
        }
        vm.isShowEditerLibrary = false
        vm.$message({
          message: '更新图件库成功!',
          type: 'success'
        })
      } else {
        vm.$message({
          message: '新增文件失败!',
          type: 'warning'
        })
      }
    },
    uploadError () {
      var vm = this
      vm.$message({
        message: '上传失败!',
        type: 'warning'
      })
    },
    close () {
      this.isShowDownLoad = false
    },
    showEditer (value) {
      var vm = this
      vm.uploadFileList = []
      vm.uploadFileLength = 0
      this.isShowEditerLibrary = value.showEditer
      this.editer = value.item
      this.editerOption.TKType = value.item.TKType
      this.isSearch = value.isSearch
      GetDocumentDetail({
        ID: vm.editer.ID
      }).then(resp => {
        if (resp.data.success) {
          vm.uploadedList = resp.data.rows
        }
      })
    },
    showDelete (value) {
      this.isShowDeleteLibrary = value.showDelete
      this.deleteItem = value.item
      this.isSearch = value.isSearch
    },
    deleteUploadedFile (item) {
      var vm = this
      vm.isShowDeleteFile = true
      vm.deleteUploadedObj = item
    },
    uploadedDelete () {
      var vm = this
      DeleteDocumentDetailInfo({
        ID: vm.deleteUploadedObj.ID
      }).then(resp => {
        if (resp.data.success) {
          GetDocumentDetail({
            ID: vm.editer.ID
          }).then(resp => {
            if (resp.data.success) {
              vm.$message({
                message: '删除成功！',
                type: 'success'
              })
              vm.uploadedList = resp.data.rows
              vm.isShowDeleteFile = false
            }
          })
        } else {
          vm.$message({
            message: '删除失败!',
            type: 'warning'
          })
        }
      })
    },
    showDownLoad (item) {
      var vm = this
      vm.downloadObj = item
      vm.isShowDownLoad = true
      GetDocumentDetail({
        ID: item.ID
      }).then(resp => {
        if (resp.data.success) {
          vm.downloadList = resp.data.rows
        }
      })
    },
    save () {
      var vm = this
      if (vm.obj.ProjectName === '') {
        vm.$message({
          message: '工程名称不能为空',
          type: 'warning'
        })
        return
      }
      if (vm.libraryname === '') {
        vm.$message({
          message: '图件库名称不能为空',
          type: 'warning'
        })
        return
      }
      if (vm.obj.TKType === '请选择') {
        vm.$message({
          message: '图件库类型不能为空',
          type: 'warning'
        })
        return
      }
      if (vm.addFileLength === 0) {
        vm.$message({
          message: '上传文件不能为空',
          type: 'warning'
        })
        return
      }
      InsertDocumentManageInfo({
        ProjectName: vm.obj.ProjectName,
        TKName: vm.libraryname,
        TKType: vm.obj.TKType,
        Remark: vm.note
      }).then(resp => {
        if (resp.data.success) {
          vm.obj.ID = resp.data.total
          vm.obj.MainId = resp.data.total
          vm.obj.TKName = vm.libraryname
          vm.$refs.upload.submit()
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        }
      })
    },
    hidePandel (e) {
      if (this.$refs.addType) {
        if (!this.$refs.addType.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showType = false
        }
      }
      if (this.$refs.editType) {
        if (!this.$refs.editType.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showEdit = false
        }
      }
    },
    editFileChange (file) {
      this.uploadFileLength++
    },
    editFileRemove () {
      this.uploadFileLength--
    },
    editerLibrary () {
      var vm = this
      vm.editObj.ProjectName = vm.editer.ProjectName
      vm.editObj.TKType = vm.editer.TKType
      vm.editObj.MainId = vm.editer.ID
      vm.editObj.TKName = vm.editer.TKName
      EditDocummentManage({
        ID: vm.editer.ID,
        ProjectName: vm.editer.ProjectName,
        TKName: vm.editer.TKName,
        TKType: vm.editerOption.TKType,
        Remark: vm.editer.Remark
      }).then(resp => {
        if (resp.data.success) {
          if (vm.uploadFileLength === 0) {
            vm.isShowEditerLibrary = false
            vm.$message({
              message: '更新图件库成功!',
              type: 'success'
            })
            vm.$refs.table.getDocumentManageInfo()
          } else {
            vm.$refs.addFile.submit()
          }
        } else {
          vm.$message({
            message: resp.data.message,
            type: 'warning'
          })
        }
      })
    },
    deleteLibrary () {
      var vm = this
      DeleteDocummentManage({
        ID: vm.deleteItem.ID,
        DetailID: vm.deleteItem.DetailID,
        DocumentStoreName: vm.deleteItem.DocumentStoreName
      }).then(resp => {
        if (resp.data.success) {
          vm.$message({
            message: resp.data.rows,
            type: 'success'
          })
          vm.isShowDeleteLibrary = false
          if (vm.isSearch) {
            vm.$refs.table.search()
          } else {
            vm.$refs.table.getDocumentManageInfo()
          }
        } else {
          vm.$message({
            message: resp.data.rows,
            type: 'warning'
          })
        }
      })
    }
  },
  components: {
    MTable
  }
}
</script>
<style lang="less" scoped>
.library {
  width: 100%;
  height: 5%;
  background-color: #fff;
  /deep/.bgc {
    background-color: rgba(0, 0, 0, 0);
    -webkit-box-shadow: none;
  }
  .top {
    padding-left: 30px;
    height: 100%;
    background-color: #4886ff;
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
  .file-delete {
    background-color: red;
  }
  .add-library,
  .library-detail,
  .library-editer,
  .download {
    width: 825px;
    height: 550px;
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
      overflow: hidden;
      .project-name,
      .library-name,
      .type,
      .uploaded-file {
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
        .textarea {
          position: absolute;
          left: 125px;
          top: 30px;
          width: 660px;
          height: 120px;
          resize: none;
        }
        .right {
          width: 270px;
          position: relative;
          float: right;
          border: 1px solid #c2c2c2;
          margin-left: 10px;
          input {
            width: 250px;
            height: 40px;
            border: none;
            padding-left: 20px;
          }
          .uploaded-list {
            .download-top {
              height: 25px;
              border: 1px solid #c1c1c1;
              border-left: none;
              .index,
              .name,
              .option {
                width: 33.33%;
                float: left;
                height: 25px;
                line-height: 25px;
                text-align: center;
                box-sizing: border-box;
              }
            }
            .download-list {
              border: 1px solid #c1c1c1;
              border-left: none;
              list-style: none;
              max-height: 75px;
              overflow-y: auto;
              li {
                height: 25px;
                border-bottom: 1px solid #c1c1c1;
                .index,
                .name,
                .option {
                  width: 33.33%;
                  float: left;
                  height: 25px;
                  line-height: 25px;
                  text-align: center;
                  box-sizing: border-box;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .option {
                  cursor: pointer;
                  color: #4a86fd;
                }
              }
            }
          }
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
              .cart {
                width: 0;
                position: relative;
                top: 18px;
                right: 30px;
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
              //   height: 300px;
              overflow-y: scroll;
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
        }
      }
      .uploaded-file {
        width: 100%;
        height: 100px;
        .right {
          float: left;
          width: 600px;
        }
      }
      .upload {
        height: 130px;
        margin-top: 140px;
        .left {
          width: 115px;
          height: 150px;
          line-height: 40px;
          text-align: center;
          float: left;
          margin-top: 10px;
        }
        .right {
          margin-top: 10px;
          width: 200px;
          height: 130px;
          overflow-y: auto;
          float: left;
        }
      }
      .note {
        height: 140px;
        position: relative;
        float: left;
        width: 100%;
        .left {
          width: 115px;
          height: 150px;
          line-height: 40px;
          text-align: center;
          float: left;
        }
        textarea {
          position: absolute;
          left: 125px;
          top: 10px;
          width: 640px;
          height: 100px;
          resize: none;
          padding: 10px;
        }
      }
    }
    .footer {
      height: 40px;
      position: relative;
      margin-left: 80px;
      .cancel,
      .save {
        width: 120px;
        height: 40px;
        border-radius: 5px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        position: absolute;
        top: 0;
      }
      .cancel {
        left: 180px;
        border: 1px solid #bfbfbf;
      }
      .save {
        background-color: #4886ff;
        color: #fff;
        left: 380px;
      }
    }
  }
  .download {
    width: 650px;
    height: 400px;
    position: relative;
    .content {
      margin-top: 20px;
      .download-top {
        height: 25px;
        border: 1px solid #c1c1c1;
        border-left: none;
        .index,
        .name,
        .option {
          width: 33.33%;
          float: left;
          height: 25px;
          line-height: 25px;
          text-align: center;
          box-sizing: border-box;
        }
      }
      .download-list {
        border: 1px solid #c1c1c1;
        border-left: none;
        list-style: none;
        max-height: 175px;
        overflow-y: auto;
        li {
          height: 25px;
          border-bottom: 1px solid #c1c1c1;
          .index,
          .name,
          .option {
            width: 33.33%;
            float: left;
            height: 25px;
            line-height: 25px;
            text-align: center;
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .option {
            cursor: pointer;
            color: #4a86fd;
          }
        }
      }
    }
    .footer {
      position: absolute;
      left: 0;
      bottom: 10px;
      .download-all,
      .close {
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 6px;
        background-color: #4886ff;
        color: #fff;
        float: left;
        margin-left: 90px;
        cursor: pointer;
      }
      .close {
        background-color: #fff;
        color: #2b2626;
        border: 1px solid #c1c1c1;
      }
    }
  }
  .library-detail {
    height: 450px;
  }
  .library-editer {
    height: 630px;
  }
  .library-delete {
    width: 480px;
    height: 200px;
    background-color: #fff;
    border-radius: 6px;
    .header {
      height: 40px;
      background-color: #e42a2b;
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
      height: 100px;
      p {
        line-height: 100px;
        padding-left: 50px;
      }
    }
    .footer {
      height: 40px;
      position: relative;
      transform: translateX(-90px);
      .cancel,
      .save {
        width: 120px;
        height: 40px;
        border-radius: 5px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        position: absolute;
        top: 0;
      }
      .cancel {
        left: 180px;
        border: 1px solid #bfbfbf;
      }
      .save {
        background-color: #e42a2b;
        color: #fff;
        left: 380px;
      }
    }
  }
}
</style>
