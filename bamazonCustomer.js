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
function runSearch() {
    var query = "SELECT * FROM products";

    connection.query(query, (err, res) => {
        if (err) throw err;

        var table = new Table({
            head: ["Item Id", "Product Name", "Price"],
            colWidths: [15, 25, 18],
            colAligns: ["center", "left", "right"]
        });

        // This will display all the products for the customer to choose from in a table form.
        res.forEach(element => {
            table.push([element.item_id, element.product_name, element.price]);
        });
        console.log(table.toString());
        buyProduct();
    });
}

function buyProduct() {

    console.log("-----------------------");

    inquirer.prompt([{
            name: "itemID",
            type: "input",
            message: "What ID product would you like to buy?",

        }, {
            name: "numberOfUnits",
            type: "input",
            message: "How many units of the product would you like to buy?",

        }])
        .then(answer => {
            var query = "SELECT item_id, price, stock_quantity FROM products WHERE ?";

            connection.query(query, { item_id: answer.itemID },
                (err, results) => {

                    // If user decides to enter an invalid product ID item
                    if (results.length === 0) {
                        console.log("\n----------------------- \nProduct ID NOT found...\n");

                        // Here we run the buyProduct function to ask user's what product ID they would like to buy again
                        buyProduct();

                        // The amount of stock quantity customer is going to order
                    } else if (answer.numberOfUnits <= results[0].stock_quantity) {

                        // This will determine the total cost of the costumer purchase
                        var total = answer.numberOfUnits * results[0].price;

                        var query = connection.query(
                            "UPDATE products SET ? WHERE ?", [{
                                    // This will substract the amount of stock quantity stored in the database when the costumer purchase their order.
                                    stock_quantity: results[0].stock_quantity - answer.numberOfUnits
                                },
                                {
                                    item_id: answer.itemID
                                }
                            ], (err, res) => {
                                if (err) throw err;
                                console.log(`\n----------------------- \nSuccess!! \nThe total cost of your purchase is: ${total}`);
                                connection.end();
                            });

                        // If customer enters an invalid stock number then log insufficient stock
                    } else {
                        console.log(`\n----------------------- \nInsufficient stock!! \nThere's only ${results[0].stock_quantity} units available. \nPlease try again..\n`);
                        buyProduct();
                    }
                });
        });
}

connection.connect(err => {
    console.log("connected as id " + connection.threadId + "\n");
    if (err) throw err;

    runSearch();
});