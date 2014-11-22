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
				$("#"+id).append("<input type='checkbox' class='popUpControl popUp' id='"+id+"'>");
				$("#"+id).append("<label for='"+id+"'>"+s.Name+"</label>");
			}
		}
	});
}
