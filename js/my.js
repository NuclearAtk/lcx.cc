/* 自定义 js */

// 添加一个函数在 HTML DOM 页面解析完成时执行（在下载所有图片、js、css 等元素之前执行）
function ready(fn){
    if (document.addEventListener) { // 标准浏览器
        document.addEventListener('DOMContentLoaded', function() {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false); // 注销事件, 避免反复触发
            fn(); // 执行函数
        }, false);
    } else if (document.attachEvent) { // IE 浏览器
        document.attachEvent('onreadystatechange', function() {
            if (document.readyState == 'complete') {
                document.detachEvent('onreadystatechange', arguments.callee); // 注销事件, 避免反复触发
                fn(); // 执行函数
            }
        });
    }
};

// 修正文章内容中的超链接为新窗口打开
function fix_links_content() {
    // 如果不是内容页面则退出（注意！首页列表也能配到，所以得比较数量=1）
    var x = document.getElementsByClassName("post-content");
    if (x.length != 1) return;
    // 修改所有非标签链接为新窗口打开
    x = x[0].getElementsByTagName("a");
    for (var i=0; i<x.length; i++) {
        if (x[i].getAttribute("href")) {
            if (x[i].getAttribute("href").substring(0,1) != "#") {
                x[i].target = "_blank";
            }
        }
    }
}

// 修正页面中的所有超链接为新窗口打开
function fix_links_all() {
    // 修改所有非标签链接为新窗口打开
    x = document.getElementsByTagName('a');
    for (var i=0; i<x.length; i++) {
        if (x[i].getAttribute("href")) {
            if (x[i].getAttribute("href").substring(0,1) != "#") {
                x[i].target = "_blank";
            }
        }
    }
}

// 在文章页面中显示广告
function showad() {
    // 判断页面同时获取插入广告位置，如果不是文章内容页面则退出
    var header = document.getElementsByClassName("post-header");
    if (header.length != 1) {return;} else {header = header[0];}; // 注意！首页列表也能配到，所以得比较数量=1
    var footer = document.getElementsByClassName("post-copyright");
    if (footer.length != 1) {return;} else {footer = footer[0];}; // 注意！首页列表也能配到，所以得比较数量=1
    // 通用创建广告内容函数（多个广告位、统一风格）
    var newad = function(adhtml, adcss) {
        // 指定广告位样式
        var css = "color: #666666;\
                   cursor: pointer;\
                   background-color: #FCFCFC;\
                   padding: 0.5em;\
                   border-radius: 5px;\
                   border: 1px solid #d3d3d3;\
                   text-align: center;\
                   box-shadow: 0 0 5px 0 #d3d3d3;\
                   text-overflow: ellipsis;\
                   word-break: break-all;\
                   line-height: normal;";
        // 添加自定义样式
        if (typeof jQuery != 'undefined') {css = css + adcss;}
        // 创建广告内容
        var obj = document.createElement("div");
        obj.style.cssText = css;
        obj.innerHTML = adhtml;
        // 返回对象
        return obj;
    };
    // 广告位招租（文章标题+内容底部）
    // var ad_head = newad('★ 广告位招租 ★ 微信(QQ): 123456789 ★ Telegram: @****** ★ 广告位招租 ★', 'margin-bottom:1em;');
    // header.parentNode.insertBefore(ad_head, header.nextSibling);
    // var ad_foot = newad('★ 广告位招租 ★ 微信(QQ): 123456789 ★ Telegram: @****** ★ 广告位招租 ★', 'margin-top:1em;');
    // footer.parentNode.insertBefore(ad_foot, footer.nextSibling);
    // 广告
    // var ad1 = newad('<marquee onMouseOut="this.start()" onMouseOver="this.stop()" onclick="window.open(\'https://t.me/******\', \'_blank\');">★ 黑客入侵 ★ 渗透测试 ★ 追踪溯源 ★ 调查取证 ★ 黑产灰产 ★ 网络安全 ★ 编程开发 ★ 私人定制 ★ Telegram: @****** ★ 微信(QQ): 123456789 ★</marquee>', 'margin-bottom:1em;');
    // header.parentNode.insertBefore(ad1, header.nextSibling);
    // var ad2 = newad('<marquee onMouseOut="this.start()" onMouseOver="this.stop()" onclick="window.open(\'https://t.me/******\', \'_blank\');">★ 黑客入侵 ★ 渗透测试 ★ 追踪溯源 ★ 调查取证 ★ 黑产灰产 ★ 网络安全 ★ 编程开发 ★ 私人定制 ★ Telegram: @****** ★ 微信(QQ): 123456789 ★</marquee>', 'margin-top:1em;');
    // footer.parentNode.insertBefore(ad2, footer.nextSibling);
    // 示例代码
    // var ad1 = newad('<marquee onMouseOut="this.start()" onMouseOver="this.stop()" onclick="window.open(\'https://t.me/******\', \'_blank\');">★ Telegram:@****** ★ 广告位招租 ★ Telegram:@****** ★</marquee>', 'margin-bottom:1em;');
    // header.parentNode.insertBefore(ad1, header.nextSibling);
    // 常用特殊符号：http://cn.piliapp.com/symbol/
    // ★☆☚☛☜☝☞☟✌✍✈
    // <span style="font-size:35px;position:relative;top:0.15em;line-height:20px;">☞</span>
}

// 页面解析完成时执行的函数
function isdone() {
    // 在文章页面中显示广告
    showad();
    // 修正页面中的所有超链接为新窗口打开
    fix_links_all();
    // 修正文章内容中的超链接为新窗口打开
    // fix_links_content();
}

// 添加一个函数在页面解析完成时执行。注意！参数不带括弧()！
ready(isdone);