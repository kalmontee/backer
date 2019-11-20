var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table2');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

// runSearch function will read all data from the database
function start() {

    inquirer.prompt({
        name: "menu",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product",
            "EXIT"
        ]
    }).then(function(answer) {
        switch (answer.menu) {
            case "View Products for Sale":
                productsForSale();
                break;

            case "View Low Inventory":
                lowInventory();
                break;

            case "Add to Inventory":
                addInventory();
                break;

            case "Add New Product":
                addProduct();
                break;

            case "EXIT":
                connection.end();
                break;
        }
    });
}

// productsForSale function will display all items in the data base that are for sale
function productsForSale() {
    var query = "SELECT * FROM products";

    connection.query(query, (err, res) => {
        console.log("--------------------------------\n");
        if (err) throw err;

        // This will display all the products for the customer to choose from
        // console.log(JSON.stringify(res, null, 2));
        var table = new Table({
            head: ["Item Id", "Product Name", "Price", "Quantity"],
            colWidths: [15, 20, 18, 10],
            colAligns: ["center", "left", "right", "right"]
        });

        // Displaying all the products in the table
        res.forEach(element => {
            table.push([element.item_id, element.product_name, element.price, element.stock_quantity]);
        });

        console.log(table.toString());
        console.log("--------------------------------\n");
        start();
    });
}

// lowInventory function will list all items with an inventory count lower than five
function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5";

    connection.query(query, (err, results) => {
        console.log("--------------------------------\n");
        if (err) throw err;

        var table = new Table({
            head: ["Product Name", "Quantity"],
            colWidths: [20, 10],
            colAligns: ["left", "right"]
        });

        // Displaying all the products in the table
        results.forEach(element => {
            table.push([element.product_name, element.stock_quantity]);
        });
        console.log(table.toString());
        console.log("--------------------------------\n");
        start();
    });
}

function addInventory() {
    var query = "SELECT * FROM products WHERE product_name";

    connection.query(query, (err, results) => {
        console.log("--------------------------------\n");
        if (err) throw err;

        inquirer.prompt([{
            name: "product",
            type: "rawlist",
            choices() {
                var choiceArr = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArr.push(results[i].product_name);
                }
                return choiceArr;
            },
            // message: "Which department would you like to add more?",
            message: "Add more",
            type: "input"
        }, ]).then(answer => {
            var chosenProduct;
            results.forEach(element => {
                if (element.product_name === answer.product) {
                    chosenProduct = element;
                }
            });
        });
        connection.end();
    });
}

connection.connect(err => {
    console.log("connected as id " + connection.threadId + "\n");
    if (err) throw err;

    start();
});