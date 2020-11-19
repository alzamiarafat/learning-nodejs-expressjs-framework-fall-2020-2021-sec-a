const express 			= require('express');
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const cookieParser 		= require('cookie-parser');

const login				= require('./controllers/login');
const register			= require('./controllers/register');
const admin_home		= require('./controllers/admin_home/home');
const country			= require('./controllers/admin_home/country');
const scout_home		= require('./controllers/scout_home/home');
const user_home			= require('./controllers/user_home/home');
const logout			= require('./controllers/logout');

const home				= require('./controllers/home');


const app				= express();
const port				= 8000;

app.set('view engine', 'ejs');
app.use('/abc', express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));

app.use('/login', login);
app.use('/register', register);
app.use('/home', home);
app.use('/admin_home', admin_home);
app.use('/country', country);
app.use('/scout_home', scout_home);
app.use('/user_home', user_home);
app.use('/logout', logout);


app.listen(port, (error)=>{
	console.log('server strated at '+port);
});