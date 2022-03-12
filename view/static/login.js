function myFunction() {
    data = {
        email: $('#email_input').val(),     //gọi id thì dùng #, gọi class thì dùng .
        password: $('#pass_input').val(),
    }

    request = $.ajax({
		url : "/login",
		contentType : 'application/json',     //kiểu dữ liệu truyền lên
		type : "POST",                      //method
		dataType : 'json',                //làm rõ loại data
		data : JSON.stringify(data)       //body của data, dữ liệu truyền trong body
	});
	request.done(function(response) {
	    localStorage.setItem("login_key", response);
		    window.location.href = '/'
	});
	request.fail(function(jqXHR) {
		console.log(jqXHR.responseJSON);
		$('#error_message').text(jqXHR.responseJSON)
	});
}


