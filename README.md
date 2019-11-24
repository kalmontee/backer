# Bamazon
Bamazon is a mini Amazon-like storefront using MySQL database.

Customers can buy products.

Manager has the option to check products for sale, quantity of stock, add to the inventory, create new products and delete products.

## Technologies

* NodeJS

* MySQL

## Installation

For the App to run, you must install the following commands:

First begin with a npm install to install everything I have stored. This should automatically install the following commands.

```bash
npm install
```
Check to see if the App is working. If not then do the following commands: 

```bash
npm install mysql
npm install inquirer
npm install cli-table2
```

You must copy the bamazon.sql file and paste it into your SQL database. Only do this if you would like to see any changes you have made.

For example: If you are going to buy a product, you should want to check if your database is being updated.

## bamazonCustomer.js

Customer will have the option to choose what product they would like to purchased from the table.

Once the customer purchase their items, the engine will display their total cost.

If the customer decides to enter a higher quantity then it will return insufficient quantity and will have the
option to buy again.

You should see something like this:

![BamazonCustomer](https://user-images.githubusercontent.com/52462582/69502559-bc208d80-0ede-11ea-9dbc-8508271deaf6.png)


## bamazonManager.js

The manager will have five options to choose from. They can view Products for Sale, View Low Inventory,
Add to Inventory, Add New Product, or Delete Products.

### Products for Sale

You should see something like this:

![ViewProducts](https://user-images.githubusercontent.com/52462582/69502749-ca6fa900-0ee0-11ea-8504-25a78deb767c.png)


### View Low Inventory

Will display products that have less than 5 stocks:

![Manager-lowProducts](https://user-images.githubusercontent.com/52462582/69502725-8086c300-0ee0-11ea-979b-58a1b6ff0ab8.png)


### Add to Inventory

Add more stocks to any product item:

![AddInventory](https://user-images.githubusercontent.com/52462582/69502808-63062900-0ee1-11ea-85fc-c0955dec000d.png)


### Create New Product

Create and add a new product to the database:

![AddNewProduct](https://user-images.githubusercontent.com/52462582/69502759-ea9f6800-0ee0-11ea-9d2b-e08f841ea10f.png)

### Delete Product

Delete Product from the database by selecting the corresponding ID:

![DeleteProduct](https://user-images.githubusercontent.com/52462582/69502823-93e65e00-0ee1-11ea-96ab-2394bd2a1212.png)

## Video Demo

##### BamazonCustomer:
https://drive.google.com/open?id=1qXrgJpnv2vmEXSqj0FE5ovPjR8ynggD0

##### BamazonManager:
https://drive.google.com/open?id=1_f3G6APPxsjwJHwpR2kJAXWwngk3gtXQ

