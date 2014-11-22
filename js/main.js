function funHydrogen(zip) {
	$("#output").html("");

	var api_url = 'http://services.cngnow.com/V1/Stations.svc/external/filter?'

	if (zip != null && zip != "") {
		api_url = api_url + "zip=" + zip
	}
	console.log()
	console.log(api_url)
	$.ajax({
		url: api_url, 
		crossDomain: true,
		dataType: "jsonp",
		success: function(data) {
			console.log(data);
		 	// var r = data[0];
		 	for (var i = 0; i < data.length; i++) {
		 		var s = data[i]
		 		var id = "location_"+s.ID
		 		$("#output").append("<div id='"+id+"' class='location'></div>");
				$("#"+id).append("<input type='checkbox' class='popUpControl popUp' id='"+id+"_input'>");
				$("#"+id).append("<label for='"+id+"_input' id='"+id+"_info'>"+s.Name+"</label>");
				$("#"+id+"_info").append("<span class='box' id='"+id+"_box'></span>");
				$("#"+id+"_box").append("<p>  Location: "+s.City+", "+s.State+"</p>");
				$("#"+id+"_box").append("<p>   Address: "+s.Address+"</p>");
				$("#"+id+"_box").append("<p>     Phone: "+s.Phone+"</p>");
				$("#"+id+"_box").append("<p>     Hours: "+s.Hours+"</p>");
				$("#"+id+"_box").append("<p>Directions: "+s.Directions+"</p>");
			}
		}
	});
}
