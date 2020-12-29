const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbopr = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';
MongoClient.connect(url,(err,client)=>{
    assert.equal(err,null);
    console.log('Connected correctly to Server');
    const db = client.db(dbname);
    

    dbopr.insertDocument(db,{name: "vadapav", description: "test"},'dishes',(result)=>{
        
        console.log('Insert Document:\n' ,result.ops);

        dbopr.findDocuments(db,'dishes',(docs)=>{
            
            console.log('Found Document:\n',docs);

            dbopr.updateDocument(db,{name: 'vadapav'},{description: 'updated test'},'dishes',(result)=>{
                
                console.log('Updated Document:\n',result.result);

                dbopr.findDocuments(db,'dishes',(docs)=>{
            
                    console.log('Found Document:\n',docs);
                    db.dropCollection("dishes",(result)=>{
                        console.log("Dropped Collection",result);
                        client.close();
                    })
                    
                });
            });
        })
    })
})