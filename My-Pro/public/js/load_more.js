
var is_loading = false; // initialize is_loading by false to accept new loading
var limit = 6; // limit items per page
$(function() {
    $(window).scroll(function() {
        if($(window).scrollTop() >= ($(document).height() - $(window).height())*0.90) {
    //   if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
		   alert("123");
            if (is_loading == false) { // stop loading many times for the same page
                // set is_loading to true to refuse new loading
                is_loading = true;
                // display the waiting loader
                $('#loader').show();
                // execute an ajax query to load more statments
                $.ajax({
                   url: 'load_more.php',
                    type: 'POST',
                    data: {last_id:last_id},
                    success:function(data){
                        // now we have the response, so hide the loader
                        $('#loader').hide();
                        // append: add the new statments to the existing data
                        $('.load_class1').append(data);
                        // set is_loading to false to accept new loading
                        is_loading = false;
                    }
                });
            }
       }
    });
});
