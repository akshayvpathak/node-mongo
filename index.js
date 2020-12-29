const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbopr = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';
MongoClient.connect(url)
    .then((client)=>{
        console.log('Connected correctly to Server');
        const db = client.db(dbname);
        dbopr.insertDocument(db,{name: "vadapav", description: "test"},'dishes')
        .then((result)=>{    
            console.log('Insert Document:\n' ,result.ops);
            return dbopr.findDocuments(db,'dishes')
            })
        .then((docs)=>{        
            console.log('Found Document:\n',docs);
            return dbopr.updateDocument(db,{name: 'vadapav'},{description: 'updated test'},'dishes')
            })
        .then((result)=>{            
            console.log('Updated Document:\n',result.result);
            return dbopr.findDocuments(db,'dishes')
            })
        .then((docs)=>{       
            console.log('Found Document:\n',docs);
            return db.dropCollection("dishes")
            })
        .then((result)=>{
            console.log("Dropped Collection",result);
            client.close();
            })
        .catch((err)=>console.log(err));
    })
    .catch((err)=>console.log(err));