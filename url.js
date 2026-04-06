const mongoose=require('mongoose')

const urlSchema= new mongoose.Schema({ //creating a schema for my url: a way of describign how every url entry in the db must look like 
    shortCode: String,
    longUrl: String,
    clicks:{
        type:Number,
        default:0
    }
});

const Url=mongoose.model('url',urlSchema);//creates the model , the tool we will actually use to read and store data in db
//create a model using the urlSchema defined, register it in mongoDB as 'url' and store it in a variable called Url so i can use it in my code.
module.exports=Url//make the Url model available so that other files can import and use it .
