Express.js CRUD API with MongoDB, Redis, Kafka, and Docker

This repository contains a Node.js application built with Express.js that performs CRUD operations using MongoDB. It also integrates Redis for caching and Kafka for message-based communication between services. The project is fully containerized using Docker and Docker Compose.
Table of Contents

    Getting Started
    Features
    Architecture Overview
    Project Structure
    Environment Variables
    Running the Project
    API Endpoints
    Technologies Used

Getting Started
Prerequisites

Make sure you have the following installed on your local development environment:

    Docker: Installation Guide
    Docker Compose: Installation Guide
    Node.js: Download Node.js

Installation

    Clone the repository:

    bash

git clone https://github.com/yudancuks/yudana-betest

Create a .env file in the root directory of your project based on the example below. Make sure to configure the required environment variables.

bash

cp .env.example .env

Build and run the containers:

bash

    docker-compose up --build

    The Express.js server will be running on http://localhost:3000.

Features

    CRUD Operations: Perform Create, Read, Update, and Delete operations on MongoDB.
    Redis Caching: Improve performance by caching frequently accessed data.
    Kafka Integration: Asynchronous message processing with Apache Kafka for handling events such as user creation.
    Dockerized: Easily deploy the entire stack with Docker and Docker Compose.

Architecture Overview

The application is structured to follow a microservice-like architecture, using Docker containers for each of the key components:

    Express.js: Serves as the backend API.
    MongoDB: A NoSQL database to store user and data records.
    Redis: A key-value store used as a caching layer.
    Kafka: A message broker for event-based communication between services.
    Zookeeper: Manages and coordinates Kafka brokers.

Project Structure



.
├── src
│   ├── config           # Configuration files
│   ├── controllers      # API request handlers
│   ├── models           # Mongoose models
│   ├── routes           # API routes
│   ├── kafkaConsumer.js # Kafka consumer setup
|   ├── KafkaProducer.js # Kafka producer setup
│   └── app.js           # Express app entry point
├── .env                 # Environment variables
├── docker-compose.yml   # Docker Compose configuration
├── Dockerfile           # Dockerfile for Express app
└── README.md            # Project documentation

Environment Variables

This project uses a .env file to manage configuration variables. Below is an example of the required environment variables:


# MongoDB
MONGO_URL=mongodb://mongodb:27017/mydb

# Redis
REDIS_URL=redis://redis:6379

# Kafka
KAFKA_BROKER=kafka:9092

# App settings
PORT=3000
NODE_ENV=development

Make sure you create the .env file before running the application.
Running the Project


API Endpoints

    Get Token : GET /api/auth/generate

    Create User: POST /api/users
        Request Body: { "userName": "John Doe", "emailAddress": "john@example.com", "accountNumber":"12345", "identityNumber":"67890" }

    Get All Users: GET /api/users

    Get User by Id Number: GET /api/users/account/id/:idNumber

    Get User by Account Number: GET /api/users/account/number/:accountNumber

    Update User: PUT /api/users/:id

    Delete User: DELETE /api/users/:id



Technologies Used

    Node.js with Express.js for building the REST API
    MongoDB as the NoSQL database
    Redis for caching
    Kafka for asynchronous message processing
    Docker and Docker Compose for containerization
    Zookeeper for managing Kafka brokers
