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
            .send({email:"user@gmail.com", password:"user1"})
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
            .send({name:"Dominos", state:"California", city:"San Jose", phonenumber:"4137629872", password:"dominos", country:"United States", description:"Delicious Pizzas", email:"dominos@gmail.com", delivery:"Delivery", menucategory:"Veg"})
            .then(function (res){
                expect(res.text).to.equal("USER_ADDED");
            })
            .catch(error =>{
                console.log(error);
            })
        });

        it("Successful user signup", ()=>{
            agent.post("/signup/customer")
            .send({email:"dhrupapatel@gmail.com", password:"dhrupa", dob:"12/03/1997", city:"San Jose", state:"California", country:"United States", name:"Dhrupa Patel", address:"Avalon on the Alameda", nickname:"Dhrupa"})
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
            .send({Order_Status: "On the Way", Order_ID:5})
            .then(function(res){
                expect(res.text).to.equal("Success");
            })
            .catch(error =>{
                console.log(error);
            })
        });

        it("Fetch Orders placed for particular restaurant based on it's ID", function(){
            agent.get("/orders/ResOrders/10")
            .then(function (res){
                expect(JSON.parse(res.text)[0].Cust_Name).to.equal("a")
            })
            .catch(error =>{
                console.log(error);
            })
        });

    });

    describe("Menu test", ()=>{

        it("Should delete dish from menu using Dish ID", function(){
            agent.post("/menu/delete")
            .send({dish_id: 2})
            .then(function (res){
                expect(res.text).to.equal("success");
            })
            .catch(error =>{
                console.log(error);
            })
        });

        it("Search Restaurants based on Regex matching of Dish name offered by restaurants", function(){
            agent.get("/menu/getRestaurantIDs/Pasta")
            .then(function (res){
                expect(JSON.parse(res.text)[0].Res_ID).to.equal(8)
            })
            .catch(error =>{
                console.log(error);
            })
        });
    });

    describe("Profile Test", ()=>{

        it("Fetch Customer Profile using ID", function(){
            agent.get("/profile/customerprofile/15")
            .then(function (res){
                expect(JSON.parse(res.text)["profile"]["Name"]).to.equal("Lucy Brian")
            })
            .catch(error =>{
                console.log(error);
            })
        })

        it("Fetch Owner Profile using ID", function(){
            agent.get("/profile/restaurantprofile/10")
            .then(function (res){
                expect(JSON.parse(res.text)["profile"]["Name"]).to.equal("Brundavan")
            })
            .catch(error =>{
                console.log(error);
            })
        })
    })

})