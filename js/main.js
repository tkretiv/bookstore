$(function(){

  // Register delivery

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
      showInfoResult(deliveryInfo);
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
    registerDelivery (deliveryInfo);
	}
		
	});
	return false;
	});

  // Clickhandler for nav buttons

  $(".navtop button, .navbtm button").click(function(){
    $(".formParentWrapper").children().hide();
    $(".func_res").children().hide();

    var thisBtnValue = $(this).val();

      $(".formParentWrapper").children("."+thisBtnValue+"Form").show();
  });
});