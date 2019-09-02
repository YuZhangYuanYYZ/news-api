
function AddSomeThing(ob, callback) {
    const obArray = Object.values(ob);
    return callback(obArray);
}

// const result = AddSomeThing({ first: 1, second: 2, third: 3, fourth: 4 }, (array) => {
//     return array.reduce((accumulateValue, currentValue) => {
//         return accumulateValue + currentValue;
//     }, 0)
// });
// console.log(result);

module.exports = AddSomeThing;


function AddSomeThing1(ob) {
    const obArray = Object.values(ob);

    function callback(array) {
        const result = array.reduce((accumulateValue, currentValue) => {
            return accumulateValue + currentValue;
        }, 0);

        return result;
    }

    return callback(obArray);
}
