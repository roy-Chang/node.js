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
    console.log("Timeout")必須要等setTimeout function跑完才會出現
    而function帶入時間為1000ms 所以會延遲後才出現"Timeout"

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
    setTimeout function 帶入的時間為0ms 所以四個log同時出現

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
    後出現"bar"和"baz"

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

    因為有setTimeout  所以"bar"後出現