# 🍔 UberEats Replica

A full-stack food ordering platform replicating core UberEats functionality — built across three iterations, each introducing a more sophisticated tech stack. Supports 500+ concurrent users with real-time order management, role-based dashboards, and cloud-ready deployment.

**Demo:** [Lab 1 walkthrough](https://www.youtube.com/watch?v=qeqy9enUh-M) · [Lab 2 walkthrough](https://www.youtube.com/watch?v=PdfFzSnz8Zo)

---

## Branch Overview

This repo is structured as three progressive labs, each building on the previous:

| Branch | Stack | Key Addition |
|--------|-------|--------------|
| `lab1` | React, Node.js, Express, MySQL | Core platform with relational DB |
| `lab2` | React, Node.js, Express, MongoDB, Kafka | NoSQL + async messaging |
| `master` | React, GraphQL, Kafka, MongoDB, Redis | GraphQL API + caching layer |

---

## Features

### Customer
- Browse restaurants and menus with search and filtering
- Add items to cart, place and track orders in real time
- View order history and manage profile
- Mark restaurants and dishes as favorites

### Restaurant Owner
- Manage restaurant profile, menu items (add / edit / delete)
- View and update incoming order statuses
- Dashboard for active orders

### Admin
- Platform-wide oversight of users, restaurants, and orders

---

## Tech Stack

### `master` branch (most complete)

| Layer | Technology |
|-------|-----------|
| Frontend | React, Redux, Material UI |
| API | GraphQL (Apollo Server) |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Messaging | Apache Kafka |
| Caching | Redis |
| Auth | Passport.js + JWT |
| Testing | JMeter (load), JUnit |
| Deployment | AWS EC2 + S3, Auto Scaling, Load Balancer |

### `lab2` branch

| Layer | Technology |
|-------|-----------|
| Frontend | React, Redux |
| API | REST (Axios) |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Messaging | Apache Kafka |
| Auth | Passport.js + JWT |

### `lab1` branch

| Layer | Technology |
|-------|-----------|
| Frontend | React, Redux |
| API | REST (Axios) |
| Backend | Node.js, Express.js |
| Database | MySQL (Amazon RDS) |
| Auth | Passport.js + JWT |

---

## Architecture (`master`)

```
┌─────────────────────────────────────────────────────┐
│                    React Client                      │
│              (Redux · Apollo Client)                 │
└──────────────────────┬──────────────────────────────┘
                       │ GraphQL
┌──────────────────────▼──────────────────────────────┐
│              Node.js / Express Server                │
│         (Apollo Server · Passport JWT)               │
└──────┬──────────────────────────┬───────────────────┘
       │                          │
┌──────▼──────┐          ┌────────▼────────┐
│   MongoDB   │          │   Kafka Broker  │
│  (primary)  │          │  (async events) │
└─────────────┘          └────────┬────────┘
                                  │
                         ┌────────▼────────┐
                         │  kafka-backend  │
                         │  (consumer svc) │
                         └─────────────────┘
       │
┌──────▼──────┐
│    Redis    │
│  (caching)  │
└─────────────┘
```

**Kafka topics:** `add_item` · `edit_item` · `delete_item` · `update_status` · `place_order` · `add_item_cart` · `delete_item_cart` · `update_profile`

---

## Project Structure

```
UberEatsReplica/
├── ubereats-client/      # React frontend (Redux, Apollo/Axios)
├── ubereats-server/      # Node.js backend (GraphQL or REST APIs)
├── kafka-backend/        # Kafka consumer service
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js v16+
- MongoDB (local or Atlas)
- Apache Kafka + Zookeeper
- Redis (master branch only)

### 1 · Clone the repo and checkout your branch

```bash
git clone https://github.com/Dhrupa-patel/UberEatsReplica.git
cd UberEatsReplica

# For the full GraphQL + Kafka version:
git checkout master

# For REST + Kafka + MongoDB:
git checkout lab2

# For REST + MySQL baseline:
git checkout lab1
```

### 2 · Install dependencies

```bash
# Install for all three services
cd ubereats-client  && npm install && cd ..
cd ubereats-server  && npm install && cd ..
cd kafka-backend    && npm install && cd ..
```

### 3 · Configure environment variables

Create a `.env` file in `ubereats-server/`:

```env
PORT=3002
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AWS_S3_BUCKET=your_bucket_name       # for image uploads
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
```

For `lab1`, also add:
```env
MYSQL_HOST=your_rds_host
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
MYSQL_DB=ubereats
```

### 4 · Start Kafka and Zookeeper

```bash
# Start Zookeeper
bin/zookeeper-server-start.sh config/zookeeper.properties

# Start Kafka broker
bin/kafka-server-start.sh config/server.properties

# Create required topics
bin/kafka-topics.sh --create --topic add_item --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic edit_item --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic delete_item --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic update_status --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic place_order --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic add_item_cart --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic delete_item_cart --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic update_profile --bootstrap-server localhost:9092
```

> Need help installing Kafka? See [this guide](https://medium.com/@sabinbogati1/how-to-install-apache-kafka-in-ubuntu-or-any-linux-o-s-c9ba7905d5c7).

### 5 · Run the application

Open three terminal windows:

```bash
# Terminal 1 — React frontend (port 3000)
cd ubereats-client
npm start

# Terminal 2 — Kafka consumer service
cd kafka-backend
node server.js

# Terminal 3 — Main backend API (port 3002)
cd ubereats-server
node index.js
```

Visit **http://localhost:3000** to open the app.

---

## Performance

| Metric | Result |
|--------|--------|
| Concurrent users supported | 500+ |
| Load testing tool | JMeter |
| Uptime (AWS deployment) | 99.9% |
| AWS setup | EC2 + Auto Scaling + Elastic Load Balancer |

---

## Author

**Dhrupa Patel** — [LinkedIn](https://linkedin.com/in/dhrupa-patel-0312) · [GitHub](https://github.com/Dhrupa-patel)

M.S. Software Engineering, San Jose State University
