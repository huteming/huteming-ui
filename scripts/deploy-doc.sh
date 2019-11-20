#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录下 
cd dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

nowtime=`date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"`

git init
git add -A
git commit -m "deploy at: $nowtime"

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:huteming/huteming-ui.git master:gh-pages

cd -
