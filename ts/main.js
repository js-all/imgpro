"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");
var img = new Image();
var image = [];
var srcp = "./img/thomas.jpg"; //prompt("image");
if (srcp)
    img.src = srcp;
document.body.appendChild(img);
setTimeout(function () {
    ctx.drawImage(img, 0, 0);
    var data = ctx.getImageData(0, 0, canvas.width, canvas.height);
    console.log(data);
    var c = 0;
    var data2 = [];
    for (var i = 0; i < data.data.length; i += 4) {
        var e1 = data.data[i];
        var e2 = data.data[i + 1];
        var e3 = data.data[i + 2];
        var e4 = data.data[i + 3];
        data2.push([e1, e2, e3, e4]);
    }
    // final data, stored in width, height, and 4 values for color r g b a
    var finalData = [];
    for (var i = 0; i < data.width; i++) {
        finalData.push([]);
    }
    for (var i = 0; i < data2.length; i++) {
        var widhtI = i % data.width;
        finalData[widhtI].push(data2[i]);
    }
    image.push.apply(image, finalData);
    var result = __spreadArrays(image);
    for (var ine = 0; ine < finalData.length; ine++) {
        var i = finalData[ine];
        for (var j = 0; i.length; j++) {
            var e = i[j];
            var e2 = i[j + 1] || [0, 0, 0, 255];
            var res = [e[0] - e2[0], e[1] - e2[1], e[2] - e2[2], e[3] - e2[3]];
            res = [Math.abs(res[0]), Math.abs(res[1]), Math.abs(res[2]), Math.abs(res[3])];
            result[ine][j] = res;
        }
    }
    for (var i = 0; i < result.length; i++) {
        for (var j = 0; j < result[i].length; j++) {
            var color = result[i][j];
            ctx.fillStyle = "rgba(" + color[0] + ", " + color[1] + ", " + color[2] + ", " + color[3] + ")";
            ctx.fillRect(i, j, 1, 1);
        }
    }
}, 1000);
