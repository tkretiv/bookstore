$(function(){

  // Register delivery

  function changePrice(deliveryInfo) {
    $.ajax({
      // Use Nodebite's magic library
      url:"libs/sql-ajax-json.php",
      // Expect json in return
      dataType: "json",
      data: {
        sql: "sql/book-questions.sql",
        run: "change customerprice",
        isbn: JSON.stringify(deliveryInfo["isbn"]),
        kund_price: JSON.stringify(deliveryInfo["kund_price"])
      },
      success: function(data) {
        console.log("changePrice success: ", data);
        //run this here????
        showInfoResult(deliveryInfo);
      },
      error: function(data) {
        console.log("changePrice error: ", data);
      }
    });
  }

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
        fprice: deliveryInfo["fprice"]
      },
      success: function(data) {
        console.log("insertPrice success: ", data);
        //run this here????
        showInfoResult(deliveryInfo);
      },
      error: function(data) {
        console.log("insertPrice error: ", data);
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
        if ($("#checkbox:checked").length) {
            changePrice(deliveryInfo);

        } else {
            insertPrice(deliveryInfo);
        }
      }
    });
  }

  // Receipt for registered delivery

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

    },
    error: function(data){
        console.log("You failed hard!");
      }
    });
  }

  // Register book 

  $(".func .deliveryInfo").submit(function() {

  var deliveryInfo = {};

    $(this).find("input").not("input[type='submit']").each(function() {
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

  function RensaInputs(FormClassName)
  {
   var x = $(FormClassName);
     x.find("input").not("input[type='submit']").each(function()
      {
        $(this).val("");
      });
    }

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
    //if manual price checkbox is unchecked
    else
    {
      $(".deliveryInfo.deliveryForm input[name='kund_price']").val(Math.round(f_price*1.8*1.06));
      ownPrice = false;
    }
  });


  // keyup for automatic price
  $(".deliveryInfo.deliveryForm input[name='fprice']").keyup(function()
  {
    var fprice = $(this).val();
    //setting a automatic price
    if (!ownPrice)
    {
      $("#kund_price, #rkund_price").val(Math.round(fprice*1.8*1.06));
    }
  });


  // Clickhandler for nav buttons

  $(".navtop button, .navbtm button").click(function(){
    $(".formParentWrapper").children().hide();
    $(".func_res").children().hide();

    var thisBtnValue = $(this).val();

      RensaInputs("."+thisBtnValue+"Form");
      $(".formParentWrapper").children("."+thisBtnValue+"Form").show();
  });
});