$(function(){
    
	$(".func .searchInfo").submit(function() {

	var searchInfo = {};

		$(this).find("input").not("input[type='submit']").each(function() {
      searchInfo[this.name] = $(this).val();
    });

		console.log("searchInfo: ", searchInfo);
// console.log(JSON.stringify('%'+searchInfo["name"]+'%'));

	$.ajax({
      // Use Nodebite's magic library
      url:"libs/sql-ajax-json.php",
      // Expect json in return
      dataType: "json",
      data: {
        sql: "sql/book-questions.sql",
        run: "kundsearching",
        isbn: JSON.stringify('%'+searchInfo["isbn"]+'%'),
        name: JSON.stringify('%'+searchInfo["name"]+'%'),
        author: JSON.stringify('%'+searchInfo["author"]+'%')
	},
	success: function(data) {
		console.log("Search. form successfully submitted!");
		console.log("data: ", data);
    ShowKundSearch(data);
		
	},
	error: function(data){
		console.log("error: ", data);
	}
		
	});
	return false;
	});

function ShowKundSearch(data) {
	 $('.showkundsearch article').not('.searchResultat').remove();
    // loop through the products array with a for-loop
    for(var i = 0; i < data.length; i++){
      // ask jQuery to create a new article
      var article = $('<article/>');
      // create some spans inside the article for each product property
      // we want to show
      console.log(data[i].isbn);

      article.append('<span>' + data[i].isbn + '</span>');
      article.append('<span>' + data[i].author + '</span>');
      article.append('<span>' + data[i].name + '</span>');
      article.append('<span>' + data[i].kund_price + '</span>');
      article.append('<span>' + data[i].bookstore_balance + '</span>');
      // add the article to the product-listing element
      $('.showkundsearch').append(article);
    }
       $(".showkundsearch").show();
}

});