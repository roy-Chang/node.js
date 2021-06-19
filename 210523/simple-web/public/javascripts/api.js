// $(function () {
//     new Vue({
//         el: "#app",
//         data: {
//             stock: [],
//         },
//         beforeMount: async function () {
//             let response = await fetch("api/stock");
//             this.stocks = await response.json();
//         },
//     })
// })


$.ajax({
    method: "GET",
    url: '/api/stock',
    dataType: "json",
})
    .done(function (data) {
        console.log(data);
    }).fail(function (error) {
        console.log(error);
    })
    .always(function () {
        console.log("complete");
    });


// axios

axios.get('/api/stock')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
