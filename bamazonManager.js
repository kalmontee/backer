var mysql = require('mysql');
var inquirer = require('inquirer');

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
        if (err) throw err;

        // This will display all the products for the customer to choose from
        res.forEach(element => {
            console.log(`\nProduct ID: ${element.item_id} \nProduct Name: ${element.product_name} \nPrice: ${element.price} \nStock Quantity: ${element.stock_quantity}`);
        });
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

        // forEach will display all the product items with less than 5 stored in the inventory.
        results.forEach(element => {
            console.log(`Product Name: ${element.product_name} \nStock Quantity: ${element.stock_quantity}\n`);
        });
        console.log("--------------------------------\n");
        start();
    });
}

connection.connect(err => {
    console.log("connected as id " + connection.threadId + "\n");
    if (err) throw err;

    start();
});