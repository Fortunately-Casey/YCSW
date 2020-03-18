/* eslint-disable no-undef */
/**
 * Created by LENOVO on 2017/8/8.
 */

define([
  'dojo/_base/declare'
], function (declare) {
  return declare('BinaryFileWrapper', null, {
    constructor: function (binFile) {
      this.position = 0
      this.bigEndian = true
      this.binFile = binFile
    },
    getByte: function () {
      var byte = this.binFile.getByteAt(this.position)
      this.position++
      return byte
    },
    getLength: function () {
      return this.binFile.getLength()
    },
    getSByte: function () {
      var sbyte = this.binFile.getSByteAt(this.position)
      this.position++
      return sbyte
    },
    getShort: function () {
      var short = this.binFile.getShortAt(this.position, this.bigEndian)
      this.position += 2
      return short
    },
    getSShort: function () {
      var sshort = this.binFile.getSShortAt(this.position, this.bigEndian)
      this.position += 2
      return sshort
    },
    getLong: function () {
      var l = this.binFile.getLongAt(this.position, this.bigEndian)
      this.position += 4
      return l
    },
    getSLong: function () {
      var l = this.binFile.getSLongAt(this.position, this.bigEndian)
      this.position += 4
      return l
    },
    getString: function (iLength) {
      var s = this.binFile.getStringAt(this.position, iLength)
      this.position += iLength
      return s
    },
    getDoubleAt: function (iOffset, bBigEndian) {
      var a = this.binFile.getLongAt(iOffset + (bBigEndian ? 0 : 4), bBigEndian)
      var b = this.binFile.getLongAt(iOffset + (bBigEndian ? 4 : 0), bBigEndian)
      var s = a >> 31 ? -1 : 1
      var e = (a >> 52 - 32 & 0x7ff) - 1023
      return s * (a & 0xfffff | 0x100000) * 1.0 / Math.pow(2, 52 - 32) * Math.pow(2, e) + b * 1.0 / Math.pow(2, 52) * Math.pow(2, e)
    },
    getDouble: function () {
      var d = this.getDoubleAt(this.position, this.bigEndian)
      this.position += 8
      return d
    },
    getChar: function () {
      var c = this.binFile.getCharAt(this.position)
      this.position++
      return c
    }
  })
})
