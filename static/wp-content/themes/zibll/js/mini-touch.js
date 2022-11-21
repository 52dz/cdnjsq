/*
 * @Author        : Qinver
 * @Url           : zibll.com
 * @Date          : 2020-09-29 13:18:40
 * @LastEditTime: 2021-04-27 22:39:10
 * @Email         : 770349780@qq.com
 * @Project       : Zibll子比主题
 * @Description   : 一款极其优雅的Wordpress主题->一个简单的手势封装插件
 * @Read me       : 感谢您使用子比主题，主题源码有详细的注释，支持二次开发。欢迎各位朋友与我相互交流。
 * @Remind        : 使用盗版主题会存在各种未知风险。支持正版，从我做起！
 */
'use strict';
$.fn.minitouch = function (options) {
    options = $.extend({
            direction: 'bottom',
            selector: '',
            depreciation: 50,
            stop: false,
            onStart: false,
            onIng: false,
            onEnd: false,
            inEnd: false,
        },
        options);
    var _e = $(this);
    var is_stop = false;
    var dep = options.depreciation;
    var startX = 0;
    var startY = 0;
    var endX = 0;
    var endY = 0;
    var angle = 0;
    var distanceX = 0;
    var distanceY = 0;
    var dragging = false;

    var cssTransition = function (a, b, c, d, s) {
        var e, f, g;
        d && (b += "px", c += "px", e = "translate3D(" + b + "," + c + " , 0)", f = {},
            g = cssT_Support(),
            f[g + "transform"] = e,
            f[g + "transition"] = g + "transform 0s linear",
            f["cursor"] = s,
            "null" == d && (f[g + "transform"] = "", f[g + "transition"] = ""), a.css(f));
    }
    var cssT_Support = function () {
        var a = document.body || document.documentElement;
        a = a.style;
        return "" == a.WebkitTransition ? "-webkit-" : "" == a.MozTransition ? "-moz-" : "" == a.OTransition ? "-o-" : "" == a.transition ? "" : void 0;
    }
    _e.on('touchstart pointerdown MSPointerDown', options.selector, function (e) {
            startX = startY = endX = endY = angle = distanceX = distanceY = 0;
            startX = e.originalEvent.pageX || e.originalEvent.touches[0].pageX;
            startY = e.originalEvent.pageY || e.originalEvent.touches[0].pageY;
            dragging = !0;
        })
        .on("touchmove pointermove MSPointerMove", options.selector, function (a) {
            if ($.isFunction(options.stop)) {
                is_stop = options.stop(_e, $(this), startX, startY);
            }
            if (dragging && !is_stop) {
                endX = a.originalEvent.pageX || a.originalEvent.touches[0].pageX;
                endY = a.originalEvent.pageY || a.originalEvent.touches[0].pageY;
                distanceX = endX - startX;
                distanceY = endY - startY;
                angle = 180 * Math.atan2(distanceY, distanceX) / Math.PI;
                "right" == options.direction && (distanceY = 0, distanceX = ((angle > -40 && angle < 40) && distanceX > 0) ? distanceX : 0);
                "left" == options.direction && (distanceY = 0, distanceX = ((angle > 150 || angle < -150) && 0 > distanceX) ? distanceX : 0);
                "top" == options.direction && (distanceX = 0, distanceY = ((angle > -130 && angle < -50) && 0 > distanceY) ? distanceY : 0);
                "bottom" == options.direction && (distanceX = 0, distanceY = ((angle > 50 && angle < 130) && distanceY > 0) ? distanceY : 0);
                if (distanceX !== 0 || distanceY !== 0) {
                    a.preventDefault ? a.preventDefault() : a.returnValue = !1;
                    cssTransition($(this), distanceX, distanceY, dragging, 'grab');
                    $.isFunction(options.onIng) && options.onIng(_e, $(this), distanceX, distanceY);
                }
            }
        })
        .on('touchend touchcancel pointerup MSPointerUp', options.selector, function (e) {
            if (dragging && !is_stop) {
                cssTransition($(this), 0, 0, "null", '');
                $.isFunction(options.inEnd) && options.inEnd(_e, $(this), distanceX, distanceY);
                if (Math.abs(distanceX) > dep || Math.abs(distanceY) > dep) {
                    $.isFunction(options.onEnd) && options.onEnd(_e, $(this), distanceX, distanceY);
                }
                startX = startY = endX = endY = angle = distanceX = distanceY = 0;
                dragging = !1;
            }
        });
}