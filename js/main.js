function geoSuccess(position) {
  console.log(position.coords.latitude)
  console.log(position.coords.longitude)
  $("#output").html("");
  $("#output").append("latitude: "+position.coords.latitude.toString());
  $("#output").append("longitude: "+position.coords.longitude.toString());

  var api_url = 'http://services.cngnow.com/V1/Stations.svc/external/circlefilter?'

  $.ajax({
		url: api_url+"latitude="+position.coords.latitude.toString()+"&longitude="+position.coords.longitude.toString()+"&range=15", 
		crossDomain: true,
		dataType: "jsonp",
		success: function(data) {
			console.log(data);
			if (data.length < 1) {
				$("#output").html("Your search returned No Results...")
			} else {

				$("#output").html("There are "+data.length+" stations within 15 miles of you.")

				for (var i = 0; i < data.length; i++) {
					var s = data[i]
					var id = "location_"+s.ID
					$("#output").append("<div id='"+id+"' class='location'></div>");
					$("#"+id).append("<input type='checkbox' class='popUpControl popUp' id='"+id+"_input' onclick='show("+id+"_box)'>");
					$("#"+id).append("<label for='"+id+"_input' id='"+id+"_info'>"+s.Name.toUpperCase()+" - "+s.City+", "+s.State+"</label>");
					$("#"+id+"_info").append("<span class='box' id='"+id+"_box'></span>");
					$("#"+id+"_box").append("<p>"+s.Address+"</p>");
					$("#"+id+"_box").append("<p>"+s.City+", "+s.State+" "+s.Zip+"</p>");
					$("#"+id+"_box").append("<p>"+s.Phone+"</p></br>");
					$("#"+id+"_box").append("<p>Hours: "+s.Hours+"</p>");
					$("#"+id+"_box").append("<p>Directions: "+s.Directions+"</p>");
					document.getElementById(id+"_box").style.display = 'none'
				}
			}
		}
	});
}

function naturalGas(zip) {
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
			if (data.length < 1) {
				$("#output").html("Your search returned No Results...")
			} else {
				for (var i = 0; i < data.length; i++) {
					var s = data[i]
					var id = "location_"+s.ID
					$("#output").append("<div id='"+id+"' class='location'></div>");
					$("#"+id).append("<input type='checkbox' class='popUpControl popUp' id='"+id+"_input' onclick='show("+id+"_box)'>");
					$("#"+id).append("<label for='"+id+"_input' id='"+id+"_info'>"+s.Name.toUpperCase()+" - "+s.City+", "+s.State+"</label>");
					$("#"+id+"_info").append("<span class='box' id='"+id+"_box'></span>");
					$("#"+id+"_box").append("<p>"+s.Address+"</p>");
					$("#"+id+"_box").append("<p>"+s.City+", "+s.State+" "+s.Zip+"</p>");
					$("#"+id+"_box").append("<p>"+s.Phone+"</p></br>");
					$("#"+id+"_box").append("<p>Hours: "+s.Hours+"</p>");
					$("#"+id+"_box").append("<p>Directions: "+s.Directions+"</p>");
					document.getElementById(id+"_box").style.display = 'none'
				}
			}
		}
	});
}

function hydrogenGas(zip) {
	$("#output").html("This is a search for Hydrogen Stations!!")
}

function teslaElectric(zip) {
	$("#output").html("This is a search for Tesla Charging Stations!!")
}

function fuelType(zip) {
	if ($('#naturalgas')[0].checked) {
		naturalGas(zip)
	}
	if ($('#hydrogen')[0].checked) {
		hydrogenGas(zip)
	}
	if ($('#tesla')[0].checked) {
		teslaElectric(zip)
	}
}

function show(target){
	if (target.style.display.toString() == 'block') {
		target.style.display = 'none';
	} else {
		target.style.display = 'block';
		target.style.background = 'lightgray';
	}
}

navigator.geolocation.getCurrentPosition(geoSuccess)

