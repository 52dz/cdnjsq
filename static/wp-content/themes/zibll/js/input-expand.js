/*
 * @Author        : Qinver
 * @Url           : zibll.com
 * @Date          : 2020-11-17 23:26:27
 * @LastEditTime: 2021-07-30 13:22:34
 * @Email         : 770349780@qq.com
 * @Project       : Zibll子比主题
 * @Description   : 一款极其优雅的Wordpress主题||编辑框的额外按钮
 * @Read me       : 感谢您使用子比主题，主题源码有详细的注释，支持二次开发。欢迎各位朋友与我相互交流。
 * @Remind        : 使用盗版主题会存在各种未知风险。支持正版，从我做起！
 */


//只允许一个dropup弹出框
$(document).on("click", function (e) {
    var target = $(e.target);
    if (target.closest(".dropup.open").length == 0) {
        $(".dropup").removeClass('open');
    }
})

//内容追加到编辑框
function grin(_this, val, fun) {
    var textarea = _this.parents('form').find('textarea.grin');
    var t_val = textarea.val();
    textarea.val(t_val + val).focus().click();
    $.isFunction(fun) && fun(_this, val);
}

//编辑框添加表情
_win.bd.on('click', ".dropdown-smilie .smilie-icon", function () {
    var _this = $(this);
    var smilie = _this.attr('data-smilie');
    smilie = "[g=" + smilie + "]";
    return grin(_this, smilie);
})

//编辑框添加代码
_win.bd.on('click', '.dropdown-code [type="submit"]', function () {
    var _this = $(this);
    var val = _this.parents('.dropdown-code').find('textarea').val();
    if (val.length < 2) return void notyf("请输入代码", "warning");
    val = "[code]\n" + val + "\n[/code]\n";
    return grin(_this, val);
})

//编辑框添加图片
_win.bd.on('click', '.dropdown-image [type="submit"]', function () {
    var _this = $(this);
    var val = _this.parents('.dropdown-image').find('textarea').val();
    if (val.length < 6) return void notyf("请输入正确的图片地址", "warning");
    val = "[img=" + val + "]\n";
    return grin(_this, val);
})

//上传图片
function expand_upload_img(data, _this, form) {
    val = "[img=" + data.img_url + "]\n";
    return grin(_this, val);
}