// kafkaConsumer.js
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

const consumer = kafka.consumer({ groupId: process.env.KAFKA_GROUP_ID });


async function startConsumer() {
  await consumer.connect();
  console.log('Connected to Kafka consumer');
  
  await consumer.subscribe({ topic: KAFKA_TOPIC, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        // Parse and log message value
        const userData = JSON.parse(message.value.toString());
        console.log('Consumed message:', userData);

        // Insert the user data into MongoDB
        const user = new User(userData);
        await user.save();
        console.log('User data saved to MongoDB');
      } catch (error) {
        console.error('Error processing message:', error);
      }
    }
  });
}

// Initialize connections
(async () => {
  await connectDB();
  await startConsumer();
})();
