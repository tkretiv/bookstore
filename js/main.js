$(function(){

  // Register delivery

  function insertPrice(deliveryInfo) {
    $.ajax({
      // Use Nodebite's magic library
      url:"libs/sql-ajax-json.php",
      // Expect json in return
      dataType: "json",
      data: {
        sql: "sql/book-questions.sql",
        run: "insert customerprice",
        isbn: JSON.stringify(deliveryInfo["isbn"]),
        kund_price: deliveryInfo["kund_price"]
      },
      success: function(data) {
        console.log("insertPrice success: ", deliveryInfo);
        //run this here????
        showInfoResult(deliveryInfo);
      },
      error: function(data) {
        console.log("insertPrice error: ", deliveryInfo);
      }
    });
  }

  function registerDelivery(deliveryInfo) {
    $.ajax({
      // Use Nodebite's magic library
      url:"libs/sql-ajax-json.php",
      // Expect json in return
      dataType: "json",
      data: {
        // Read SQL questions from this file
        sql: "sql/book-questions.sql",
        // Run the query named all products
        run: "register delivery",
        //data to send
        isbn: JSON.stringify(deliveryInfo["isbn"]),
        amount_delivery: JSON.stringify(deliveryInfo["amount_delivery"]),
        fprice: JSON.stringify(deliveryInfo["fprice"]),
        bookshelf: JSON.stringify(deliveryInfo["bookshelf"])
      },
      // When we have got an response from the server
      // run showInfoResult
      success: function(data) {
        console.log("registerDelivery success: ", deliveryInfo);
        if (deliveryInfo.kund_price) {
            insertPrice(deliveryInfo);

        } else {
            deliveryInfo.kund_price = Math.round(deliveryInfo.fprice*1.8, 2);
            insertPrice(deliveryInfo);
        }
      }
    });
  }

  // Receipt for registered delivery
  /* Delivery recieved and shown
  function showInfoResult(deliveryInfo) {
    $.ajax({
      // Use Nodebite's magic library
      url:"libs/sql-ajax-json.php",
      // Expect json in return
      dataType: "json",
      data: {
        sql: "sql/book-questions.sql",
        run: "show delivery",
        isbn: JSON.stringify(deliveryInfo["isbn"])
    },
    success: function(data) {
      console.log("show delivery: ", data);
      $(".showresults").show(data);
      $("#risbn:text").val(data[0].isbn);
      $("#rname:text").val(data[0].name);
      $("#rauthor:text").val(data[0].author);
      $("#ramount_delivery:text").val(data[0].amount_delivery);
      $("#rfprice:text").val(data[0].fprice);
      $("#rbookshelf:text").val(data[0].bookshelf);
      $("#rkund_price:text").val(data[0].kund_price);

    },
    error: function(data){
        console.log("You failed hard!");
      }
    });
  }
  */

  // Register book 

  $(".func .deliveryInfo").submit(function() {

  var deliveryInfo = {};

    $(this).find("input").not("input[type='submit'], input[type='checkbox']").each(function() {
      deliveryInfo[this.name] = $(this).val();
    });

    console.log("deliveryInfo: ", deliveryInfo);

  $.ajax({
      // Use Nodebite's magic library
      url:"libs/sql-ajax-json.php",
      // Expect json in return
      dataType: "json",
      data: {
        sql: "sql/book-questions.sql",
        run: "register book",
        isbn: JSON.stringify(deliveryInfo["isbn"]),
        name: JSON.stringify(deliveryInfo["name"]),
        author: JSON.stringify(deliveryInfo["author"])
        },
      success: function(data) {
        console.log("1. form successfully submitted!");
        console.log("data: ", data);
      registerDelivery(deliveryInfo);
    }
  });
  return false;
  });

  //clickhandler for price
  var ownPrice = false;
  $(".deliveryInfo.deliveryForm input[type='checkbox']").click(function()
  {
    var theCheckBox = $(".deliveryInfo.deliveryForm input[type='checkbox']:checked");
    //if manual price checkbox is checked
    if (theCheckBox.length)
    {
      ownPrice = true;
    }
    //if manual price checkbox is not checked/unchecked
    else
    {
      //and show the automatic sale price again
      $(".deliveryInfo.deliveryForm input[name='kund_price']").val(Math.round(fprice*1.8));
      ownPrice = false;
    }
  });


  // keyup for automatic price
  $(".deliveryInfo.deliveryForm input[name='fprice']").keyup(function()
  {
    var fprice = $(this).val();
    //if the user is not entering a sale price manually
    if (!ownPrice)
    {
      $("#kund_price,#rkund_price").val(Math.round(fprice*1.8*1.06));
    }
  });

   function RensaInputs(FormClassName) {
   var x = $(FormClassName);
     x.find("input").not("input[type='submit']").each(function()
      {
        $(this).val("");
      });
    }

  // Clickhandler for nav buttons

  $(".navtop button, .navbtm button").click(function(){
    $(".formParentWrapper").children().hide();
    $(".func_res").children().hide();

    var thisBtnValue = $(this).val();

      RensaInputs("."+thisBtnValue+"Form");
      $(".formParentWrapper").children("."+thisBtnValue+"Form").show();
  });
});