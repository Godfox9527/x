/**************************************
#!name = PikPak自动活跃圈X脚本
#!desc = 圈 X 自动活跃脚本，固定UUID，兼容低版本Quantumult X
#!author = AAA
#!date = 2025-04-18
**************************************/

const $ = new Env("PikPak自动活跃");

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
      $.log("解析错误: " + e.message);
      $notify("解析错误", "", "服务器响应格式无效");
      $done({});
      return;
    }

    if (data.code === 200 && data.msg) {
      $.log("运行结果: " + data.msg);
      $notify("运行成功", data.msg, "");
    } else {
      $.log("运行失败: " + (data.msg || "未知错误"));
      $notify("运行失败", data.msg || "未知错误", "");
    }
    $done({});
  },
  function(reason) {
    $.log("请求错误: " + reason.error);
    $notify("请求错误", "", reason.error || "网络错误");
    $done({});
  }
);

/***************** Env 类（调整为兼容低版本） *****************/
function Env(a, b) {
  var c = Math.floor;
  return new (function () {
    this.name = a;
    this.version = "1.7.4";
    this.data = null;
    this.logs = [];
    this.isMute = false;
    this.isNeedRewrite = false;
    this.logSeparator = "\n";
    this.encoding = "utf-8";
    this.startTime = new Date().getTime();
    Object.assign(this, b);
    this.log("", "🔔" + this.name + ", 开始!");

    this.platform = function () {
      if (typeof $environment !== "undefined" && $environment["surge-version"]) return "Surge";
      if (typeof $environment !== "undefined" && $environment["stash-version"]) return "Stash";
      if (typeof module === "undefined" || !module.exports) {
        if (typeof $task === "undefined") {
          if (typeof $loon === "undefined") {
            if (typeof $rocket === "undefined") {
              if (typeof Egern === "undefined") return undefined;
              return "Egern";
            }
            return "Shadowrocket";
          }
          return "Loon";
        }
        return "Quantumult X";
      }
      return "Node.js";
    };

    this.isQuanX = function () {
      return this.platform() === "Quantumult X";
    };

    this.toObj = function (a, b) {
      try {
        return JSON.parse(a);
      } catch {
        return b;
      }
    };

    this.toStr = function (a, b) {
      try {
        return JSON.stringify(a);
      } catch {
        return b;
      }
    };

    this.msg = function (a, b, c, d) {
      var e = function (a) {
        if (typeof a === "undefined") return a;
        if (typeof a === "string") {
          switch (this.platform()) {
            case "Surge":
            case "Stash":
            case "Egern":
              return { url: a };
            case "Loon":
            case "Shadowrocket":
              return a;
            case "Quantumult X":
              return { "open-url": a };
            default:
              return { url: a };
          }
        }
        if (typeof a === "object") {
          switch (this.platform()) {
            case "Surge":
            case "Stash":
            case "Egern":
            case "Shadowrocket":
              var b = a.url || a.openUrl || a["open-url"];
              return { url: b };
            case "Loon":
              var b = a.openUrl || a.url || a["open-url"];
              var c = a.mediaUrl || a["media-url"];
              return { openUrl: b, mediaUrl: c };
            case "Quantumult X":
              var b = a["open-url"] || a.url || a.openUrl;
              var c = a["media-url"] || a.mediaUrl;
              var d = a["update-pasteboard"] || a.updatePasteboard;
              return { "open-url": b, "media-url": c, "update-pasteboard": d };
            default:
              return undefined;
          }
        }
      }.bind(this);

      if (!this.isMute) {
        switch (this.platform()) {
          case "Surge":
          case "Loon":
          case "Stash":
          case "Shadowrocket":
            $notification.post(a, b, c, e(d));
            break;
          case "Quantumult X":
            $notify(a, b, c, e(d));
            break;
        }
      }
    };

    this.log = function () {
      var args = Array.prototype.slice.call(arguments);
      if (args.length > 0) {
        this.logs = this.logs.concat(args);
      }
      console.log(args.join(this.logSeparator));
    };

    this.done = function (a) {
      var b = new Date().getTime();
      var c = (b - this.startTime) / 1000;
      this.log("", "🔔" + this.name + ", 结束! 🕛 " + c + " 秒");
      switch (this.platform()) {
        case "Quantumult X":
          $done(a || {});
          break;
        default:
          $done(a || {});
      }
    };
  })();
}