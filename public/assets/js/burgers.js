//this is the logic to change the eaten state
$(function() 
{
  $(".change-eaten").on("click", function(event) 
  { //only letting the user use one click
    //once clicked change the state of the button
    var id = $(this).data("id");
    var newdevoured = $(this).data("neweaten");
    if(newdevoured) //if this is the first click then the 
    {               //burger is eaten and update the state
      var newDevoured = 
      {
        devoured: newdevoured
      };
      //update the state of the burger to the database
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevoured
      }).then(
        function() 
        {
          // Reload the page to get the updated list
          location.reload();
        }
      );
    }
    else  //else the state is already eaten and remove 
    {     //button attribute
      $(".change-eaten").RemoveAttr("class","change-eaten");
      $(".change-eaten").attr("id", "eaten");
    }
  });

//this is the functionality for creating a new burger
$(".create-form").on("submit", function(event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();
  //grabs the burger name
  console.log($("#ca").val().trim());
  //grabs the state (not eaten and defaults to not eaten)
  console.log($("[name=devoured]:checked").val());
  //pass in the values and return an obj newBurger
  var newBurger = 
  {
    burger_name: $("#ca").val().trim(),
    devoured: $("[name=devoured]:checked").val()
  };
  // Send the POST request. and update to database
  $.ajax("/api/burgers", {
    type: "POST",
    data: newBurger
  }).then(
    function() {
      // Reload the page to get the updated list
      location.reload();
    }
  );
});
});
