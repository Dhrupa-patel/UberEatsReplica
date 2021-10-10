const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const mysql = require("mysql");
const router = express.Router();

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
    console.log("connected");
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
 router.post( '/profile-img-upload/:id/:type', ( req, res ) => {
     console.log(req.body, req.params);
    profileImgUpload( req, res, ( error ) => {
    console.log( 'requestfile', req.file);
    // console.log( 'error', error );
        if( error ){
            console.log( 'errors', error );
            res.json( { error: error } );
        } else {
            // If File not found
            if( req.file === undefined ){
                console.log( 'Error: No File Selected!' );
                res.json( 'Error: No File Selected' );

            } else {
            // If Success
                console.log("here");
                const imageName = req.file.key;
                const imageLocation = req.file.location;// Save the file name into database into profile model
                res.json( {
                image: imageName,
                location: imageLocation
                });
                let sql = null;
                if(req.params.type==="customer"){
                    sql =
                    "UPDATE Customers SET Cust_ProfileName =?, Cust_ProfileImageLocation=? WHERE Cust_ID =?";
                }
                else if(req.params.type==="owner"){
                    sql =
                    "UPDATE Restaurants SET Res_ProfileName =?, Res_ProfileImageLocation=? WHERE Res_ID =?";
                }
                else if(req.params.type==="menu"){
                    sql = 
                    "UPDATE Dishes SET Dish_ProfileName =? ,Dish_ProfileImageLocation=? WHERE Dish_ID=?";
                }
                if (sql){
                    var values = [imageName, imageLocation, Number(req.params.id)];
                    con.query(sql, values, function (error, results) {
                        if (error) {            
                            console.log(error)              
                            res.writeHead(200, {              
                                "Content-Type": "text/plain",            
                            });            
                            res.end(error.code);          
                        } else {
                            console.log(results);
                            res.end(JSON.stringify(results));
                        }
                    });
                }
            }
        }
    });
});

module.exports = router;