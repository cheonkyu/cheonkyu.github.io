# css 드래그 막기

```css
/* css에 삽입하는 방법 */
body {
-webkit-user-select:none;
-moz-user-select:none;
-ms-user-select:none;
user-select:none
}
```


```css
/*일부 영역에서는 드래그를 허용하고 싶다면, body에 드래그 방지 코드를 넣어놓고, 원하는 영역에 아래 코드를 삽입한다.  */
.draggable {
  -webkit-user-select:all;
  -moz-user-select:all;
  -ms-user-select:all;
  user-select:all
}
/*텍스트만 드래그를 허용하고 싶을 경우:*/
.draggable {
  -webkit-user-select:text;
  -moz-user-select:text;
  -ms-user-select:text;
  user-select:text
}
```