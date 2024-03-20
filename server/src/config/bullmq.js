import { Queue, Worker } from "bullmq";
import { client } from "./redis.js";
import IORedis from "ioredis";

const ioRedisClient = new IORedis(client.options.url, {
  maxRetriesPerRequest: null,
});

export const messageQueue = new Queue("messageQueue", {
  connection: ioRedisClient,
});

const processMessage = async (job) => {
  console.log("Processing message:", job.data.message);
};

const messageWorker = new Worker("messageQueue", processMessage, {
  connection: ioRedisClient,
});

messageWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed.`);
});

messageWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed.`, err);
});
