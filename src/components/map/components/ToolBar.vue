<template>
  <div class="toolBars">
    <ul class="clearfix">
      <li class="layer" @click="showCheckLayer" ref="layer" title="图层管理"></li>
      <li class="mark" @click="showCheckMark" ref="mark" title="标记管理"></li>
      <li class="coordinate" @click="showCoordinate" title="空间定位"></li>
      <li class="measure" @click="toolFunction('measurelength')" title="长度测量"></li>
      <li class="area" @click="toolFunction('measurearea')" title="面积测量"></li>
      <li class="full" @click="toolFunction('fullextent')" title="全图"></li>
      <li class="clearAll" @click="clearAll" title="清除"></li>
    </ul>
    <el-collapse-transition>
      <div class="layerTree tree" v-show="showCheckLayers">
        <el-tree
          :data="layerTree"
          show-checkbox
          node-key="id"
          ref="tree1"
          highlight-current
          :props="defaultProps"
          @check-change="handleCheck"
          :default-checked-keys="defaultChecked"
        >
          <span class="custom-tree-node" slot-scope="{ node }">
            <i :class="returnIcon(node.label)"></i>
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div class="markTree tree" v-show="showCheckMarks">
        <el-tree
          :data="markTree"
          show-checkbox
          node-key="id"
          ref="tree2"
          highlight-current
          :props="defaultProps"
          @check-change="handleTagCheck"
        >
          <span class="custom-tree-node" slot-scope="{ node }">
            <i :class="returnIcon(node.label)"></i>
            <span>{{ node.label }}</span>
          </span>
        </el-tree>
      </div>
    </el-collapse-transition>
    <el-collapse-transition>
      <div class="coordinateBox" v-show="showCoordinates">
        <div class="abscissa">
          <span>X(m) :</span>
          <input type="text" v-model="x" />
          <p>( 13266000 - 13407500 )</p>
        </div>
        <div class="ordinate">
          <span>Y(m) :</span>
          <input type="text" v-model="y" />
          <p>( 3899000 - 4004900 )</p>
        </div>
        <div class="button" @click="customLocate">确定</div>
      </div>
    </el-collapse-transition>
  </div>
</template>
<script>
import esriLoader from 'esri-loader'
import { mapActions } from 'vuex'
import { server } from '@/common/mapServer/config.js'
import { EventBus } from '@/common/eventBus/eventBus.js'
export default {
  data () {
    return {
      showCheckLayers: false,
      showCheckMarks: false,
      showCoordinates: false,
      defaultChecked: [1, 62],
      layerTree: [
        {
          id: 1,
          label: '输水管线',
          children: [
            {
              id: 11,
              label: '给水管线',
              icon: 'line'
            }
          ]
        },
        {
          id: 2,
          label: '管网设备',
          children: [
            {
              id: 21,
              label: '测流表',
              icon: 'facility1'
            },
            {
              id: 22,
              label: '测压表',
              icon: 'facility2'
            }
          ]
        },
        {
          id: 3,
          label: '厂站',
          children: [
            {
              id: 31,
              label: '泵站',
              icon: 'station1'
            },
            {
              id: 32,
              label: '受水厂',
              icon: 'station2'
            },
            {
              id: 33,
              label: '补压塔',
              icon: 'station3'
            }
          ]
        },
        {
          id: 4,
          label: '管网阀门',
          children: [
            {
              id: 41,
              label: '排气阀',
              icon: 'tap1'
            },
            {
              id: 42,
              label: '蝶阀',
              icon: 'tap2'
            },
            {
              id: 43,
              label: '闸阀井',
              icon: 'tap3'
            },
            {
              id: 44,
              label: '阀门井',
              icon: 'tap4'
            },
            {
              id: 45,
              label: '法兰井',
              icon: 'tap5'
            },
            {
              id: 46,
              label: '排水阀',
              icon: 'tap6'
            }
          ]
        },
        {
          id: 5,
          label: '管网节点',
          children: [
            {
              id: 51,
              label: '出水口',
              icon: 'node1'
            },
            // {
            //   id: 52,
            //   label: "探测点",
            //   icon: "node2"
            // },
            {
              id: 53,
              label: '进水口',
              icon: 'node3'
            },
            {
              id: 54,
              label: '防止倒流器',
              icon: 'node4'
            }
          ]
        },
        {
          id: 6,
          label: '基础数据',
          children: [
            {
              id: 61,
              label: '地形图',
              icon: 'data1'
            },
            {
              id: 62,
              label: '县界',
              icon: 'data2'
            }
          ]
        }
      ],
      markTree: [
        {
          id: 1,
          label: '输水管线',
          children: [
            {
              id: 11,
              label: '给水管线',
              icon: 'line'
            }
          ]
        },
        {
          id: 2,
          label: '管网设备',
          children: [
            {
              id: 21,
              label: '测流表',
              icon: 'facility1'
            },
            {
              id: 22,
              label: '测压表',
              icon: 'facility2'
            }
          ]
        },
        {
          id: 3,
          label: '厂站',
          children: [
            {
              id: 31,
              label: '泵站',
              icon: 'station1'
            },
            {
              id: 32,
              label: '受水厂',
              icon: 'station2'
            },
            {
              id: 33,
              label: '补压塔',
              icon: 'station3'
            }
          ]
        },
        {
          id: 4,
          label: '管网阀门',
          children: [
            {
              id: 41,
              label: '排气阀',
              icon: 'tap1'
            },
            {
              id: 42,
              label: '蝶阀',
              icon: 'tap2'
            },
            {
              id: 43,
              label: '闸阀井',
              icon: 'tap3'
            },
            {
              id: 44,
              label: '阀门井',
              icon: 'tap4'
            },
            {
              id: 45,
              label: '法兰井',
              icon: 'tap5'
            },
            {
              id: 46,
              label: '排水阀',
              icon: 'tap6'
            }
          ]
        },
        {
          id: 5,
          label: '管网节点',
          children: [
            {
              id: 51,
              label: '出水口',
              icon: 'node1'
            },
            // {
            //   id: 52,
            //   label: "探测点",
            //   icon: "node2"
            // },
            {
              id: 53,
              label: '进水口',
              icon: 'node3'
            },
            {
              id: 54,
              label: '防止倒流器',
              icon: 'node4'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      x: '',
      y: ''
    }
  },
  props: ['baseMap'],
  mounted () {
    document.addEventListener('click', this.hidePandel, false)
    var vm = this
    EventBus.$on('changeChecked', data => {
      vm.changeChecked(data)
    })
  },
  methods: {
    ...mapActions({
      closeDetail: 'setIsShowDetail',
      setMeasure: 'setIsMeasure'
    }),
    returnIcon (value) {
      if (value === '给水管线') {
        return 'line'
      } else if (value === '测流表') {
        return 'facility1'
      } else if (value === '测压表') {
        return 'facility2'
      } else if (value === '泵站') {
        return 'station1'
      } else if (value === '受水厂') {
        return 'station2'
      } else if (value === '补压塔') {
        return 'station3'
      } else if (value === '排气阀') {
        return 'tap1'
      } else if (value === '蝶阀') {
        return 'tap2'
      } else if (value === '闸阀井') {
        return 'tap3'
      } else if (value === '阀门井') {
        return 'tap4'
      } else if (value === '法兰井') {
        return 'tap5'
      } else if (value === '排水阀') {
        return 'tap6'
      } else if (value === '出水口') {
        return 'node1'
      } else if (value === '进水口') {
        return 'node3'
      } else if (value === '防止倒流器') {
        return 'node4'
      }
    },
    handleCheck (data, checked, indeterminate) {
      var vm = this
      if (checked) {
        if (data.id === 1) {
          this.baseMap.showLayer('ssg')
        } else if (data.id === 2) {
          this.baseMap.addDynamicMapServiceLayer(
            'CLD',
            server.CLBUrl,
            true,
            1,
            11
          ) // 测流点
          this.baseMap.addDynamicMapServiceLayer(
            'CYD',
            server.CYBUrl,
            true,
            1,
            12
          ) // 测压点
        } else if (data.id === 21) {
          this.baseMap.addDynamicMapServiceLayer(
            'CLD',
            server.CLBUrl,
            true,
            1,
            11
          ) // 测流点
        } else if (data.id === 22) {
          this.baseMap.addDynamicMapServiceLayer(
            'CYD',
            server.CYBUrl,
            true,
            1,
            12
          ) // 测压点
        } else if (data.id === 3) {
          this.baseMap.addDynamicMapServiceLayer(
            'BZ',
            server.BZUrl,
            true,
            1,
            13
          ) // 泵站
          this.baseMap.addDynamicMapServiceLayer(
            'SHC',
            server.SSCUrl,
            true,
            1,
            14
          ) // 受水厂
          this.baseMap.addDynamicMapServiceLayer(
            'BYT',
            server.BYTUrl,
            true,
            1,
            15
          ) // 补压塔
        } else if (data.id === 31) {
          this.baseMap.addDynamicMapServiceLayer(
            'BZ',
            server.BZUrl,
            true,
            1,
            13
          ) // 泵站
        } else if (data.id === 32) {
          this.baseMap.addDynamicMapServiceLayer(
            'SHC',
            server.SSCUrl,
            true,
            1,
            14
          ) // 受水厂
        } else if (data.id === 33) {
          this.baseMap.addDynamicMapServiceLayer(
            'BYT',
            server.BYTUrl,
            true,
            1,
            15
          ) // 补压塔
        } else if (data.id === 4) {
          this.baseMap.addDynamicMapServiceLayer(
            'PQF',
            server.PQFUrl,
            true,
            1,
            16
          ) // 排气阀
          this.baseMap.addDynamicMapServiceLayer(
            'DF',
            server.DFUrl,
            true,
            1,
            17
          ) // 蝶阀
          this.baseMap.addDynamicMapServiceLayer(
            'ZFJ',
            server.ZFJUrl,
            true,
            1,
            18
          ) // 闸阀井
          this.baseMap.addDynamicMapServiceLayer(
            'ZMJ',
            server.FMJUrl,
            true,
            1,
            19
          ) // 阀门井
          this.baseMap.addDynamicMapServiceLayer(
            'FLJ',
            server.GLJUrl,
            true,
            1,
            20
          ) // 法兰井
          this.baseMap.addDynamicMapServiceLayer(
            'PSF',
            server.PSFUrl,
            true,
            1,
            21
          ) // 排水阀
        } else if (data.id === 41) {
          this.baseMap.addDynamicMapServiceLayer(
            'PQF',
            server.PQFUrl,
            true,
            1,
            16
          ) // 排气阀
        } else if (data.id === 42) {
          this.baseMap.addDynamicMapServiceLayer(
            'DF',
            server.DFUrl,
            true,
            1,
            17
          ) // 蝶阀
        } else if (data.id === 43) {
          this.baseMap.addDynamicMapServiceLayer(
            'ZFJ',
            server.ZFJUrl,
            true,
            1,
            18
          ) // 闸阀井
        } else if (data.id === 44) {
          this.baseMap.addDynamicMapServiceLayer(
            'ZMJ',
            server.FMJUrl,
            true,
            1,
            19
          ) // 阀门井
        } else if (data.id === 45) {
          this.baseMap.addDynamicMapServiceLayer(
            'FLJ',
            server.GLJUrl,
            true,
            1,
            20
          ) // 排水阀
        } else if (data.id === 46) {
          this.baseMap.addDynamicMapServiceLayer(
            'PSF',
            server.PSFUrl,
            true,
            1,
            21
          ) // 法兰井
        } else if (data.id === 5) {
          this.baseMap.addDynamicMapServiceLayer(
            'CSK',
            server.CSKUrl,
            true,
            1,
            22
          ) // 出水口
          // this.baseMap.addDynamicMapServiceLayer(
          //   "TCD",
          //   server.TCDUrl,
          //   true,
          //   1,
          //   23
          // ); //探测点
          this.baseMap.addDynamicMapServiceLayer(
            'JSK',
            server.JSKUrl,
            true,
            1,
            24
          ) // 进水口
          this.baseMap.addDynamicMapServiceLayer(
            'FZDLQ',
            server.FZDLQUrl,
            true,
            1,
            25
          ) // 防止倒流器
        } else if (data.id === 51) {
          this.baseMap.addDynamicMapServiceLayer(
            'CSK',
            server.CSKUrl,
            true,
            1,
            22
          ) // 出水口
        } else if (data.id === 52) {
          this.baseMap.addDynamicMapServiceLayer(
            'TCD',
            server.TCDUrl,
            true,
            1,
            23
          ) // 探测点
        } else if (data.id === 53) {
          this.baseMap.addDynamicMapServiceLayer(
            'JSK',
            server.JSKUrl,
            true,
            1,
            24
          ) // 进水口
        } else if (data.id === 54) {
          this.baseMap.addDynamicMapServiceLayer(
            'FZDLQ',
            server.FZDLQUrl,
            true,
            1,
            25
          ) // 防止倒流器
        } else if (data.id === 6) {
          this.baseMap.showLayer('dxt')
          this.baseMap.showLayer('xzqh')
        } else if (data.id === 61) {
          this.baseMap.showLayer('dxt')
        } else if (data.id === 62) {
          this.baseMap.showLayer('xzqh')
        }
      } else {
        if (data.id === 1) {
          this.baseMap.hideLayer('ssg')
        } else if (data.id === 2 && indeterminate === false) {
          this.baseMap.removeLayer('CLD') // 测流点
          this.baseMap.removeLayer('CYD') // 测压点
        } else if (data.id === 21) {
          this.baseMap.removeLayer('CLD') // 测流点
        } else if (data.id === 22) {
          this.baseMap.removeLayer('CYD') // 测压点
        } else if (data.id === 3 && indeterminate === false) {
          this.baseMap.removeLayer('BZ') // 泵站
          this.baseMap.removeLayer('SHC') // 受水厂
          this.baseMap.removeLayer('BYT') // 补压塔
        } else if (data.id === 31) {
          this.baseMap.removeLayer('BZ') // 泵站
        } else if (data.id === 32) {
          this.baseMap.removeLayer('SHC') // 受水厂
        } else if (data.id === 33) {
          this.baseMap.removeLayer('BYT') // 补压塔
        } else if (data.id === 4 && indeterminate === false) {
          this.baseMap.removeLayer('PQF') // 排气阀
          this.baseMap.removeLayer('DF') // 蝶阀
          this.baseMap.removeLayer('ZFJ') // 闸阀井
          this.baseMap.removeLayer('ZMJ') // 闸门井
          this.baseMap.removeLayer('FLJ') // 法兰井
          this.baseMap.removeLayer('PSF') // 排水阀
        } else if (data.id === 41) {
          this.baseMap.removeLayer('PQF') // 排气阀
        } else if (data.id === 42) {
          this.baseMap.removeLayer('DF') // 蝶阀
        } else if (data.id === 43) {
          this.baseMap.removeLayer('ZFJ') // 闸阀井
        } else if (data.id === 44) {
          this.baseMap.removeLayer('ZMJ') // 闸门井
        } else if (data.id === 45) {
          this.baseMap.removeLayer('FLJ') // 排水阀
        } else if (data.id === 46) {
          this.baseMap.removeLayer('PSF') // 法兰井
        } else if (data.id === 5 && indeterminate === false) {
          this.baseMap.removeLayer('CSK') // 出水口
          // this.baseMap.removeLayer("TCD"); //探测点
          this.baseMap.removeLayer('JSK') // 进水口
          this.baseMap.removeLayer('FZDLQ') // 防止倒流器
        } else if (data.id === 51) {
          this.baseMap.removeLayer('CSK') // 出水口
        } else if (data.id === 52) {
          // this.baseMap.removeLayer("TCD"); //探测点
        } else if (data.id === 53) {
          this.baseMap.removeLayer('JSK') // 进水口
        } else if (data.id === 54) {
          this.baseMap.removeLayer('FZDLQ') // 防止倒流器
        } else if (data.id === 6 && indeterminate === false) {
          this.baseMap.hideLayer('dxt')
          this.baseMap.hideLayer('xzqh')
        } else if (data.id === 61) {
          this.baseMap.hideLayer('dxt')
        } else if (data.id === 62) {
          this.baseMap.hideLayer('xzqh')
        }
      }
    },
    // 标注图层
    handleTagCheck (data, checked, indeterminate) {
      if (checked) {
        if (data.id === 1) {
          this.baseMap.addDynamicMapServiceLayer('ssgTag', server.JSGTagUrl)
        } else if (data.id === 2) {
          this.baseMap.addDynamicMapServiceLayer(
            'CLDTag',
            server.CLBTagUrl,
            true,
            1,
            31
          ) // 测流点
          this.baseMap.addDynamicMapServiceLayer(
            'CYDTag',
            server.CYBTagUrl,
            true,
            1,
            32
          ) // 测压点
        } else if (data.id === 21) {
          this.baseMap.addDynamicMapServiceLayer(
            'CLDTag',
            server.CLBTagUrl,
            true,
            1,
            31
          ) // 测流点
        } else if (data.id === 22) {
          this.baseMap.addDynamicMapServiceLayer(
            'CYDTag',
            server.CYBTagUrl,
            true,
            1,
            32
          ) // 测流点
        } else if (data.id === 3) {
          this.baseMap.addDynamicMapServiceLayer(
            'BZTag',
            server.BZTagUrl,
            true,
            1,
            33
          ) // 泵站
          this.baseMap.addDynamicMapServiceLayer(
            'SHCTag',
            server.SSCTagUrl,
            true,
            1,
            34
          ) // 受水厂
          this.baseMap.addDynamicMapServiceLayer(
            'BYTTag',
            server.BYTTagUrl,
            true,
            1,
            35
          ) // 补压塔
        } else if (data.id === 31) {
          this.baseMap.addDynamicMapServiceLayer(
            'BZTag',
            server.BZTagUrl,
            true,
            1,
            33
          ) // 泵站
        } else if (data.id === 32) {
          this.baseMap.addDynamicMapServiceLayer(
            'SHCTag',
            server.SSCTagUrl,
            true,
            1,
            34
          ) // 受水厂
        } else if (data.id === 33) {
          this.baseMap.addDynamicMapServiceLayer(
            'BYTTag',
            server.BYTTagUrl,
            true,
            1,
            35
          ) // 补压塔
        } else if (data.id === 4) {
          this.baseMap.addDynamicMapServiceLayer(
            'PQFTag',
            server.PQFTagUrl,
            true,
            1,
            36
          ) // 排气阀
          this.baseMap.addDynamicMapServiceLayer(
            'DFTag',
            server.DFTagUrl,
            true,
            1,
            37
          ) // 蝶阀
          this.baseMap.addDynamicMapServiceLayer(
            'ZFJTag',
            server.ZFJTagUrl,
            true,
            1,
            38
          ) // 闸阀井
          this.baseMap.addDynamicMapServiceLayer(
            'ZMJTag',
            server.FMJTagUrl,
            true,
            1,
            39
          ) // 闸门井
          this.baseMap.addDynamicMapServiceLayer(
            'FLJTag',
            server.GLJTagUrl,
            true,
            1,
            40
          ) // 法兰井
          this.baseMap.addDynamicMapServiceLayer(
            'PSFTag',
            server.PSFTagUrl,
            true,
            1,
            41
          ) // 排水阀
        } else if (data.id === 41) {
          this.baseMap.addDynamicMapServiceLayer(
            'PQFTag',
            server.PQFTagUrl,
            true,
            1,
            36
          ) // 排气阀
        } else if (data.id === 42) {
          this.baseMap.addDynamicMapServiceLayer(
            'DFTag',
            server.DFTagUrl,
            true,
            1,
            37
          ) // 蝶阀
        } else if (data.id === 43) {
          this.baseMap.addDynamicMapServiceLayer(
            'ZFJTag',
            server.ZFJTagUrl,
            true,
            1,
            38
          ) // 闸阀井
        } else if (data.id === 44) {
          this.baseMap.addDynamicMapServiceLayer(
            'ZMJTag',
            server.FMJTagUrl,
            true,
            1,
            39
          ) // 闸门井
        } else if (data.id === 45) {
          this.baseMap.addDynamicMapServiceLayer(
            'FLJTag',
            server.GLJTagUrl,
            true,
            1,
            40
          ) // 法兰井
        } else if (data.id === 46) {
          this.baseMap.addDynamicMapServiceLayer(
            'PSFTag',
            server.PSFTagUrl,
            true,
            1,
            41
          ) // 法兰井
        } else if (data.id === 5) {
          this.baseMap.addDynamicMapServiceLayer(
            'CSKTag',
            server.CSKTagUrl,
            true,
            1,
            42
          ) // 出水口
          // this.baseMap.addDynamicMapServiceLayer(
          //   "TCDTag",
          //   server.TCDTagUrl,
          //   true,
          //   1,
          //   43
          // ); //探测点
          this.baseMap.addDynamicMapServiceLayer(
            'JSKTag',
            server.JSKTagUrl,
            true,
            1,
            44
          ) // 进水口
          this.baseMap.addDynamicMapServiceLayer(
            'FZDLQTag',
            server.FZDLQTagUrl,
            true,
            1,
            45
          ) // 防止倒流器
        } else if (data.id === 51) {
          this.baseMap.addDynamicMapServiceLayer(
            'CSKTag',
            server.CSKTagUrl,
            true,
            1,
            42
          ) // 出水口
        } else if (data.id === 52) {
          this.baseMap.addDynamicMapServiceLayer(
            'TCDTag',
            server.TCDTagUrl,
            true,
            1,
            43
          ) // 探测点
        } else if (data.id === 53) {
          this.baseMap.addDynamicMapServiceLayer(
            'JSKTag',
            server.JSKTagUrl,
            true,
            1,
            44
          ) // 进水口
        } else if (data.id === 54) {
          this.baseMap.addDynamicMapServiceLayer(
            'FZDLQTag',
            server.FZDLQTagUrl,
            true,
            1,
            45
          ) // 防止倒流器
        }
      } else {
        if (data.id === 1) {
          this.baseMap.removeLayer('ssgTag')
        } else if (data.id === 2 && indeterminate === false) {
          this.baseMap.removeLayer('CLDTag') // 测流点
          this.baseMap.removeLayer('CYDTag') // 测压点
        } else if (data.id === 21) {
          this.baseMap.removeLayer('CLDTag') // 测流点
        } else if (data.id === 22) {
          this.baseMap.removeLayer('CYDTag') // 测压点
        } else if (data.id === 3 && indeterminate === false) {
          this.baseMap.removeLayer('BZTag') // 泵站
          this.baseMap.removeLayer('SHCTag') // 受水厂
          this.baseMap.removeLayer('BYTTag') // 补压塔
        } else if (data.id === 31) {
          this.baseMap.removeLayer('BZTag') // 泵站
        } else if (data.id === 32) {
          this.baseMap.removeLayer('SHCTag') // 受水厂
        } else if (data.id === 33) {
          this.baseMap.removeLayer('BYTTag') // 补压塔
        } else if (data.id === 4 && indeterminate === false) {
          this.baseMap.removeLayer('PQFTag') // 排气阀
          this.baseMap.removeLayer('DFTag') // 蝶阀
          this.baseMap.removeLayer('ZFJTag') // 闸阀井
          this.baseMap.removeLayer('ZMJTag') // 闸门井
          this.baseMap.removeLayer('FLJTag') // 法兰井
          this.baseMap.removeLayer('PSFTag') // 排水阀
        } else if (data.id === 41) {
          this.baseMap.removeLayer('PQFTag') // 排气阀
        } else if (data.id === 42) {
          this.baseMap.removeLayer('DFTag') // 蝶阀
        } else if (data.id === 43) {
          this.baseMap.removeLayer('ZFJTag') // 闸阀井
        } else if (data.id === 44) {
          this.baseMap.removeLayer('ZMJTag') // 闸门井
        } else if (data.id === 45) {
          this.baseMap.removeLayer('FLJTag') // 法兰井
        } else if (data.id === 46) {
          this.baseMap.removeLayer('PSFTag') // 排水阀
        } else if (data.id === 5 && indeterminate === false) {
          this.baseMap.removeLayer('CSKTag') // 出水口
          // this.baseMap.removeLayer("TCDTag"); //探测点
          this.baseMap.removeLayer('JSKTag') // 进水口
          this.baseMap.removeLayer('FZDLQTag') // 防止倒流器
        } else if (data.id === 51) {
          this.baseMap.removeLayer('CSKTag') // 出水口
        } else if (data.id === 52) {
          // this.baseMap.removeLayer("TCDTag"); //探测点
        } else if (data.id === 53) {
          this.baseMap.removeLayer('JSKTag') // 进水口
        } else if (data.id === 54) {
          this.baseMap.removeLayer('FZDLQTag') // 防止倒流器
        }
      }
    },
    toolFunction (actionName) {
      var vm = this
      vm.showCheckLayers = false
      vm.showCheckMarks = false
      vm.showCoordinates = false
      // vm.setMeasure(true)
      switch (actionName) {
        case 'measurelength':
          this.baseMap.measureLength({
            callback: function () {
              vm.$emit('registerMapClick')
            }
          }) // 长度测量
          break
        case 'measurearea':
          this.baseMap.measureArea({
            callback: function () {
              vm.$emit('registerMapClick')
            }
          }) // 面积测量
          break
        case 'fullextent':
          esriLoader
            .loadModules(['esri/geometry/Point', 'esri/SpatialReference'])
            .then(([Point, SpatialReference]) => {
              var centerpoint = new Point(
                13348940,
                3952540,
                new SpatialReference({ wkid: 102100 })
              )
              this.baseMap.map.setZoom(10)
              this.baseMap.map.centerAt(centerpoint)
            })

          // this.baseMap.full({
          //   x: 13348940,
          //   y: 3952540
          // }); //全图

          break
      }
    },
    customLocate () {
      var vm = this
      vm.clearAll()
      if (
        vm.x >= 13266000 &&
        vm.x <= 13407500 &&
        vm.y >= 3899000 &&
        vm.y <= 4004900
      ) {
        esriLoader
          .loadModules([
            'esri/geometry/Point',
            'esri/graphic',
            'dojo/domReady!'
          ])
          .then(([Point, Graphic]) => {
            if (vm.x != '' && vm.y != '') {
              var point = new Point(
                [vm.x, vm.y],
                vm.baseMap.map.spatialReference
              )
              vm.baseMap.map.centerAt(point)
              var picMarker = new esri.symbol.PictureMarkerSymbol(
                'http://10.11.222.52:14451/images/pin.png',
                40,
                40
              )
              var g = new Graphic(point, picMarker)
              vm.baseMap.map.graphics.add(g)
            }
          })
      } else {
        vm.$message({
          message: '请输入规定范围内的坐标！',
          type: 'warning'
        })
      }
    },
    changeChecked (data) {
      this.$refs.tree1.setCheckedKeys(data)
    },
    showCheckLayer () {
      var vm = this
      vm.baseMap.clearGraphic() // UI清除
      vm.baseMap.clearExceptClick({
        callback: function () {
          vm.$emit('registerMapClick')
        }
      }) // 事件清除
      this.showCheckLayers = !this.showCheckLayers
      this.showCheckMarks = false
      this.showCoordinates = false
    },
    showCheckMark () {
      var vm = this
      vm.baseMap.clearGraphic() // UI清除
      vm.baseMap.clearExceptClick({
        callback: function () {
          vm.$emit('registerMapClick')
        }
      }) // 事件清除
      this.showCheckMarks = !this.showCheckMarks
      this.showCheckLayers = false
      this.showCoordinates = false
    },
    showCoordinate () {
      var vm = this
      vm.x = ''
      vm.y = ''
      vm.baseMap.clearGraphic() // UI清除
      vm.baseMap.clearExceptClick({
        callback: function () {
          vm.$emit('registerMapClick')
        }
      }) // 事件清除
      this.showCoordinates = !this.showCoordinates
      this.showCheckLayers = false
      this.showCheckMarks = false
    },
    hidePandel (e) {
      if (this.$refs.layer) {
        if (!this.$refs.layer.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showCheckLayers = false
        }
      }
      if (this.$refs.mark) {
        if (!this.$refs.mark.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showCheckMarks = false
        }
      }
      if (this.$refs.coordinate) {
        if (!this.$refs.coordinate.contains(e.target)) {
          // 点击除弹出层外的空白区域
          this.showCoordinates = false
        }
      }
    },
    clearAll () {
      var vm = this
      vm.setMeasure(false)
      vm.closeDetail(false)
      vm.baseMap.clearGraphic() // UI清除
      vm.baseMap.clearExceptClick({
        callback: function () {
          vm.$emit('registerMapClick')
        }
      }) // 事件清除
      var visibleLayer = vm.baseMap.map.getLayersVisibleAtScale()
      visibleLayer.map((item, index) => {
        if (
          item.id === 'startgraphiclayer' ||
          item.id === 'endgraphiclayer' ||
          item.id === 'pointTc' ||
          item.id === 'pointTc2' ||
          item.id === 'hztc'
        ) {
          vm.baseMap.clearGraphic(item)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.toolBars {
  position: relative;
  ul {
    list-style: none;
    width: 350px;
    height: 38px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 1px 1px 3px #adbfd3;
    li:nth-last-child {
      border: none;
    }
    .layer {
      background: url("../../../assets/icon/layer.png") no-repeat;
      background-position: center center;
    }
    .mark {
      background: url("../../../assets/icon/mark.png") no-repeat;
      background-position: center center;
    }
    .coordinate {
      background: url("../../../assets/icon/coordinate.png") no-repeat;
      background-position: center center;
    }
    .measure {
      background: url("../../../assets/icon/measure.png") no-repeat;
      background-position: center center;
    }
    .area {
      background: url("../../../assets/icon/area.png") no-repeat;
      background-position: center center;
    }
    .full {
      background: url("../../../assets/icon/globe.png") no-repeat;
      background-position: center center;
    }
    .clearAll {
      background: url("../../../assets/icon/Shape.png") no-repeat;
      background-position: center center;
    }
    li {
      cursor: pointer;
      width: 49px;
      height: 18px;
      float: left;
      border-right: 1px solid #e1e1e1;
      margin-top: 13px;
    }
  }
  .tree {
    box-shadow: 1px 1px 3px #adbfd3;
    position: absolute;
    top: 39px;
    font-size: 12px;
  }
  .layerTree,
  .markTree {
    width: 150px;
    left: 2px;
    .custom-tree-node {
      i {
        display: inline-block;
        width: 15px;
        height: 15px;
        background-size: 15px 15px;
        transform: translateY(2px);
        background-position: center center;
        margin: 0 5px;
      }
      .line {
        background: url("../../../assets/smallIcons/给水管线.png") no-repeat;
      }
      .facility1 {
        background: url("../../../assets/smallIcons/测流点.png") no-repeat;
      }
      .facility2 {
        background: url("../../../assets/smallIcons/测压点.png") no-repeat;
      }
      .station1 {
        background: url("../../../assets/smallIcons/泵站.png") no-repeat;
      }
      .station2 {
        background: url("../../../assets/smallIcons/受水厂.png") no-repeat;
      }
      .station3 {
        background: url("../../../assets/smallIcons/补压塔.png") no-repeat;
      }
      .tap1 {
        background: url("../../../assets/smallIcons/排气阀门.png") no-repeat;
      }
      .tap2 {
        background: url("../../../assets/smallIcons/蝶阀.png") no-repeat;
      }
      .tap3 {
        background: url("../../../assets/smallIcons/闸阀井.png") no-repeat;
      }
      .tap4 {
        background: url("../../../assets/smallIcons/阀门井.png") no-repeat;
      }
      .tap5 {
        background: url("../../../assets/smallIcons/法兰井.png") no-repeat;
      }
      .tap6 {
        background: url("../../../assets/smallIcons/排水阀.png") no-repeat;
        background-size: 15px 15px;
      }
      .node1 {
        background: url("../../../assets/smallIcons/出水口.png") no-repeat;
      }
      .node2 {
        background: url("../../../assets/smallIcons/探测点.png") no-repeat;
      }
      .node3 {
        background: url("../../../assets/smallIcons/进水口.png") no-repeat;
      }
      .node4 {
        background: url("../../../assets/smallIcons/防止倒流器.png") no-repeat;
      }
      .data1 {
        background: url("../../../assets/smallIcons/地形图.png") no-repeat;
      }
      .data2 {
        background: url("../../../assets/smallIcons/县界.png") no-repeat;
      }
    }
  }
  .markTree {
    left: 52px;
    width: 150px;
  }
  .coordinateBox {
    width: 150px;
    height: 160px;
    background-color: #fff;
    box-shadow: 1px 1px 3px #adbfd3;
    position: absolute;
    top: 39px;
    left: 100px;
    font-size: 12px;
    .abscissa,
    .ordinate {
      width: 100%;
      height: 60px;
      position: relative;
      span {
        height: 40px;
        width: 50px;
        line-height: 40px;
        float: left;
        text-align: center;
      }
      input {
        width: 80px;
        height: 20px;
        float: left;
        outline: none;
        margin-top: 8px;
      }
      p {
        position: absolute;
        left: 10px;
        bottom: 5px;
      }
    }
    .button {
      width: 60px;
      height: 30px;
      background-color: #4886ff;
      color: #fff;
      text-align: center;
      line-height: 30px;
      border-radius: 5px;
      margin: 0 auto;
      cursor: pointer;
    }
  }
}
</style>
