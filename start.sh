#!/bin/bash

echo "🔮 启动八字排盘系统..."

# 检查端口是否被占用
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  端口 3001 已被占用，正在尝试释放..."
    kill -9 $(lsof -t -i:3001) 2>/dev/null
fi

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  端口 3000 已被占用，正在尝试释放..."
    kill -9 $(lsof -t -i:3000) 2>/dev/null
fi

# 启动后端
echo "🚀 启动后端服务器 (端口 3001)..."
cd /Users/x/bazi-calculator/backend && node server.js &
BACKEND_PID=$!
sleep 2

# 启动前端
echo "🎨 启动前端服务器 (端口 3000)..."
cd /Users/x/bazi-calculator/frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ 八字排盘系统已成功启动！"
echo ""
echo "📱 前端地址: http://localhost:3000"
echo "🔧 后端地址: http://localhost:3001"
echo ""
echo "按 Ctrl+C 停止所有服务"

# 等待用户中断
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo ''; echo '👋 服务已停止'; exit" INT

wait
