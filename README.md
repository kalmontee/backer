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

![Animated GIF-downsized_large](https://user-images.githubusercontent.com/52462582/69366618-b7e93b80-0c64-11ea-85da-d1a756a71c06.gif)


## bamazonManager.js

The manager will have five options to choose from. They can view Products for Sale, View Low Inventory,
Add to Inventory, Add New Product, or Exit.

### Products for Sale:

You should see something like this:

![Animated GIF-downsized_large](https://user-images.githubusercontent.com/52462582/69367164-bd935100-0c65-11ea-89e4-fa58a34cdc07.gif)

### View Low Inventory

Will display products that have less than 5 stocks

![Animated GIF-downsized_large](https://user-images.githubusercontent.com/52462582/69367389-32ff2180-0c66-11ea-8b60-665472be1cf0.gif)


### Add to Inventory

Add more stocks to any product item

![Animated GIF-downsized_large](https://user-images.githubusercontent.com/52462582/69367725-cafd0b00-0c66-11ea-899f-75930651b1aa.gif)


### Create New Product

Create and add a new product to the database

![Animated GIF-downsized_large (1)](https://user-images.githubusercontent.com/52462582/69368216-ae150780-0c67-11ea-8333-21bf9030963f.gif)


## Video Demo
