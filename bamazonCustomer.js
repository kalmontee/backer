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
function runSearch() {
    var query = "SELECT * FROM products";

    connection.query(query, (err, res) => {
        if (err) throw err;

        res.forEach(element => {
            console.log(`\nProduct ID: ${element.item_id} \nProduct Name: ${element.product_name} \nPrice: ${element.price}`);
        });
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
                    // console.log(results);

                    // If user decides to enter an invalid product ID item
                    if (results.length === 0) {
                        console.log("\n----------------------- \nProduct ID not found...\n");
                        buyProduct();

                    } else if (answer.numberOfUnits <= results[0].stock_quantity) {
                        var total = answer.numberOfUnits * results[0].price;

                        var query = connection.query(
                            "UPDATE products SET ? WHERE ?", [{
                                    stock_quantity: results[0].stock_quantity - answer.numberOfUnits
                                },
                                {
                                    item_id: answer.itemID
                                }
                            ], (err, res) => {
                                console.log(`\n----------------------- \nSuccess!! \nThe total cost of your purchase is: ${total}`);
                            });

                        // If user enters an invalid stock number then log insufficient stock
                    } else if (answer.numberOfUnits > results[0].stock_quantity) {
                        console.log(`\n----------------------- \nInsufficient stock!! \nThere's only ${results[0].stock_quantity} units available. \nPlease try again..\n`);
                        buyProduct();
                    }
                    connection.end();
                });
        });
}

connection.connect(err => {
    console.log("connected as id " + connection.threadId + "\n");
    if (err) throw err;

    runSearch();
});