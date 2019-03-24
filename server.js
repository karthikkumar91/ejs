var express =require('express');
var app=express();

var http=require('http');
var path=require('path');
var connection =require('express-myconnection');
var mysql=require('mysql');
var bodyParser = require('body-parser')

var customers=require('./routes/customers');
var react = require('./routes/react');
// var routes=require('./routes'); 



app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.set('port',process.env.PORT||5000);
app.set('views',path.join(__dirname,'view'));//first views are default., second view are our folter name
app.set('view engine','ejs');


app.use(express.json());//in express json defaultly off so we can on that
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname,'public')));


app.use(
    connection(mysql,{
        host:'localhost',
        user:'root',
        password:'karthik@1991',
        port:3306,
        database:'customers'
    },'request')
);


app.get('/customer/admin',customers.admin);
app.post('/admin/validation',customers.admin_validation);
app.post('/add/products',customers.add);
app.get('/show/products',customers.show);
app.get('/show/products/:id',customers.product_detail);
app.get('/customer/login',customers.login);
app.post('/customer/validation',customers.validation);
app.get('/full/detail',customers.product_detail);
app.post('/customer/create',customers.create);
app.post('/customer/update',customers.update);


app.get('/customer/check',customers.check);
app.post('/customer/name',customers.name);

app.get('/react/sample',react.sample);

http.createServer(app).listen(app.get('port'),function(){
    console.log('Express Server Port:-->'+app.get('port'));
});