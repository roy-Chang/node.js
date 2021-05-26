# Quiz

## (1) 請問下列程式執行後的結果為何？為什麼？

```js
console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 1000);
})();

console.log("end");

```
    start
    IIFE
    end
    Timeout
    
因setTimeout函式並不屬於JS的RunTime,所以會先顯示"start","IIFE","end"，此時堆疊為空，這時才會顯示"Timeout"
又因setTimeout的時間參數設定為1000，所以"Timeout"會在函式呼叫後1秒(1000ms)才顯示

## (2) 請問下列程式執行後的結果為何？為什麼？

```js
console.log("start");

(function () {
  console.log("IIFE");
  setTimeout(function () {
    console.log("Timeout");
  }, 0);
})();

console.log("end");

```
    start
    IIFE
    end
    Timeout

同上題，儘管參數為0秒，但因setTimeout不屬於JS的RunTime，所以"Timeout"依然最後才顯示

## (3) 請問下列程式執行後的結果為何？為什麼？

```js
const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  bar();
  baz();
};

foo();

```
    foo
    bar
    baz

function呼叫後才會動作  所以先出現"foo"之後呼叫bar();baz();
之後才顯示"bar"和"baz"

## (4) 請問下列程式執行後的結果為何？為什麼？

```js
const bar = () => console.log("bar");

const baz = () => console.log("baz");

const foo = () => {
  console.log("foo");
  setTimeout(bar, 0);
  baz();
};

foo();

```
    foo
    baz
    bar

因為加入setTimeout，所以"bar"最後才顯示