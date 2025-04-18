// PikPak 自动活跃 - 作者AAA
const uuid = "fa3855dcd1b4498a91886b5e7e843099"; // ← 替换为你的UUID
if (uuid === "你的UUID") {
  $notify("运行提示", "请替换为你的实际UUID", "");
  $done();
}

$task.fetch({
  url: https://hy.bilivo.top/a_tasks?uuid=${uuid},
  method: "GET",
  headers: { "Content-Type": "application/json" }
}).then(res => {
  try {
    const data = JSON.parse(res.body);
    const msg = data.msg || "无返回信息";
    if (data.code === 200) {
      $notify("运行结果", msg, "");
    } else {
      $notify("请求失败", msg, "");
    }
  } catch (e) {
    $notify("解析错误", "", e.message || String(e));
  }
  $done();
}, err => {
  $notify("请求错误", "", err.error || String(err));
  $done();
});