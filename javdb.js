/*************************************

项目名称：JavDB-净化/解锁VIP
下载地址：https://javdb008.com
更新日期：2024-07-30
使用声明：⚠️仅供参考，🈲转载与售卖！

**************************************

[rewrite_local]
^https?:\/\/api\.hechuangxinxi\.xyz\/api\/v\d\/(users|startup|ads) url script-response-body https://raw.githubusercontent.com/Godfox9527/x/main/javdb.js
;^https?:\/\/api\.hechuangxinxi\.xyz\/api\/v\d\/(movies|movie_played) url script-request-header https://raw.githubusercontent.com/Godfox9527/x/main/javdb.js

[mitm]
hostname = api.hechuangxinxi.xyz

*************************************/


const chxm1024 = {};
const url = $request.url;
const chxm1023 = JSON.parse(typeof $response != "undefined" && $response.body || null);

if (typeof $response == "undefined") {
  //const headers = $request.headers;
  //headers["authorization"] = "JGw-GeBaBNMC8e2NIb0v6ZjUGjZzklLX2SzJNuyi0jn___xhImSX7_JKS-NoApLwMFIgK1h_KatwIcQp3Sg1dQ";
  //chxm1024.headers = headers;
} else {
  if(/users/.test(url)){
    chxm1023.data.user = Object.assign({}, chxm1023.data.user, {
      "promotion_days" : 9999,
      "vip_expired_at" : "2099-09-09T09:09:09.000+09:00",
      "is_vip" : true
    });
    chxm1023.banner_type = "payment";
  }
  if(/startup/.test(url)){
    chxm1023.data.splash_ad = {
      "enabled" : false,
      "overtime" : 0,
      "ad" : null
    };
    chxm1023.data.settings.UPDATE_DESCRIPTION = "";
    chxm1023.data.settings.NOTICE = "";
    chxm1023.data.feedback.placeholder = "";
  }
  if(/ads/.test(url)){
    chxm1023.data.enabled = false;
    chxm1023.data.ads = {};
  }
  chxm1024.body = JSON.stringify(chxm1023);
}

$done(chxm1024);
