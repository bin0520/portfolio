# Git LFS 设置步骤

用于将大视频/图片文件迁移到 Git LFS，解决 push 超时问题。

---

## 第一步：安装 Git LFS

```bash
brew install git-lfs
```

安装完成后初始化（只需执行一次）：

```bash
git lfs install
```

---

## 第二步：在项目中启用并配置 LFS

在项目根目录执行：

```bash
cd /Users/apple/Projects/portfolio

# 用 LFS 管理 mp4 和 gif
git lfs track "*.mp4"
git lfs track "*.gif"
```

会生成或更新 `.gitattributes`，并自动添加规则。

---

## 第三步：把已有大文件迁移到 LFS

当前提交里的大文件需要迁移到 LFS（会改写提交历史）：

```bash
# 迁移 mp4 和 gif 到 LFS
git lfs migrate import --include="*.mp4,*.gif" --everything
```

说明：`--everything` 会处理所有分支的所有提交。

---

## 第四步：提交 LFS 相关变更并推送

```bash
# 查看当前状态
git status

# 若有新生成的 .gitattributes，需要提交
git add .gitattributes
git commit -m "Add Git LFS tracking for mp4 and gif files" --allow-empty

# 推送到 GitHub
git push origin main
```

---

## 第五步：以后新增大文件

在正常 `git add` 和 `git commit` 后，对应类型的文件会自动走 LFS，无需额外操作。

---

## 常见问题

### 1. 执行 `git lfs migrate` 报错

如果提示没有可迁移的文件，可能是规则没有匹配到，可以先确认：

```bash
git lfs migrate import --include-ref=refs/heads/main --include="*.mp4" --everything --dry-run
```

加上 `--dry-run` 只做预览，不会实际修改历史。

### 2. Push 仍然很慢或超时

可以先调大 Git 的配置，再重试 push：

```bash
git config http.postBuffer 524288000
git config http.lowSpeedLimit 0
git config http.lowSpeedTime 999999
```

### 3. 历史已被改写，Push 被拒绝

若出现 `! [rejected] main -> main (non-fast-forward)`，说明远程已有不同历史，需要强制推送：

```bash
git push origin main --force
```

注意：`--force` 会覆盖远程分支，只在确定只有你一个人用该分支、或团队已协商好时使用。
