import { Queue, Worker } from "bullmq";
import { createClient } from "redis";

export const connection = createClient({
  url: process.env.REDIS_URL,
});

export const messageQueue = new Queue("messageQueue", { connection });

const processMessage = async (job) => {
  console.log("Processing message:", job.data.message);
};

const messageWorker = new Worker("messageQueue", processMessage, {
  connection: client,
});

messageWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completado com sucesso`);
});

messageWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} falhou com erro:`, err);
});
