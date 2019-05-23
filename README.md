# Serverless实现：基于AWS Lambda结合S3和DynamoDB构建的简易搜索功能

## 功能说明

​	基于AWS Lambda、S3、DynamoDB构建一套的serverless架构。静态页面内容部署到Amazon S3上，业务逻辑处理使用Lambda函数。当用户请求时通过API Gateway来触发Lambda函数，从DynamoDB中读取相应的商品数据，返回在页面显示。

![架构图](/Users/vincent/Desktop/架构图.png)

​																										图1：系统架构图

## Install

要求：您需要一个AWS账号。

1. 创建静态页面托管服务

   - 在AWS控制台中选择S3服务，创建一个Bucket，设置公有访问权限。
   - 开启静态网站托管服务，设置索引文档为：index.html，生成的终端节点地址：[http://sousuo-serverless.s3-website-us-east-1.amazonaws.com/](http://sousuo-serverless.s3-website-us-east-1.amazonaws.com/)。
   - 将发布版本dist文件中的代码文件上传到S3的Bucket中，设置所有对象的公共访问权限，并使用标准存储类别。
   - 通过终端节点访问静态网站。

2. 创建Lambda函数

   创建了4个函数作为业务逻辑处理。

   searchKey：根据关键字搜索商品名臣

   productList.js：商品列表

   getProductDetail：获取商品信息详细页

   addProduct：添加上平数据

   创建Lambda函数时，通过IAM角色来控制访问其他资源的权限。创建API Gateway触发器，通过API Gateway触发函数执行业务逻辑。

3. 创建API Gateway用作前端页面的交互

   通过API Gateway作为lambda函数的触发点来调用自定义函数。

4. 创建DynomoDB存储数据

   在控制上创建DynamoDB表，用于存放商品数据。