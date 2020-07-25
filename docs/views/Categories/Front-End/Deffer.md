---
title: 'jQuery的deferred对象详解'
date: 2020-07-25
tags:
- 'jQuery'
categories:
- 'Front-End'
---

###  1. **什么是deferred对象？**

开发网站的过程中，我们经常遇到某些耗时很长的javascript操作。其中，既有异步的操作（比如ajax读取服务器数据），也有同步的操作（比如遍历一个大型数组），它们都不是立即能得到结果的。

通常的做法是，为它们指定回调函数（callback）。即事先规定，一旦它们运行结束，应该调用哪些函数。

**简单说，deferred对象就是jQuery的回调函数解决方案**

### 2. **ajax操作的链式写法**

```javascript
$.ajax({
  url: "test.html",

  success: function(){
    alert("哈哈，成功了！");
  },

  error:function(){
    alert("出错啦！");
  }
})
```

现在,新的写法是这样的:

```javascript
　$.ajax("test.html")

　　.done(function(){ alert("哈哈，成功了！"); })

　　.fail(function(){ alert("出错啦！"); });
```

### 3. **指定同一操作的多个回调函数**

deferred对象的一大好处，就是它允许你自由添加多个回调函数。

还是以上面的代码为例，如果ajax操作成功后，除了原来的回调函数，我还想再运行一个回调函数，怎么办？

很简单，直接把它加在后面就行了。

```javascript
　$.ajax("test.html")

　　.done(function(){ alert("哈哈，成功了！");} )

　　.fail(function(){ alert("出错啦！"); } )

　　.done(function(){ alert("第二个回调函数！");} );
```

### 4. **为多个操作指定回调函数**

deferred对象的另一大好处，就是它允许你为多个事件指定一个回调函数，这是传统写法做不到的。

请看下面的代码，它用到了一个新的方法[$.when()](http://api.jquery.com/jQuery.when/)：

```javascript
$.when($.ajax("test1.html"), $.ajax("test2.html"))

　　.done(function(){ alert("哈哈，成功了！"); })

　　.fail(function(){ alert("出错啦！"); });
```

这段代码的意思是，先执行两个操作$.ajax("test1.html")和$.ajax("test2.html")，如果都成功了，就运行done()指定的回调函数；如果有一个失败或都失败了，就执行fail()指定的回调函数。

### 5. **普通操作的回调函数接口（上）**

deferred对象的最大优点，就是它把这一套回调函数接口，从ajax操作扩展到了所有操作。也就是说，任何一个操作----不管是ajax操作还是本地操作，也不管是异步操作还是同步操作----都可以使用deferred对象的各种方法，指定回调函数。

我们来看一个具体的例子。假定有一个很耗时的操作wait：

```javascript
var wait = function(){

　　　　var tasks = function(){

　　　　　　alert("执行完毕！");

　　　　};

　　　　setTimeout(tasks,5000);

　　};
```

我们为它指定回调函数，应该怎么做呢？

很自然的，你会想到，可以使用$.when()：

```javascript
　$.when(wait())

　　.done(function(){ alert("哈哈，成功了！"); })

　　.fail(function(){ alert("出错啦！"); });
```

但是，这样写的话，done()方法会立即执行，起不到回调函数的作用。原因在于$.when()的参数只能是deferred对象，所以必须对wait()进行改写：

```javascript
var dtd = $.Deferred(); // 新建一个deferred对象

　　var wait = function(dtd){

　　　　var tasks = function(){

　　　　　　alert("执行完毕！");

　　　　　　dtd.resolve(); // 改变deferred对象的执行状态

　　　　};

　　　　setTimeout(tasks,5000);

　　　　return dtd;

　　};
```

现在，wait()函数返回的是deferred对象，这就可以加上链式操作了。

```javascript
　$.when(wait(dtd))

　　.done(function(){ alert("哈哈，成功了！"); })

　　.fail(function(){ alert("出错啦！"); });
```

wait()函数运行完，就会自动运行done()方法指定的回调函数。

### 6. **deferred.resolve()方法和deferred.reject()方法**

deferred对象有三种执行状态----未完成，已完成和已失败。如果执行状态是"已完成"（resolved）,deferred对象立刻调用done()方法指定的回调函数；如果执行状态是"已失败"，调用fail()方法指定的回调函数；如果执行状态是"未完成"，则继续等待，或者调用[progress()](http://api.jquery.com/deferred.progress/)方法指定的回调函数

前面部分的ajax操作时，deferred对象会根据返回结果，自动改变自身的执行状态；但是，在wait()函数中，这个执行状态必须由程序员手动指定。dtd.resolve()的意思是，将dtd对象的执行状态从"未完成"改为"已完成"，从而触发done()方法。

**[deferred.reject()](http://api.jquery.com/deferred.reject)方法，作用是将dtd对象的执行状态从"未完成"改为"已失败"，从而触发fail()方法.**

### 7. **deferred.promise()方法**

```javascript
var dtd = $.Deferred(); // 新建一个Deferred对象

　　var wait = function(dtd){

　　　　var tasks = function(){

　　　　　　alert("执行完毕！");

　　　　　　dtd.resolve(); // 改变Deferred对象的执行状态

　　　　};

　　　　setTimeout(tasks,5000);

　　　　return dtd;

　　};

　　$.when(wait(dtd))

　　.done(function(){ alert("哈哈，成功了！"); })

　　.fail(function(){ alert("出错啦！"); });

　　dtd.resolve();
```

如果dtd是一个全局对象，所以它的执行状态可以从外部改变,为了避免这种情况，jQuery提供了[deferred.promise()](http://api.jquery.com/deferred.promise/)方法。它的作用是，在原来的deferred对象上返回另一个deferred对象，后者只开放与改变执行状态无关的方法（比如done()方法和fail()方法），屏蔽与改变执行状态有关的方法（比如resolve()方法和reject()方法），从而使得执行状态不能被改变。

```javascript
var dtd = $.Deferred(); // 新建一个Deferred对象

　　var wait = function(dtd){

　　　　var tasks = function(){

　　　　　　alert("执行完毕！");

　　　　　　dtd.resolve(); // 改变Deferred对象的执行状态

　　　　};

　　　　setTimeout(tasks,5000);

　　　　return dtd.promise(); // 返回promise对象

　　};

　　var d = wait(dtd); // 新建一个d对象，改为对这个对象进行操作

　　$.when(d)

　　.done(function(){ alert("哈哈，成功了！"); })

　　.fail(function(){ alert("出错啦！"); });

　　d.resolve(); // 此时，这个语句是无效的
```

在上面的这段代码中，wait()函数返回的是promise对象。然后，我们把回调函数绑定在这个对象上面，而不是原来的deferred对象上面。这样的好处是，无法改变这个对象的执行状态，要想改变执行状态，只能操作原来的deferred对象。

更好的写法是将dtd对象变成wait(）函数的内部对象。

```javascript
var wait = function(dtd){

　　　　var dtd = $.Deferred(); //在函数内部，新建一个Deferred对象

　　　　var tasks = function(){

　　　　　　alert("执行完毕！");

　　　　　　dtd.resolve(); // 改变Deferred对象的执行状态

　　　　};

　　　　setTimeout(tasks,5000);

　　　　return dtd.promise(); // 返回promise对象

　　};

　　$.when(wait())

　　.done(function(){ alert("哈哈，成功了！"); })

　　.fail(function(){ alert("出错啦！"); });
```

