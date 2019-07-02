array11 = [3, 6, 2, 5];
array12 = ["r", "p", "g"];
array21 = [1, 1, 1, 1];
array22 = ["a", "b", "c", "b"];
array31 = [3, 27];
array32 = [10, -3];
array41 = [1, 2, 3];
array42 = [10, 35, 20, 10];

function printReverse(arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        console.log(arr[i]);
    }
    //arr.reverse().map(item => console.log(item))
}

function isUniform(arr) {
    var first = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] !== first) {
            return false;
        }
    }
    return true;
}

function sumArray(arr) {
    var total = 0;
    arr.forEach(function (element) {
        total += element;
    });
    return total;
}

function max(arr) {
    var max = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}