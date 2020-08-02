---

title: 'MySQL笔记'
date: 2020-07-12
tags:
- 'MySQL database'
categories:
- 'DataBase'
---
## MySQL
### 1. 初始MySQL
#### 1.1 什么是数据库
数据库（DB, DATABASE）  
概念： 数据仓库，软件，安装在操作系统上的管理数据的软件   
作用：存储数据，管理数据
#### 1.3  数据库分类
- 关系型数据库    
    MySQL、Oracle、SqlServer、DB2、SQLLITE。  
    通过表和表之间，行和列之间的关系进行数据的存储。
- 非关系型数据库  
    Redis、MongoDB  
    非关系型数据库，按对象存储，通过对象的自身属性类决定。  
**DNMS（数据库管理系统）**  
数据库的管理软件，科学有效的管理系统，维护和获取数据。  
MySQL本身就是数据库管理系统
#### 1.4 MySQL简介
MySQL是一个**关系型数据库**   
官网： https://www.mysql.com
#### 1.5 连接数据库
```sql
mysql -u root -p   --连接数据库，回车后输入密码
update mysql.user set authentication_string=passsord('123456') where user='root' and Host='localhost'; -- 修改用户密码
--------------------------------------------------------------------

-- 所有的语句都以;结尾
show databases;  -- 查看所有数据库
use 数据库名称;   --使用数据库
show tables;  -- 查看数据库中所有的表
describe 数据库名称；-- 显示数据库中所有表的信息

create database 名称;  --创建数据库
exit;  --退出连接
```
  数据库XXX语言   
  - DDL：定义
  - DML：操作
  - DQL：查询
  - DCL：控制
### 2 操作数据库
操作数据库>操作数据库中的表>操作数据库中表的数据    
#### 2.1 操作数据库
1、 创建数据库    
```sql
  CREATE DATABASE [IF NOT EXIST] 名称;
```
2、删除数据库
```sql
DROP DATABASE [IF EXIST] 名称;
```
3、使用数据库

```sql
use 名称;  --如果表名或者字段名是特殊字符与。需要带``括起来
```
4、查看所有数据库
```sql
show databases; 
```
#### 2.2 数据库的列类型
> 数值    
- tinyint: 十分小的数据,占1个字节 
- smallint: 较小的数据，占2个字节
- mediumint: 中等大小的数据，占3个字节
- **int: 标准的整数，占4个字节**
- bigint:较大的数据，占8个字节
- float： 浮点数，占4个字节
- double: 浮点数，占8个字节
- decimal: 字符串形式的浮点数，金融计算的时候，一般使用
> 字符串  
- char: 字符的固定大小   0-255    
- **varchar:可变的字符串  0-65535**    常用
- tinytext: 微型文本    2^8 - 1;
- **text: 文本串     2^16 - 1**   保存大文本

> 时间日期
>
> - date: 	YYYY-MM-DD   日期
> - time:     HH:mm:ss   时间格式
> - **datetime:    YYYY-MM-DD   HH:mm:ss**   最常用的时间格式
> - timestamp：时间戳   1970.1.1到现在的毫秒数
> - year:表示年份

> null
>
> - 没有值，未知
> - **不要使用null进行运算**

#### 2.3 数据库的字段属性（重点）

 - Unsigned
   	- 无符号的整数。
      	- 不能声明为负数。
 - zreofill
   	- 0填充
      	- 不足的位数，使用0进行填充	
 - 自增
   	- 自动在上一条记录的基础上增加1。
      	- 通常来设置主键（唯一），且必须是整数类型。
      	- 可以自定义设计主键自增的起始值和步长
 - 非空（null 或 not null）
    - 假设值为not null,不赋值就会报错
    - Null,如果不填写，默认就是null
 - 默认
    - 设置默认的值

#### 2.4 创建数据库表

```sql
-- 注意：使用英文(),表的名称和字段用``括起来
-- 字符串使用单引号括起来
-- 所有的语句后面加,最后一个语句不用加
-- PRIMARY KEY主键，一张表只有唯一的主键
CREATE TABLE IF NOT EXISTS `student`(
	`id` INT(4) NOT NULL	auto_increment  COMMENT '学号',
	`name` VARCHAR(30) NOT NULL DEFAULT '匿名' COMMENT '姓名',
	`pwd` VARCHAR(20) NOT NULL DEFAULT '123456' COMMENT	'密码',
	`sex` VARCHAR(2) NOT NULL DEFAULT	'女' COMMENT		'性别',
	`birthday` datetime DEFAULT NULL COMMENT '生日',
	`address` VARCHAR(30) DEFAULT NULL	comment '地址',
	`email` VARCHAR(30) DEFAULT NULL COMMENT	'邮箱',
	PRIMARY KEY(`id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8
```

 - 常用命令

   ```sql
   SHOW CREATE DATABASE `school`;   -- 查看创建数据库的语句
   SHOW CREATE TABLE student;    -- 查看创建表的语句
   DESC student;    -- 显示表的结构
   ```

#### 2.5 数据表的类型

```sql
-- 关于数据库引擎
/*
INNODB：默认使用
MYISAM：早期使用
*/
```



|                | MYISAM | INNODB                |
| -------------- | ------ | --------------------- |
| 事务支持       | 不支持 | 支持                  |
| 数据行         | 不支持 | 支持                  |
| 外键约束       | 不支持 | 支持                  |
| 全文检索       | 支持   | 不支持                |
| 表空间大小     | 较小   | 较大，约为MYISAM的2倍 |
| 常规使用操作： |        |                       |

	- MYISAM：节约空间，速度快
	- INNODB: 安全，事务的处理，多表多用户操作

>  在物理空间的位置	

​		所有的数据库文件都存在data目录下

​		本质还是文件的存储
MySQL引擎在物理文件上的区别

	- InnoDB在数据库表中只有一个*.frm文件，以及上级目录下的ibdata1文件
 - MYISAM对应的文件
   	- *.frm  -表结构的定义文件
      	- *.MYD   数据文件
      	- *.MYI  索引文件

> 设置数据库表的字符集编码

```sql
CHARSET=utf8
```

#### 2.6 修改和删除表

> 修改表

```sql
-- 修改表i名
ALTER TABLE `student1` RENAME as student;
-- 增加表的字段
ALTER TABLE student ADD hobey VARCHAR(11)
-- 修改约束
ALTER TABLE student MODIFY `name` INT(12)
-- 修改重命名
ALTER TABLE student CHANGE `name`  `name1` INT(13)
```





> 删除表

```sql
DROP TABLE IF EXISTS `student`
```

**所有的创建和删除都加上判断，以免报错**

### 3. MySQL数据管理

#### 3.1 外键（了解）

```sql
CREATE TABLE IF NOT EXISTS `student`(
	`id` INT(4) NOT NULL	auto_increment  COMMENT '学号',
	`name` VARCHAR(30) NOT NULL DEFAULT '匿名' COMMENT '姓名',
	`pwd` VARCHAR(20) NOT NULL DEFAULT '123456' COMMENT	'密码',
	`sex` VARCHAR(2) NOT NULL DEFAULT	'女' COMMENT		'性别',
	`birthday` datetime DEFAULT NULL COMMENT '生日',
	`address` VARCHAR(30) DEFAULT NULL	comment '地址',
	`gradeid` INT(10) NOT NULL COMMENT '年级id',
	`email` VARCHAR(30) DEFAULT NULL COMMENT	'邮箱',
	PRIMARY KEY(`id`),
	KEY `FK_gradeid` (`gradeid`),
	CONSTRAINT `FK_gradeid` FOREIGN KEY (`gradeid`) REFERENCES `grade`(`gradeid`)
) ENGINE=INNODB DEFAULT  CHARSET=utf8
```

删除有外键表的时候，必须先删除引用别人的表（从表），再删除被引用的表（主表）

**最佳实践**

- 数据库就是单纯的表，只用来存储数据，只有行（数据）和列（字段）
- 想要使用多张表的数据，应程序逻辑去实现

#### 3.2 DML语言

**数据库的意义**：存储数据，管理数据

DML语言：操作数据库的语言

#### 3.3 添加

insert

```sql
-- 一般写插入语句，一定要数据和字段一一对应
INSERT INTO `grade` (gradename) VALUES ('大四')
-- 插入多个字段
INSERT INTO `grade` (`gradename`) VALUES ('大一'),('大二')
INSERT INTO `student` (`name`) VALUES ('张三') 
```

**注意事项**

1. 字段和字段之间使用英文逗号隔开
2. 字段是可以省略的，但是后面的值必须要一一对应
3. 可以同时插入多条数据，values后面的值，需要使用()隔开即可

#### 3.4 修改

- update

  ```sql
  -- 修改学员名称,不指定条件的情况下，会修改所有的数据
  UPDATE `student` SET name='shiwei' where id=1
  -- 修改多个属性
  UPDATE `student` SET name='lixoashuang', email='111111@qq.com' where id=1
  ```

  条件：where语句，选择的一段区间，操作符会返回布尔值

|    操作符     | 含义         | 范围  |         结果          |
| :-----------: | ------------ | ----- | :-------------------: |
|       =       | 等于         | 5==6  |         false         |
|      <>       | 不等于       | 5<>6  |         true          |
|       >       | 大于         | 6>5   |         true          |
|       <       | 小于         | 6<5   |         false         |
|      <=       | 小于等于     |       |                       |
|      >=       | 大于等于     |       |                       |
| BETWEEN...and | 在某个范围内 | [2,6] | 在2-5之间（包含2、5） |
|      and      | 和           |       |                       |
|      or       | 或           |       |                       |
|               |              |       |                       |

```sql
	-- 通过多个条件定位数据
	update `student` set name= 'shiwei' where name = 'lixiao' and sex = '女'	
```



语法：**update 表名 set column_name=value,[column_name=value] where [条件]**

注意：

   - colmun_name是数据库的列，尽量带上``

   - 条件：筛选的条件，如果没有指定，则会修改所有的列

   - value：是一个具体的值，也可以是一个变量

```sql
	update `student` set birthday= current_time where name = 'lixiao' and sex = '女'
```

#### 3.5 删除

> delete命令

语法：delete from '表名' [where 条件]

```sql
-- 会全部删除
delete from `student`;

-- 删除指定数据（避免此种写法）
delete from `student` where id = 1;
```

> TRUNCATE

作用:完全清空一个数据库表,表的结构换个索引不会变

> delete 和truncate的区别

	- 相同点:都能删除数据,都不会删除表结构
 - 不同
   	- truncate 重新设置自增列,计数器会归零
      	- truncate不会影响事务

### 4 DQL查询数据(重点)

#### 4.1 DQL

​	(Data query laluage) 数据查询语言

- **数据库最核心的语言,最重要的语句**

#### 4.2 指定查询字段

```sql
-- 查询全部的学生   select 字段 from 表
select * from `student`

-- 查询指定字段
SELECT `StudentNo`, `StudentName` FROM student

-- 别名,给结果起一个名字  as  可以给字段起名字,也可以给表起别名
select `StudentNo` as 学号, `StudentName` as 学生姓名 from student as s;

-- 函数 concat(a, b)
select concat('姓名:' , StudentName) as 新名字 from student
```

> 有时候,列的名字不是见名知意,所以需要起一个别名  

> 去重 distinct

​	作用:去除select 查询出来的结果中重复的数据

```sql
select * from `student`  -- 查询全部的考试成绩
SELECT studentNo FROM result   -- 查询哪些同学参加了考试
SELECT DISTINCT studentNo FROM result   -- 发现重复数据,去重
```

数据库的列

```sql
select version()  -- 查询mysql版本
select 100*3   --可以计算
select @@auto_increment_increment   --查询自增的步长

-- 学员考试 +1 分查看
select `studentNo`, `studentResult + 1` as '提分后' from student
```

#### 4.3  where条件子句

作用:检索数据中符合条件的值

```sql
-- 查询考试成绩在96-100之间的
select studentNo, studentResult from student where studentResult>96 and studentResult<100  或
select studentNo, studentResult from student where studentResult>96 && studentResult<100 或
select studentNo, studentResult from student where studentResult between 95 and 100
-- 除了1000号学生之外的同学成绩
select studentNo, studentResult from student where studentNo!=1000
```

> 模糊查询: 比较运算符

| 运算符      | 语法               | 描述                          |
| ----------- | ------------------ | ----------------------------- |
| IS NULL     | a is null          | 如果操作符为null,结果为真     |
| IS NOT NULL | a is not null      | 如果操作符为not null 结果为真 |
| between     | a between b and c  | 若a在b和c之间,则返回真        |
| like        | a like b           | sql匹配,如果a匹配b,则结果为真 |
| in          | a in (a1,a2,a3...) | 若a在a1/a2其中的一个则返回真  |

```sql
-- 查询姓刘的同学 
select studentNo, studentName from student where studentName like '刘%'
-- 查询姓刘的同学,名字后面只有一个字的
select studentNo, studentName from student where studentName like '刘_'
-- 查询姓刘的同学,名字后面只有两个字的
select studentNo, studentName from student where studentName like '刘__'
-- 查询名字中间有'嘉'字的同学
select studentNo, studentName from student where studentName like '%嘉%'
-- 查询1001,1002,1003号学员
select studentNo, studentName from student where studentNo in (1001,1002,1003)
-- 查询在北京的学生
select studentNo, studentName from student where address in ('北京')
-- 查询地址为空的学生
select studentNo, studentName from student where address='' or address is null;
-- 查询有出生日期的同学  不为空
select studentNo, studentName from student where birthdate is not null

```

#### 4.4 连表查询

```sql
-- 查询参加了考试的同学成绩(学号/姓名/科目编号/分数)
select s.studentNo,studentName,subjectNo,studentResult 
from student as s inner join result as r where s.studentNo=r.studentNo
-- right join
select s.studentNo,studentName,subjectNo,studentResult 
from student as s right join result as r on s.studentNo=r.studentNo
-- left join
select s.studentNo,studentName,subjectNo,studentResult 
from student as s left join result as r on s.studentNo=r.studentNo
-- 查询缺缺考的同学
select s.studentNo,studentName,subjectNo,studentResult 
from student as s left join result as r 
where studentResult is null
```

| 操作       | 描述                                      |
| ---------- | ----------------------------------------- |
| inner join | 如果表中至少有一个匹配,就返回行           |
| left join  | 会从左表中返回所有的值,即使右表中没有匹配 |
| Right join | 会从右表中返回所有的值,即使左表中没有匹配 |

> 自连接

​				核心:一张表拆为两张一样的表即可

```sql
-- 查询父子信息
select a.categoryName as '父栏目',b.categoryName as '子栏目'
from `category` as a, `category` as b
where a.categoryid=b.pid
```

#### 4.5 分页和查询

```sql
select s.StudentNo,StudentName,subjectName,StudentResult
from student s
inner join `result` r
on s.StudentNo=r.StudentNo
inner join subject sub
on r.SubjectNo=sub.SubjectNo
where subjectName='数据库结构-1'
order by StudentResult desc
```

> 分页
```sql
-- 分页,每页显示5条数据
-- 语法: limit 起始值 页面的大小
select s.studentNo,studentName,subjectName,studentResult
from student s
inner join result r
on s.studentNo=r.studentNo
inner join subject sub
on r.subjectNo=sub.subjectNo
where subjectName='数据库结构1'
order by studentResult asc
limit 5,5
```

