/**************************************
#!name = PikPak自动活跃圈X脚本
#!desc = 圈 X 自动活跃脚本，固定UUID，兼容低版本Quantumult X
#!author = AAA
#!date = 2025-04-18
**************************************/

// 初始化 Env 对象
var $ = new Env("PikPak自动活跃");

// 固定UUID
var uuid = "fa3855dcd1b4498a91886b5e7e843099";
var url = "https://hy.bilivo.top/a_tasks?uuid=" + uuid;

// 调试：记录UUID
$.log("使用的UUID: " + uuid);

// 发送GET请求
var request = {
  url: url,
  method: "GET"
};

$task.fetch(request).then(
  function(response) {
    var data;
    try {
      data = JSON.parse(response.body);
    } catch (e) {
      $.log("解析错误: " + e);
      $notify("PikPak自动活跃", "", "解析错误: 服务器响应格式无效");
      $done({});
      return;
    }

    if (data.code === 200 && data.msg) {
      $.log("运行结果: " + data.msg);
      $notify("PikPak自动活跃", data.msg, "");
    } else {
      $.log("运行失败: " + (data.msg || "未知错误"));
      $notify("PikPak自动活跃", data.msg || "未知错误", "");
    }
    $done({});
  },
  function(reason) {
    $.log("请求错误: " + reason.error);
    $notify("PikPak自动活跃", "", "请求错误: " + (reason.error || "网络错误"));
    $done({});
  }
);

/***************** Env 函数（兼容低版本） *****************/
function Env(name) {
  // 返回对象，定义所有方法
  var env = {};

  env.name = name;
  env.logs = [];
  env.startTime = new Date().getTime();
  env.logSeparator = "\n";

  // 日志方法
  env.log = function() {
    var args = Array.prototype.slice.call(arguments);
    if (args.length > 0) {
      env.logs = env.logs.concat(args);
    }
    console.log(args.join(env.logSeparator));
  };

  // 通知方法
  env.msg = function(title, subtitle, message) {
    if (typeof $notify !== "undefined") {
      $notify(title, subtitle, message);
    } else if (typeof $notification !== "undefined") {
      $notification.post(title, subtitle, message);
    }
  };

  // 结束方法
  env.done = function(a) {
    var endTime = new Date().getTime();
    var duration = (endTime - env.startTime) / 1000;
    env.log("", "🔔" + env.name + ", 结束! 🕛 " + duration + " 秒");
    $done(a || {});
  };

  // 初始化日志
  env.log("", "🔔" + env.name + ", 开始!");

  return env;
}