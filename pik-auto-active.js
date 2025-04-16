// 引入 axios 库用于发送 HTTP 请求
const axios = require('axios');

// 定义请求的 URL
const url = 'https://hy.bilivo.top/a_tasks?uuid=*****';

// 发送 GET 请求
axios.get(url)
    .then(response => {
        // 检查请求是否成功
        if (response.status === 200) {
            // 解析 JSON 数据
            const data = response.data;
            // 显示 JSON 中的 msg 信息
            console.log('请求成功:', data.msg);
        } else {
            console.log('请求失败，状态码:', response.status);
        }
    })
    .catch(error => {
        // 处理请求错误
        console.error('请求出错:', error.message);
    });
