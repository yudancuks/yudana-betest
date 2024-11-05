// kafkaProducer.js
const { Kafka } = require('kafkajs');
const connectDB = require('./config/db.js');
const User = require('./models/user.js');
require('dotenv').config();

// Kafka and MongoDB configurations
const KAFKA_BROKER = process.env.KAFKA_BROKER; 
const KAFKA_TOPIC = process.env.KAFKA_TOPIC;

// Kafka client setup
const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID,
  brokers: [KAFKA_BROKER]
});

const producer = kafka.producer();

async function produceUserData() {
    // Fetch all users from MongoDB
    const users = await User.find({});
    console.log(`Fetched ${users.length} users from MongoDB`);
  
    // Produce each user to Kafka
    for (const user of users) {
      try {
        await producer.send({
          topic: KAFKA_TOPIC,
          messages: [
            {
              key: user.accountNumber, // : Use a unique key
              value: JSON.stringify(user) // Convert the user document to a JSON string
            }
          ]
        });
        console.log(`Produced user data to Kafka: ${user.accountNumber}`);
      } catch (error) {
        console.error('Error producing message to Kafka:', error);
      }
    }
  }
  
  async function startProducer() {
    await producer.connect();
    console.log('Connected to Kafka producer');
  
    // Produce user data from MongoDB
    await produceUserData();
  
    // Disconnect producer after done
    await producer.disconnect();
  }
  
  // Initialize connections
  (async () => {
    await connectDB();
    await startProducer();
  })();
