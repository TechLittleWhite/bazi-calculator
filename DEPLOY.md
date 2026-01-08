# 八字排盘系统 - Vercel 部署指南

## 📋 部署步骤

### 1. 安装 Vercel CLI
```bash
npm install -g vercel
```

### 2. 登录 Vercel
```bash
vercel login
```

### 3. 安装依赖（在项目根目录）
```bash
# 如果遇到npm缓存权限问题，运行：
sudo chown -R $(whoami) ~/.npm

# 然后安装依赖
npm install
```

### 4. 部署到 Vercel
```bash
vercel
```

按照提示操作：
- ? Set up and deploy "~/bazi-calculator"? [Y/n] **Y**
- ? Which scope do you want to deploy to? **选择你的账号**
- ? Link to existing project? [y/N] **N**
- ? What's your project's name? **bazi-calculator**
- ? In which directory is your code located? **.**
- ? Want to override the settings? [y/N] **N**

### 5. 部署成功后
你会得到一个类似这样的URL：
```
https://bazi-calculator-xxx.vercel.app
```

这就是你的公网访问地址，任何人都可以通过手机或电脑访问！

## 🔄 更新部署

当代码有更新时，重新部署：
```bash
vercel --prod
```

## 📱 移动端适配

已完全适配手机布局，支持：
- iPad（768px以下）
- 手机（480px以下）
- 触摸操作优化

## 🎯 访问地址

部署成功后，会得到以下地址：
- **生产环境**: `https://bazi-calculator-xxx.vercel.app`
- **预览环境**: `https://bazi-calculator-xxx.vercel.app` (每次部署不同)

这些地址可以分享给任何人，无需在同一WiFi！
