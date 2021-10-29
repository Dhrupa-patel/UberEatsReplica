var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var addItem = require('./services/addItem.js');
var deleteItem = require('./services/deleteItem');
var editItem = require('./services/editItem.js');
var updateStatus = require('./services/updateStatus.js');
var placeOrder = require('./services/placeOrder.js');
var addItemCart = require('./services/addItemCart.js');
var deleteItemCart = require('./services/deleteItemCart');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("add_item", addItem)
handleTopicRequest("edit_item", editItem)
handleTopicRequest("delete_item", deleteItem)
handleTopicRequest("update_status", updateStatus)
handleTopicRequest("place_order", placeOrder)
handleTopicRequest("delete_item_cart", deleteItemCart)
handleTopicRequest("add_item_cart", addItemCart)