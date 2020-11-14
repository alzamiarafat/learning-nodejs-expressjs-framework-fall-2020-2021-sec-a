const express 			= require('express');
const bodyParser 		= require('body-parser');
const exSession 		= require('express-session');
const cookieParser 		= require('cookie-parser');

const login				= require('./controllers/login');
const admin_home		= require('./controllers/admin_home');
const employee_home		= require('./controllers/employee_home');
const user				= require('./controllers/user');
const job				= require('./controllers/job');
const logout			= require('./controllers/logout');

const app				= express();
const port				= 4000;

app.set('view engine', 'ejs');

app.use('/abc', express.static('assets'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(exSession({secret: 'secret value', saveUninitialized: true, resave: false}));

app.use('/login', login);
app.use('/admin_home', admin_home);
app.use('/employee_home', employee_home);
app.use('/user', user);
app.use('/job', job);
app.use('/logout', logout);


app.get('/', (req, res)=>{
	res.send('Welcome');
});

app.listen(port, (error)=>{
	console.log('server strated at '+port);
});