function sum(n) {
    let result = 0;
    for (let i = n; i >= 0; i--) {
        result = result + i;
    }
    return result;
}


console.log(sum(10));

