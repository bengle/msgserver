var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var pushinfo = null;
var info = null;

exports.initdb = function(){
    if(process.env.VCAP_SERVICES){
        var env = JSON.parse(process.env.VCAP_SERVICES);
        var mongo = env['mongodb-1.8'][0]['credentials'];
    }
    else{
        var mongo = {
            "hostname":"localhost",
            "port":27017,
            "username":"",
            "password":"",
            "name":"",
            "db":"user"
        }
    }
    var generate_mongo_url = function(obj){
        obj.hostname = (obj.hostname || 'localhost');
        obj.port = (obj.port || 27017);
        obj.db = (obj.db || 'test');
        if(obj.username && obj.password){
            return "mongodb://" + obj.username + ":" + obj.password + "@" + obj.hostname + ":" + obj.port + "/" + obj.db;
        }
        else{
            return "mongodb://" + obj.hostname + ":" + obj.port + "/" + obj.db;
        }
    }
    var mongourl = generate_mongo_url(mongo);
    mongoose.connect(mongourl);

    pushinfo = new Schema({
        username: String,
        password: String,
        collect_items: String,
        collect_shops: String
    });
    
    info = mongoose.model('pushinfo',pushinfo);
}

exports.findItems = function(name){
    info.find({username:name},function(err,rst){
        if(err){
            console.log(err);
        }else {
            return rst;
        }
    });
}
