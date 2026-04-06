
const express=require('express'); //npm has just downloaded express, my file has no idea abt it so by this we say: go find the express package in node_modules and bring it into this file
const app=express();/// now an instance of express has been created it carries all the rules and logic avaliable in express. it has become a server object that handles request.
app.use(express.static('public'));// saying if someone requests a file search for it in public folder

const {nanoid}= require('nanoid');
const Url=require('./url'); //file name including it here 

const mongoose=require('mongoose');//bringing mongoose file to this file so that we can use it 
mongoose.connect('mongodb://localhost:27017/urlshortener')
//telling the mongoose go find this database at this address and connect to it 
.then(()=>console.log('Connected to mongoDB'))//when the connection is done do this
.catch((err)=>console.log('Error connecting to mongoDB:',err));// if smthg goes wrong do this, catch the error

app.use(express.json());//when the post request arrives, it arrives in the format of json which cant be read by express so we use express.json which converts this into readable form.
// app.get('/',(req,res)=>{// app.get: when a GET request comes to this route , run this function.'/': refers to the homepage. (req,res)=>{} an arrow function which runs when request arrives. it contains 2 objects: req-> representing everythign that the client sent. res->respresents what server sent back to the client.

//     res.send('hello! the url shortner is alive '); // send this response.
// })

app.post('/shorten',async(req,res)=>{ 
    
    //async: js doesnt know how to pause for teh database so we use async 
    try{
            const longURL= req.body.url; //async: this function will have some waiting time.

            //VALIDATION
            if(!longURL) // !longURL catches empty or missing URL
            {
                return res.status(400).send('Please provide a url');//status(400) tells teh client "u sent bad data"
            }//return: stops the program right there nthg else runs

            if(!longURL.startsWith('http://') && !longURL.startsWith('https://'))
            {
                return res.status(400).send('Please provide a valid URL');
            }

            const existing=await Url.findOne({longUrl:longURL});
            if(existing)//for duplication avoiding
            {
                return res.send(`Url already shortened!, the code is :${existing.shortCode}`)
            }
            const shortCode= nanoid(6);

            const newUrl= new Url({ //through this we just filled the form ie schema
                shortCode: shortCode,
                longUrl:longURL
            });

            await newUrl.save() // pause here until it save's completely, through the .save() its being submitted and stored in MongoDB permanently
            res.send(`short code: ${shortCode}`) 
        // things inside ` backticks are template literals. they let u embed variables directly inside a string.
        //**So if `shortCode` is `"aB3kR9"`, the client receives:**
        //short code: aB3kR9
            
            console.log(shortCode);

        // res.send('URL received!')
}catch(err)
{
    console.log('Error:',err);
    res.status(500).send('something went wrong, try again'); //500:tells user smthg went wrong ont he server side

}
});


app.get('/:shortCode',async(req,res)=>{

    try{

    const shortCode= req.params.shortCode;
    const found= await Url.findOne({shortCode: shortCode});

    if(!found)
    {
        return res.status(404).send('URL not found');
    }

    found.clicks=found.clicks+1;
    await found.save();
    console.log(`the click for this is: ${found.clicks}`)

    res.redirect(found.longUrl);
}catch(err)
{
    console.log('Error:',err);
    res.status(500).send('Something went wrong, try again');
}
});
app.listen(3000,()=>{ // tells the server to start and start listening on port number 3000
    console.log('Server is running on port 3000');//function runs after server successfully starts.

})