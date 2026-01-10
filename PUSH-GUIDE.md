# 📤 GitHub上传指南

## ⚠️ 重要提示
由于项目文件较多，手动上传所有文件会非常繁琐。强烈建议使用以下任一方法：

## 方法1：使用GitHub Desktop（最简单，推荐）

### 步骤：
1. **下载GitHub Desktop**
   - 访问：https://desktop.github.com/
   - 下载并安装Mac版本

2. **登录GitHub账户**
   - 打开GitHub Desktop
   - 登录你的GitHub账户

3. **添加本地仓库**
   - 点击 "File" → "Add Local Repository"
   - 选择文件夹：`/Users/x/bazi-calculator`
   - 点击 "Add Repository"

4. **发布到GitHub**
   - 点击 "Publish repository"
   - Repository name: `bazi-calculator`
   - 保持 "Keep this code private" **未勾选**（公开）
   - 点击 "Publish Repository"

5. **完成！**
   所有文件会自动上传，无需手动操作！

---

## 方法2：使用GitHub CLI（次推荐）

### 在终端执行：
```bash
# 安装
brew install gh

# 登录（会打开浏览器）
gh auth login

# 推送
cd /Users/x/bazi-calculator
gh repo set-default TechLittleWhite/bazi-calculator
git push -u origin main
```

---

## 方法3：手动上传（不推荐，很繁琐）

如果你坚持手动上传，需要上传以下文件：

### 必须上传的文件（按优先级）：

#### 根目录：
1. `vercel.json` - Vercel配置
2. `package.json` - 项目依赖
3. `README.md` - 项目说明

#### api/文件夹：
4. `api/calculate-bazi.js` - API接口

#### backend/文件夹：
5. `backend/baziCalculator.js` - 八字计算核心
6. `backend/package.json` - 后端依赖

#### frontend/文件夹：
7. `frontend/package.json` - 前端依赖
8. `frontend/vite.config.js` - Vite配置
9. `frontend/index.html` - HTML入口
10. `frontend/tsconfig.json` - TypeScript配置

#### frontend/src/文件夹：
11. `frontend/src/main.tsx` - React入口
12. `frontend/src/App.tsx` - 主组件
13. `frontend/src/App.css` - 主样式

#### frontend/src/components/文件夹（重要！）：
14. `frontend/src/components/BaziForm.tsx`
15. `frontend/src/components/BaziForm.css`
16. `frontend/src/components/BaziResult.tsx`
17. `frontend/src/components/BaziResult.css`
18. `frontend/src/components/KLineChart.tsx`
19. `frontend/src/components/KLineChart.css`

#### frontend/src/styles/文件夹：
20. `frontend/src/styles/index.css`

### 手动上传步骤：
1. 访问：https://github.com/TechLittleWhite/bazi-calculator
2. 点击 "uploading an existing file"
3. **逐个文件上传**（不支持文件夹，必须一个一个传）
4. 每个文件填写commit message
5. 点击 "Commit changes"

**预计需要时间：20-30分钟** ⏰

---

## 🎯 建议

**强烈推荐方法1（GitHub Desktop）**，因为：
- ✅ 图形界面，操作简单
- ✅ 自动上传所有文件
- ✅ 无需命令行知识
- ✅ 5分钟内完成

**方法2（GitHub CLI）** 次选：
- ✅ 命令简单，只需3行
- ✅ 一次性上传所有文件
- ⚠️ 需要安装工具

**方法3（手动上传）** 最后选择：
- ❌ 非常繁琐，需要20-30分钟
- ❌ 容易遗漏文件
- ❌ 容易出错

---

## 🚀 选择方案后告诉我

- 选择方法1：我会提供GitHub Desktop详细截图指南
- 选择方法2：我会帮你安装并配置
- 选择方法3：我会提供逐个文件的上传顺序

请告诉我你想用哪个方法？
