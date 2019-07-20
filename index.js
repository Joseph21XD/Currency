const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const path = require('path');
const fs = require("fs"); 

app.set('port', PORT); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder


app.get('/', function(req, res) {
			const content = fs.readFileSync('./test.json', 'utf-8');
  			var config = JSON.parse(content);
            res.render('index.ejs',{val:config, val2: JSON.stringify(config)});  
});

app.get('/convert',function(req,res){
	const content = fs.readFileSync('./test.json', 'utf-8');
  	var config = JSON.parse(content);
	var id = parseInt(req.query.id);
	var val = parseFloat(req.query.val);
	var countries = req.query.countries;
	var resp = [];
	var val1;
 	for (var i = 0; i<countries.length; i++ ) {
 		val1 = (parseFloat(config.paises[countries[i]].valor)*val)/config.paises[id].valor;
 		if(countries[i]!=id)
 		resp.push(val1.toFixed(2));
 		else
 		resp.push(val1);
 	}
    res.send(resp);
});

// set the app to listen on the port
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});