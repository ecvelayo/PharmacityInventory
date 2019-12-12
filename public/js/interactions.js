//Declared as global as the variables will be used in more than one function
var items = [];
var itemid = [];
var prices = [];
var quantity = [];
$(document).ready(function(){
    $(".deleteItem").click(function(){
        var pass = $(this).data("id");
        var a = $(".modal-footer #deletebtn").data("id"); //getter
        $(".modal-footer #deletebtn").data("id", pass); //setter
        var a = {id: $(".modal-footer #deletebtn").data("id")}; //getter
        console.log(a);
        $("#deletebtn").click(function(){
            $.ajax({
                type: "DELETE",
                url: "/delete",
                data: a
            });
            //reloads webpage after ajax request
            $(document).ajaxStop(function(){
                window.location.reload();
            })
        })
    })
    $("#item").on("keyup", function(){
//        var value = $(this).val().toLowerCase();
//        $("#myTable tr").filter(function() {
//        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//        });
    setTimeout(2000);
    var checkname = $(this).val();
    $.ajax({
        type: "GET",
        url: "/searchitem?keyword="+checkname,
        success: function(result)
        {
            console.log(result);    
        }
    })
    
    });
    $("#additemtransaction").click(function(){
       var myTable=document.getElementById("cart").getElementsByTagName("tbody")[0];
       var newRow = myTable.insertRow();
       var newcell1 = newRow.insertCell(0);
       var newcell2 = newRow.insertCell(1);
       newcell1.innerHTML = document.getElementById("item").value;
       newcell2.innerHTML = document.getElementById("quantity").value;
    })
    $("#passlist").click(function(){
        var EntryRowCount = ($("#cartTable td").closest("tr").length);
        var table = "#cartTable tr";
        var x = 0;
        //grabbing input data of quantity for items in cart
        $(table).each(function(){
            $(this).find("input").each(function(){
                quantity.push($(this).val());
            }) 
        })
        //grabbing data from cart to add to sent data at backend for DB and POST interactions
        for (var i=0; i < EntryRowCount; i++){
            itemid.push($(table).find("td").eq(x).html());
            items.push($(table).find("td").eq(x+1).html());
            prices.push($(table).find("td").eq(x+3).html());
            //6 interval used because each table row has 6 elements, basically skipping through each row after grabbing data from the said row
            x=x+6;
        }
//        for (var i=0; i < EntryRowCount; i++){
//            itemid.push($(table).find("td").eq(x).html());
//            x=x+1;
//        }
        //can access data only in first input cell in cartTable. Find way to access data on all value cells.
        var objectpassable = {};
        objectpassable.customerName = $("#customerName").val();
        objectpassable.item = items;
        objectpassable.itemid = itemid;
        objectpassable.quantity = quantity;
        objectpassable.prices = prices;
        console.log(objectpassable);
//        $.ajax({
//            type: "POST",
//            url: "addtransactions",
//            data: objectpassable,
//            //success now functions given that backend sends success code for interpretation
//            success : function(response){
//                $("#transactionModal").modal("hide");
//                $("#confirm-insert").modal("show"); 
//                window.location.reload();
//            }
//        });
    });
    $("body").on("keyup",".quantityItemInCart", function(){
        var EntryRowCount = ($("#cartTable td").closest("tr").length);
        var prices = [];
        var quantity = [];
        var table = "#cartTable tr";
        var x = 0;
        var subtotal = 0;
        var subtotalDisplay = "";
        //grabbing input data of quantity for items in cart
        $(table).each(function(){
            $(this).find("input").each(function(){
                quantity.push($(this).val());
            }) 
        })
        //grabbing data from cart to add to sent data at backend for DB and POST interactions
        for (var i=0; i < EntryRowCount; i++){
            prices.push($(table).find("td").eq(x+3).html());
            //6 interval used because each table row has 6 elements, basically skipping through each row after grabbing data from the said row
            x=x+6;
        }
        for (var i = 0; i < prices.length; i++){
            subtotal = subtotal + (prices[i] * quantity[i]);
        }
        subtotalDisplay = parseFloat(subtotal).toFixed(2);
        $("#subtotal").text("Subtotal = "+subtotalDisplay);
    })

    //access data in table cells to autofill in edit product modal
    //accessing the data in the existing table in HTML
    $("table tbody").on("click", ".edititem", function(){
        var cur = $(this).closest("tr");
        var pass = ($(this).data("id"));
        var a = $(".modal-body #productID").val();
        $(".modal-body #productID").val(pass);
        $("#productname").val(cur.find("td:eq(0)").text());
        $("#category").val(cur.find("td:eq(1)").text());
        $("#genericname").val(cur.find("td:eq(2)").text());
        $("#quantity").val(cur.find("td:eq(3)").text());
        $("#purchaseprice").val(cur.find("td:eq(4)").text());
        $("#sellingprice").val(cur.find("td:eq(5)").text());
        $("#productsupplier").val(cur.find("td:eq(6)").text());
    })
    //redirection of page to transaction details of button clicked
    $(".details").click(function(){
        window.location=("/transactiondetails?id="+$(this).data("id"));
    })
    //would need to show the subtotal based on the input quantity of items in cart
    $(".quantityItemInCart").on("keyup", function(){
        var items=[];
        var itemid=[];
        var table = "#cart tr";
        itemid.push($(table).find("td").eq(x).html());
        items.push($(table).find("td").eq(x+1).html());
        console.log(itemid, items);
        $("#subtotal").text("Subtotal = ");
    });
    $(function(){
        $("#datepicker").datepicker({
            dateFormat: "yy-mm-dd",
            beforeShow: function(input, inst)
            {
                inst.dpDiv.css({marginTop: -input.offsetHeight + 'px', marginLeft: input.offsetWidth + 'px'});
            }
        });
    });
//to pull data from database upon clicking of transaction details button
//    $(".details").click(function(){
//        var ajax = $.ajax({
//            type: "GET",
//            url: "transactiondetails?id="+$(this).data("id"),
//            data: $(this).data("id"),
//            success:function(){
//                console.log("Test");
//            },
//            error: function(data){
//                alert("Error");
//            }
//            });
//    });
//        console.log("Row is " + $(this).closest("td").parent()[0].sectionRowIndex);
//        console.log($(this).closest("td").parent()[0].sectionRowIndex);
//        var $row = jQuery(this).closest("tr");
//        var $columns = $row.find("td");
//        $columns.addClass("row-highlight");
//        var values = "";
//        var rowIndex = $(this).closest("td").parent()[0].sectionRowIndex;
//        console.log(rowIndex);
//        $("#products").each(function(){
//            var productname = $(this).find("td").eq(rowIndex-1).html();
//            //console.log(productname);
//            $("#productname").val(productname);
//        })
})