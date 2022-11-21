/*
 * @Author        : Qinver
 * @Url           : zibll.com
 * @Date          : 2020-09-29 13:18:40
 * @LastEditTime: 2021-08-30 11:15:47
 * @Email         : 770349780@qq.com
 * @Project       : Zibll子比主题
 * @Description   : 一款极其优雅的Wordpress主题
 * @Read me       : 感谢您使用子比主题，主题源码有详细的注释，支持二次开发。欢迎各位朋友与我相互交流。
 * @Remind        : 使用盗版主题会存在各种未知风险。支持正版，从我做起！
 */

//libs-插件
//jQuery.cookie
jQuery.cookie = function (e, o, t) {
    if (void 0 === o) {
        var i = null;
        if (document.cookie && "" != document.cookie)
            for (var r = document.cookie.split(";"), n = 0; n < r.length; n++) {
                var c = jQuery.trim(r[n]);
                if (c.substring(0, e.length + 1) == e + "=") {
                    i = decodeURIComponent(c.substring(e.length + 1));
                    break
                }
            }
        return i
    }
    t = t || {}, null === o && (o = "", t.expires = -1);
    var a = "";
    if (t.expires && ("number" == typeof t.expires || t.expires.toUTCString)) {
        var l;
        "number" == typeof t.expires ? (l = new Date, l.setTime(l.getTime() + 24 * t.expires * 60 * 60 * 1e3)) : l = t.expires, a = "; expires=" + l.toUTCString()
    }
    var u = t.path ? "; path=" + t.path : "",
        s = t.domain ? "; domain=" + t.domain : "",
        m = t.secure ? "; secure" : "";
    document.cookie = [e, "=", encodeURIComponent(o), a, u, s, m].join("")
};
var lcs = {
    get: function (e) {
        return window.localStorage ? localStorage.getItem(e) : $.cookie(e)
    },
    set: function (e, o) {
        window.localStorage ? localStorage[e] = o : $.cookie(e, o)
    },
    remove: function (e) {
        window.localStorage ? localStorage.removeItem(e) : $.cookie(e, "")
    }
};

//lazySizes
! function (a, b) {
    var c = b(a, a.document, Date);
    a.lazySizes = c, "object" == typeof module && module.exports && (module.exports = c)
}("undefined" != typeof window ? window : {}, function (a, b, c) {
    "use strict";
    var d, e;
    if (function () {
            var b, c = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: !0,
                ricTimeout: 0,
                throttleDelay: 125
            };
            e = a.lazySizesConfig || a.lazysizesConfig || {};
            for (b in c) b in e || (e[b] = c[b])
        }(), !b || !b.getElementsByClassName) return {
        init: function () {},
        cfg: e,
        noSupport: !0
    };
    var f = b.documentElement,
        g = a.HTMLPictureElement,
        h = "addEventListener",
        i = "getAttribute",
        j = a[h].bind(a),
        k = a.setTimeout,
        l = a.requestAnimationFrame || k,
        m = a.requestIdleCallback,
        n = /^picture$/i,
        o = ["load", "error", "lazyincluded", "_lazyloaded"],
        p = {},
        q = Array.prototype.forEach,
        r = function (a, b) {
            return p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), p[b].test(a[i]("class") || "") && p[b]
        },
        s = function (a, b) {
            r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b)
        },
        t = function (a, b) {
            var c;
            (c = r(a, b)) && a.setAttribute("class", (a[i]("class") || "").replace(c, " "))
        },
        u = function (a, b, c) {
            var d = c ? h : "removeEventListener";
            c && u(a, b), o.forEach(function (c) {
                a[d](c, b)
            })
        },
        v = function (a, c, e, f, g) {
            var h = b.createEvent("Event");
            return e || (e = {}), e.instance = d, h.initEvent(c, !f, !g), h.detail = e, a.dispatchEvent(h), h
        },
        w = function (b, c) {
            var d;
            !g && (d = a.picturefill || e.pf) ? (c && c.src && !b[i]("srcset") && b.setAttribute("srcset", c.src), d({
                reevaluate: !0,
                elements: [b]
            })) : c && c.src && (b.src = c.src)
        },
        x = function (a, b) {
            return (getComputedStyle(a, null) || {})[b]
        },
        y = function (a, b, c) {
            for (c = c || a.offsetWidth; c < e.minSize && b && !a._lazysizesWidth;) c = b.offsetWidth, b = b.parentNode;
            return c
        },
        z = function () {
            var a, c, d = [],
                e = [],
                f = d,
                g = function () {
                    var b = f;
                    for (f = d.length ? e : d, a = !0, c = !1; b.length;) b.shift()();
                    a = !1
                },
                h = function (d, e) {
                    a && !e ? d.apply(this, arguments) : (f.push(d), c || (c = !0, (b.hidden ? k : l)(g)))
                };
            return h._lsFlush = g, h
        }(),
        A = function (a, b) {
            return b ? function () {
                z(a)
            } : function () {
                var b = this,
                    c = arguments;
                z(function () {
                    a.apply(b, c)
                })
            }
        },
        B = function (a) {
            var b, d = 0,
                f = e.throttleDelay,
                g = e.ricTimeout,
                h = function () {
                    b = !1, d = c.now(), a()
                },
                i = m && g > 49 ? function () {
                    m(h, {
                        timeout: g
                    }), g !== e.ricTimeout && (g = e.ricTimeout)
                } : A(function () {
                    k(h)
                }, !0);
            return function (a) {
                var e;
                (a = !0 === a) && (g = 33), b || (b = !0, e = f - (c.now() - d), e < 0 && (e = 0), a || e < 9 ? i() : k(i, e))
            }
        },
        C = function (a) {
            var b, d, e = 99,
                f = function () {
                    b = null, a()
                },
                g = function () {
                    var a = c.now() - d;
                    a < e ? k(g, e - a) : (m || f)(f)
                };
            return function () {
                d = c.now(), b || (b = k(g, e))
            }
        },
        D = function () {
            var g, m, o, p, y, D, F, G, H, I, J, K, L = /^img$/i,
                M = /^iframe$/i,
                N = "onscroll" in a && !/(gle|ing)bot/.test(navigator.userAgent),
                O = 0,
                P = 0,
                Q = 0,
                R = -1,
                S = function (a) {
                    Q--, (!a || Q < 0 || !a.target) && (Q = 0)
                },
                T = function (a) {
                    return null == K && (K = "hidden" == x(b.body, "visibility")), K || !("hidden" == x(a.parentNode, "visibility") && "hidden" == x(a, "visibility"))
                },
                U = function (a, c) {
                    var d, e = a,
                        g = T(a);
                    for (G -= c, J += c, H -= c, I += c; g && (e = e.offsetParent) && e != b.body && e != f;)(g = (x(e, "opacity") || 1) > 0) && "visible" != x(e, "overflow") && (d = e.getBoundingClientRect(), g = I > d.left && H < d.right && J > d.top - 1 && G < d.bottom + 1);
                    return g
                },
                V = function () {
                    var a, c, h, j, k, l, n, o, q, r, s, t, u = d.elements;
                    if ((p = e.loadMode) && Q < 8 && (a = u.length)) {
                        for (c = 0, R++; c < a; c++)
                            if (u[c] && !u[c]._lazyRace)
                                if (!N || d.prematureUnveil && d.prematureUnveil(u[c])) ba(u[c]);
                                else if ((o = u[c][i]("data-expand")) && (l = 1 * o) || (l = P), r || (r = !e.expand || e.expand < 1 ? f.clientHeight > 500 && f.clientWidth > 500 ? 500 : 370 : e.expand, d._defEx = r, s = r * e.expFactor, t = e.hFac, K = null, P < s && Q < 1 && R > 2 && p > 2 && !b.hidden ? (P = s, R = 0) : P = p > 1 && R > 1 && Q < 6 ? r : O), q !== l && (D = innerWidth + l * t, F = innerHeight + l, n = -1 * l, q = l), h = u[c].getBoundingClientRect(), (J = h.bottom) >= n && (G = h.top) <= F && (I = h.right) >= n * t && (H = h.left) <= D && (J || I || H || G) && (e.loadHidden || T(u[c])) && (m && Q < 3 && !o && (p < 3 || R < 4) || U(u[c], l))) {
                            if (ba(u[c]), k = !0, Q > 9) break
                        } else !k && m && !j && Q < 4 && R < 4 && p > 2 && (g[0] || e.preloadAfterLoad) && (g[0] || !o && (J || I || H || G || "auto" != u[c][i](e.sizesAttr))) && (j = g[0] || u[c]);
                        j && !k && ba(j)
                    }
                },
                W = B(V),
                X = function (a) {
                    var b = a.target;
                    if (b._lazyCache) return void delete b._lazyCache;
                    S(a), s(b, e.loadedClass), t(b, e.loadingClass), u(b, Z), v(b, "lazyloaded")
                },
                Y = A(X),
                Z = function (a) {
                    Y({
                        target: a.target
                    })
                },
                $ = function (a, b) {
                    try {
                        a.contentWindow.location.replace(b)
                    } catch (c) {
                        a.src = b
                    }
                },
                _ = function (a) {
                    var b, c = a[i](e.srcsetAttr);
                    (b = e.customMedia[a[i]("data-media") || a[i]("media")]) && a.setAttribute("media", b), c && a.setAttribute("srcset", c)
                },
                aa = A(function (a, b, c, d, f) {
                    var g, h, j, l, m, p;
                    (m = v(a, "lazybeforeunveil", b)).defaultPrevented || (d && (c ? s(a, e.autosizesClass) : a.setAttribute("sizes", d)), h = a[i](e.srcsetAttr), g = a[i](e.srcAttr), f && (j = a.parentNode, l = j && n.test(j.nodeName || "")), p = b.firesLoad || "src" in a && (h || g || l), m = {
                        target: a
                    }, s(a, e.loadingClass), p && (clearTimeout(o), o = k(S, 2500), u(a, Z, !0)), l && q.call(j.getElementsByTagName("source"), _), h ? a.setAttribute("srcset", h) : g && !l && (M.test(a.nodeName) ? $(a, g) : a.src = g), f && (h || l) && w(a, {
                        src: g
                    })), a._lazyRace && delete a._lazyRace, t(a, e.lazyClass), z(function () {
                        var b = a.complete && a.naturalWidth > 1;
                        p && !b || (b && s(a, "ls-is-cached"), X(m), a._lazyCache = !0, k(function () {
                            "_lazyCache" in a && delete a._lazyCache
                        }, 9)), "lazy" == a.loading && Q--
                    }, !0)
                }),
                ba = function (a) {
                    if (!a._lazyRace) {
                        var b, c = L.test(a.nodeName),
                            d = c && (a[i](e.sizesAttr) || a[i]("sizes")),
                            f = "auto" == d;
                        (!f && m || !c || !a[i]("src") && !a.srcset || a.complete || r(a, e.errorClass) || !r(a, e.lazyClass)) && (b = v(a, "lazyunveilread").detail, f && E.updateElem(a, !0, a.offsetWidth), a._lazyRace = !0, Q++, aa(a, b, f, d, c))
                    }
                },
                ca = C(function () {
                    e.loadMode = 3, W()
                }),
                da = function () {
                    3 == e.loadMode && (e.loadMode = 2), ca()
                },
                ea = function () {
                    if (!m) {
                        if (c.now() - y < 999) return void k(ea, 999);
                        m = !0, e.loadMode = 3, W(), j("scroll", da, !0)
                    }
                };
            return {
                _: function () {
                    y = c.now(), d.elements = b.getElementsByClassName(e.lazyClass), g = b.getElementsByClassName(e.lazyClass + " " + e.preloadClass), j("scroll", W, !0), j("resize", W, !0), j("pageshow", function (a) {
                        if (a.persisted) {
                            var c = b.querySelectorAll("." + e.loadingClass);
                            c.length && c.forEach && l(function () {
                                c.forEach(function (a) {
                                    a.complete && ba(a)
                                })
                            })
                        }
                    }), a.MutationObserver ? new MutationObserver(W).observe(f, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0
                    }) : (f[h]("DOMNodeInserted", W, !0), f[h]("DOMAttrModified", W, !0), setInterval(W, 999)), j("hashchange", W, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function (a) {
                        b[h](a, W, !0)
                    }), /d$|^c/.test(b.readyState) ? ea() : (j("load", ea), b[h]("DOMContentLoaded", W), k(ea, 2e4)), d.elements.length ? (V(), z._lsFlush()) : W()
                },
                checkElems: W,
                unveil: ba,
                _aLSL: da
            }
        }(),
        E = function () {
            var a, c = A(function (a, b, c, d) {
                    var e, f, g;
                    if (a._lazysizesWidth = d, d += "px", a.setAttribute("sizes", d), n.test(b.nodeName || ""))
                        for (e = b.getElementsByTagName("source"), f = 0, g = e.length; f < g; f++) e[f].setAttribute("sizes", d);
                    c.detail.dataAttr || w(a, c.detail)
                }),
                d = function (a, b, d) {
                    var e, f = a.parentNode;
                    f && (d = y(a, f, d), e = v(a, "lazybeforesizes", {
                        width: d,
                        dataAttr: !!b
                    }), e.defaultPrevented || (d = e.detail.width) && d !== a._lazysizesWidth && c(a, f, e, d))
                },
                f = function () {
                    var b, c = a.length;
                    if (c)
                        for (b = 0; b < c; b++) d(a[b])
                },
                g = C(f);
            return {
                _: function () {
                    a = b.getElementsByClassName(e.autosizesClass), j("resize", g)
                },
                checkElems: g,
                updateElem: d
            }
        }(),
        F = function () {
            !F.i && b.getElementsByClassName && (F.i = !0, E._(), D._())
        };
    return k(function () {
        e.init && F()
    }), d = {
        cfg: e,
        autoSizer: E,
        loader: D,
        init: F,
        uP: w,
        aC: s,
        rC: t,
        hC: r,
        fire: v,
        gW: y,
        rAF: z
    }
});

//滑动手势minitouch
$.fn.minitouch = function (n) {
    n = $.extend({
        direction: "bottom",
        selector: "",
        depreciation: 50,
        stop: !1,
        onStart: !1,
        onIng: !1,
        onEnd: !1,
        inEnd: !1
    }, n);
    var t = $(this),
        o = !1,
        i = n.depreciation,
        e = 0,
        r = 0,
        a = 0,
        s = 0,
        c = 0,
        u = 0,
        l = 0,
        p = !1,
        d = function (n, t, o, i, e) {
            var r, a, s;
            i && (t += "px", o += "px", r = "translate3D(" + t + "," + o + " , 0)", a = {}, s = g(), a[s + "transform"] = r, a[s + "transition"] = s + "transform 0s linear", a.cursor = e, "null" == i && (a[s + "transform"] = "", a[s + "transition"] = ""), n.css(a))
        },
        g = function () {
            var n = document.body || document.documentElement;
            return n = n.style, "" == n.WebkitTransition ? "-webkit-" : "" == n.MozTransition ? "-moz-" : "" == n.OTransition ? "-o-" : "" == n.transition ? "" : void 0
        };
    t.on("touchstart pointerdown MSPointerDown", n.selector, function (n) {
        e = r = a = s = c = u = l = 0, e = n.originalEvent.pageX || n.originalEvent.touches[0].pageX, r = n.originalEvent.pageY || n.originalEvent.touches[0].pageY, p = !0
    }).on("touchmove pointermove MSPointerMove", n.selector, function (i) {
        $.isFunction(n.stop) && (o = n.stop(t, $(this), e, r)), p && !o && (a = i.originalEvent.pageX || i.originalEvent.touches[0].pageX, s = i.originalEvent.pageY || i.originalEvent.touches[0].pageY, u = a - e, l = s - r, c = 180 * Math.atan2(l, u) / Math.PI, "right" == n.direction && (l = 0, u = c > -40 && c < 40 && u > 0 ? u : 0), "left" == n.direction && (l = 0, u = (c > 150 || c < -150) && 0 > u ? u : 0), "top" == n.direction && (u = 0, l = c > -130 && c < -50 && 0 > l ? l : 0), "bottom" == n.direction && (u = 0, l = c > 50 && c < 130 && l > 0 ? l : 0), 0 === u && 0 === l || (i.preventDefault ? i.preventDefault() : i.returnValue = !1, d($(this), u, l, p, "grab"), $.isFunction(n.onIng) && n.onIng(t, $(this), u, l)))
    }).on("touchend touchcancel pointerup MSPointerUp", n.selector, function (g) {
        p && !o && (d($(this), 0, 0, "null", ""), $.isFunction(n.inEnd) && n.inEnd(t, $(this), u, l), (Math.abs(u) > i || Math.abs(l) > i) && $.isFunction(n.onEnd) && n.onEnd(t, $(this), u, l), e = r = a = s = c = u = l = 0, p = !1)
    })
};

//全局WIN变量
_win.bd = $('body');
_win.is_signin = !!_win.bd.hasClass('logged-in');
_win.bd.on('click', '[data-close]', function () {
    var e = $(this).attr('data-close')
    return $(e).removeClass('show in'), !1;
})

_win.bd.on('click', '[data-toggle-class]', function () {
    var c = $(this).attr('data-toggle-class') || 'show';
    var e = $(this).attr('data-target') || this;
    return $(e).toggleClass(c), !1;
})

//按钮点击触发另一个按钮点击
_win.bd.on('click', "[data-onclick]", function () {
    var e = $(this).attr('data-onclick');
    return $(e).click();
});

//单次绑定事件，只能绑定一次事件
$.fn.OnlyOn = function (type, selector, data, fun) {
    var rnotwhite = (/\S+/g);
    var is_oned = false;
    //提取第一个绑定类型
    type = type.match(rnotwhite)[0];
    //获取目前已经绑定的全部事件
    var events = $._data(this[0], 'events');

    if (events && typeof events['type'] != 'undefined') {
        $.each(events[type], function (i, item) {
            if (item.selector == selector && item.data == data) {
                is_oned = true;
                return false;
            }
        })
    }
    if (!is_oned) {
        this.on(type, selector, data, fun);
    } else {
        console.log('事件重复绑定{type：' + type + ',selector:' + selector + ',data:' + data + '}');
    }
}

//倒计时功能
function countdown(_this) {
    var endtime = _this.attr('data-countdown');

    function getTimeRemaining(endtime) {

        var date = new Date();
        var now = date.getTime();
        var endDate = new Date(endtime); //设置截止时间
        var end = endDate.getTime();
        var total = end - now;

        var seconds = ((total / 1000) % 60);
        seconds = seconds.toFixed(2);
        seconds = seconds < 10 ? '0' + seconds : seconds;
        var mseconds = ~~(total % 1000);
        var minutes = ~~((total / 1000 / 60) % 60);
        var hours = ~~((total / (1000 * 60 * 60)) % 24);
        var days = ~~(total / (1000 * 60 * 60 * 24));

        return {
            total,
            days,
            hours,
            minutes,
            seconds,
            mseconds,
        };
    }

    function updateClock() {
        var t = getTimeRemaining(endtime);
        var html = t.days + '天' + t.hours + '小时' + t.minutes + '分' + t.seconds + '秒';
        _this.html(html);
        if (t.total <= 0) {
            clearInterval(timeinterval);
            var over_text = _this.attr('data-over-text') || '已结束';
            _this.html(over_text);
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 20);
}


//视频
_win.dplayer = {};
if ($('.new-dplayer,[data-dplayer]').length) {
    $('link#dplayer').length || $('dplayer').append('<link type="text/css" id="dplayer" rel="stylesheet" href="' + _win.uri + '/css/dplayer.min.css">');

    var dplayer_tbquire = [];

    $('.new-dplayer,[data-dplayer]').each(function (i) {
        var option = {};
        var _this = $(this);
        var video_url = _this.attr("video-url");
        var data_volume = _this.attr("data-volume");

        if (_this.find('.dplayer-video-wrap').length || !video_url) return;
        _this.attr("id", 'dplayer-' + i);
        option.container = document.getElementById('dplayer-' + i);
        option.theme = '#f04494';
        option.video = {
            url: video_url,
            pic: _this.attr("video-pic") || '',
            type: _this.attr("video-type") || 'auto',
        }
        _this.attr("data-loop") && (option.loop = true);
        _this.attr("data-autoplay") && (option.autoplay = true);
        if (data_volume && data_volume < 1) {
            option.volume = data_volume
        }

        var option_attr = _this.attr("video-option");
        if (option_attr) {
            try {
                option_attr = JSON.parse(option_attr);
            } catch (e) {}
            $.extend(option, option_attr);
        }

        //第三方插件判断添加
        var v_u = video_url.toLowerCase();
        v_u.indexOf(".m3u") != -1 && dplayer_tbquire.push('hls');
        v_u.indexOf(".mpd") != -1 && dplayer_tbquire.push('dash');
        v_u.indexOf(".flv") != -1 && dplayer_tbquire.push('flv');

        dplayer_tbquire.push('dplayer');
        tbquire(dplayer_tbquire, function () {
            try {
                _win.dplayer[i] = (new DPlayer(option))
            } catch (e) {}
        })

        //视频剧集
        _this.siblings('.dplayer-featured').find('.switch-video').attr('dplayer-id', i);

    });
}
//视频剧集
_win.bd.on('click', '.switch-video', function (e) {
    var _this = $(this);
    var dplayer_id = _this.attr('dplayer-id');
    var dplayer = _win.dplayer[dplayer_id];
    var video_url = _this.attr('video-url');
    if (!video_url || !dplayer || _this.hasClass('active')) return;
    _this.addClass('active').siblings().removeClass('active');
    //第三方插件判断添加
    var dplayer_tbquire = [];
    var v_u = video_url.toLowerCase();
    v_u.indexOf(".m3u") != -1 && dplayer_tbquire.push('hls');
    v_u.indexOf(".mpd") != -1 && dplayer_tbquire.push('dash');
    v_u.indexOf(".flv") != -1 && dplayer_tbquire.push('flv');
    tbquire(dplayer_tbquire, function () {
        try {
            dplayer.switchVideo({
                url: video_url,
                pic: _this.attr("video-pic") || '',
                type: 'auto',
            })
            dplayer.play();
        } catch (e) {}
    })
});


//文章TAB
_win.bd.on('click', '.post-tab-toggle', function (e) {
    var _this = $(this);
    var tab_id = _this.attr('tab-id');
    if (_this.hasClass('active')) return;
    var _con = _this.parent().addClass('active').siblings().removeClass('active').parent().next().find('[tab-id="' + tab_id + '"]');
    _con.siblings().removeClass('in');
    setTimeout(function () {
        _con.addClass('active').siblings().removeClass('active');
    }, 150);
    setTimeout(function () {
        _con.addClass('in')
    }, 160);
});

//幻灯片
_win.swiper = [];
_win.swiper.tab = {};
_win.swiper.scroll = {};
_win.swiper.new = {};

function new_swiper() {
    if ($('.swiper-scroll:not(.swiper-container-initialized),.new-swiper:not(.swiper-container-initialized),.swiper-tab:not(.swiper-container-initialized)').length) {
        $('link#swiper').length || $('head').append('<link type="text/css" id="swiper" rel="stylesheet" href="' + _win.uri + '/css/swiper.min.css">');
        tbquire(['swiper'], function () {
            $('.swiper-scroll').each(function (e) {
                if ($(this).hasClass('swiper-container-initialized')) return;
                var option = {};
                var _this = $(this);
                var _eq = 'swiper-scroll-eq-' + e;
                var slideClass = _this.attr("data-slideClass") || false;
                slideClass && (option.slideClass = slideClass);

                if (!_this.attr('scroll-nogroup')) {
                    var c_w = _this.width();
                    var i_w = _this.find('.swiper-slide').outerWidth(true);
                    var slidesPerGroup = ~~(c_w / i_w);
                    option.slidesPerGroup = slidesPerGroup || 1;
                }

                option.slidesPerView = 'auto';
                option.mousewheel = {
                    forceToAxis: true,
                };
                option.freeMode = true;
                option.freeModeSticky = true;

                option.navigation = {
                    nextEl: '.swiper-scroll.' + _eq + ' .swiper-button-next',
                    prevEl: '.swiper-scroll.' + _eq + ' .swiper-button-prev',
                };

                _this.addClass(_eq).attr('swiper-scroll-index', e);
                _win.swiper.scroll[e] = (new Swiper('.swiper-scroll.' + _eq, option))
            })
            $('.swiper-tab').each(function (e) {
                if ($(this).hasClass('swiper-container-initialized')) return;
                var _eq = 'swiper-eq-' + e;
                var _this = $(this);

                var speed = ~~(_this.attr("data-speed")) || ~~((_this.width() + 1200) / 250) * 100;
                var initialSlide = ~~(_this.attr("active-index"));
                speed = speed < 400 ? 400 : speed;

                var option = {
                    loop: false,
                    initialSlide: initialSlide,
                    autoHeight: true,
                    spaceBetween: 20,
                    autoplay: false,
                    speed: speed,
                    pagination: {
                        el: '.swiper-tab.' + _eq + ' .swiper-pagination',
                        clickable: true,
                    },
                    on: {
                        slideChangeTransitionEnd: function () {
                            var b = $('.swiper-tab.' + _eq + ' .swiper-slide-active .post_ajax_trigger .ajax-open');
                            b.length && b.click();
                            /**
                            if (!!(window.history && history.pushState)) {
                                var url = '#tab=' + (this.activeIndex + 1);
                                history.pushState({}, null, url);
                            }
                             */
                        }
                    }
                };

                var tab_id = _this.attr("swiper-tab");
                var tab_nav = $('[swiper-tab-nav="' + tab_id + '"]');
                if (tab_nav.length) {
                    var tab_nav_index = tab_nav.attr("swiper-scroll-index");
                    option['thumbs'] = {
                        swiper: _win.swiper.scroll[tab_nav_index],
                        autoScrollOffset: 2,
                    };
                }

                _this.addClass(_eq).attr('swiper-tab-index', e);
                _win.swiper.tab[e] = (new Swiper('.swiper-tab.' + _eq, option));
            });
            $('.new-swiper').each(function (e) {

                if ($(this).hasClass('swiper-container-initialized')) return;

                var _eq = 'swiper-eq-' + e;
                var _this = $(this);
                var delay = ~~(_this.attr("data-interval")) || 6000;
                var autoplay = _this.attr("data-autoplay") ? {
                    delay: delay,
                    disableOnInteraction: false
                } : false;
                var auto_h = _this.attr("auto-height") ? true : false;
                var speed = ~~(_this.attr("data-speed")) || ~~((_this.width() + 1200) / 250) * 100;
                speed = speed < 400 ? 400 : speed;

                var loop = _this.attr("data-loop") ? true : false;
                var parallax = _this.find('[data-swiper-parallax],[data-swiper-parallax-scale]').length ? true : false;
                var effect = _this.attr("data-effect") || 'slide';
                var direction = _this.attr("data-direction") || 'horizontal';
                var spaceBetween = ~~(_this.attr("data-spaceBetween")) || 0;

                _this.addClass(_eq).attr('swiper-new-index', e);

                _win.swiper.new[e] = new Swiper('.new-swiper.' + _eq, {
                    loop: loop,
                    autoHeight: auto_h,
                    direction: direction,
                    spaceBetween: spaceBetween,
                    parallax: parallax,
                    effect: effect,
                    lazy: {
                        loadPrevNext: !0
                    },
                    autoplay: autoplay,
                    speed: speed,
                    pagination: {
                        el: '.new-swiper.' + _eq + ' .swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.new-swiper.' + _eq + ' .swiper-button-next',
                        prevEl: '.new-swiper.' + _eq + ' .swiper-button-prev',
                    },
                    on: {
                        lazyImageReady: function (slideEl, imageEl) {
                            $(imageEl).addClass('lazyloaded');
                        },
                    }
                })
            });
        })
    }
}

function swiper_tab_AutoHeight($con) {
    var tab = $($con.parents('[swiper-tab-index]')[0]);
    if (tab.length) {
        var tab_index = tab.attr('swiper-tab-index');
        setTimeout(function () {
            _win.swiper.tab[tab_index].updateAutoHeight(500);
        }, 50);
    }
}
/**
 * @description: AJAX获取包装函数
 * @param {*} _this 传入点击按钮的自己,需要有href或ajax-href下一页的链接(必须)
 * @param {*} con 需要插入的父元素选择器 (必须)
 * @param {*} jcon 获取内容的父元素选择器 (必须)
 * @param {*} item 获取的列表选择器   (必须)
 * @param {*} loader 加载动画的内容 （非必须，有默认值）
 * @param {*} pag 获取的分页内容选择器 （必须）
 * @param {*} next 如果需要重新插入下一页链接：获取分页内容中的下一页 选择器
 * @param {*} trigger 将获取的下一页链接从新插入到的新的 按钮中-的class值
 * @param {*} replace 替换列表内容而不是追加|'ajax-replace'
 * @param {*} nomore 全部加载完成之后的文案
 * @param {*} top 将内容追加到顶部而不是底部
 * @return {*}
 */
function post_ajax(_this, con, jcon, item, loader, pag, next, trigger, replace, nomore, top, ajax_trigger) {
    //准备参数
    var $con = $(_this.parents(con)[0]);
    var $loader = $con.find('.post_ajax_loader');
    var $item = $con.find(item);
    var href = _this.attr("ajax-href") || _this.attr("href") || _this.find('a').attr("ajax-href") || _this.find('a').attr("href");
    jcon = jcon || con;
    ajax_trigger = ajax_trigger || (_win.ajax_trigger ? _win.ajax_trigger : '<i class="fa fa-arrow-right"></i>加载更多');
    replace = _this.attr('ajax-replace') || replace;
    nomore = nomore || _win.ajax_nomore;
    if ($loader.length) {
        loader = $loader.prop("outerHTML");
    } else {
        loader = loader || '<div class="theme-box box-body ajax-loading text-center"><h2 class="loading zts"></h2></div>';
        loader = '<div class="post_ajax_loader">' + loader + "</div>";
    }
    href && $.ajax({
        type: "GET",
        url: href,
        dataType: "html",
        beforeSend: function () {
            replace && $con.find(item).remove();
            $con.find(".post_ajax_trigger,.no-more,.post_ajax_loader,.noajax-pag," + pag).remove();
            if ($con.find(item).length) {
                top ? $item.first().before(loader) : $item.last().after(loader);
            } else {
                $con.append(loader);
            }
            $con.find(".post_ajax_loader").fadeIn();
        },
        success: function (a) {
            a = $.parseHTML(a);
            $item = $con.find(item);
            var $jcon = $(a).find(jcon);
            var con_id = $jcon.attr('id');
            var c_c = $jcon.find(item); //列表
            var c_p = $jcon.find(pag); //下一页
            var n_h = c_p.find(next).attr("href") || c_p.find(next).find('a').attr("href"); //下一页链接
            c_p = c_p.length ? c_p : '<div class="text-center mb20 padding-h10 muted-2-color no-more separator">' + nomore + '</div>'; //是否还有下一页
            c_p = $jcon.find('.noajax-pag').length ? $jcon.find('.noajax-pag') : c_p;
            // console.log(c_c, c_p, n_h);
            //全局替换
            $("[win-ajax-replace]").each(function () {
                var wr_t = $(this);
                var wr_i = wr_t.attr('win-ajax-replace');
                var wr_v = $(a).find('[win-ajax-replace="' + wr_i + '"]').html();
                wr_v && wr_t.html(wr_v);
            })

            if (trigger) {
                //将获取的下一页链接重新插入到的新的 按钮中
                c_p = "undefined" != typeof n_h ? '<span class="post_ajax_trigger"><a class="' + trigger + '" href="' + n_h + '">' + ajax_trigger + "</a></span>" : c_p
            }

            $con.find(".post_ajax_trigger,.post_ajax_loader").remove(); //删除老的下一页链接/加载动画
            if ($item.length) {
                //原本有列表则追加
                if (top) {
                    //追加方向为顶部
                    $item.first().before(c_c);
                    $con.find(item).first().before(c_p);
                } else {
                    //追加方向为底部
                    $item.last().after(c_c);
                    $con.find(item).last().after(c_p);
                }
            } else {
                //原本无列表则添加
                if (top) {
                    $con.append(c_p).append(c_c);
                } else {
                    $con.append(c_c).append(c_p);
                }
            }
            $con.append(loader).find(".post_ajax_loader").hide();

            swiper_tab_AutoHeight($con);
            auto_fun();
        }
    })
    return !1;
}


_win.bd.on('show.bs.tab', 'a[data-ajax]', function (e) {
    var a = e.target.hash;
    var b = $(a + ' .post_ajax_trigger .ajax-next.ajax-open');
    b.length && b.click();
});
$(".container").on('click', "[ajax-tab],[ajax-target]", function () {
    var _this = $(this);
    var replace = _this.attr('ajax-replace') ? ' ajax-replace="true"' : '';
    var target = _this.attr('ajax-tab') || _this.attr('ajax-target');
    var href = _this.attr('data-ajax');
    var trigger = '<span class="post_ajax_trigger hide"><a ajax-href="' + href + '" class="ajax_load ajax-next ajax-open"' + replace + '></a></span>';
    $(target).append(trigger);
    $(target + ' .post_ajax_trigger .ajax-next').click();
    $('a[href="' + target + '"]').click();
});
//文章手动ajax
$(".container").on('click', ".ajax-next", function () {
    var _this = $(this);
    var _loader = '<div class="text-center muted-2-color mt20"><i class="loading mr10"></i>加载中...</div>';
    if (_this.attr('ajax-replace')) {
        _loader = '<div class="posts-item flex"><div class="post-graphic"><div class="radius8 item-thumbnail placeholder"></div> </div><div class="item-body flex xx flex1 jsb"> <p class="placeholder t1"></p> <h4 class="item-excerpt placeholder k1"></h4><p class="placeholder k2"></p><i><i class="placeholder s1"></i><i class="placeholder s1 ml10"></i></i></div></div>';
        _loader += _loader;
        _loader += _loader;
    }
    _loader = '<div class="mb20">' + _loader + '</div>';
    swiper_tab_AutoHeight(_this);
    return post_ajax(_this, '.ajaxpager', '.ajaxpager', '.ajax-item', _loader, '.ajax-pag');
});

var _wid = $(window).width();
var _hei = $(window).height();

//文章幻灯片
if ($('.wp-block-carousel').length) {
    if (!$("link#swiper").length) {
        $('head').append('<link type="text/css" id="swiper" rel="stylesheet" href="' + _win.uri + '/css/swiper.min.css">');
    }
    var _sc = $('.wp-block-carousel');
    var Sw = [];

    tbquire(['swiper'], function () {
        _sc.each(function (si) {

            var _this = $(this);
            var _eq = 'swiper-post-' + si;

            if (_this.find('.wp-block-gallery>.blocks-gallery-grid').length) {
                _this.find('.wp-block-gallery').html(_this.find('.wp-block-gallery>.blocks-gallery-grid').html())
            }

            _this.find('.wp-block-gallery').removeClass().addClass('swiper-wrapper').find('.blocks-gallery-item').addClass('swiper-slide');
            _this.find('.carousel-control.left').replaceWith('<div class="swiper-button-next"></div>');
            _this.find('.carousel-control.right').replaceWith('<div class="swiper-button-prev"></div><div class="swiper-pagination"></div>');

            var _ss = _this.find('.carousel');
            var proportion = _ss.attr('proportion') || 0.6;
            var style = _ss.attr('style');

            _ss.addClass(_eq + ' new-swiper scale-height').attr('style', '--scale-height:' + (proportion * 100) + '%;');
            _this.attr('style', style);

            var delay = ~~(_ss.attr("data-interval")) || 6000,
                loop = _ss.attr("data-jyloop") || false,
                effect = _ss.attr("data-effect") || 'slide';

            var speed = ~~((_ss.width() + 1200) / 250) * 100;

            Sw['swiper_wz_' + si] = new Swiper('.wp-block-carousel .' + _eq, {
                spaceBetween: 10,
                speed: speed,
                loop: loop,
                effect: effect,
                autoplay: {
                    delay: delay,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.' + _eq + ' .swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '.' + _eq + ' .swiper-button-next',
                    prevEl: '.' + _eq + ' .swiper-button-prev',
                },
            })
        })
    })
}

/**模态框居中 */
_win.bd.on("show.bs.modal loaded.bs.modal", ".modal", function () {
    var o = $(this);
    var i = o.find(".modal-dialog");
    o.css("display", "block"), i.css({
        "margin-top": Math.max(0, (_hei - i.height()) / 2)
    });
    auto_fun();
});


if (_wid < 768 && $('.affix-header').length) {
    var affix_header_top = $('.affix-header').offset().top;
    var affix_header_hh = _win.bd.hasClass("nav-fixed") ? $(".header").outerHeight() : 0;
    $('.affix-header').affix({
        offset: {
            top: function () {
                return affix_header_top - affix_header_hh;
            }
        }
    }).on("affix.bs.affix", function () {
        $(this).css({
            top: affix_header_hh
        });
    })
}

function auto_fun() {
    //兼容性图片懒加载
    $("img[data-src]:not(.lazyload,.lazyloaded,.lazyloading,.swiper-lazy)").addClass('lazyload');
    //支付功能
    $(".initiate-pay,.pay-vip").length && tbquire(["pay"]);
    //消息功能
    $(".from-private,.author-msg").length && tbquire(["message"], function () {
        scroll_down();
    });
    $(".dropdown-smilie,.dropdown-code,.dropdown-image").length && tbquire(["input-expand"]);
    /**上传图片 */
    $('[zibupload]').length && tbquire(["mini-upload"]);

    /* 提示工具*/
    $("[data-toggle='tooltip']").tooltip({
        container: 'body',
        delay: {
            show: (_wid < 768 ? 500 : 0),
            hide: 0
        }
    });

    //登录注册
    $('.signsubmit-loader').length && tbquire(["sign-register"]);

    //复制内容
    $('[data-clipboard-text]').length && tbquire(["clipboard"]);

    $("[data-toggle='popover']").popover();

    //幻灯片检测
    new_swiper();

    // SVG-图标
    tbquire(["svg-icon"], () => {
        show_svg()
    });

    //高亮代码
    var _h_e = _win.highlight_kg ? 'pre code:not(.enlighter-origin)' : 'pre code.gl:not(.enlighter-origin),pre code.special:not(.enlighter-origin)';
    $(_h_e).length && tbquire(["enlighterjs"], function () {
        var lin = _win.highlight_hh ? !0 : !1;
        $("link#enlighterjs").length || $("head").append('<link type="text/css" rel="stylesheet" href="' + _win.uri + '/js/enlighter/enlighterjs.min.css" id="enlighterjs">');
        $(_h_e).enlight({
            linenumbers: lin,
            indent: 2,
            textOverflow: 'scroll',
            rawcodeDbclick: !0,
            rawButton: !1,
            infoButton: !1,
            windowButton: !1,
            theme: _win.highlight_zt,
        });
    });

    //图片灯箱
    ($('[data-imgbox],.comt-main .box-img,.wp-posts-content img,.alone-imgbox-img').length && _win.imgbox) && tbquire(["imgbox"]);
}

//页面滚动监听函数
$(window).scroll(function () {
    var h = document.documentElement.scrollTop + document.body.scrollTop,
        ontop = $('.ontop');
    h > 100 ? _win.bd.addClass('body-scroll') : _win.bd.removeClass('body-scroll');
    h > 400 ? ontop.addClass('show') : ontop.removeClass('show');
})

//滚动执行函数
function scrollTo(o, t, l) {
    var h;
    l || (l = 300), h = _win.bd.hasClass("nav-fixed") ? $(".header").innerHeight() : 0, o ? $(o).length > 0 && $("html,body").animate({
        scrollTop: ($(o).offset().top || o.offset().top) + (t || 0) - h
    }, l, 'swing') : $("html,body").animate({
        scrollTop: 0
    }, l, 'swing');
}

_win.bd.on('click', '.toggle-radius,.float-right a,.but-ripple,.but,.item-thumbnail,.menu-item >a,.yiyan-box,.article-author .more-posts a, .relates-thumb li a', function (e) {
    var _th = $(this);
    if (!_th.hasClass('nowave')) {
        _th.css({
            "overflow": "hidden",
            "position": "relative"
        })
        var R;
        var waveWidth = ~~(_th.outerWidth());
        var waveHeight = ~~(_th.outerHeight());
        if (waveWidth < waveHeight) {
            R = waveHeight;
        } else {
            R = waveWidth;
        }
        var cllor = _th.css('color') || "rgba(200, 200, 200)";
        var wave = $("<div></div>").css({
            "display": "block",
            //涟漪的颜色
            "background": cllor,
            "border-radius": "50%",
            "position": " absolute",
            "-webkit-transform": "scale(0)",
            "transform": "scale(0)",
            "opacity": ".3",
            //涟漪的速度
            "transition": "all 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)",
            "-webkit-transition": "all 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)",
            "z-index": "1",
            "overflow": "hidden",
            "pointer-events": "none",
        });
        _th.append(wave);
        wave.css({
            "width": (R * 2) + "px",
            "height": (R * 2) + "px",
            "top": (e.pageY - _th.offset().top - R) + 'px',
            "left": (e.pageX - _th.offset().left - R) + 'px',
            "transform": "scale(1)",
            "-webkit-transform": "scale(1)",
            "opacity": 0,
        });
        setTimeout(function () {
            wave.remove()
        }, 2000);
    }
});


/*侧边栏*/
var _sidebar = $('.sidebar')
if (_wid > 900 && _sidebar.length && _sidebar.find('[data-affix]').length) {
    var _top = _sidebar.offset().top;
    var _bottom = $(".footer").outerHeight(!0) + $("main.container").nextAll('.fluid-widget').outerHeight(!0);
    var _sh = _sidebar.innerHeight();
    var _hh = _win.bd.hasClass("nav-fixed") ? $(".header").outerHeight(!0) : 20;
    var _boh = $(".content-layout").outerHeight(!0);
    var rollFirst = _sidebar.find('[data-affix]');
    var _roll_ww = rollFirst.innerWidth();
    rollFirst.on("affix-top.bs.affix", function () {
        rollFirst.css({
            top: '',
            width: '',
            'transition': '',
            '-webkit-transition': '',
            position: '',
            opacity: ''
        });
    }), rollFirst.on("affix.bs.affix", function () {
        rollFirst.css({
            top: _hh,
            position: 'fixed',
            opacity: '',
            width: _roll_ww
        });
        var _hh2 = _hh;
        rollFirst.each(function () {
            $(this).css({
                top: _hh2
            });
            _hh2 += $(this).innerHeight();
        });
    }), rollFirst.on("affix-bottom.bs.affix", function () {
        rollFirst.each(function (i) {
            i == 0 && $(this).css({
                'transition': '0s',
                '-webkit-transition': '0s',
            });
            i != 0 && $(this).css({
                opacity: '0',
            });
        })
    });
    rollFirst.eq(0).affix({
        offset: {
            top: _sh + _top - _hh + 20,
            bottom: _bottom
        }
    });
    $(window).scroll(function () {
        var _top = _sidebar.offset().top,
            _bottom = $(".footer").outerHeight(!0) + $("main.container").nextAll('.fluid-widget').outerHeight(!0);
        rollFirst.each(function () {
            _bottom += $(this).innerHeight();
        })
        _bottom -= rollFirst.eq(0).innerHeight();
        _sh = _sidebar.outerHeight(!0),
            _hh = _win.bd.hasClass("nav-fixed") ? $(".header").outerHeight(!0) : 20,
            rollFirst.eq(0).data('bs.affix').options.offset = {
                top: _sh + _top - _hh + 20,
                bottom: _bottom
            }
    })
}

//主题切换
$('.toggle-theme').click(function () {
    var a = $('body').hasClass('dark-theme') ? !0 : !1;
    var highlight_white_zt = 'enlighter-t-' + _win.highlight_white_zt;
    var highlight_dark_zt = 'enlighter-t-' + _win.highlight_dark_zt;

    $('img[switch-src]').each(function () {
        var _this = $(this);
        var _src = _this.attr('data-src') || _this.attr('src');
        var _s_src = _this.attr('switch-src');
        _this.attr('src', _s_src).attr('switch-src', _src).attr('data-src', '');
    })
    if (!a) {
        $('.enlighter-default').addClass(highlight_dark_zt).removeClass(highlight_white_zt);
        $('body').addClass('dark-theme'), $.cookie("theme_mode", 'dark-theme', {
            path: '/'
        });
    } else {
        $('.enlighter-default').addClass(highlight_white_zt).removeClass(highlight_dark_zt);
        $('body').removeClass('dark-theme'), $.cookie("theme_mode", 'white-theme', {
            path: '/'
        });
    }
})

/*==============点赞===收藏===关注===========*/
_win.bd.on('click', '[data-action]', function () {
    var _this = $(this);
    var s = _this.attr("data-pid");
    var key = _this.attr("data-action");
    var type = key;
    var _type = 'zibll' + type;
    var data = {
        type: type,
        key: key,
        pid: s
    };
    if (!_win.is_signin) {
        var t = lcs.get(_type) || "";
        if (-1 !== t.indexOf("," + s + ",")) return notyf("已赞过此" + (type == 'like' ? '文章' : '评论') + "了！", "warning");
        t ? t.length >= 160 ? (t = t.substring(0, t.length - 1), t = t.substr(1).split(","),
            t.splice(0, 1), t.push(s), t = t.join(","), lcs.set(_type, "," + t + ",")) : lcs.set(_type, t + s + ",") : lcs.set(_type, "," + s + ",");

    }
    action_ajax(_this, data, s, type, '已赞！感谢您的支持')
})

function action_ajax(_this, data, pid, type, text) {
    var c = text || "处理完成";
    $.ajax({
        type: "POST",
        url: _win.uri + "/action/action.php",
        dataType: "json",
        data: data,
        beforeSend: function () {
            _this.find("count").html('<i class="loading zts"></i>')
        },
        success: function (n) {
            // console.log(n);
            var ys = (n.error ? 'danger' : "");
            if (n.action && n.action == "remove") {
                _this.removeClass('actived action-animation');
                ys = 'warning';
            }
            if (n.action && n.action == "add") {
                _this.addClass('actived action-animation')
            }
            notyf(n.msg || c, ys);
            _this.find("count").html(n.cuont || '0');
            if (type == "follow_user") {
                $('[data-action="follow_user"][data-pid="' + pid + '"]').each(function () {
                    $(this).find("count").html(n.cuont);
                })
            }
        }
    })
}

//登录注册
_win.bd.on('click', '.signin-loader', function () {
    if (_win.sign_type == 'page') {
        window.location.href = _win.signin_url;
        window.location.reload;
    } else {
        $('#u_sign').modal('show');
        $('a[href="#tab-sign-in"]').tab('show')
    }
})

_win.bd.on('click', '.signup-loader', function () {
    if (_win.sign_type == 'page') {
        window.location.href = _win.signup_url;
        window.location.reload;
    } else {
        $('#u_sign').modal('show');
        $('a[href="#tab-sign-up"]').tab('show')
    }
})

//扫码登录、绑定
_win.bd.on('click', '.qrcode-signin', function () {
    $('#u_sign').modal('show');
    $('a[href="#tab-qrcode-signin"]').tab('show')

    var _this = $(this);
    var url = _this.attr('href');
    var container = $('.qrcode-signin-container');
    container.html('<p class="placeholder" style="height:180px;width:180px;margin:auto;"></p><p class="placeholder" style="height:27px;width:200px;margin:15px auto 0;"></p>');

    $.post(url, null, function (n) {
        var ys = (n.ys ? n.ys : (n.error ? 'danger' : ""));
        n.msg && notyf(n.msg, ys);
        if (n && n.html) {
            container.html(n.html);
            _win.qrcode_signin = {
                url: n.url,
                state: n.state,
            };
            if (!_win.check_login) {
                //仅执行一次
                checkLogin();
                _win.check_login = !0;
            }
        }
    }, "json");
    return !1;
})
//循环查询确认登录
function checkLogin() {
    var url = _win.qrcode_signin.url;
    var state = _win.qrcode_signin.state;
    if (!url || !state) return;
    $.post(url, {
        state: state,
        oauth_rurl: window.location.href,
        action: "check_callback"
    }, function (n) {
        //做逻辑判断，登录跳转
        if (n.goto) {
            window.location.href = n.goto;
            window.location.reload;
        } else {
            setTimeout(function () {
                checkLogin();
            }, 2000);
        }
    }, "json");
}
//模态框关闭停止查询登录
_win.bd.on("hide.bs.modal", ".modal", function () {
    _win.check_login = false;
    _win.check_pay = false;
    _win.qrcode_signin = {
        url: false,
        state: false,
    }
});

//赞赏模态框
_win.bd.on('click', '.rewards', function () {
    $('#rewards-popover').modal('show');
})
//个人中心
_win.bd.hasClass("author") && tbquire(["author"]);

//文章导航
_win.bd.hasClass("page-template-postsnavs") && _win.bd.hasClass("logged-admin") && tbquire(["page-navs"]);
//前台编辑
$("#modal_admin_set").length && tbquire(["page-edit"]);
//评论
$("#commentform,#postcomments").length && tbquire(["comment"]);
//通用模板js文件
_win.bd.hasClass("page-template") && tbquire(["page-template"]);

//搜索关键词高亮
if (_win.bd.hasClass('search-results')) {
    var val = $('.search-key').text();
    try {
        var reg = eval('/' + val + '/i');
        $('.item-heading a,.item-excerpt').each(function () {
            $(this).html($(this).text().replace(reg, function (w) {
                return '<b class="focus-color">' + w + '</b>'
            }))
        })
    } catch (e) {}
}
//搜索多选择
_win.bd.on('click', '[data-for]', function () {
    var _this = $(this);
    var _tt = _this.html();
    var _for = _this.attr('data-for');
    var _f = _this.parents('form');
    var _v = _this.attr('data-value');
    _f.find('span[name=' + _for + ']').html(_tt);
    _f.find('input[name=' + _for + ']').val(_v);
    _f.find('input[name=s]').focus();
})

/*菜单*/
$(".navbar-top li.menu-item-has-children>a").each(function () {
    $(this).append('<i class="fa fa-angle-down ml6"></i>');
});

//系统通知
function notyf(str, ys, time, id) {
    $('.notyn').length || _win.bd.append('<div class="notyn"></div>');
    ys = ys || "success";
    time = time || 5000;
    time = time < 100 ? time * 1000 : time;
    var id_attr = id ? ' id="' + id + '"' : '';
    var _html = $('<div class="noty1"' + id_attr + '><div class="notyf ' + ys + '">' + str + '</div></div>');
    var is_close = !id;
    if (id && $('#' + id).length) {
        $('#' + id).find('.notyf').removeClass().addClass('notyf ' + ys).html(str);
        _html = $('#' + id);
        is_close = true;
    } else {
        $('.notyn').append(_html);
    }
    is_close && setTimeout(function () {
        notyf_close(_html)
    }, time);
}

function notyf_close(_e) {
    _e.addClass('notyn-out')
    setTimeout(function () {
        _e.remove()
    }, 1000);
}
_win.bd.on('click', '.noty1', function () {
    notyf_close($(this))
})

//切换密码显示
_win.passw = 1;
_win.bd.on('click', '.passw', function () {
    var _this = $(this);
    if (_win.passw == 1) {
        _this.find('.fa').addClass("fa-eye-slash");
        _this.siblings('input').attr('type', 'text');
        _win.passw = 2
    } else {
        _this.find('.fa').removeClass("fa-eye-slash");
        _this.siblings('input').attr('type', 'password');
        _win.passw = 1
    }
})


//绑定placeholder_scale操作
_win.bd.on('input porpertychange', '.line-form-input', function () {
    placeholder_scale($(this));
})

//执行placeholder_scale操作
function placeholder_scale(_this) {
    var val = _this.val();
    var placeholder = _this.siblings('.scale-placeholder');
    if (val.length > 0) {
        placeholder.addClass('is-focus');
    } else {
        placeholder.removeClass('is-focus');
    }
}

function zib_is_url(str) {
    return /^((http|https)\:\/\/)([a-z0-9-]{1,}.)?[a-z0-9-]{2,}.([a-z0-9-]{1,}.)?[a-z0-9]{2,}$/.test(str)
}

function is_mail(str) {
    return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(str)
}

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//清空搜索关键词
_win.bd.on('click', '.trash-history-search', function (e) {
    if (confirm("确认要清空全部搜索记录？") == true) {
        $('.history-search').slideUp().delay(1000, function () {
            $(this).remove()
        });
        $.cookie('history_search', '');
    }
})

/**wp-ajax-action */
_win.bd.on('submit', '[ajax-submit]', function (e) {
    var _this = $(this);
    var but = _this.attr('ajax-submit') || '.wp-ajax-submit,[zibajax="submit"]';
    return _this.find(but).click(), !1;
})

_win.bd.on('click', '.wp-ajax-submit,[zibajax="submit"]', function (e) {
    return zib_ajax($(this)), !1;
})

function zib_ajax(_this, data, success, noty) {
    if (!data) {
        var form = _this.parents('form');
        data = form.serializeObject()
    }
    var _action = _this.attr('form-action')
    if (_action) {
        data.action = _action;
    }
    if (typeof (_win.canvas_code) != "undefined") {
        data.canvas_code = _win.canvas_code;
    }
    if (typeof (_win.slidercaptcha) != "undefined") {
        data.slidercaptcha = _win.slidercaptcha;
    }

    var _text = _this.html();
    notyf((noty || "正在处理请稍后..."), "load", "", "wp_ajax");
    _this.attr('disabled', true).html('<i class="loading mr6"></i>请稍候');
    var _url = _this.attr('ajax-href') || _win.ajax_url;
    $.ajax({
        type: "POST",
        url: _url,
        data: data,
        dataType: "json",
        error: function (n) {
            notyf("操作失败 " + n.status + ' ' + n.statusText + '，请刷新页面后重试', 'danger', '', 'wp_ajax');
            _this.attr('disabled', false).html(_text);
        },
        success: function (n) {
            var ys = (n.ys ? n.ys : (n.error ? 'danger' : ""));
            if (n.error) {
                _win.slidercaptcha = false;
            }
            notyf(n.msg || "处理完成", ys, '', 'wp_ajax');
            _this.attr('disabled', false).html(_text);
            $.isFunction(success) && success(n, _this, data);
            if (n.reload) {
                if (n.goto) {
                    window.location.href = n.goto;
                    window.location.reload;
                } else {
                    window.location.reload();
                }
            }
        }
    });
}

/* erphpdown 登录使用弹出登录框
 * =========================================
 */
$('.erphp-login-must').each(function () {
    $(this).addClass('signin-loader')
});

//浏览器窗口调整自动化
$(window).resize(function (event) {
    _wid = $(window).width();
    auto_fun();
});
$('.collapse').on('shown.bs.collapse', function () {
    auto_fun();
})

//文章限制高度
function maxh_k() {
    $('.limit-height').css({
        height: '',
        'max-height': ''
    }).find('.read-more').remove();
}

function posts_limit_height() {
    if ($('.limit-height').length) {
        var r = $('.limit-height');
        var r_h = r.height();
        var r_m = r.attr('data-maxheight');
        var nn = '<div class="read-more"><a href="javascript:;" onclick="maxh_k()">展开阅读全文<i class="fa ml10 fa-angle-down"></i></a></div>'
        if (~~(r_h) >= (~~(r_m) + 79)) {
            r.append(nn);
        }
    }
}

auto_fun();
posts_limit_height();

//页面加载完毕之后加载的函数
$(document).ready(function () {
    setTimeout(function () {
        //页面加载完毕之后再延迟两秒加载的函数
        $(".poster-share").length && tbquire(["poster-share"]); //海报分享
        //检测placeholder_scale操作
        $('.line-form-input').each(function () {
            placeholder_scale($(this));
        });
        //文章高度限制
        posts_limit_height();
    }, 2000);

    //文章亮点保持相同高度
    if ($(".feature").length) {
        var _feh = 0,
            _fehm = 0;
        $(".feature").each(function () {
            var _th = $(this);
            (_feh = _th.find(".feature-icon").innerHeight() + _th.find(".feature-title").innerHeight() + _th.find(".feature-note").innerHeight()) > _fehm && (_fehm = _feh);
        });
        $(".feature").css("height", _fehm);
    }

    _win.do_hh = document.documentElement.clientHeight;
    if (_win.do_hh > document.body.clientHeight) {
        var min_h = _win.do_hh - $('.footer').outerHeight() - $('.header').outerHeight() - 20;
        $('main').css('min-height', min_h);
    }

    //js二维码
    $(".qrcode").length && tbquire(["qrcode"], function () {
        $('.qrcode').each(function () {
            var _this = $(this),
                text = _this.attr('data-qrcode');
            _this.qrcode({
                width: 160,
                height: 160,
                correctLevel: 0,
                text: text || document.URL,
                background: "#fff",
                foreground: "#555"
            });
        })
    });

    /**tab跳转 */
    var tab_show = '';
    if ("undefined" != typeof _win.show_tab) {
        tab_show += 'a[href="#' + _win.show_tab + '"]';
    }
    if ("undefined" != typeof _win.show_tab2) {
        tab_show += ',a[href="#' + _win.show_tab2 + '"]';
    }
    if ("undefined" != typeof _win.show_tab3) {
        tab_show += ',a[href="#' + _win.show_tab3 + '"]';
    }
    tab_show && $(tab_show).tab('show');

    //图片延迟懒加载-ias自动加载
    document.addEventListener('lazybeforeunveil', function (e) {
        var _this = e.target;
        var lazyload_action = _this.getAttribute('lazyload-action');
        setTimeout(function () {
            if (lazyload_action == 'ias') {
                $(_this).find('a').click();
            }
            if (lazyload_action == 'animated') {
                var animated = $(_this).attr('data-animated');
                animated && $(_this).addClass('animated ' + animated).css('visibility', 'unset');
            }
        }, 300);
        var bg = _this.getAttribute('data-bg');
        if (bg) {
            _this.style.backgroundImage = 'url(' + bg + ')';
        }
    });

    //图片延迟懒加载-ias自动加载
    document.addEventListener('lazyloaded', function (e) {
        var _this = $(e.target);
        swiper_tab_AutoHeight(_this);
    });

    _win.qj_loading && $(".qj_loading").fadeOut(500).delay(1e3, function () {
        $(this).remove(), $("#qj_dh_css").remove();
    });
    /*一言功能*/
    function yiyan_nr(n) {
        var yylink = _win.uri + "/yiyan/qv-yiyan.php";
        $.ajax({
            url: yylink
        }).done(function (i) {
            var lines = i.replace(/\r\n|\r/g, "/&/").trim().split("/&/");
            if (lines) {
                var y_nr = '<div class="cn">' + lines[0] + '</div><div class="en">' + lines[1] + "</div>";
                n.html(y_nr);
            }
        });
    }

    //文章阅读数量记录
    if (_win.views) {
        $.get(_win.ajax_url, {
            action: "views_record",
            id: _win.views
        });
    }

    $(".yiyan").each(function () {
        yiyan_nr($(this));
    }), setInterval(function () {
        $(".yiyan").each(function () {
            yiyan_nr($(this));
        });
    }, 3e4);
    $(".yiyan").on('click', function () {
        yiyan_nr($(this));
    });

    /*文章目录*/
    $("[data-nav] h1,[data-nav] h2,[data-nav] h3,[data-nav] h4").length > 2 && tbquire(["section-navs"]);

    //手势控制
    $('[mini-touch]').each(function () {
        var _this = $(this);
        var fx = _this.attr('touch-direction');
        _this.minitouch({
            direction: fx,
            onEnd: function (e) {
                e.removeClass('show')
            }
        })
    });

    //手势控制
    $('[data-countdown]').each(function () {
        var _this = $(this);
        countdown(_this);
    });
});

console.log('\n' + ' %c ZibllTheme %c https://zibll.com ' + '\n', 'color: #fadfa3; background: #030307; padding:5px 0; font-size:12px;', 'background: #fadfa3; padding:5px 0; font-size:12px;');