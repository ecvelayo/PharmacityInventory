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
            var sql ="SELECT * FROM product ORDER BY current_quantity LIMIT 5";
            connection.query(sql, function(err, result){
                res.render("adminview", {data:result})
            });
        });
        app.get("/products", function(req, res){
            var sql = "SELECT * FROM product ORDER BY product_name";
            connection.query(sql, function(err, result){
            for (var i=0; i < result.length; i++){    
                //interprets decimal value into currency
                result[i].selling_price = result[i].selling_price.toFixed(2);
            }
                console.log(result);                
                res.render("productview", {data:result});
            });
        })
        //add new row to table
        //adds new product to the products table
        app.post("/products", urlencodedParser, function(req, res){
            console.log(req.body.sellingprice);
            var sql = "INSERT INTO product SET ?" ;
            var insert = {
                product_name: req.body.productname,
                product_category: req.body.productcategory,
                product_manufacturer: req.body.prodManufacturer,
                prod_generic_name: req.body.genericname,
                current_quantity: req.body.quantity,
                selling_price: req.body.sellingprice,
                date_expiry: req.body.expirydate
            }
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
                  console.log("------------------qweqweqweq-weq-e-qe-qe-qe--");
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
            var sql = "SELECT * FROM transaction";
            var sql1 = "SELECT * FROM product";
            var sql2 = "SELECT * FROM transactionitems"
            connection.query(sql, function(err,result){
              connection.query(sql1, function(err,result1){ 
                connection.query(sql2, function(err, result2){
                    res.render("transactions", {data:result, products:result1, details:result2});
                })
              });
            });

        });
        app.get("/searchitem", function(req, res){
            var sql = "SELECT * FROM product WHERE product_name ='"+req.query.keyword+"'";
            console.log(sql);
            connection.query(sql, function(err, result){
                console.log("Result " + result);
            })
            var response = {
                status: 200,
                success: "New transaction added!"
            }
            res.end(JSON.stringify(response));
        })
        app.post("/addtransactions", urlencodedParser, function(req,res){
            console.log(req.body);
            var name = req.body.customerName.toUpperCase();
            //var sql = "SELECT * from product";
            var sql = "INSERT INTO transaction SET ?;";
            var sql1 = "";
            var inserted = 0;
            var set = {
                user_id: 1,
                customer_name: name,
                subtotal: req.body.subtotal
            }
            connection.query(sql, set, function(err, result){
                inserted = result.insertId;
                //this is done because quantity[] becomes a string when there is only one value and turns into an object when there are multiple values. A different scheme of sql insertion is done to cater to this fact.
                if (typeof req.body['quantity[]'] == 'string'){
                    var sql = "INSERT INTO transactionitems SET ?;";
                    var set = {
                        transaction_id: inserted,
                        item: req.body['item[]'],
                        quantity: req.body['quantity[]'],
                        price: req.body['prices[]']
                    }
                    connection.query(sql, set, function(err, result){
                        if (err) throw err;
                    });
                    var sql = "UPDATE product SET current_quantity = current_quantity - "+req.body['quantity[]']+" WHERE product_id="+req.body['itemid[]'];
                    connection.query(sql, function(err, result){
                        if (err) throw err;
                    })
                }
                //this now caters to the instance of quantity[] turning into an object
                else{
                var sql = "INSERT INTO transactionitems SET ?;";
                for (var i=0; i < req.body['quantity[]'].length; i++){
                    var set = {
                        transaction_id: inserted,
                        item: req.body['item[]'][i],
                        quantity: req.body['quantity[]'][i],
                        price: req.body['prices[]'][i]
                    }
                    connection.query(sql, set, function(err, result){
                        if (err) throw err;
                    })
                }
                for (var i=0; i < req.body['quantity[]'].length; i++){
                    var sql = "UPDATE product SET current_quantity = current_quantity - "+req.body['quantity[]'][i]+" WHERE product_id="+req.body['itemid[]'][i];
                    console.log(sql);
                    connection.query(sql, function(err,result){
                        if(err) throw err;
                    })
                }
                }
                var response = {
                    status: 200,
                    success: "New transaction added!"
                }
                res.end(JSON.stringify(response));
            })
        });
        app.get("/transactiondetails", urlencodedParser, function(req, res){
              var sql = "SELECT * FROM transactionitems WHERE transaction_id="+req.query.id+";";
              console.log(sql);
              connection.query(sql, function(err, result){
              for (var i=0; i < result.length; i++){    
                //interprets decimal value into currency
                result[i].price = result[i].price.toFixed(2);
              }
                var sql = "SELECT * FROM transaction WHERE id="+req.query.id+";";
                connection.query(sql, function(err, result1){
                  res.render("transactiondetails", {data:result, data1: result1});  
                })
              })
        });
        });
    };

