function funHydrogen(zip) {
	$("#demo").html("<p></p>");

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
				$("#demo").append("<p id='address_"+data[i].ID+"'>"+data[i].Address+"</p>");
			}
		}
	});
}
