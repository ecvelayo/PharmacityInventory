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
    //access data in table cells to autofill in edit product modal
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