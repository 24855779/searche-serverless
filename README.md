# Serverless实现：基于AWS Lambda结合S3和DynamoDB构建的简易搜索功能

## 功能说明

​	基于AWS Lambda、S3、DynamoDB构建一套的serverless架构。静态页面内容部署到Amazon S3上，业务逻辑处理使用Lambda函数。当用户请求时通过API Gateway来触发Lambda函数，从DynamoDB中读取键字相应的数据，返回在页面显示。

serverless架构图：

![avatar](https://s3.amazonaws.com/search-serverless/Architecture+diagram.png)

# 前端页面部分

**技术栈：**

VUE全家桶

**实现功能：**

实现了简易的关键字搜索及列表展示功能

**前端使用说明：**

- 安装依赖

```
npm install
```

- 本地服务启动

```
npm run serve
```

- 打包生产文件

```
npm run build
```



# 项目部署

要求：您需要一个AWS账号。

1. **创建静态页面托管服务**

   - 在AWS控制台中选择S3服务，创建一个Bucket，设置公有访问权限。
   - 开启静态网站托管服务，设置索引文档为：index.html，生成的终端节点地址。
   - 将打包的生产文件上传到S3的Bucket中，设置所有对象的公共访问权限，并使用标准存储类别。
   - 可通过终端节点访问搜索网站的服务：[http://sousuo-serverless.s3-website-us-east-1.amazonaws.com/](http://search-serverless.s3-website-us-east-1.amazonaws.com/)。

2. **创建Lambda函数**

   创建了4个函数作为业务逻辑处理：

   searchKey：根据关键字搜索相关内容

   productList：相关条目列表

   getProductDetail：获取关键字信息详细页

   addProduct：添加相关信息数据

   创建Lambda函数时，通过IAM角色来授予访问其他资源的权限。创建API Gateway触发器，通过API Gateway触发函数执行业务逻辑。

3. **创建API Gateway用作前端页面的交互**

   通过API Gateway作为lambda函数的触发点来调用自定义函数。

4. **创建DynomoDB存储数据**

   在控制台上创建DynamoDB表，用于存放内容数据。
