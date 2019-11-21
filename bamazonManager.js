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

// addInventory function will add new stocks to the inventory
function addInventory() {
    var query = "SELECT * FROM products";

    connection.query(query, (err, results) => {
        console.log("--------------------------------\n");
        if (err) throw err;

        var table = new Table({
            head: ["Item Id", "Product Name", "Department Name", "Quantity"],
            colWidths: [15, 20, 20, 10],
            colAligns: ["center", "left", "left", "right"]
        });

        // Displaying all the products in the table
        results.forEach(element => {
            table.push([element.item_id, element.product_name, element.department_name, element.stock_quantity]);
        });
        console.log(table.toString());

        inquirer.prompt([{
            name: "product",
            type: "input",
            message: "Which department would you like to add more?",
        }, {
            name: "units",
            type: "input",
            message: "How many units would you like to add?"

        }]).then(answer => {
            var query = "SELECT item_id, product_name, stock_quantity FROM products WHERE ?";

            connection.query(query, {
                    item_id: answer.product,
                },
                (err, results) => {
                    if (err) throw err;

                    // If the manager decides to enter an invalid product ID item by mistake
                    if (results.length === 0) {
                        console.log("\n-------------------------------- \nProduct NOT found... Please try again.\n");

                        // Here we run the addInventory function again to ask the manager what product they would like to add.
                        addInventory();

                        // The amount of stock quantity the manager is going to placed
                    } else if (parseInt(answer.units)) {

                        // This will determine the total cost of the costumer purchase
                        var total = parseInt(answer.units) + results[0].stock_quantity;

                        var query = connection.query(
                            "UPDATE products SET ? WHERE ?", [{
                                    // This will add the amount of stock quantity stored in the database when the manager adds to their inventory
                                    stock_quantity: results[0].stock_quantity + parseInt(answer.units)
                                },
                                {
                                    item_id: answer.product,
                                }
                            ], (err) => {
                                if (err) throw err;
                                console.log(`\n----------------------- \nSuccess!! You added ${answer.units} new items to your inventory. \nYour new product total is ${total} on ${results[0].product_name}`);
                                connection.end();
                            });

                        // Alert the manager that the item was not successful
                    } else {
                        console.log(`\n----------------------- \nNOT successful! \nPlease try again..\n`);
                        // Run the addInventory function to ask what product they would like to add again.
                        addInventory();
                    }
                });
        });
    });
}

connection.connect(err => {
    console.log("connected as id " + connection.threadId + "\n");
    if (err) throw err;

    start();
});