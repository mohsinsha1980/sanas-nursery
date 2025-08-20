// To get backup
// mongodump --db=jsm-test --archive=./db.gzip --gzip

// To restore from backup
// mongorestore --gzip --archive="./NCC-20-08-2024-0-0-0.gzip"

require("dotenv").config({ path: __dirname + "/.." + "/.env" });
import { spawn } from "node:child_process";
import { join } from "path";
import { schedule } from "node-cron";
import config from "../config/env-config";

const getArchivePath = () => {
  return join(
    __dirname,
    `NCC-${new Date().toLocaleDateString(
      "es-CL"
    )}-${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}.gzip`
  );
};

// cron.schedule("*/5 * * * * *", () => backupMongoDB()); // every 5 secs
// cron.schedule("*/5 * * * *", () => backupMongoDB()); // every 5 mins
schedule("0 0 0 * * *", () => backupMongoDB()); // every night

// backupMongoDB();

function backupMongoDB() {
  try {
    const child = spawn("mongodump", [
      `--uri=${config.DB}`,
      `--archive=${getArchivePath()}`,
      "--gzip",
    ]);

    child.stdout.on("data", (data) => {
      console.log("stdout:\n", Buffer.from(data).toString());
    });

    child.stderr.on("data", (data) => {
      console.log("stderr data:\n", data.toString());
    });

    child.on("error", (error) => {
      console.log("error:\n", error);
    });

    child.on("exit", (code, signal) => {
      if (code) console.log("Process exit with code: ", code);
      else if (signal) console.log("Process killed with signal: ", signal);
      else console.log("Backup is successful!");
    });
  } catch (e) {
    console.log("error: ", e);
  }
}
