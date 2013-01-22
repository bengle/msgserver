var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var pushinfo = null;
var info = null;

exports.initdb = function(host,port,username,password,db){
    if(process.env.VCAP_SERVICES){
        var env = JSON.parse(process.env.VCAP_SERVICES);
        var mongo = env['mongodb-1.8'][0]['credentials'];
    }
    else{
        var mongo = {
            "hostname":host,
            "port":port,
            "username":username,
            "password":password,
            "name":"",
            "db":db
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
	console.log(mongourl);
    pushinfo = new Schema({
        username: {type:String,unique:true},
        password: String,
        collect_items: String,
        collect_shops: String
    });
    
    info = mongoose.model('pushinfo',pushinfo);
    mongoose.connect(mongourl);

    /*
    var newItem = new info({username:'xj032085',password:'123456',collect_items:'16098798732,20773380823',collect_shops:'34472414,71629806'});
    newItem.save(function(err){
        if(err){
            console.log(err);
        }else {
            console.log('save one!');
        }
    });
*/


}

exports.findItems = function(name, callback){
    info.find({username:name},function(err,rst){
        if(err){
            console.log(err);
        }
        else {
            //console.log(rst);
            callback(rst);
        }
    });
}
