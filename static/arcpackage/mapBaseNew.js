//地图基本函数库

define([
  "dojo/dom",
  "dojo/dom-construct",
  "dojo/_base/declare",
  "dojo/_base/config",
  "esri/dijit/Scalebar",
  "esri/map",
  "esri/layers/TileInfo",
  "esri/layers/ArcGISTiledMapServiceLayer",
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/layers/GraphicsLayer",
  "esri/toolbars/navigation",
  "esri/toolbars/draw",
  "esri/tasks/GeometryService",
  "esri/tasks/LengthsParameters",
  "esri/tasks/AreasAndLengthsParameters",
  "esri/tasks/PrintTask",
  "esri/tasks/PrintTemplate",
  "esri/tasks/PrintParameters",
  "esri/tasks/Geoprocessor",
  "esri/geometry/Point",
  "esri/graphic",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/PictureMarkerSymbol",
  "esri/symbols/TextSymbol",
  "esri/symbols/Font",
  "esri/SpatialReference",
  "dojo/domReady!"
], function(
  dom,
  domConstruct,
  declare,
  config,
  Scalebar,
  Map,
  TileInfo,
  ArcGISTiledMapServiceLayer,
  ArcGISDynamicMapServiceLayer,
  GraphicsLayer,
  navigation,
  draw,
  GeometryService,
  LengthsParameters,
  AreasAndLengthsParameters,
  PrintTask,
  PrintTemplate,
  PrintParameters,
  Geoprocessor,
  Point,
  Graphic,
  SimpleLineSymbol,
  SimpleFillSymbol,
  PictureMarkerSymbol,
  TextSymbol,
  Font,
  SpatialReference
) {
  var measureHandler = null; //测量事件
  var drawCompletedHandler; //绘图事件
  var mapClickHandler = null; //地图点击事件

  var GeometryServiceUrl =
      "http://49.4.55.238:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer",
    PrintToolServiceUrl =
      // "http://192.168.35.212:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"; 
      // "http://192.168.10.71:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"; 
      //'http://gis106.gisntschy.com/server/rest/services/ExportCustomMap/GPServer/Export%20Web%20Map'// ;

  function noop(a, b, c) {}

  function CreateMap(dom, options) {
    if (!(this instanceof CreateMap)) {
      return new CreateMap(dom, options);
    }
    this.map = this.createMap(dom, options);
    this.navToolbar = this.createNavigation(this.map);
    this.drawToolbar = this.createDraw(this.map);
    this.geometryService = this.createGeometryService(GeometryServiceUrl);
    this.printMap = this.createPrintToolService(PrintToolServiceUrl);
    this.pointHandler = null;
    this.lineHandler = null;
    this.faceHandler = null;
  }

  CreateMap.prototype = {
    //创建地图
    createMap: function(dom, options) {
      return new Map(dom, options);
    },
    //创建几何服务对象
    createGeometryService: function(url) {
      return new GeometryService(url);
    },

    //创建打印服务对象
    createPrintToolService: function(url) {
      return new PrintTask(url);
    },

    //添加切片地图
    addTiledMapServiceLayer: function(serviceUrl, options) {
      var layer = this.map.getLayer(options.id);
      if (!layer) {
        layer = new ArcGISTiledMapServiceLayer(serviceUrl, options);
        if (typeof options.index == "undefined") this.map.addLayer(layer);
        else this.map.addLayer(layer, options.index);
      }
      return layer;
    },

    //添加动态地图
    addDynamicMapServiceLayer: function(
      id,
      serviceUrl,
      visible,
      opacity,
      index
    ) {
      var layer = this.map.getLayer(id);
      if (!layer) {
        layer = new ArcGISDynamicMapServiceLayer(serviceUrl, {
          id: id,
          visible: visible,
          opacity: opacity
        });
        this.map.addLayer(layer, index);
      }
      return layer;
    },
    
    //添加用户图层
    addGraphicsLayer: function(id, index) {
      var graphicsLayer = new GraphicsLayer({ id: id });
      index
        ? this.map.addLayer(graphicsLayer)
        : this.map.addLayer(graphicsLayer, index);
      return graphicsLayer;
    },
    addGraphicsLayerByUpload: function(id, graphiclayer) {
      var uGraphicsLayer;
      if (this.hasLayerByLayerId(id)) {
        this.clearGraphicByLayerId(id); //不清除绘制的图形
        uGraphicsLayer = this.map.getLayer(id);
        for (var i = 0; i < graphiclayer.graphics.length; i++) {
          uGraphicsLayer.add(graphiclayer.graphics[i]);
        }
      } else {
        uGraphicsLayer = this.addGraphicsLayer(id, this.map);
        for (var i = 0; i < graphiclayer.graphics.length; i++) {
          uGraphicsLayer.add(graphiclayer.graphics[i]);
        }
      }
      return uGraphicsLayer;
    },

    //移除图层
    removeLayer: function(id) {
      var layer = this.map.getLayer(id);
      if (layer) this.map.removeLayer(layer);
    },
    //隐藏图层
    hideLayer: function(id) {
      if (!id) return;
      var layer = this.map.getLayer(id);
      if (layer) layer.hide();
    },

    //显示图层
    showLayer: function(id) {
      if (!id) return;
      var layer = this.map.getLayer(id);
      if (layer) layer.show();
    },
    //创建导航工具
    createNavigation: function() {
      return new navigation(this.map, {
        showTooltips: true,
        tooltipOffset: 20,
        drawTime: 90
      });
    },

    //创建绘图工具
    createDraw: function() {
      return new draw(this.map, {
        showTooltips: true,
        tooltipOffset: 20,
        drawTime: 90
      });
    },

    //清除
    clear: function() {
      this.clearEvent();
      this.clearUI();
    },

    // 清除点击事件以外的事件
    clearExceptClick: function(option) {
      if (this.drawToolbar != null) this.drawToolbar.deactivate();
      if (this.navToolbar != null) this.navToolbar.deactivate();
      if (this.lineHandler) {
        dojo.disconnect(this.lineHandler);
        this.lineHandler = null;
      }
      if (this.faceHandler) {
        dojo.disconnect(this.faceHandler);
        this.faceHandler = null;
      }
      if (measureHandler != null) {
        dojo.disconnect(measureHandler); //取消测量事件绑定
        measureHandler = null;
      }
      if (drawCompletedHandler != null) {
        dojo.disconnect(drawCompletedHandler);
        drawCompletedHandler = null;
      }
      option.callback && option.callback();
    },

    //清除事件
    clearEvent: function() {
      if (this.drawToolbar != null) this.drawToolbar.deactivate();
      if (this.navToolbar != null) this.navToolbar.deactivate();
      if (this.lineHandler) {
        dojo.disconnect(this.lineHandler);
        this.lineHandler = null;
      }
      if (this.faceHandler) {
        dojo.disconnect(this.faceHandler);
        this.faceHandler = null;
      }
      if (measureHandler != null) {
        dojo.disconnect(measureHandler); //取消测量事件绑定
        measureHandler = null;
      }
      if (drawCompletedHandler != null) {
        dojo.disconnect(drawCompletedHandler);
        drawCompletedHandler = null;
      }
      if (mapClickHandler != null) {
        dojo.disconnect(mapClickHandler);
      }
    },

    //清除地图上绘制元素
    clearUI: function() {
      var self = this;
      this.map.graphics.clear();
      var layerIds = this.map.graphicsLayerIds;
      dojo.forEach(layerIds, function(layerId) {
        self.clearGraphic(this.map.getLayer(layerId));
      });
    },

    //放大
    zoomIn: function() {
      this.navToolbar.activate(navigation.ZOOM_IN, { showTooltips: true });
    },

    //缩小
    zoomOut: function() {
      this.navToolbar.activate(navigation.ZOOM_OUT);
    },

    //平移
    pan: function() {
      this.navToolbar.activate(navigation.PAN);
    },

    //全图
    full: function(center) {
      this.navToolbar.zoomToFullExtent();
      var initpoint = new Point(center.x, center.y, new SpatialReference({ wkid: 102100 }));
      this.map.centerAt(initpoint); //REN,20171107，定位到地图中心
    },
    /***
     *
     * @param graphicLayer
     * @param options {previewSymbol,symbol}
     * @param cb
     */
    paintLine: function(graphicLayer, options, cb) {
      var vm = this;
      //  var drawToolbar = vm.createDraw(this.map);
      graphicLayer = graphicLayer || this.map.graphics;
      var defaultSymbol = new SimpleLineSymbol(
        SimpleLineSymbol.STYLE_SOLID,
        new dojo.Color([0, 144, 255]),
        4
      );
      if (arguments.length <= 1) {
        options = {
          symbol: defaultSymbol
        };
        cb = noop;
      } else if (arguments.length == 2) {
        cb = options;
        options = {
          symbol: defaultSymbol
        };
      }
      this.lineHandler = dojo.connect(
        vm.drawToolbar,
        "onDrawEnd",
        function(geometry) {
          var graphic = graphicLayer.add(new Graphic(geometry, options.symbol));
          vm.drawToolbar.deactivate();
          dojo.disconnect(vm.lineHandler);
          vm.lineHandler = null;
          //  drawToolbar = null;
          cb(graphic);
        }
      );
      // drawToolbar.activate(draw.POLYLINE);
      vm.drawToolbar.activate(draw.POLYLINE);
      if (options.previewSymbol) {
        vm.drawToolbar.setLineSymbol(options.previewSymbol);
      }
    },
    paintArea: function(graphicLayer, options, cb) {
      var vm = this;
      // var drawToolbar = vm.createDraw(this.map);
      graphicLayer = graphicLayer || this.map.graphics;
      var defaultSymbol = new SimpleFillSymbol(
        SimpleFillSymbol.STYLE_SOLID,
        new SimpleLineSymbol(
          SimpleLineSymbol.STYLE_SOLID,
          new dojo.Color([0, 144, 255]),
          4
        ),
        new dojo.Color([0, 144, 255, 0.25])
      );
      if (arguments.length <= 1) {
        options = {
          symbol: defaultSymbol
        };
        cb = noop;
      } else if (arguments.length == 2) {
        cb = options;
        options = {
          symbol: defaultSymbol
        };
      }
      this.faceHandler = dojo.connect(
        vm.drawToolbar,
        "onDrawEnd",
        function(geometry) {
          var graphic = graphicLayer.add(new Graphic(geometry, options.symbol));
          vm.drawToolbar.deactivate();
          dojo.disconnect(vm.faceHandler);
          vm.faceHandler = null;
          //drawToolbar = null;
          cb(graphic);
        }
      );
      // drawToolbar.activate(draw.POLYGON);
      vm.drawToolbar.activate(draw.POLYGON);
      if (options.previewSymbol) {
        vm.drawToolbar.setFillSymbol(options.previewSymbol);
      }
    },
    //测量长度
    // {
    //   layer:graphicLayer,
    //   callback:callback
    // }
    measureLength: function(option) {
      var self = this;
      graphicLayer = option.layer || this.map.graphics;
      this.clearEvent();
      if (measureHandler == null) {
        var graphic;
        measureHandler = dojo.connect(
          self.geometryService,
          "onLengthsComplete",
          function(result) {
            var str;
            if (result.lengths[0] > 1000)
              str =
                dojo.number.format(result.lengths[0] / 1000, {
                  pattern: "#.0"
                }) + " 千米";
            else
              str =
                dojo.number.format(result.lengths[0], {
                  fractional: false,
                  pattern: "#.0"
                }) + " 米";

            var arr = graphic.geometry.paths[0];
            var markpoint = new PictureMarkerSymbol(
              "http://49.4.55.238:8029/images/poi.png",
              13,
              14
            );

            for (var i = 0; i < arr.length; i++) {
              var geo5 = new Point(
                arr[i][0],
                arr[i][1],
                self.map.spatialReference
              );
              self.addGraphic(new Graphic(geo5, markpoint), graphicLayer);
            }
            var centerPoint = new Point(
              (arr[0][0] + arr[arr.length - 1][0]) / 2,
              (arr[0][1] + arr[arr.length - 1][1]) / 2,
              self.map.spatialReference
            );
            var textSymbol = new TextSymbol(str)
              .setColor(new dojo.Color([255, 0, 0]))
              .setFont(new Font("11pt").setWeight(Font.WEIGHT_BOLDER))
              .setHaloColor(new dojo.Color([255, 255, 255]))
              .setHaloSize(1);
            self.addGraphic(new Graphic(centerPoint, textSymbol), graphicLayer);
          }
        );
        drawCompletedHandler = dojo.connect(
          self.drawToolbar,
          "onDrawEnd",
          function(geometry) {
            graphic = graphicLayer.add(
              new Graphic(
                geometry,
                new SimpleLineSymbol(
                  SimpleLineSymbol.STYLE_DASH,
                  new dojo.Color([255, 0, 0]),
                  2
                )
              )
            );
            var lenParams = new LengthsParameters();
            lenParams.polylines = [geometry];
            lenParams.lengthUnit = GeometryService.UNIT_METER;
            lenParams.geodesic = false;
            self.geometryService.lengths(lenParams);
            self.drawToolbar.deactivate();
            option.callback && option.callback();
          }
        );
      }
      this.drawToolbar.activate(draw.POLYLINE);
    },

    //面积测量
    measureArea: function(option) {
      var self = this;
      graphicLayer = option.layer || this.map.graphics;
      this.clearEvent();
      if (measureHandler == null) {
        var graphic;
        measureHandler = dojo.connect(
          self.geometryService,
          "onAreasAndLengthsComplete",
          function(result) {
            var lenstr, areastr;
            if (result.areas[0] > 1000000)
              areastr =
                dojo.number.format(result.areas[0] / 1000000, {
                  pattern: "#"
                }) + " 平方千米";
            else
              areastr =
                dojo.number.format(result.areas[0], {
                  fractional: false,
                  pattern: "#"
                }) + " 平方米";
            if (result.lengths[0] > 1000)
              lenstr =
                dojo.number.format(result.lengths[0] / 1000, {
                  pattern: "#.0"
                }) + " 千米";
            else
              lenstr =
                dojo.number.format(result.lengths[0], {
                  fractional: false,
                  pattern: "#.0"
                }) + " 米";
            var env = graphic.geometry.getExtent().getCenter();
            var textSymbol = new TextSymbol(areastr)
              .setColor(new dojo.Color([255, 0, 0]))
              .setFont(new Font("11pt").setWeight(Font.WEIGHT_BOLDER))
              .setHaloColor(new dojo.Color([255, 255, 255]))
              .setHaloSize(1);
            self.addGraphic(
              new Graphic(new Point(env), textSymbol),
              graphicLayer
            ); //增加点
            var arr = graphic.geometry.rings[0];
            var markpoint = new PictureMarkerSymbol(
              "http://49.4.55.238:8029/images/poi.png",
              13,
              14
            );
            for (var i = 0; i < arr.length; i++) {
              var geo5 = new Point(
                arr[i][0],
                arr[i][1],
                self.map.spatialReference
              );
              self.addGraphic(new Graphic(geo5, markpoint), graphicLayer);
              if (arr.length - 1 == i) {
                textSymbol = new TextSymbol(lenstr)
                  .setColor(new dojo.Color([255, 0, 0]))
                  .setFont(new Font("11pt").setWeight(Font.WEIGHT_BOLDER))
                  .setHaloColor(new dojo.Color([255, 255, 255]))
                  .setHaloSize(1);
                self.addGraphic(new Graphic(geo5, textSymbol), graphicLayer);
              }
            }
          }
        );
        drawCompletedHandler = dojo.connect(
          this.drawToolbar,
          "onDrawEnd",
          function(geometry) {
            graphic = graphicLayer.add(
              new Graphic(
                geometry,
                new SimpleFillSymbol(
                  SimpleFillSymbol.STYLE_SOLID,
                  new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_DASHDOT,
                    new dojo.Color([255, 0, 0]),
                    2
                  ),
                  new dojo.Color([255, 255, 0, 0.25])
                )
              )
            );
            var areaParams = new AreasAndLengthsParameters();
            areaParams.lengthUnit = GeometryService.UNIT_METER;
            areaParams.areaUnit = GeometryService.UNIT_SQ_METERS;
            self.geometryService.simplify([geometry], function(
              simplifiedGeometries
            ) {
              areaParams.polygons = simplifiedGeometries;
              self.geometryService.areasAndLengths(areaParams);
            });
            self.drawToolbar.deactivate();
            option.callback && option.callback();
          }
        );
      }
      this.drawToolbar.activate(draw.POLYGON);
    },

    //在某一图层中添加图形
    addGraphic: function(graphic, graphicLayer) {
      graphicLayer = graphicLayer || this.map.graphics;
      if (graphicLayer) {
        graphicLayer.add(graphic);
      }
    },

    //清空某一图层
    clearGraphic: function(graphicLayer) {
      graphicLayer = graphicLayer || this.map.graphics;
      if (graphicLayer != null) graphicLayer.clear();
    },

    //根据LayerId清空指定图层 REN，20171009
    clearGraphicByLayerId: function(id) {
      var layer = this.map.getLayer(id);
      if (layer) layer.clear();
    },
    //判断地图对象map上是否有 指定的图层 REN,20171010
    hasLayerByLayerId: function(id) {
      var layer = this.map.getLayer(id);
      if (layer) return true;
      else return false;
    },

    extentAt: function(features) {
      var extent = null;
      dojo.forEach(features, function(feature) {
        if (extent == null) extent = feature.geometry.getExtent();
        else extent = extent.union(feature.geometry.getExtent());
      });
      if (extent != null) this.map.setExtent(extent);
    },

    extentAtGeometry: function(geometries) {
      var extent = null;
      dojo.forEach(geometries, function(geometry) {
        if (extent == null) extent = geometry.getExtent();
        else extent = extent.union(geometry.getExtent());
      });
      if (extent != null) this.map.setExtent(extent);
    },

    print: function() {
      $(
        '<li id="mapText" style="position: absolute;top: 0;">昆山市规划局</li>'
      ).appendTo($("#mapDiv"));

      function exportDrawing() {
        var w = 1980;
        var h = 842;
        var fe = document.getElementById("mapDiv");
        html2canvas(fe, {
          logging: true, //Enable log (use Web Console for get Errors and Warings)
          useCORS: true,
          proxy: "/Common/Html2CanvasProxy",
          onrendered: function(canvas) {
            var img = new Image();
            img.onload = function() {
              document.body.appendChild(img);
            };
            img.error = function() {
              if (window.console.log) {
                window.console.log("Not loaded image from canvas.toDataURL");
              } else {
                alert("Not loaded image from canvas.toDataURL");
              }
            };
            /*控制图片大小---------s*/
            var extra_canvas = document.createElement("canvas");
            extra_canvas.setAttribute("width", w);
            extra_canvas.setAttribute("height", h);
            var ctx = extra_canvas.getContext("2d");
            ctx.drawImage(
              canvas,
              0,
              0,
              canvas.width,
              canvas.height,
              0,
              0,
              w,
              h
            );

            /*控制图片大小---------e*/
            img.src = extra_canvas.toDataURL("image/png");
            var triggerDownload = $("<a>")
              .attr("href", img.src)
              .attr("download", "img.png")
              .appendTo("body");
            try {
              triggerDownload[0].click();
              triggerDownload.remove();
            } catch (e) {
              $.userConfirm({ content: "如果无法下载，请换用Chrome浏览器" });
            }
          }
        });
      }

      exportDrawing();
      $("#mapText").remove();
      return;
    },

    registerMapClick: function(callback) {
      if (mapClickHandler != null) dojo.disconnect(mapClickHandler);
      mapClickHandler = dojo.connect(
        this.map,
        "onClick",
        callback
      );
    },
    clearClickEvent: function() {
      if (mapClickHandler != null) {
        dojo.disconnect(mapClickHandler);
      }
    },
    //点击查询  返回结果集存储在queryResult中
    identityQuery: function(e) {
      //获取所有可见图层
      var visiblelayers = this.map.getLayersVisibleAtScale();
      //用来存储各个查询结果
      // var Result = [];
      //创建查询参数

      let arr = [];
      let result = [];
      visiblelayers.map(v => {
        if (
          v.id !== "basemap" &&
          v.id !== "cultrue" &&
          v.id !== "xzqh" &&
          v.id !== "dxt"&&
          v.id !== "GZPoints"
        ) {
          arr.push(v);
          // console.log(v);
        }
      });
      // console.log(arr)
      arr.map(v => {
        // var layernames = v.url.split("/");
        // var layername = layernames[layernames.length - 2];
        // var flag = layername.split("With").join('').replace('Service',"");
        // console.log(flag,'------')
        let flag = v.id.split("Tag")[0];
        var isHas = result.find(item => {
          return item.id.indexOf(flag) !== -1;
        });
        if (!isHas) {
          result.push(v);
        }
      });
      return result;
    },
    // 查询 
    queryTask: function(key, value, url, outfields) {
      var query = new Query();
      var queryTask = new QueryTask(url);
      query.where = `${key} like '%${value}%'`;
      query.outSpatialReference = this.map.spatialReference;
      query.returnGeometry = true;
      query.outFields = outfields;
      var that = this;
      queryTask.execute(query, function(results) {
        if (results.features.length == 0) {
          alert("查询结果为空");
          return;
        } else {
          //创建线符号
          var lineSymbol = new SimpleLineSymbol(
            SimpleLineSymbol.STYLE_DASH,
            new Colors([255, 0, 0]),
            5
          );
          if (results.features.length >= 1) {
            for (var i = 0; i < results.features.length; i++) {
              var graphic = results.features[i];
              graphic.setSymbol(lineSymbol);
              that.map.graphics.add(graphic);
            }
          }
        }
      });
    }
  };
  return CreateMap;
});
