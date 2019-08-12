var mysql = require("mysql");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app){
    var connection = mysql.createConnection({
        multipleStatements: true,
        host: "127.0.0.1",
        //socketPath: "/cloudsql/resolute-land-249012:asia-east1:inventory",
        user: "root",
        password: "r00m12@ctual",
        database: "inventory2"
    });
    connection.connect(function(err){
        if (err) throw err;
        app.get("/", function(req, res){
            res.render("login");
        })
        app.post("/login", urlencodedParser, function(req, res){
            var sql = "SELECT * FROM accounts WHERE username = ? AND password = ?";
            connection.query(sql, [req.body.username, req.body. password], function(err, fields){
                if (err) throw err;
                if (fields[0].account_type == "admin"){
                        res.redirect("/home");
                }
            });
        })
        app.get("/home", urlencodedParser, function(req, res){
            var sql ="SELECT * FROM inventory ORDER BY current_quantity";
            connection.query(sql, function(err, result){
                res.render("adminview", {data:result})
            });
        });
        app.get("/products", function(req, res){
            var sql = "SELECT * FROM inventory ORDER BY product_name";
            connection.query(sql, function(err, result){
                console.log(result);
                res.render("productview", {data:result});
            });
        })
        //add new row to table
        //adds new product to the products table
        app.post("/products", urlencodedParser, function(req, res){
            var sql = "INSERT INTO inventory SET ?" ;
            var insert = {
                product_name: req.body.productname,
                product_category: req.body.productcategory,
                prod_generic_name: req.body.genericname,
                current_quantity: req.body.quantity,
                purchase_price: req.body.purchaseprice,
                selling_price: req.body.sellingprice,
                product_supplier: req.body.supplier,
                expiration_date: req.body.expiry
            }
            insert.purchase_price = parseFloat(insert.purchase_price);
            connection.query(sql, insert, function(err, result){
                if (err) throw err;
                console.log(typeof insert.purchase_price);
            })
            res.redirect("/products");
        })
        app.post("/productsupdate", urlencodedParser, function(req, res){
            var sql = "SELECT * FROM products WHERE id = ?";
            connection.query(sql, req.body.id,function(err, result){
                if (err) throw err;
                var sql = "UPDATE products SET ? WHERE id = " + req.body.id;
                var edit = {
                    name: req.body.productname,
                    description: req.body.description,
                    price: req.body.price,
                    stock: req.body.stock,
                    model: req.body.model
                }
                connection.query(sql, edit, function(err, result){
                    if (err) throw err;
                    connection.query("SELECT * FROM products", function(err, result){
                        res.render("productview", {data:result});
                    })
                })
            })
        })
        app.delete("/delete", urlencodedParser, function(req,res){
            var sql = "SELECT * FROM products WHERE id = ?";
            console.log(req.body.id);
            connection.query(sql, req.body.id, function(err, result){
                if (err) throw err;
                var sql = "INSERT INTO deletedproducts SET ?";
                var insert = {
                    product_id: req.body.id,
                    name: result[0].name,
                    description: result[0].description,
                    price: result[0].price,
                    stock: result[0].stock,
                    model: result[0].model,
                    date_added: result[0].date_arrived,
                    sold: result[0].sold
                }
                connection.query(sql, insert, function(err, result){
                    var sql = "DELETE FROM products WHERE id = ?";
                    connection.query(sql, req.body.id, function(err, result){
                        connection.query("SELECT * FROM products", function(err,result){
                            res.render("productview", {data:result});
                        })
                    })
                })
            })
        })
        app.get("/transactions", function(req, res){
            var sql = "SELECT * FROM transactions;SELECT id,name FROM products";
            connection.query(sql, function(err,result){
                //console.log(JSON.stringify(result));
                res.render("transactions", {data:result});
            })
            
        })
        app.post("/addtransaction", urlencodedParser, function(req,res){
            //console.log(req.body);
            var sql = "INSERT INTO transactions SET ?";
            var insert = {
                transaction_customer: req.body.customerName,
                product_bought: req.body.choice,
                quantity_bought: req.body.noOfItems
            }
            connection.query(sql, insert, function(err, result){
                //get ID of latest inserted ID
                //console.log(result.insertId);
//                var sql = "INSERT INTO transactionitems SET ?";
//                var insertTrans = {
//                    transaction_id:  result.insertId,
//                    product: req.body.choice,
//                    noOfItems: req.body.noOfItems
//                };
//                connection.query(sql, insertTrans, function(err,result){
                //console.log(req.body.choice);
                var sql = "SELECT * FROM products WHERE name ='"+req.body.choice+"'";
               
                connection.query(sql, function(err, result){
                    if (err) throw err;
                     console.log(result[0].stock);  
                    var sql = "UPDATE products SET stock = " +(result[0].stock-req.body.noOfItems) +", sold =" + (result[0].sold+parseInt(req.body.noOfItems)) + " WHERE name ='" + req.body.choice +"'";
                    //var edit = result[0].stock-req.body.noOfItems;
                    connection.query(sql, function(err, result){
                        
                        connection.query("SELECT * FROM TRANSACTIONS; SELECT id, name FROM products", function(err, result){
                        res.render("transactions", {data:result});
                    })
                })
                    })
                })
            //res.redirect('/transactions');
        })
        
        
//         app.get("/deletee", function(req,res){
//            var sql = "SELECT * FROM products WHERE id = ?";
//            connection.query(sql, req.query.id, function(err, result){
//                if (err) throw err;
//                var sql = "INSERT INTO deletedproducts SET ?";
//                var insert = {
//                    product_id: req.query.id,
//                    name: result[0].name,
//                    description: result[0].description,
//                    price: result[0].price,
//                    stock: result[0].stock,
//                    model: result[0].model,
//                    date_added: result[0].date_arrived,
//                    sold: result[0].sold
//                }
//                connection.query(sql, insert, function(err, resultt){
//                    var sql = "DELETE FROM products WHERE id = ?";
//                    connection.query(sql, req.query.id, function(err, result){
////                        connection.query("SELECT * FROM products", function(err,result){
////                            res.render("productview", {data:result});
////                        })
//                        
//                    })
//                })
//            })
//             res.redirect('/home');
//        })
        
    })
}
