var todos = ["Buy new keyboard"];
var input = prompt("What would you like to do?");

function listTodos() {
    console.log("***************");
    todos.forEach(function (todo, index) {
        console.log(index + ": " + todo);
    });
    console.log("***************");
}

function addTodo() {
    var newTodo = prompt("Enter new task:");
    todos.push(newTodo);
    console.log("Added Task");
}

function deleteTodo() {
    var index = prompt("Enter the index of the task you want to delete:");
    todos.splice(index, 1);
    console.log("Deleted Task");
}

while (input !== "quit") {
    // handle input
    if (input === "list") {
        listTodos();
    } else if (input === "new") {
        addTodo();
    } else if (input === "delete") {
        deleteTodo();
    }
    input = prompt("What would you like to do?")
}

console.log("OK, YOU QUIT THE APP")