/**
 * Created by perjo927 on 2013-10-06.
 */
/*
Skapa defaultmapp för databasen
$ sudo -p mkdir /data/db
$ sudo chmod 0755 /data/db  alt. $ sudo chown $USER /data/db

(Kör ev. igång processen mongod för att kunna få access till databasen)
Starta tjänsten (innan $ node main.js):
$mongod

Ont om utrymme? =>
$mongod --smallfiles

För att använda databasen i shell-läge
$ mongo
> use progclub
> db.users.insert({key:value}); // skapa
> db.users.remove(); // nollställ
> db.users.drop() // tar bort helt och hållet

Öppna http://localhost:28017/ ( = portnr + 1000) i webbläsaren för mer info
*/

var mongoose = require('mongoose');

// importera Schema så att vi kan definiera hur våra collections ska se ut
// Schema-instans = collection
// lägg detta någon annanstans?
var Schema = mongoose.Schema;

// Definiera hur en användare ska auktoriseras
var userSchema = new Schema({
    name: String,
    user: String,
    pass: String
});

// Definiera hur en användare ska auktoriseras
var userBio = new Schema({
    username: String,
    firstname: String,
    surname: String,
    city: String,
    age: String,
    occupation: String,
    company: String,
    education: String,
    about : String,
    knowledge : Array,
    cv: Array
});

// Konvertera/kompilera till en Model (document som ska sättas in i collection)
// Model-instans = document
var User = mongoose.model('User', userSchema);
var UserBio = mongoose.model('UserBio', userBio);

exports.auth = function(username, password, callback){
    User.find({user: username, pass: password}, function(err, docs){
        if (err) console.dir("mongo.js .auth() err: " + err);

        console.dir("mongo.js .auth() => user: " + username + " pass: " + password);
        console.dir("mongo.js .auth() found: " + docs);

        if (docs.length === 0){
            console.log("mongo.js .auth(): docs are empty, no authorization");
            callback(false);
        }
        else{
            console.log("mongo.js .auth():  authorize");
            callback(true);
        }
    });
};

exports.find = function(fullname, username, callback){
    User.find({name: fullname, user: username}, function(err, docs){
        if (err) console.dir("mongo.js .find() err: " + err);
        console.dir("mongo.js .find() => fullname: " + fullname + " user: " + username);
        console.dir("mongo.js .find() resulted in: " + docs);

        if (docs.length === 0){
            console.log("mongo.js .find(): docs are empty, no user occupies that name");
            callback(false);
        }
        else{
            console.log("mongo.js .find(): username is occupied! ");
            callback(true);
        }
    });
};

exports.save = function(fullname, username, password){
    // Skapa en användare att sätta in i vår collection
    var user = new User({name: fullname, user: username, pass: password });

    //parsa fullname, lägg in i bio
    var userbio = new UserBio({username: username, firstname: "Förnamn", surname: "Efternamn", city: "Din stad", age: "Ålder",
        occupation: "Yrke", company:"Företag", education:"Utbildning", about: "Om dig", knowledge:"Kunskaper", cv:"CV" });

    // Each document can be saved to the database by calling its save method.
    // The first argument to the callback will be an error if any occured.
    user.save(function (err, doc) {
        if (err) console.dir("mongo.js .save(user) err: " + err);

        console.dir("mongo.js .save(user) => fullname: " + fullname + " user: " + username + " password: " + password);
        console.dir("mongo.js .save(user) => saved in db: " + doc);
    });

    userbio.save(function (err, doc) {
        if (err) console.dir("mongo.js .save() err: " + err);

        console.dir("mongo.js .save(bio) => fullname: " + fullname + " user: " + username + " password: " + password);
        console.dir("mongo.js .save(bio) => saved in db: " + doc);
    });
};


exports.edit = function(username, key, value, callback) {

    console.log("mongo.js: edit() #1");

    var query = {username: username};
    var update = {"#{key}": value};

    console.log("mongo.js: edit() #1.5");

    /*var userbio = UserBio({username: username, firstname: "Förnamn", surname: "Efternamn", city: "Din stad", age: "Ålder",
        occupation: "Yrke", company:"Företag", education:"Utbildning", about: "Om dig", knowledge:"Kunskaper", cv:"CV" });*/

    UserBio.findOneAndUpdate(query, update, function(doc){
        //if (err) console.log(err);
        console.log("mongo.js, edit(): findOneAndUpdate: " + doc);

    });

    console.log("mongo.js: edit() #2");

    callback("TJena ");

    console.log("mongo.js: edit() #3");

}