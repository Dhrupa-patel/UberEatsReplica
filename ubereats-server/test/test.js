var assert = require("chai").assert
var app = require("../index");

var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);

describe("UberEats", function(){
    describe("Login Test", function(){

        it("Incorrect Password",() => {
            agent.post("/login/customer")
            .send({email:"user1@gmail.com", password:"user"})
            .then(function(res){
                expect(res.text).to.equal("INCORRECT PASSWORD");
            })
            .catch(error =>{
                console.log(error);
            })
        });

        it("No Such User", ()=>{
            agent.post("/login/owner")
            .send({email:"spartaneats@sjsu.edu", password:"spartaneats"})
            .then(function(res){
                expect(res.text).to.equal("NO_USER");
            })
            .catch(error =>{
                console.log(error);
            })
        });
    });

    describe("Owner Signup test", ()=>{
        
        it("Successful owner signup", ()=>{
            agent.post("/signup/owner")
            .send({name:"Taco Bell", state:"California", city:"San Jose", phonenumber:"4137629872", password:"taco", country:"United States", description:"Delicious Pizzas", email:"dominos@gmail.com", delivery:["Delivery"], menucategory:"Veg"})
            .then(function (res){
                expect(res.text).to.equal("USER_ADDED");
            })
            .catch(error =>{
                console.log(error);
            })
        });

        it("Successful user signup", ()=>{
            agent.post("/signup/customer")
            .send({email:"dhrupapatel@gmail.com", password:"dhrupa", dob:"12/03/1997", city:"San Jose", state:"California", country:"United States", firstName:"Dhrupa", lastName: "Patel", address:"Avalon on the Alameda", nickname:"Dhrupa"})
            .then(function(res){
                expect(res.text).to.equal("USER_ADDED");
            })
            .catch(error =>{
                console.log(error);
            })
        })
    });

    describe("Orders test", ()=>{

        it("Should update the status of Order", ()=>{
            agent.post("/orders/updateStatus")
            .set({"Authorization": "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJDdXN0MSIsIm5hbWUiOiJEaHJ1cGEgUGF0ZWwiLCJlbWFpbCI6IkRocnVwYUBnbWFpbC5jb20iLCJsb2NhdGlvbiI6IlNhbiBKb3NlIiwidHlwZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM2ODQ5OTYwLCJleHAiOjE2Mzc4NDk5NjB9.DJr-EORNfnMBNwtwmvIj4sxQ4FOmlFKlmQ0BveYKKn8"})
            .end({Order_Status: "Delivered", Order_ID:5}, function(res){
                console.log(res.text);
                expect(res.text).to.equal("Success");
            })
        });

        it("Fetch Orders placed for particular restaurant based on it's ID", function(){
            agent.get("/orders/ResOrders/10")
            .set({"Authorization": "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJDdXN0MSIsIm5hbWUiOiJEaHJ1cGEgUGF0ZWwiLCJlbWFpbCI6IkRocnVwYUBnbWFpbC5jb20iLCJsb2NhdGlvbiI6IlNhbiBKb3NlIiwidHlwZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM2ODQ5OTYwLCJleHAiOjE2Mzc4NDk5NjB9.DJr-EORNfnMBNwtwmvIj4sxQ4FOmlFKlmQ0BveYKKn8"})
            .end(function (res){
                expect(JSON.parse(res.text).Cust_Name).to.equal("user 2")
            })
        });

    });

    describe("Menu test", ()=>{

        it("Should delete dish from menu using Dish ID and restaurant ID", function(){
            agent.post("/menu/delete")
            .set({"Authorization": "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJDdXN0MSIsIm5hbWUiOiJEaHJ1cGEgUGF0ZWwiLCJlbWFpbCI6IkRocnVwYUBnbWFpbC5jb20iLCJsb2NhdGlvbiI6IlNhbiBKb3NlIiwidHlwZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM2ODQ5OTYwLCJleHAiOjE2Mzc4NDk5NjB9.DJr-EORNfnMBNwtwmvIj4sxQ4FOmlFKlmQ0BveYKKn8"})
            .end({dishid: 2, Res_ID:"Res1"}, function(res){
                expect(res.text).to.equal("success");
            })
        });

        it("Search Restaurants based on Regex matching of Dish name offered by restaurants", function(){
            agent.get("/menu/getRestaurantIDs/Veggie/San Clara/Veg")
            .set({"Authorization": "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJDdXN0MSIsIm5hbWUiOiJEaHJ1cGEgUGF0ZWwiLCJlbWFpbCI6IkRocnVwYUBnbWFpbC5jb20iLCJsb2NhdGlvbiI6IlNhbiBKb3NlIiwidHlwZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM2ODQ5OTYwLCJleHAiOjE2Mzc4NDk5NjB9.DJr-EORNfnMBNwtwmvIj4sxQ4FOmlFKlmQ0BveYKKn8"})
            .then(function (res){
                console.log("res",res.text);
                expect(JSON.parse(res.text).Res_ID).to.equal("Res6")
            })
            .catch(error =>{
                console.log(error);
            })
        });
    });

    describe("Profile Test", ()=>{

        it("Fetch Customer Profile using ID", function(){
            agent.get("/profile/customerprofile/Cust2")
            .set({"Authorization": "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJDdXN0MSIsIm5hbWUiOiJEaHJ1cGEgUGF0ZWwiLCJlbWFpbCI6IkRocnVwYUBnbWFpbC5jb20iLCJsb2NhdGlvbiI6IlNhbiBKb3NlIiwidHlwZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM2ODQ5OTYwLCJleHAiOjE2Mzc4NDk5NjB9.DJr-EORNfnMBNwtwmvIj4sxQ4FOmlFKlmQ0BveYKKn8"})
            .then(function (res){
                expect(JSON.parse(res.text)["profile"]["Name"]).to.equal("User 1")
            })
            .catch(error =>{
                console.log(error);
            })
        })

        it("Fetch Owner Profile using ID", function(){
            agent.get("/profile/restaurantprofile/Res1")
            .set({"Authorization": "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJDdXN0MSIsIm5hbWUiOiJEaHJ1cGEgUGF0ZWwiLCJlbWFpbCI6IkRocnVwYUBnbWFpbC5jb20iLCJsb2NhdGlvbiI6IlNhbiBKb3NlIiwidHlwZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM2ODQ5OTYwLCJleHAiOjE2Mzc4NDk5NjB9.DJr-EORNfnMBNwtwmvIj4sxQ4FOmlFKlmQ0BveYKKn8"})
            .then(function (res){
                expect(JSON.parse(res.text)["profile"]["Name"]).to.equal("Domino's")
            })
            .catch(error =>{
                console.log(error);
            })
        })
    })

})