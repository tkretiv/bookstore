$(function(){

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
      // run userLogin()
      success: function(data) {
      console.log("registerDelivery success: ", data);
      showInfoResult(deliveryInfo);
      }
    });
  }


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

  $(".navtop button, .navbtm button").click(function(){
    $(".formParentWrapper").children().hide();

    var thisBtnValue = $(this).val();

      $(".formParentWrapper").children("."+thisBtnValue+"Form").show();
  });
});