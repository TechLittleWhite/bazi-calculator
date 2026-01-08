# 🚀 GitHub + Vercel 部署完整指南

## 📋 准备工作检查清单

✅ 所有文件已就位：
- `/frontend/` - 前端React应用
- `/api/` - Vercel Serverless Functions
- `/backend/` - 八字计算算法
- `vercel.json` - Vercel配置
- `package.json` - 项目依赖

## 📝 第一步：创建GitHub仓库并推送代码

### 1. 在GitHub创建新仓库
1. 访问 https://github.com/new
2. 仓库名称：`bazi-calculator`
3. 设置为 **Public**（公开）
4. **不要**勾选 "Add a README file"
5. 点击 "Create repository"

### 2. 初始化Git并推送代码

**在终端执行以下命令：**

```bash
# 进入项目目录
cd /Users/x/bazi-calculator

# 初始化git仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 八字排盘系统"

# 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/bazi-calculator.git

# 推送代码
git branch -M main
git push -u origin main
```

**重要：** 将上面的 `YOUR_USERNAME` 替换为你的GitHub用户名！

示例：
```bash
git remote add origin https://github.com/zhangsan/bazi-calculator.git
```

## 🌐 第二步：在Vercel部署

### 1. 登录Vercel
1. 访问 https://vercel.com
2. 点击右上角 "Sign Up" 或 "Login"
3. 选择 "Continue with GitHub"（推荐）

### 2. 导入GitHub仓库
1. 登录后，点击 "Add New..." → "Project"
2. 在 "Import Git Repository" 列表中找到 `bazi-calculator`
3. 点击 "Import"

### 3. 配置项目
**保持以下设置：**
- **Framework Preset**: Vite（自动检测）
- **Root Directory**: `./`（根目录）
- **Build Command**: `cd frontend && npm install && npm run build`
- **Output Directory**: `frontend/dist`
- **Install Command**: `cd frontend && npm install`

### 4. 开始部署
1. 点击 "Deploy" 按钮
2. 等待2-3分钟...
3. 看到 "Congratulations!" 页面

### 5. 获取你的网站URL
部署成功后，你会得到一个类似这样的URL：
```
https://bazi-calculator-xxx.vercel.app
```

## 🎉 完成！测试你的网站

### 在电脑上测试
1. 打开浏览器
2. 访问你的Vercel URL
3. 测试八字计算功能

### 在手机上测试
1. 复制你的Vercel URL
2. 在手机浏览器粘贴访问
3. 测试移动端布局和触摸操作

## 🔄 更新网站

当你修改代码后：

```bash
# 提交更改
git add .
git commit -m "更新功能说明"
git push
```

Vercel会**自动检测并重新部署**，无需手动操作！

## 📱 分享给他人

直接分享你的Vercel URL，例如：
```
https://bazi-calculator.vercel.app
```

**特点：**
- ✅ 全球可访问
- ✅ HTTPS自动配置
- ✅ 手机完美适配
- ✅ 永久免费

## ⚠️ 常见问题

### Q1: Git推送失败？
**A:** 检查GitHub用户名是否正确：
```bash
git remote -v
```
应该显示：
```
origin  https://github.com/YOUR_USERNAME/bazi-calculator.git
```

### Q2: Vercel部署失败？
**A:** 查看Vercel的部署日志：
1. 进入项目Dashboard
2. 点击失败的部署
3. 查看 "Build Logs"

常见错误：
- 依赖未安装 → 等待自动安装
- API路径错误 → 检查 `vercel.json`

### Q3: API调用报错？
**A:** 确保：
- `api/calculate-bazi.js` 文件存在
- `backend/baziCalculator.js` 文件存在
- `lunar-javascript` 已安装在根目录

## 🎯 快速命令参考

```bash
# 查看git状态
git status

# 提交更改
git add .
git commit -m "更新说明"
git push

# 查看远程仓库
git remote -v
```

## 🌟 下一步优化

- 添加自定义域名（在Vercel设置）
- 优化SEO（添加meta标签）
- 添加Google Analytics
- 设置环境变量（如果需要）

---

**祝你部署成功！🎉**
