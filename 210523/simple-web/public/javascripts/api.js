// a.jax
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
        console.log(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });


// fetch
fetch('/api/stock')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });



// Vue?    
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