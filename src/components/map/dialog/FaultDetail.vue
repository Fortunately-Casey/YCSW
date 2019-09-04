<template>
    <div class="faultDetail">
        <div class="header">
            故 障 详 情
            <i class="el-icon-close" @click="close"></i>
        </div>
        <div class="values">
            <div class="device-id">
                <div class="left">
                    设备编号:
                </div>
                <div class="right">
                    <input type="text" disabled="disabled" :value="faultDetailValue.DeviceId">
                </div>
            </div>
            <div class="name">
                <div class="left">
                    要素名称:
                </div>
                <div class="right">
                    <input type="text" disabled="disabled" :value="faultDetailValue.YSMC">
                </div>
            </div>
            <div class="level">
                <div class="left">
                    故障等级:
                </div>
                <div class="right">
                    <input type="text" disabled="disabled" :value="faultLevel">
                </div>
            </div>
            <div class="true-name">
                <div class="left">
                    巡查人员:
                </div>
                <div class="right">
                    <input type="text" disabled="disabled" :value="faultDetailValue.TrueName">
                </div>
            </div>
            <div class="inspect-time">
                <div class="left">
                    巡查时间:
                </div>
                <div class="right">
                    <input type="text" disabled="disabled" :value="faultDetailValue.InspectTime">
                </div>
            </div>
            <div class="address">
                <div class="left">
                    设备地址:
                </div>
                <div class="right">
                    <input type="text" disabled="disabled" :value="faultDetailValue.Address" :title="faultDetailValue.Address">
                </div>
            </div>
        </div>
        <div class="images">
            <div class="title">图片:</div>
            <img v-for="(item,index) in imgList" :key="index" :src="faultImageUrl+item" alt="" @click="showBigImage(faultImageUrl+item)">
        </div>
        <div class="remark">
            <textarea name="" id="" cols="30" rows="10" disabled="disabled" :value="faultDetailValue.Remark"></textarea>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { GetInspectRecordPics } from '@/api/patrol.js';
import { faultImageUrl } from '@/common/mapServer/config.js';
export default {
  data() {
    return {
        textarea:"",
        imgList:[],
        faultImageUrl:faultImageUrl
    };
  },
  computed:{
      ...mapGetters([
          'faultDetailValue'
      ]),
      faultLevel() {
          if(this.faultDetailValue.Level === 1) {
              return "一般"
          }else if(this.faultDetailValue.Level === 2) {
              return "中等"
          }else if(this.faultDetailValue.Level === 3) {
              return "紧急"
          }
      }
  },
  created() {
      this.getImages();
  },
  methods:{
      ...mapActions({
          closeDetail:'setIsShowFaultDetail',
          setShowBigImage:'setIsShowBigImage',
          setImageUrl:'setBigImageUrl'

      }),
      close() {
          this.closeDetail(false);
      },
      getImages() {
          var vm = this;
          GetInspectRecordPics({
              InspectRecdId:vm.faultDetailValue.InspectRecdId
          }).then((resp) => {
              if(resp.data.success) {
                  console.log(vm.imgList,'1111')
                  vm.imgList = resp.data.rows;
              }
          })
      },
      showBigImage(imgUrl) {
        this.setImageUrl(imgUrl);
        this.setShowBigImage(true);
      }
  }
};
</script>
<style lang="less" scoped>
.faultDetail {
  width: 480px;
  height: 450px;
  .header {
    height: 35px;
    line-height: 35px;
    text-align: left;
    border-radius: 6px 6px 0 0;
    color: #fff;
    font-size: 14px;
    padding-left: 20px;
    background-color: #4A86FD;
    i {
      float: right;
      margin: 10px 10px 0 0;
      cursor: pointer;
    }
  }
  .values {
    width: 100%;
    overflow: hidden;
    font-size: 14px;
    .device-id,
    .name,
    .level,
    .true-name,
    .inspect-time,
    .address {
      width: 50%;
      float: left;
      height: 40px;
      line-height: 40px;
      .left {
        float: left;
        width: 80px;
        height: 40px;
        text-align: center;
      }
      .right {
        float: right;
        width: 160px;
        height: 40px;
        input {
          height: 28px;
          border: none;
          font-size: 12px;
          padding-left: 5px;
        }
      }
    }
    .address {
        width:100%;
        .right {
            float: left;
            input {
                width: 366px;
            }
        }
    }
  }
  .images {
    height: 120px;
    margin-top: 10px;
    .title {
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        padding-left: 10px;
    }
    img {
        width: 137px;
        height: 100px;
        margin-left: 15px;
        cursor: pointer;
    }
  }
  .remark {
    padding: 5px 15px;
    textarea {
      width: 450px;
      height: 105px;
      margin: 5px auto;
      resize: none;
      overflow-y: auto;
    }
  }
}
</style>