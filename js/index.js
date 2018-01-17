$(document).ready(function() {
                  
  //When a user hits enter, run the search
  $("#search").on("keypress", function(event) {
    if (event.keyCode == 13) {
      
      //Clear old input
      $("#results ul").empty();
      
      // Save search input to add to URL in AJAX call
      var input = $("#search").val();
     
      $.ajax({
          type: "POST",
          dataType: 'jsonp',
        //////WHEN READY, UPDATE SO gsrsearch=input.val()!!!!!!!!!!!!!!!!
          url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='+input+'&callback=JSON_CALLBACK',
          success: function(json) {
            
            var results = json.query.pages;
            
            for (var key in results) {
              var title = results[key].title;
              var extract = results[key].extract;
              var pageid = results[key].pageid;
              console.log(title+' '+extract+' '+pageid);
              
              $("#results ul").append('<a href="https://en.wikipedia.org/?curid='+pageid+'"><li><span class="bold">'+title+'</span><br>'+extract+'</li></a>');
              
            }
            
            //End success function
        }
      //End ajax statement
    });
      //End if statement
    }
      //End search event
      });
  //End $document.ready
  });