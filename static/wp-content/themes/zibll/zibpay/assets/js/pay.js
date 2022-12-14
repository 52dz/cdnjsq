/**
 * zib支付JS
 */
var pay_ajax_url = _win.ajax_url,
    order_result = {},
    pay_inputs = {},
    _body = $("body"),
    is_verify = !1;
pay_sapiParams = false;

function pay_action_ajax(data, _this) {
    // 弹出模态框
    $(".modal:not(#modal_pay)").modal('hide');
    modal = $('#modal_pay');
    (modal.length && !data.openid) && modal.modal('show').find('.pay-payment').removeClass('wechat alipay').addClass(data.pay_type);
    modal.find('.more-html').remove();
    pay_ajax_notice('正在生成订单，请稍候', 'load');
    modal.length || (notyf("加载中，请稍等...", "load", "", "pay_ajax"), data.get_modal = 1);
    data.openid && notyf("正在发起支付，请稍等...", "load", "", "pay_ajax");

    $.ajax({
        type: "POST",
        url: pay_ajax_url,
        data: data,
        dataType: "json",
        error: function (n) {
            notyf("操作失败 " + n.status + ' ' + n.statusText + '，请刷新页面后重试', 'danger', '', 'pay_ajax')
        },
        success: function (n) {
            //console.log(n);
            (n.msg || !modal.length) && notyf((n.msg || '请扫码付款，付款成功后会自动跳转'), (n.ys ? n.ys : (n.error ? 'danger' : "")), '', (modal.length ? '' : 'pay_ajax'));
            modal.length || (_body.append(n.pay_modal), auto_fun(), modal = $('#modal_pay'), modal.modal('show'));
            if (n.error) {
                pay_ajax_notice((n.msg ? n.msg : "处理失败,即将刷新页面"), 'danger');
                setTimeout(function () {
                    location.href = delQueStr('openid', delQueStr('zippay'));
                    location.reload;
                }, 2000);
            } else {
                order_result = n;
                if (!is_verify) {
                    verify_pay();
                    is_verify = !0;
                }
            }

            if (n.jsapiParams) { //微信JSAPI支付
                pay_sapiParams = n.jsapiParams;
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                } else {
                    onBridgeReady();
                }
                notyf("请完成支付", "", "", (data.openid ? 'pay_ajax' : ''));
                return pay_ajax_notice('请完成支付', '');
            }

            n.order_name && modal.find('.pay-title').html(n.order_name);
            n.order_price && modal.find('.pay-price').html(n.order_price);
            n.payment_method && modal.find('.pay-payment').removeClass('wechat alipay').addClass(n.payment_method);

            if (n.more_html && !n.open_url) {
                modal.find('.pay-notice').before('<div class="more-html">' + n.more_html + '</div>');
            }
            if (n.url_qrcode && !n.open_url) {
                qrcode_box = modal.find('.pay-qrcode img');
                qrcode_box.attr('src', n.url_qrcode).css({
                    'filter': 'blur(0)',
                    'opacity': '1',
                    'transition': 'all 0.3s ease 0.5s'
                })
                pay_ajax_notice('请扫码付款，付款成功后会自动跳转', '');
            }
            if (n.url && n.open_url) {
                window.location.href = n.url;
                window.location.reload;
                pay_ajax_notice('正在跳转到支付页面', '');
                return;
            }
            if (!n.url && !n.url_qrcode) {
                pay_ajax_notice((n.msg ? n.msg : "支付配置错误"), 'danger');
            }
        }
    });
}

//微信JSAPI支付
function onBridgeReady() {
    if (pay_sapiParams) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', pay_sapiParams,
            function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                }
                location.href = delQueStr('openid', delQueStr('zippay'));
                location.reload; //刷新页面
            });
    }
}

//支付通知显示
function pay_ajax_notice(msg, type) {
    notice_box = $('#modal_pay').find('.pay-notice .notice');
    msg = type == 'load' ? '<i class="loading mr6"></i>' + msg : msg;
    notice_box.removeClass('load warning success danger').addClass(type).html(msg);
}

//切换付款方式
_body.on("click", '.initiate-pay-switch', function (e) {
    var _this = $(this);
    pay_inputs.pay_type = _this.attr('pay_type');
    pay_action_ajax(pay_inputs, _this);
    _this.parents('.pay-payment').find('.pay-qrcode img').css({
        'filter': 'blur(5px)',
        'opacity': '.8',
        'transition': 'all 0.3s'
    });
    return false;
})

//发起支付
_body.on("click", '.initiate-pay', function (e) {
    var _this = $(this);
    var form = _this.parents('form');
    pay_inputs = form.serializeObject();
    pay_inputs.pay_type = _this.attr('pay_type');
    pay_inputs.return_url || (pay_inputs.return_url = window.location.href);
    pay_action_ajax(pay_inputs, _this);
    return !1;
})

//模态框关闭停止查询登录
_win.bd.on("hide.bs.modal", "#modal_pay", function () {
    order_result.order_num = false;
    is_verify = false;
});

function verify_pay() {
    if (order_result.order_num) {
        $.ajax({
            type: "POST",
            url: pay_ajax_url,
            data: {
                "action": "check_pay",
                "post_id": pay_inputs.post_id,
                "order_num": order_result.order_num,
            },
            dataType: "json",
            success: function (n) {
                if (n.status == "1") {
                    pay_ajax_notice('付款成功，页面跳转中', 'success');
                    setTimeout(function () {
                        if ("undefined" != typeof pay_inputs.return_url && pay_inputs.return_url) {
                            window.location.href = delQueStr('openid', delQueStr('zippay', pay_inputs.return_url));
                            window.location.reload;
                        } else {
                            location.href = delQueStr('openid', delQueStr('zippay'));
                            location.reload;
                        }
                    }, 500);
                } else {
                    setTimeout(function () {
                        verify_pay();
                    }, 2000);
                }
            }
        });
    }
}

//购买会员
_body.on("click", '.pay-vip', function (e) {
    var _this = $(this);

    _modal = '<div class="modal fade" id="modal_pay_uservip" tabindex="-1" role="dialog" aria-hidden="false">\
    <div class="modal-dialog" role="document">\
    <div class="modal-content">\
    <div class="modal-body"><h4 style="padding:20px;" class="text-center"><i class="loading zts em2x"></i></h4></div>\
    </div>\
    </div>\
    </div>\
    </div>';
    $("#modal_pay_uservip").length || _body.append(_modal);
    auto_fun();
    modal = $('#modal_pay_uservip');
    vip_level = _this.attr('vip-level') || 1;
    if (modal.find('.payvip-modal').length) {
        $('a[href="#tab-payvip-' + vip_level + '"]').tab('show');
        modal.modal('show');
    } else {
        notyf("加载中，请稍等...", "load", "", "payvip_ajax");
        $.ajax({
            type: "POST",
            url: pay_ajax_url,
            data: {
                "action": "pay_vip",
                "vip_level": vip_level,
            },
            dataType: "json",
            success: function (n) {
                // console.log(n);
                var msg = n.msg || '请选择会员选项';
                if ((msg.indexOf("登录") != -1)) {
                    $('.signin-loader').click();
                }
                notyf(msg, (n.ys ? n.ys : (n.error ? 'danger' : "")), 3, "payvip_ajax");
                n.error || (modal.find('.modal-content').html(n.html), modal.modal('show'));
            }
        });
    }
    return !1;
})

//微信JSAPI跳转支付
function isWeiXinApp() {
    var ua = window.navigator.userAgent.toLowerCase();
    return (ua.match(/MicroMessenger/i) == 'micromessenger');
}

function GetRequest(name) {
    var url = window.parent.location.search; //获取url中"?"符后的字串
    // var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        if (str.indexOf("#" != -1)) {
            str = str.substr(0);
        }
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            if (strs[i].indexOf(name) != -1) {
                return strs[i].split("=")[1];
            }
        }
    }
    return null;
}

function delQueStr(ref, url) {
    var str = "";
    url = url || window.location.href;
    if (url.indexOf('?') != -1) {
        str = url.substr(url.indexOf('?') + 1);
    } else {
        return url;
    }
    var arr = "";
    var returnurl = "";
    var setparam = "";
    if (str.indexOf('&') != -1) {
        arr = str.split('&');
        for (i in arr) {
            if (arr[i].split('=')[0] != ref) {
                returnurl = returnurl + arr[i].split('=')[0] + "=" + arr[i].split('=')[1] + "&";
            }
        }
        return url.substr(0, url.indexOf('?')) + "?" + returnurl.substr(0, returnurl.length - 1);
    } else {
        arr = str.split('=');
        if (arr[0] == ref) {
            return url.substr(0, url.indexOf('?'));
        } else {
            return url;
        }
    }
}

$(document).ready(function () {
    var zippay = GetRequest('zippay');
    var openid = GetRequest('openid');
    if (zippay && openid && isWeiXinApp()) {
        var pay_inputs = {};
        pay_inputs.pay_type = zippay;
        pay_inputs.openid = openid;
        pay_inputs.action = 'initiate_pay';

        pay_action_ajax(pay_inputs)
    }
})