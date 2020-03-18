/* eslint-disable no-mixed-operators */
/* eslint-disable no-redeclare */
/* eslint-disable camelcase */
/* eslint-disable eqeqeq */
/* eslint-disable brace-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * Created by yfshixi2 on 2016/8/12.
 */

define([
  'static/arcpackage/WKTUtil',
  'esri/geometry/Point',
  'esri/geometry/Polyline',
  'esri/geometry/Polygon'
], function (WKTUtil, Point, Polyline, Polygon) {
  /**
     *wkt转化成arcgis的Point对象
     * @param wkt
     * @returns {Polyline}
     * @constructor
     */
  var wktToPoint = function (wkt, spatialReference) {
    var wktUtil = new WKTUtil()
    var pt = wktUtil.read(wkt)
    var json = {
      x: pt[0],
      y: pt[1],
      spatialReference: spatialReference
    }
    var point = new Point(json)
    return point
  }

  /**
     *wkt转化成arcgis的Polyline对象
     * @param wkt
     * @returns {Polyline}
     * @constructor
     */
  wktToPolyline = function (wkt, spatialReference) {
    var wktUtil = new WKTUtil()
    var points = wktUtil.read(wkt)
    var json = {
      paths: [points],
      spatialReference: spatialReference
    }
    var polyline = new Polyline(json)
    return polyline
  }

  /**
     * wkt转化成arcgis的Polygon对象
     * @param wkt
     * @returns {Polygon}
     * @constructor
     */
  var wktToPolygon = function (wkt, spatialReference) {
    var wktUtil = new WKTUtil()
    var points = wktUtil.read(wkt)
    var json = {
      rings: points,
      spatialReference: spatialReference
    }
    var polygon = new Polygon(json)
    return polygon
  }

  /**
     * @param geometry
     */
  var pointToWKT = function (geometry) {
    return 'POINT(' + geometry.x + ' ' + geometry.y + ')'
  }

  /**
     * @param geometry
     */
  var polygonToWKT = function (geometry) {
    var wkt = []
    var rings = geometry.rings
    for (var i in rings) {
      var ring = rings[i]
      for (var j in ring) {
        var p = ring[j]
        wkt.push(p.join(' '))
      }
    }
    return 'POLYGON ((' + wkt.join(',') + '))'
  }

  /**
     * @param geometry
     */
  var lineToWKT = function (geometry) {
    var wkt = []
    var paths = geometry.paths
    for (var i in paths) {
      var path = paths[i]
      for (var j in path) {
        var p = path[j]
        wkt.push(p.join(' '))
      }
    }
    return 'LINESTRING (' + wkt.join(',') + ')'
  }

  // REN，20171106，求线段的中间点的坐标
  var lineMidPoint = function (geometry) {
    var points = geometry// 只针对一条线进行处理
    var length = 0
    var mlength = 0
    for (var i = 0; i < points.length - 1; i++) {
      var star_t = points[i]
      var end_t = points[i + 1]
      length = length + Math.sqrt((star_t[0] - end_t[0]) * (star_t[0] - end_t[0]) + (star_t[1] - end_t[1]) * (star_t[1] - end_t[1]))
    }
    mlength = length / 2
    var templength = 0
    var delta = 0

    var point = {
      x: 0,
      y: 0
    }
    var two_length = 0
    for (var i = 0; i < points.length - 1; i++) {
      var star_t = points[i]
      var end_t = points[i + 1]
      two_length = 0
      two_length = Math.sqrt((star_t[0] - end_t[0]) * (star_t[0] - end_t[0]) + (star_t[1] - end_t[1]) * (star_t[1] - end_t[1]))
      templength = templength + two_length
      delta = mlength - templength

      if (delta > 0) // 还未到中间点
      {

      } else // 遍历的这些点已经大于距离的一半了，要退回去一部分
      {
        if (star_t[0] == end_t[0]) {
          point.x = star_t[0]
          point.y = end_t[1] + delta
        } else {
          var curpoint = new Point(end_t[0], end_t[1])
          var nextpoint = new Point(star_t[0], end_t[0])
          var midpoint = getMidPoint(curpoint, nextpoint, -delta)
          point.x = midpoint.x
          point.y = midpoint.y
          break
        }
      }
    }
    return point
  }

  var getMidPoint = function (curPoint, nextPoint, L) {
    var distance = Math.sqrt(Math.pow(curPoint.x - nextPoint.x, 2) +
                Math.pow(curPoint.y - nextPoint.y, 2))// 两点的坐标距离
    var lenthUnit = distance / 5// 单位长度
    // 第一步：求得直线方程相关参数y=kx+b
    var k = (curPoint.y - nextPoint.y) * 1.0 /
                (curPoint.x - nextPoint.x)// 坐标直线斜率k
    var b = curPoint.y - k * curPoint.x// 坐标直线b
    // 第二步：求得在直线y=kx+b上，距离当前坐标距离为L的某点
    // 一元二次方程Ax^2+Bx+C=0中,
    // 一元二次方程求根公式：
    // 两根x1,x2= [-B±√(B^2-4AC)]/2A
    // ①(y-y0)^2+(x-x0)^2=L^2;
    // ②y=kx+b;
    // 式中x,y即为根据以上lenthUnit单位长度(这里就是距离L)对应点的坐标
    // 由①②表达式得到:(k^2+1)x^2+2[(b-y0)k-x0]x+[(b-y0)^2+x0^2-L^2]=0
    var A = Math.pow(k, 2) + 1// A=k^2+1;
    var B = 2 * ((b - curPoint.y) * k - curPoint.x)// B=2[(b-y0)k-x0];

    // C=(b-y0)^2+x0^2-L^2
    var C = Math.pow(b - curPoint.y, 2) + Math.pow(curPoint.x, 2) -
                Math.pow(L, 2)
    // 两根x1,x2= [-B±√(B^2-4AC)]/2A
    var x1 = (-B + Math.sqrt(Math.pow(B, 2) - 4 * A * C)) / (2 * A)
    var x2 = (-B - Math.sqrt(Math.pow(B, 2) - 4 * A * C)) / (2 * A)
    var x = 0// 最后确定是在已知两点之间的某点
    if (x1 == x2) {
      x = x1
    } else if (curPoint.x <= x1 && x1 <= nextPoint.x || nextPoint.x <= x1 &&
                x1 <= curPoint.x) {
      x = x1
    } else if (curPoint.x <= x2 && x2 <= nextPoint.x || nextPoint.x <= x2 &&
                x2 <= curPoint.x) {
      x = x2
    }
    var y = k * x + b
    var mPoint = new Point(x, y)
    return mPoint
  }

  return {
    wktToPoint: wktToPoint,
    wktToPolyline: wktToPolyline,
    wktToPolygon: wktToPolygon,
    pointToWKT: pointToWKT,
    lineToWKT: lineToWKT,
    polygonToWKT: polygonToWKT,
    lineMidPoint: lineMidPoint
  }
})
