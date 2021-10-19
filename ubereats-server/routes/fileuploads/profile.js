const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const mysql = require("mysql");
const router = express.Router();
const mongoose = require("mongoose");
const Customer = require("../../model/Customer");
const Owner = require("../../model/Owner");
const { update } = require('../../model/Customer');

const uri = "mongodb+srv://ubereats:ubereats@cluster0.h92ks.mongodb.net/ubereats?retryWrites=true&w=majority";
  
mongoose.connect(uri);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function(){
    console.log("connected successfully");
})

const con = mysql.createConnection({
    host:"ubereats.c15mrha1l62l.us-west-1.rds.amazonaws.com",
    user:"admin",
    password:"Siddhi*5501",
    ssl: true,
    port: 3306,
    database:"UberEats",
  })
  
con.connect(function(err){
    if (err) throw err;
})

const s3 = new aws.S3({
    accessKeyId: 'AKIASRTSBCEJVE6F26UK',
    secretAccessKey: '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',
    Bucket: 'myubereatsbucket',
    region: 'us-west-1'
   });

/**
 * Single Upload
 */
 const profileImgUpload = multer({
    storage: multerS3({
     s3: s3,
     bucket: 'myubereatsbucket',
     acl: 'public-read',
     key: function (req, file, cb) {
      cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
    console.log(path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ));
    }
    }
    ),
    limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function( req, file, cb ){
     checkFileType( file, cb );
    }
   }).single('profileImage');


/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
 function checkFileType( file, cb ){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    // Check mime
    const mimetype = filetypes.test( file.mimetype );
    if( mimetype && extname ){
        return cb( null, true );
    } else {
        cb( 'Error: Images Only!' );
    }
   }

/**
 * @route POST api/profile/business-img-upload
 * @desc Upload post image
 * @access public
 */
 router.post( '/profile-img-upload/:id/:type', async( req, res ) => {
    //  console.log(req.body, req.params);
    await profileImgUpload( req, res, async ( error ) => {
    // console.log( 'requestfile', req.file);
    // console.log( 'error', error );
        if( error ){
            // console.log( 'errors', error );
            res.json( { error: error } );
        } else {
            // If File not found
            if( req.file === undefined ){
                // console.log( 'Error: No File Selected!' );
                res.json( 'Error: No File Selected' );

            } else {
            // If Success
                const imageName = req.file.key;
                const imageLocation = req.file.location;// Save the file name into database into profile model
                res.json( {
                image: imageName,
                location: imageLocation
                });
                let result = null;
                console.log("calles here",req.params.type);
                let values = imageLocation;
                if(req.params.type==="customer"){
                    result = await Customer.findOneAndUpdate({_id:req.params.id},{$set:{image:values}},{new:true});
                }
                else if(req.params.type==="owner"){
                    var ans = await Owner.findOne({_id:req.params.id});
                    values = ans.images.concat(values);
                    result = await Owner.findOneAndUpdate({_id:req.params.id},{$set:{images:values}},{new:true});
                }
                else if(req.params.type==="menu"){
                    console.log(req.params.id);
                    var ids = req.params.id.split("+");
                    async function update(){
                        var row = await Owner.findOne({_id:ids[1]});
                        for(var idx=0; idx<row.dishes.length; idx++){
                            if(row.dishes[idx].id===Number(ids[0])){
                                row.dishes[idx].image = values;
                                break;
                            }
                        }
                            // item = row.dishes.filter(val => val.id===(Number(ids[0])));
                            // item[0]["image"] = values;
                        console.log(row.dishes);
                        var ans = await Owner.findOneAndUpdate({_id:ids[1]},{$set:{"dishes":row.dishes}},{new:true});
                        return ans
                    }
                    result = await update();
                    console.log("called here", result);
                }
                if (result){
                    console.log(result);
                    res.end(JSON.stringify(result));
                }
                else if(result!=null){
                    res.writeHead(200, {              
                        "Content-Type": "text/plain",            
                    });            
                    res.end(error.code);
                }
            }
        }
    });
});

module.exports = router;