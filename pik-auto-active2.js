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

// 调试：记录UUID
$.log(`使用的UUID: ${uuid}`);

// 检查UUID是否有效（避免空值或默认值）
if (!uuid || uuid === "fa3855dcd1b4498a91886b5e7e843099") {
  $.notify("配置错误", "", "请替换为有效的UUID");
  $.log("错误：UUID未配置或使用默认值");
  $.done();
}

// 发送GET请求
const request = { url, method: "GET", timeout: 10000 }; // 添加10秒超时

$task.fetch(request).then(
  response => {
    $.log(`服务器响应: ${response.body}`);
    try {
      const data = JSON.parse(response.body);
      if (data.code === 200 && data.msg) {
        $.notify("运行成功", "", data.msg);
        $.log(`成功: ${data.msg}`);
      } else {
        $.notify("运行失败", "", data.msg || "服务器返回未知错误");
        $.log(`失败: ${JSON.stringify(data)}`);
      }
    } catch (e) {
      $.notify("解析错误", "", `响应数据格式无效: ${e.message}`);
      $.log(`解析错误: ${e.message}`);
    }
    $.done();
  },
  reason => {
    $.notify("请求错误", "", reason.error || "网络错误");
    $.log(`请求错误: ${reason.error}`);
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
      console.log(`[${this.name}] ${title} ${subtitle} ${content}`);
      $notify(title, subtitle, content);
    }

    // 日志
    log(...args) {
      const msg = `[${new Date().toLocaleString()}] [${this.name}] ${args.join(" ")}`;
      this.logs.push(msg);
      console.log(msg);
    }

    // 结束
    done() {
      const time = (new Date().getTime() - this.startTime) / 1000;
      this.log(`🔔${this.name}, 结束! 🕛 ${time} 秒`);
      $done({});
    }
  })(name);
}