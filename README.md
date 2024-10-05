# sooo-reaction

这是一个 reaction 表情 Vue 组件

## 组件食用说明
1. 你需要有一个后端服务器，只需要跑mysql和api请求就可以了。
2. 搭建好你的后端后记得修改`s22y-reaction-backend/.env`中数据库的连接信息。
3. 在你的项目中安装axios依赖。
4. 然后只需要像平常导入组件一样把`reaction.vue`导入你的项目就可以了。
``` vue
<script>
import reaction from "./components/reaction.vue";
</script>

<template>
    <reaction :emojiListPath="'/emoji.json'" :emojiRequest="'https://cos.sooooooooooooooooootheby.top/emoji/'" :id="0" :request="'http://192.168.31.111:4000'" />
</template>
```

## 组件参数说明
注意！这里三个参数都是必须的，没有默认值。
- emojiListPath: 这是你的emoji表情列表，请使用json文件并保持下面的举例格式。
``` json
[ "37_Eureka", "Eagle_Dumbfounded" ]
```
- :emojiRequest: 这是图片的地址, 会和表情名拼接成为完整的url, 目前只支持`.png`.
- id: 这是id, 用于分辨属于哪个部分的reaction。
- request: 这是你后端的请求地址。

## 目录说明

`sooo-reaction`文件夹是组件的项目文件夹，具体组件目录为`s22y-reaction/src/components/reaction.vue`，方便起见我在根目录也放了一个`reaction`，你也可以查看 Releases。

啥？ 你问我为什么不打包发布到 npm？ 因为我不会 笑)

`s22y-reaction-backend`是后端的 api 项目，这个组件需要后端。api 代码目录为`s22y-reaction-backend/router.js`。

## 数据库

数据库的连接信息位于`s22y-reaction-backend/.env`

这是数据库的格式, 你可以使用目录下的`reaction.sql`导入你的数据库

``` mysql
CREATE TABLE `reaction` (
  `ip` varchar(15) COLLATE utf8mb4_general_ci NOT NULL,
  `id` int NOT NULL,
  `emoji` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

## 运行本储存库的项目demo

``` shell
# 前端
#在 s22y-reaction 目录下执行
# 安装依赖
pnpm i

# run!
pnpm dev

# 后端
# 在 s22y-reaction-backend 目录下执行
# 安装依赖
pnpm i

# run!
node main.js
```