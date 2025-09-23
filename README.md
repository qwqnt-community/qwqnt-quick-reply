# QwQNT-QuickReply

本插件依赖：`RendererEvents` 、`PluginSettings` 和 `IpcInterceptor` 插件，请先安装！

请勿直接使用源码，需要下载Release包使用！

## 如何使用

### 回复

插件正确加载后，会在聊天框上方工具栏右侧添加按钮。点击按钮即可选择回复语。

### 更改

更改回复语可以在插件设置页进行，设置页的文本框中会出现你目前的所有回复语。你可以新增、修改或删除。

每条回复语使用`[[...]]`双中括号包裹，这称为回复语块。回复语块内可以任意换行。 **特别注意：在回复语块中，若要使用 `[[` 和 `]]` 这两个文本，请使用转义符转义，变成这样：`\[\[` 和这样 `\]\]`。** 文本框失焦后会自动保存，请确保让文本框失焦后再关闭设置。

### 快捷键

#### 新增回复语

新增回复语的话，本插件提供了`Alt+A`（Mac为`Option+A`）的快捷键。只要选中文字，再按下`Alt+A`，即可添加回复语。

在腾讯频道中，该快捷键仍然可用。

#### 快捷插入

Windows、Linux、MacOS可以使用`Alt+数字键`快捷插入回复语，比如`Alt+1`就是插入第1条回复语。

请注意：腾讯频道将无法使用该快捷键。

## 鸣谢
* [LiteLoaderQQNT](https://github.com/LiteLoaderQQNT/LiteLoaderQQNT/)
* [LiteLoaderQQNT-Euphony](https://github.com/xtaw/LiteLoaderQQNT-Euphony)
* [LiteLoaderQQNT-DeepL](https://github.com/MUKAPP/LiteLoaderQQNT-DeepL)
* [LiteLoaderQQNT-lite_tools](https://github.com/xiyuesaves/LiteLoaderQQNT-lite_tools)

## License
```
    LiteLoaderQQNT-QuickReply
    Copyright (C) 2025  風間青祢

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
```