/**************************************
#!name = PikPak自动活跃圈X脚本
#!desc = 用于Quantumult X的PikPak自动活跃脚本，需替换UUID
#!author = AAA
#!date = 2025-04-18
**************************************/

const $ = new Env("PikPak自动活跃");

// 配置：替换为你的实际UUID
const uuid = "fa3855dcd1b4498a91886b5e7e843099"; // 请替换为你的实际UUID
const url = `https://hy.bilivo.top/a_tasks?uuid=${uuid}`;

// 检查UUID是否为默认值
if (uuid === "fa3855dcd1b4498a91886b5e7e843099") {
  $.notify("运行提示", "", "请替换为你的实际UUID");
  $.done();
}

// 发送GET请求
const request = { url, method: "GET" };

$task.fetch(request).then(
  response => {
    try {
      const data = JSON.parse(response.body);
      if (data.code === 200 && data.msg) {
        $.notify("运行成功", "", data.msg);
      } else {
        $.notify("运行失败", "", data.msg || "未知错误");
      }
    } catch (e) {
      $.notify("解析错误", "", "响应数据格式无效");
    }
    $.done();
  },
  reason => {
    $.notify("请求错误", "", reason.error || "网络错误");
    $.done();
  }
);

/***************** Env 类（精简版） *****************/
function Env(name) {
  return new (class {
    constructor(name) {
      this.name = name;
      this.logs = [];
      this.startTime = new Date().getTime();
      this.log(`🔔${this.name}, 开始!`);
    }

    // 通知
    notify(title, subtitle = "", content = "") {
      console.log(`${title} ${subtitle} ${content}`);
      $notify(title, subtitle, content);
    }

    // 日志
    log(...args) {
      this.logs.push(args.join(" "));
      console.log(args.join(" "));
    }

    // 结束
    done() {
      const time = (new Date().getTime() - this.startTime) / 1000;
      this.log(`🔔${this.name}, 结束! 🕛 ${time} 秒`);
      $done({});
    }
  })(name);
}
