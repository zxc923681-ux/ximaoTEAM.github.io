// server.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态网页目录
app.use(express.static(path.join(__dirname, "public")));

// 测试接口
app.get("/api/status", (req, res) => {
    res.json({
        success: true,
        message: "AI Chat Server Running",
        time: new Date()
    });
});

// 聊天接口（暂时使用模拟AI）
// 后面会升级接入 OpenAI API
app.post("/api/chat", async (req, res) => {

    try {

        const message = req.body.message || "";

        let reply = "我收到你的消息了。";

        if (message.includes("你好")) {
            reply = "你好！我是AI助手。";
        }
        else if (message.includes("你是谁")) {
            reply = "我是你的AI聊天助手。";
        }
        else if (message.includes("时间")) {
            reply = "当前时间：" + new Date().toLocaleString();
        }
        else {
            reply =
                "你刚刚说的是：" +
                message +
                "。后续我们会接入真正的AI模型。";
        }

        res.json({
            success: true,
            reply
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            error: err.message
        });

    }

});

// 首页
app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public", "index.html")
    );
});

// 启动服务器
app.listen(PORT, () => {

    console.log("");
    console.log("================================");
    console.log("AI Chat Server Started");
    console.log("Port:", PORT);
    console.log("URL: http://localhost:" + PORT);
    console.log("================================");
    console.log("");

});
