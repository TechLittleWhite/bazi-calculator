# 八字排盘系统 - 完整部署步骤

## 🛠️ 准备工作

### 1. 修复npm权限问题（在终端执行）

```bash
# 清理npm缓存
sudo rm -rf ~/.npm/_cacache

# 或者修复权限
sudo chown -R $(whoami) ~/.npm
```

### 2. 安装Vercel CLI

```bash
npm install -g vercel
```

### 3. 登录Vercel

```bash
vercel login
```

会打开浏览器，选择登录方式：
- GitHub（推荐）
- Google
- Email

## 📤 部署步骤

### 方式1：使用Vercel CLI（推荐）

```bash
# 进入项目目录
cd /Users/x/bazi-calculator

# 安装项目依赖
npm install

# 部署到Vercel
vercel
```

**部署过程中的选择：**
- ? Set up and deploy? **Y**
- ? Which scope? **选择你的账号**
- ? Link to existing project? **N**
- ? Project name? **bazi-calculator**
- ? Directory? **.**
- ? Override settings? **N**

等待2-3分钟，部署完成！

### 方式2：使用Vercel网站（更简单）

1. **访问 Vercel官网**
   - 打开 https://vercel.com
   - 点击 "Sign Up" 或 "Login"

2. **导入GitHub仓库**
   - 将项目代码推送到GitHub
   - 在Vercel点击 "Import Project"
   - 选择你的GitHub仓库

3. **配置项目**
   - Framework Preset: **Vite**
   - Root Directory: **frontend**
   - 其他保持默认

4. **点击 "Deploy"**
   - 等待2-3分钟
   - 部署成功！

## 🎉 部署成功后

你会得到一个URL，例如：
```
https://bazi-calculator-xxx.vercel.app
```

## 🔄 更新部署

### CLI方式：
```bash
vercel --prod
```

### 网站方式：
- 推送代码到GitHub
- Vercel自动重新部署

## 📱 手机访问测试

1. 在手机浏览器输入部署得到的URL
2. 测试所有功能是否正常
3. 检查移动端布局是否完美

## ⚠️ 常见问题

### Q: npm权限错误？
```bash
sudo chown -R $(whoami) ~/.npm
```

### Q: 部署失败？
- 检查 `vercel.json` 是否正确
- 检查 `api/calculate-bazi.js` 是否存在
- 查看Vercel部署日志

### Q: API报错？
- 检查 `lunar-javascript` 是否安装
- 查看 Vercel Functions 日志

## 🌐 分享给他人

直接分享你的Vercel URL，例如：
```
https://bazi-calculator.vercel.app
```

任何人都可以在手机或电脑上访问！
