// dependencies
import path from 'path';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import mongoose from 'mongoose';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// main config
let app = express();

app.set('port', 3000);
app.use(logger('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());
app.use(cookieSession({secret: 'the princess and the frog', name: 'session',keys: ['key1', 'key2']}));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use User model for authentication
import User from './models/user.js';
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test', function(err) {
    if (err) {
        console.log('Could not connect to mongodb on localhost. Ensure that you have mongodb running on localhost and mongodb accepts connections on standard ports!');
    }
});

// Register routes
import rootRoute from './routes/root';
import userRoute from './routes/user';
import adminRoute from './routes/admin';
app.use('/', rootRoute);
app.use('/public', express.static('tmp'));
app.use('/user', userRoute);
app.use('/admin', adminRoute);

app.listen(app.get('port'), function(){
  console.log(("Express server listening on port " + app.get('port')))
});