const add = (n1, n2) => n1 + n2;
const sub = (n1, n2) => n1 - n2;
function exec(type) {
    if (type === "A") {
        return add;
    } else {
        return sub;
    }
}

const result = exec("A");
const result2 = { a: () => {} };

console.log(typeof result);
console.log(typeof result2.a);

// console.log(result(1, 1));
// console.log(exec("B")(1, 1));
