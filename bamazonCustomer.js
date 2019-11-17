var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(err => {
    console.log("connected as id " + connection.threadId + "\n");
    if (err) throw err;

    runSearch();
});

function runSearch() {
    var query = "SELECT * FROM products";

    connection.query(query, (err, res) => {
        if (err) throw err;

        res.forEach(element => {
            console.log(element);
        });
    });

    inquirer.prompt({
        name: "item",
        type: "list",
        message: "What would you like to do...",
        choices: [
            "What ID product would you like to buy?",
            "How many units of the product would you like to buy?",
            "EXIT"
        ]
    }).then(answer => {
        // console.log("===========================\n");
        switch (answer.item) {
            case "What ID product would you like to buy?":
                productId();
                break;

            case "How many units of the product would you like to buy?":
                productUnits();
                break;

            case "EXIT":
                connection.end();
        }
    });
}

function productId() {

    connection.end();

    // inquirer.prompt
    // inquirer.prompt({
    //     name: "item",
    //     type: "list",
    //     message: "What would you like to do...",
    //     choices: [
    //         "What ID product would you like to buy?",
    //         "How many units of the product would you like to buy?"
    //     ]
    // }).then(answer => {
    //     switch (answer.item) {
    //         case "What ID product would you like to buy?":
    //             productId()
    //     }

    // });
    // var query = "SELECT item_id FROM products";
    // connection.query(query, (err, res) => {
    //     if (err) throw err;
    //     console.log(res);
    //     connection.end();
    // })
    // create the prompt for product id
    // .then() function
    // Inside of .then() we're going to pass the prompt


    // var query = "Select * FROM products";
    // connection.query()
}

// .then(err => {
//     if (err) throw err;

//     inquirer.prompt({
//         name: "item",
//         type: "list",
//         message: "What would you like to do...",
//         choices: [
//             "What ID product would you like to buy?",
//             "How many units of the product would you like to buy?"
//         ]
//     });
//     connection.end();
// })

// function productUnits() {}