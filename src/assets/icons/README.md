注意：添加的 svg 图片如果需要动态继承父级 color 属性，需要把 svg 的 path 中的 fill 修改为 “fill='currentColor'”。比如:

```xml
<svg ... fill='none'>
    <path ... fill='currentColor'></path>
</svg>
```
