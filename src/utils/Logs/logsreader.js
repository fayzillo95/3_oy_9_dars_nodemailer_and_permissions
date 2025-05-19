import fs from "fs";
import path from "path";
import express from "express";

const fullpath = path.join(process.cwd(),"src","utils","Logs","logger.txt")

export default function getlog(app) {
    app.use("/logs",express.static(fullpath))
}