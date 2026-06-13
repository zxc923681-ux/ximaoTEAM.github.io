// public/app.js
const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const emojiBtn = document.getElementById("emojiBtn");
// 添加消息到界面
function addMessage(text, type) {
    const message = document.createElement("div");
    message.className = "message " + type;
    if (type === "ai") {
        message.innerHTML = `
            <div class="avatar">🤖</div>
            <div class="bubble">${text}</div>
        `;
    } else {
        message.innerHTML = `
            <div class="bubble">${text}</div>
        `;
    }
    messages.appendChild(message);
    messages.scrollTop =
        messages.scrollHeight;
}
// 发送消息
async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, "user");
    input.value = "";
    try {
        const response = await fetch(
            "/api/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                    "application/json"
                },
                body: JSON.stringify({
                    message: text
                })
            }
        );
        const data =
            await response.json();
        addMessage(
            data.reply,
            "ai"
        );
    } catch (err) {
        addMessage(
            "服务器连接失败",
            "ai"
        );
        console.error(err);
    }
}
// 点击发送
sendBtn.addEventListener(
    "click",
    sendMessage
);
// 回车发送
input.addEventListener(
    "keydown",
    (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    }
);
// Emoji
emojiBtn.addEventListener(
    "click",
    () => {
        const emojis = [
            "😀","😂","🤣","😍",
            "😎","🔥","❤️","👍",
            "🎉","😭","🤖"
        ];
        const emoji =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];
        input.value += emoji;
        input.focus();
    }
);
// 新聊天按钮
const newChatBtn =
document.getElementById(
    "newChatBtn"
);
if (newChatBtn) {
    newChatBtn.addEventListener(
        "click",
        () => {
            messages.innerHTML = `
                <div class="message ai">
                    <div class="avatar">🤖</div>
                    <div class="bubble">
                        新聊天已创建。
                    </div>
                </div>
            `;
        }
    );
}
