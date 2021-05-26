# 心得作業


source:
[![alt text](https://i.imgur.com/Ko0Tz46.png)](https://youtu.be/8aGhZQkoFbQ "video")

### 影片筆記

1. JavaScript 單執行緒的程式語言 
2. 有call stack(呼叫堆疊), event loop(事件循環) callback queue(回調佇列)
3. setTimeout, DOM, http請求 並不在JavaScript Runtime內
4. web API 是瀏覽器所提供的額外東西 例如 DOM, AJAX, setTimeout, event loop, callback, queue
5. 單執行緒: 一次做一件事
6. 阻塞: 跑起來很慢又卡在堆疊裡的程式
7. 單執行緒做一個網路請求時只能等他跑完才能做下一個
8. 解決方法: Async Callback(非同步回調)
9. JavaScript Runtime 一次只能做一件事 -->單執行緒
10. Event loop 的工作是查看堆疊，並查看任務佇列，如果堆疊是空的，他就會將第一個東西放在佇列(task queue)上，並將其堆在堆疊上，讓堆疊有效進行
11. setTimeout 設定為零，將該程式延遲到最後再動作
12. callback 可以是任何一個函式所呼叫的任何一種函式 
13. callback 可以式非同步回調

### 影片心得

這個影片在介紹一個JavaScript的基本概念，那就是JavaScript為**單執行緒**的程式語言，以動態的圖片解釋程式碼在JavaScript的執行方式，並提到單執行緒程式碼的弱點，就是當某個請求過慢時，程式會等他跑完才跑下一個程式因而造成阻塞。
而解決方式便是使用**Async Callback**，因此又有了Event Loop的概念，其工作方式要比喻的話就是

> JavaScript 是個很單純的人，在同一時間點內他只能做一件事，而且在當下事情做完前他不會去做下一件事情，於是造成他工作效率低下。然而他有個好朋友叫Web API(瀏覽器部門的)，在需要的時候會去分擔JavaScipt的工作，可是Web API也是一個很有特殊個性的人，他完成工作後並不會馬上送還給JavaScript，而會將已完成的任務按照順序排列並在JavaScript手邊沒工作時才上繳成果

以我只學幾個月的前端腦袋，看完這個教學影片我能理解的只有在JavaScript中如果需要執行很長時間的函式能加入setTimeout中，儘管時間設定為0，他依然會在JavaScript動作完成後才會呈現結果，增加網頁的執行效率。