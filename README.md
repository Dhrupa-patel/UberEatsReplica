# UberEatsReplica

Steps to run the code:

1) Using git clone command download the code from this repository.
2) Install Kafka
  - To install kafka follow this medium post(https://medium.com/@sabinbogati1/how-to-install-apache-kafka-in-ubuntu-or-any-linux-o-s-c9ba7905d5c7)
  - run zookeeper, kafka-server and create required topics (add_item, edit_item, delete_item, update_status, place_order, delete_item_cart, add_item_cart, update_profile) to run the above code.
3) perform npm install for ubereats-server, ubereats-client and kafka-backend directories. This command will install all the dependent libraries required to execute above code.
4) go to ubereats-client directory and execute npm start. This command will start client server on 3000 port.
5) open other console/screen andgo to kafka-backend and execute node server.js command to start backend code of kafka.
6) open other console/screen and go to ubereats-server directory and execute node index.js command. This command will call index.js where APIs are been defined and will start server end script on 3002 port.
7) After running both frontend and backend code. Visit localhost:3000 address to open the web application.
