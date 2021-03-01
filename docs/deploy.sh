#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
# npm run docs:build
npm run docs:build

# 进入生成的文件夹
# cd docs/.vuepress/dist
cd build

# 如果是发布到自定义域名
echo 'doc.api.hujiangtao.cn' > CNAME

git init
git config user.name jiangtao
git config user.email jiangtao.work@gmail.com
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# 如果发布到 https://hustjiangtao.github.io/vuepress
# git push -f git@github.com:hustjiangtao/vuepress.git master:gh-pages

# 如果发布到 https://github.com/hustjiangtao/hujiangtao.cn.git
git push -f git@github.com:hustjiangtao/API.git master:gh-pages

# 发布到tengxun cloud
# scp -r ../dist tengxun:/var/www/web/www.hujiangtao.cn

cd -
