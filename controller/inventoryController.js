var mysql = require("mysql");
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app){
    var connection = mysql.createConnection({
        multipleStatements: true,
        host: "127.0.0.1",
        //socketPath: "/cloudsql/resolute-land-249012:asia-east1:inventory",
        user: "root",
        password: "r00m12@ctual",//r00m12@ctual
        database: "inventory2-1"
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
            var sql ="SELECT * FROM product ORDER BY current_quantity";
            connection.query(sql, function(err, result){
                res.render("adminview", {data:result})
            });
        });
        app.get("/products", function(req, res){
            var sql = "SELECT * FROM product ORDER BY product_name";
            connection.query(sql, function(err, result){
                console.log(result);
                res.render("productview", {data:result});
            });
        })
        //add new row to table
        //adds new product to the products table
        app.post("/products", urlencodedParser, function(req, res){
            var sql = "INSERT INTO product SET ?" ;
            var insert = {
                product_name: req.body.productname,
                product_category: req.body.productcategory,
                product_manufacturer: req.body.prodManufacturer,
                prod_generic_name: req.body.genericname,
                current_quantity: req.body.quantity,
                selling_price: req.body.sellingprice,
            }
            insert.selling_price = parseFloat(insert.selling_price);
            connection.query(sql, insert, function(err, result){
                if (err) throw err;
                console.log(typeof insert.selling_price);
            })
            res.redirect("/products");
        })
        app.post("/productsupdate", urlencodedParser, function(req, res){
            var sql = "SELECT * FROM product WHERE id = ?";
            connection.query(sql, req.body.id,function(err, result){
                if (err) throw err;
                var sql = "UPDATE product SET ? WHERE id = " + req.body.id;
                var edit = {
                    name: req.body.productname,
                    description: req.body.description,
                    price: req.body.price,
                    stock: req.body.stock,
                    model: req.body.model
                }
                connection.query(sql, edit, function(err, result){
                    if (err) throw err;
                    connection.query("SELECT * FROM product", function(err, result){
                        res.render("productview", {data:result});
                    })
                })
            })
        })
        app.delete("/delete", urlencodedParser, function(req,res){
            var sql = "SELECT * FROM product WHERE product_id = ?";
            console.log(req.body.id);
            connection.query(sql, req.body.id, function(err, result){
                if (err) throw err;
                var sql1 = "INSERT INTO deletedproducts SET ?";
                console.log("------------------"+result[0].product_id);
                var insert = {
                  product_id : result[0].product_id,
                  product_name: result[0].product_name,
                  product_category: result[0].product_category,
                  prod_manufacturer: result[0].prod_manufacturer,
                  prod_generic_name: result[0].prod_generic_name,
                  current_quantity: result[0].current_quantity,
                  selling_price: result[0].selling_price,
                  sold : result[0].sold
                };
                connection.query(sql1, insert, function(err, result){
                    var sql = "DELETE FROM product WHERE product_id = ?";
                    connection.query(sql, req.body.id, function(err, result){
                        // connection.query("SELECT * FROM products", function(err,result){
                        //     res.render("productview", {data:result});
                        // })
                    })
                })
            })
            res.redirect('/products');
        })
        app.get("/transactions", function(req, res){

            //var sql = "SELECT T.quantity, S.selling_price, CQ.current_quantity, C.name,A.username FROM [transaction] T JOIN customer C ON T.ID";
            var sql = "SELECT customer.name,accounts.username,product.product_name,product.selling_price,product.prod_generic_name,transaction.date,transaction.quantity FROM product,transaction,customer,accounts WHERE transaction.customer_id = customer.id AND transaction.user_id = accounts.account_id AND transaction.product_id = product.product_id";
            //
            var sql1 = "SELECT * FROM product";
            connection.query(sql, function(err,result){
              //console.log(result);
              connection.query(sql1, function(err,result1){

                res.render("transactions", {data:result, products:result1});
              })
            })

        })
        app.post("/addtransactions", urlencodedParser, function(req,res){
            console.log(req.body);
            var sql = "INSERT INTO transaction SET ?";
            var insert = {
                user_id: 1,
                customer_id: 1,
                product_id: req.body.item[0],
                quantity:req.body.quantity[0]
            }
//            connection.query(sql, insert, function(err, result){
//                var sql = "SELECT * FROM product WHERE product_id ='"+req.body.item_choice+"'";
//
//                connection.query(sql, function(err, result){
//                    if (err) throw err;
//                    console.log(result);
//                    var sql1 = "UPDATE product SET current_quantity = " +(result[0].current_quantity- parseInt(req.body.noOfItems)) +", sold =" + (result[0].sold+ parseInt(req.body.noOfItems)) + " WHERE product_id =" + req.body.item_choice;
//                     connection.query(sql1, function(err, result){
//                         console.log(result);
//                 })
//
//                    })
//                })
            res.redirect('/transactions');
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
