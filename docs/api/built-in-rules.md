# 内置规则

## required 非空

校验数据是否已经输入，""、0 都会被认为是空值。

## min 最小

作用于 number 类型数据时，校验大小。作用于 string 类型数据时，校验长度。

## max 最大

作用于 number 类型数据时，校验大小。作用于 string 类型数据时，校验长度。

## isEmail 邮箱

校验是否为正确的邮箱地址。

## isCNIDCard 中国大陆身份证号

校验中国大陆身份证号。

## isCNPhone 中国手机号

校验中国 11 位手机号。

## isCNTEL 中国固话

校验中国固话。

## isHttpURL http 协议 URL

校验 http 协议，同样适用于 https。

## isImage 图片

校验是否为 jpg|gif|bmp|png|webp 结尾的图片。

## isCNChar 汉字

校验汉字。
