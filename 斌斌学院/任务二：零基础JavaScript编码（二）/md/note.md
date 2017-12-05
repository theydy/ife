## filter

> var new_array = arr.filter(callback[, thisArg])

- callback

用来测试数组的每个元素的函数。调用时使用参数 (element, index, array)。
返回true表示保留该元素（通过测试），false则不保留。

- thisArg

可选。执行 callback 时的用于 this 的值。

- 返回值

一个新的通过测试的元素的集合的数组

## insertAdjacentHTML()

> element.insertAdjacentHTML(position, text)

position是相对于元素的位置，并且必须是以下字符串之一：

- 'beforebegin'

元素自身的前面。

- 'afterbegin'

插入元素内部的第一个子节点之前。

- 'beforeend'

插入元素内部的最后一个子节点之后。

- 'afterend'

元素自身的后面。

text是要被解析为HTML或XML,并插入到DOM树中的字符串。