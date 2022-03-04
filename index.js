"use strict";
let grid = {
    counter: 0,
    map: new Map(),
    length: 3,
    getInputBoxes: () => Array.from(document.querySelectorAll("input[type=checkbox]")).splice(1),
    getScores: function () { return Array.from(this.map.values()); },
    getChildren: () => Array.from(document.querySelectorAll("tr:not(:first-child)>:nth-child(even)"))
};
grid.getInputBoxes().forEach((elem) => {
    elem.addEventListener('click', function (event) {
        if (this.checked) {
            grid.counter += 1;
            grid.map.set(this, parseInt(this.parentElement.parentElement.children[2].innerHTML));
        }
        else {
            grid.counter -= 1;
            grid.map.delete(this);
        }
        let checkBox = document.getElementById("main-check-box");
        if (grid.counter === grid.length)
            checkBox.checked = true;
        else
            checkBox.checked = false;
    });
});
document.getElementById("main-check-box").addEventListener('click', function (event) {
    if (this.checked) {
        grid.getInputBoxes().forEach((element) => {
            if (!element.checked) {
                element.checked = true;
                grid.counter += 1;
                grid.map.set(element, parseInt(element.parentElement.parentElement.children[2].innerHTML));
            }
        });
    }
    else {
        grid.getInputBoxes().forEach((element) => element.checked = false);
        grid.map = new Map();
        grid.counter = 0;
    }
});
//find max
document.getElementById("max").addEventListener('click', (event) => {
    let max = event.target;
    max.innerHTML = grid.getScores().reduce((aggregate, current) => {
        if (current > aggregate)
            return current;
        return aggregate;
    }, 0).toString();
});
//find sum
document.getElementById("sum").addEventListener('click', (event) => {
    let sum = event.target;
    sum.innerHTML = grid.getScores().reduce((aggregate, current) => {
        return aggregate + current;
    }, 0).toString();
});
//search 
document.getElementById("search").addEventListener("keyup", function (event) {
    grid.getChildren().forEach((element) => {
        element.innerHTML = element.innerText.replaceAll(" ", "");
    });
    let element = grid.getChildren()[0];
    let re = new RegExp(`${this.value}`, "g");
    console.log(element.innerHTML.search(re));
    /*grid.getChildren().forEach((element) => {
        let re = new RegExp(`${this.value}`, "g");
        element.innerHTML.search(re)
    });*/
});
