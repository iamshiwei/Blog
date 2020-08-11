---

title: 'VIM教程(1)'

date: 2020-07-12

tags:

\- 'vim 编辑器'

categories:

\- 'Tools'

\---

# Vim入门级基础配置-Vim入门教程(1)

### Vim配置文件.vimrc

```c#
'设置编码'
set fileencodings=utf-8,ucs-bom,gb18030,gbk,gb2312,cp936
set termencoding=utf-8
set encoding=utf-8
```

```c#
'显示行号'
set nu
set number
nu是number的缩写，所以上面两个配置命令是完全等效的。
```

```c#
'突出显示当前行'
set cursorline
set cul          'cursorline的缩写形式'
```

```c#
'突出显示当前列'
set cursorcolumn
set cuc          'cursorcolumn的缩写形式'
```

```c#
'启用鼠标'
set mouse=a
set selection=exclusive
set selectmode=mouse,key
```

```c#
'显示括号匹配'
set showmatch
```

```c#
'设置Tab长度为4空格'
set tabstop=4
'设置自动缩进长度为4空格'
set shiftwidth=4
'继承前一行的缩进方式，适用于多行注释'
set autoindent
```

```c#
'在Vim中通过鼠标右键粘贴时会在行首多出许多缩进和空格，通过set paste可以在插入模式下粘贴内容时不会有任何格式变形、胡乱缩进等问题。'
set paste
```

```c#
'显示空格和tab键'
set listchars=tab:>-,trail:-
```

```c#
'总是显示状态栏'
set laststatus=2
'显示光标当前位置'
set ruler
```

```c#
'打开文件类型检测'
filetype plugin indent on
```

### Vim文本编辑命令

#### 插入

在**普通模式**下按以下按键可进入插入模式，执行插入操作，具体包括：

1. 从光标当前所在位置的【**前**】一个字符处开始插入：`i`
2. 从光标当前所在位置的【**后**】一个字符处开始插入：`a`
3. 从光标当前所在行的【**行首**】处开始插入：`I`
4. 从光标当前所在行的【**行尾**】处开始插入：`A`
5. 从光标当前所在行的【**下一行**】处开始插入：`o`
6. 从光标当前所在行的【**上一行**】处开始插入：`O`

#### 删除

在**普通模式**下按以下按键可执行删除操作，具体包括：

1. 删除光标位置的【**一个**】字符：`x`
2. 删除当前光标所在【**行**】：`dd`
3. 删除从光标所在位置到当前【**行首**】的内容：`d0`
4. 删除从光标所在位置到当前【**行尾**】的内容：`d$`
5. 删除从光标所在位置到当前【**单词结束**】部分的内容并进入插入模式：`cw`、`cW`
6. 删除从光标所在位置到当前【**单词开始**】部分的内容并进入插入模式：`cb`、`cB`
7. 删除从光标所在位置到当前【**单词结束**】部分的内容但**不**进入插入模式：`dw`、`dW`
8. 删除从光标所在位置到当前【**单词开始**】部分的内容但**不**进入插入模式：`db`、`dB`

**注**:

(1) Vim的命令中，`0` 表示行首，`$` 表示行尾，更多内容可参考Vim教程网上的[Vim操作范围、文件范围介绍](https://vimjc.com/vim-ranges.html)。
(2) `w` (word)、`b` (back)命令用于光标移动，具体可参考[vim教程网](https://vimjc.com/)([https://vimjc.com](https://vimjc.com/))上的博客：[vim光标移动命令汇总](https://vimjc.com/vim-cursor.html)。
(3) `cW`、`cB`、`dW`、`dB` 命令操作的单词是以空白字符 (空格、Tab) 分隔的字符串。

1. 删除当前【**句子**】从光标位置开始到【**句末**】的内容：`d)`
2. 删除当前【**句子**】从光标位置开始到【**句首**】的内容：`d(`
3. 删除当前【**段落**】从光标位置开始到【**段末**】的内容：`d}`
4. 删除当前【**段落**】从光标位置开始到【**段首**】的内容：`d{`

**注**：Vim命令中用 `(` 和 `)` 表示句子，`{` 和 `}` 表示段落。

#### 复制、粘贴

在**普通模式**下按以下按键可执行复制、粘贴操作，具体包括：

1. 复制从光标所在位置到当前【**单词结束**】部分的内容：`yw`
2. 复制光标所在【**行**】的所有字符 (包含换行符)：`yy`
3. 将最后一次删除或复制操作的文本内容粘贴到光标所在字符之【**后**】：`p`
4. 将最后一个删除或复制操作的文本内容粘贴到光标当前字符之【**前**】：`P`

**注**：`yyp` 操作可以实现复制一整行内容到当前所在行的下一行。

####  替换

在**普通模式**下按以下按键后，再输入字符可**替换**原始文件中的内容。

1. 替换光标当前所在字符**一次**：`r`
2. 一直替换光标所在字符，直到按下[ESC]键为止：`R`

删除、复制操作的操作单位可以加操作次数，操作对象的范围为：操作次数 * 操作单位。

#### 撤销、反撤销

在**普通模式**下可执行撤销操作，具体包括：

1. 撤销最近的一次操作：`u`
2. 恢复最近的一次操作(取消撤销)：`<Ctrl-r>` (表示同时按下 **Ctrl** 键和 **r** 键)

**注**：多次执行 `u` 命令可以连续撤销最近的操作。

####  保存

在**命令行模式**下执行以下命令可保存当前编辑的文件内容

1. 保存当前编辑的文件：`:w`
2. 保存当前编辑的文件并退出vim：`:wq`
3. 强制将当前编辑的文件保存：`:w!`

推荐阅读《[Vim 怎么保存文件](https://vimjc.com/vim-write-file.html)》获取更多关于使用 Vim 保存文件的方法。

####  另存为

在**命令行模式**下执行命令 `:write a.txt` 可将 Vim 当前打开的文件另存为新文件 a.txt。

此外，`:saveas b.txt` (缩写形式 `:sav a.txt`) 也可将当前打开的文件另存为新文件 a.txt。

#### 显示当前文件名

Vim 普通模式下，组合命令 `<Ctrl-g>` 可显示当前编辑文件名及行数，可以在不退出 Vim 的情况下了解当前编辑文件的信息，

### Vim光标移动

```c#
     ^
      k
<h          l>
      j
      v
```

#### **行级移动**

`0`     移动光标到当前行**行首**
`$`     移动光标到当前行**行尾**
`^`     移动光标到当前行的第一个非空字符
`nG`    移动光标到当前文件的第n行
`:n`    移动光标到当前文件的第n行 (同上)

#### 文件首尾移动

`gg` 或 `:0`    移动光标到当前文件的第一行
`GG` 或 `:$`    移动光标到当前未经的最后一行

#### 单词级移动

`w` 或 `W`     移动到下一单词的开头
`b` 或 `B`     移动到上一单词的开头
`e` 或 `E`     移动到光标所在单词的末尾

#### 匹配单词级移动

`*`    移动光标到**匹配**光标当前所在单词的**下**一个单词
`#`    移动光标到**匹配**光标当前所在单词的**上**一个单词

#### 翻页

`Ctrl + f`    向前滚动一页
`Ctrl + b`    向后滚动一页

`Ctrl + u`    向前滚动半页
`Ctrl + d`    向后滚动半页

### Vim可视化模式操作

#### Vim字符选择

按键 `v` 进入Vim字符选择可视化模式，通过[Vim鼠标移动命令](https://vimjc.com/vim-cursor.html) `H` 把鼠标往右移动，选择多个字符。

当然，选择好文本后，可以用 `y` 进行复制，用 `p` 命令粘贴等。

####  Vim同时注释多行

(1) `Ctrl + v`进入块选择模式
(2) 向上或向下移动光标选择多行
(3) 移动光标到行的起始位置
(4) 然后按大写的 `I` 进入[**行首插入**模式](https://vimjc.com/vim-edit-command.html)
(5) 插入注释符
(6) 按Esc回到命令模式

#### Vim同时删除多行注释

(1) `Ctrl + v` 进入块选择模式
(2) 向上或向下移动光标，选择要删除的注释符号
(3) 按`d`键删除

### Vim插件管理器Vundle

Vundle插件也是提供一个Vundle.vim文件，其下载地址为：https://github.com/VundleVim/Vundle.vim.git

将下载的Vundle.vim文件保存到 `~/.vim/bundle` 即可完成Vundle的安装。

也可以使用以下的命令直接从 GitHub 拉取 Vundle.vim 文件到 `~/.vim/bundle` 文件夹下。

```
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

#### 2.2 配置Vundle

修改[Vim配置文件vimrc](https://vimjc.com/vimrc-config.html)，增加必要的配置，以下是 `.vimrc` 配置模板。

```
set nocompatible               "去除VIM一致性，必须"
filetype off                   "必须"

"设置包括vundle和初始化相关的运行时路径"
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

"启用vundle管理插件，必须"
Plugin 'VundleVim/Vundle.vim'

"在此增加其他插件，安装的插件需要放在vundle#begin和vundle#end之间"
"安装github上的插件格式为 Plugin '用户名/插件仓库名'"

call vundle#end()              
filetype plugin indent on      "加载vim自带和插件相应的语法和文件类型相关脚本，必须"
```

更多Vundle有关配置可以参考github上的[Quick Start](https://github.com/VundleVim/Vundle.vim#quick-start)

#### 2.3 使用Vundle安装插件

首先需要将要安装的插件，按照上述配置格式将插件地址填写在vundle#begin和vundle#end之间并保存。

设置好配置文件后，可通过下述两种方法安装插件:

(1) 在[Vim命令行模式](https://vimjc.com/vim-edit-command.html)下运行命令`:PluginInstall`

(2) 在终端命令行下通过命令`vim +PluginInstall +qall`直接安装

至此，需要安装的插件已经安装完毕，可以正常使用了。

#### 2.4 使用Vundle删除插件

(1) 需要删除Vim插件时，只需编辑Vim配置文件`.vimrc文件`，删除要移除插件所对应的 Plugin 一行

(2) 打开Vim，在**Vim命令行模式**执行命令`:BundleClean`即可删除对应Vim插件