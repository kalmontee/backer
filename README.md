# Bamazon
Bamazon is a mini Amazon-like storefront using MySQL database.

Customers can buy products.

Manager can check the quantity of stock, add to the inventory, and create new products.

## Installation

For the App to run, you must install the following commands:

```bash
npm install mysql
npm install inquirer
npm install cli-table2
```

You must copy the bamazon.sql file and paste it into your SQL database.

## bamazonCustomer.js

Customer will have the option to choose what product they would like to purchased from the table.

Once the customer purchase their items, the engine will display their total cost.

If the customer decides to enter a higher quantity then it will return insufficient quantity and will have the
option to buy again.

You should see something like this:


## bamazonManager.js

The manager will have five options to choose from. They can view Products for Sale, View Low Inventory,
Add to Inventory, Add New Product, or Exit.

### Products for Sale:


### View Low Inventory
Will display products that have less than 5 stocks


### Add to Inventory
Add more stocks to any product item


### Create New Product

Create and add a new product to the database


## Video Demo
