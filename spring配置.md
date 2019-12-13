[TOC]

# spring配置

### 在配置中使用随机数

```properties
# 随机字符串
stringValue: ${random.value}
# 随机int
intValue: ${random.int}
# 随机long
longValue: ${random.long}
# 10以内的随机数
int10Value: ${random.int(10)}
# 10~20的随机数
int10-20Value: ${random.int[10,20]}
```



