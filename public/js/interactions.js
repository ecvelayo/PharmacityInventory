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
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
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
        var items = [];
        var quantity = [];
        $(table).each(function(){
            $(this).find("input").each(function(){
                quantity.push($(this).val());
            }) 
        })
        for (var i=0; i < EntryRowCount; i++){
            items.push($(table).find("td").eq(x).html());
            x=x+2;
        }
        //can access data only in first input cell in cartTable. Find way to access data on all value cells.
        var objectpassable = {};
        objectpassable.customerName = $("#customerName").val();
        objectpassable.item = items;
        objectpassable.quantity = quantity;
        $.ajax({
            type: "POST",
            url: "addtransactions",
            data: objectpassable
        });
        $(document).ajaxStop(function(){
            //window.location.reload();
        });
    });
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
    $( function(){
        $("#datepicker").datepicker({
            dateFormat: "yy-mm-dd",
            beforeShow: function(input, inst)
            {
                inst.dpDiv.css({marginTop: -input.offsetHeight + 'px', marginLeft: input.offsetWidth + 'px'});
            }
        });
    });
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