<template>
    <div class="fault">
        <div class="header">
            故 障 等 级 图 例
        </div>
        <div class="content">
            <div class="level3">
                <span class="circle"></span> &nbsp; 紧急
            </div>
            <div class="level2">
                <span class="circle"></span> &nbsp; 中等
            </div>
            <div class="level1">
                <span class="circle"></span> &nbsp; 一般
            </div>
        </div>
    </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.fault {
  width: 150px;
  height: 150px;
  .header {
    height: 25px;
    background-color: #4a86fd;
    line-height: 25px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    border-radius: 5px 5px 0 0;
  }
  .content {
    padding-left: 30px;
    .level1,
    .level2,
    .level3 {
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      .circle {
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 50%;
      }
    }
    .level1 {
      .circle {
        background-color: #555555;
      }
    }
    .level2 {
      .circle {
        background-color: #ff7800;
      }
    }
    .level3 {
      .circle {
        background-color: #ff2222;
      }
    }
  }
}
</style>