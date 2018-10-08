require('dotenv').config()
import { app, BrowserWindow } from 'electron'
import * as path from 'path'


let mainWindow;

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });


  //if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:8080");
  // } else {
  //   mainWindow.loadURL("file:///" + path.join(__dirname, "./index.html"));
  // }


  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}


app.on("ready", createWindow);


app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});


app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});

