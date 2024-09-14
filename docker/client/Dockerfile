# 使用轻量级的官方 Nginx 镜像作为基础镜像
FROM nginx:alpine

LABEL maintainer=Sam

ARG PROJECT_DIR="cash-admin"

# 时区
ENV TZ=Asia/Shanghai

# 本地的 `nginx.conf` 文件复制到容器的 `/etc/nginx/conf.d/default.conf`
COPY /docker/client/nginx.conf /etc/nginx/conf.d/default.conf

# `builder` 阶段中复制构建好的文件到 Nginx 容器的网页根目录 `/usr/share/nginx/html`
COPY /apps/client/dist/ /usr/share/nginx/html

