/**
 * Created by LENOVO on 2017/8/8.
 */

define(["dojo/_base/declare"], function (declare) {
    return declare("BinaryFile", null, {
        getByteAt: null,
        constructor: function (strData, iDataOffset, iDataLength) {
            this.data = strData;
            this.dataOffset = iDataOffset || 0;
            this.dataLength = 0;

            if (typeof this.data == "string") {
                this.dataLength = iDataLength || this.data.length;

                this.getByteAt = function (iOffset) {
                    return this.data.charCodeAt(iOffset + this.dataOffset) & 0xFF;
                }
            } else if (typeof this.data == "object") {
                this.dataLength = iDataLength || IEBinary_getLength(this.data);

                this.getByteAt = function (iOffset) {
                    return IEBinary_getByteAt(this.data, iOffset + this.dataOffset);
                }
            }

        },
        getRawData: function () {
            return this.data;
        },
        getLength: function () {
            return this.dataLength;
        },
        getSByteAt: function (iOffset) {
            var iByte = this.getByteAt(iOffset);
            if (iByte > 127)
                return iByte - 256;
            else
                return iByte;
        },
        getShortAt: function (iOffset, bBigEndian) {
            var iShort = bBigEndian ?
                (this.getByteAt(iOffset) << 8) + this.getByteAt(iOffset + 1)
                : (this.getByteAt(iOffset + 1) << 8) + this.getByteAt(iOffset)
            if (iShort < 0) iShort += 65536;
            return iShort;
        },
        getSShortAt: function (iOffset, bBigEndian) {
            var iUShort = this.getShortAt(iOffset, bBigEndian);
            if (iUShort > 32767)
                return iUShort - 65536;
            else
                return iUShort;
        },
        getLongAt: function (iOffset, bBigEndian) {
            var iByte1 = this.getByteAt(iOffset),
                iByte2 = this.getByteAt(iOffset + 1),
                iByte3 = this.getByteAt(iOffset + 2),
                iByte4 = this.getByteAt(iOffset + 3);

            var iLong = bBigEndian ?
                (((((iByte1 << 8) + iByte2) << 8) + iByte3) << 8) + iByte4
                : (((((iByte4 << 8) + iByte3) << 8) + iByte2) << 8) + iByte1;
            if (iLong < 0) iLong += 4294967296;
            return iLong;
        },
        getSLongAt: function (iOffset, bBigEndian) {
            var iULong = this.getLongAt(iOffset, bBigEndian);
            if (iULong > 2147483647)
                return iULong - 4294967296;
            else
                return iULong;
        },
        getStringAt: function (iOffset, iLength) {
            var aStr = [];
            for (var i = iOffset, j = 0; i < iOffset + iLength; i++, j++) {
                aStr[j] = String.fromCharCode(this.getByteAt(i));
            }
            return aStr.join("");
        },
        getCharAt: function (iOffset) {
            return String.fromCharCode(this.getByteAt(iOffset));
        },
        toBase64: function () {
            return window.btoa(this.data);
        },
        tfromBase64: function (strBase64) {
            this.data = window.atob(strBase64);
        }
    });
});

