const express = require ("express");
const  mongoose  = require("mongoose");
const router = express.Router();
var bodyParser = require('body-parser')
const Charity = require ('../classes/charity');
const charity = require("../classes/charity");

var jsonParser = bodyParser.json()

// get main ninfo 
router.get('/',(req,res)=>{
    Charity.find({}, 'name rating location ')
    .exec()
    .then(docs => {
        console.log("[GET] Charity ");
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
    })
})


// get chairty by id

router.get('/:charityID', function(req,res,next){
    Charity.find({_id : req.params.charityID})
    .exec()
    .then((resu)=>{
        console.log("[GET] Charity by iD");
        res.status(200).json(resu);
    })
    .catch((err)=>console.log(err));
    
    })


    //get chairty by name 

    router.get('/name/:charityName', function(req,res,next){

        Charity.find({name : req.params.charityName})
        .exec()
        .then((resu)=>{
            console.log("[GET] Charity by name");
            res.status(200).json(resu);
        })
        .catch((err)=>console.log(err));
        
        })

        //handels login

    router.get('/auth/:username/:password',(req,res,next)=>{
        console.log("[GET] charity/auth");

     Charity.exists({username:req.params.username,password:req.params.password},(err,resu)=>{
         if(err){
             res.send(err)
         }else {
             res.send(resu);
         }
     });
    })
      
       





        // Change Rating
     router.post('/rating',jsonParser, async function(req,res,next){ 
         let newRating = 0;
        console.log('[POST] charity / rating')
       await Charity.find({name : req.body.name}).exec().then((res)=>{
            if ((req.body.rating == 1) &&(res[0].rating != 10)) {
                 newRating = res[0].rating + 0.1;
            }
            if ((req.body.rating == -1 ) && (res[0].rating != 0)) {
                 newRating = res[0].rating - 0.1 ;
            }
        })
        await Charity.update({name: req.body.name}, {rating : Math.round(newRating*10)/10 });
    })

    




router.post('/', function (req,res,next) {
    /*
    const charity = new Charity ({
    _id :  new mongoose.Types.ObjectId(),
    name : req.body.name,
    location :req.body.location,
    initiatives :req.body.initiatives,
     donations: req.body.donations ,
     rating :req.body.rating,
     contact : req.body.contact,
     represetative: req.body.representative ,
    })
    charity.save().then(result =>{
        console.log(result);
    }).catch(err =>{
        console.log(err);
    })
    res.status(200).json({
        "message :": "Post Request to /",
        "created : " : charity,
    })
*/
})

module.exports = router




/* For seeding 
  _id :  new mongoose.Types.ObjectId(),
    name: 'Rotaract alpha ',
    location :'Aouina ,Tunis',
    initiatives :[' Blood Donation  , Sensibilisation Cancer, formation violence'],
     donations: ['20','600','200','100','50','10'],
     rating :5,
     contact : ['alpha@gmail.com','00000000','fb: Rac alpha','instagarm: Rac alpha'],
     represetative: 'flen fouleni',



      "location" :"Ain Zaghouane ,Tunis",
    "initiatives" :["Arbres", "Hiver Au chaud","Assistance Aveugle"],
     "donations": ["20","600","200","100","50","10"],
     "rating" :5,
     "contact" : ["alpha@gmail.com","00000000","fb: Rac alpha","instagarm: Rac alpha"],
     "represetative": "flen fouleni"
     */