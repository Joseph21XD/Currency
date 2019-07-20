
function hrefcheck(id){
	var x = document.getElementById(id+"-1");
	var y = document.getElementById(id+"-2");
	var k = document.getElementById("maincontent").getElementsByTagName("ul")[0];
	var num = parseInt(id.split("-")[1]);
	var json = JSON.parse(globalJson);
	if(x.checked){
		x.checked = false;
		y.className = "glyphicon glyphicon-star-empty yellow";
		var z = document.getElementById("country-"+num);
		k.removeChild(z);
		globalcountries.splice(globalcountries.indexOf(num),1);
	}
	else{
		x.checked = true;
		y.className = "glyphicon glyphicon-star yellow";
		k.innerHTML+= "<li id=\"country-"+num+"\"class=\"list-group-item d-flex justify-content-between align-items-center\">"+
		"<img src=\""+json.paises[num].bandera+"\" class=\"img-rounded\" alt=\"\">"+json.paises[num].nombre+
		"<span style=\"float: right;\"><span><img style=\"float: left;\" src=\""+json.paises[num].moneda+"\" class=\"img-rounded\" alt=\"\">"+
		"</span><span><input onkeyup=\"convert(this.id)\" id=\"country-"+num+"-1\" style=\"float: right;\" type=\"number\" value=\""+parseFloat(json.paises[num].valor).toFixed(2)+"\" class=\"form-control\"></span></span></li>";
		globalcountries.push(num);		
	}
}

function convert(id){
	var num = parseInt(id.split("-")[1]);
	var val= document.getElementById(id).value;
	var parameters = { 'id': num, 'val': val, 'countries': globalcountries };

	$.get( '/convert',parameters,function(data) {
		$.each(data, function(i){
			$('#country-'+globalcountries[i]+'-1').val(data[i]);
		});
     });
	

}