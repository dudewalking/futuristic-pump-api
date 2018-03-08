const startProcess = require("./pumpHandler");

const setWssServer = wss => {
  wss.on("connection", ws => {
    let fillTimerId;
    let drainTimerId;
    let dataObj = {};

    ws.on("message", message => {
      dataObj = JSON.parse(message);

      switch (dataObj.type) {
        case "start": {
          fillTimerId = startProcess(
            ws,
            fillTimerId,
            dataObj.height,
            dataObj.type
          );
          break;
        }
        case "stop": {
          clearInterval(fillTimerId);
          clearInterval(drainTimerId);
          break;
        }
        case "drain": {
          drainTimerId = startProcess(
            ws,
            drainTimerId,
            dataObj.height,
            dataObj.type
          );
          break;
        }
        default: {
          clearInterval(drainTimerId);
          clearInterval(fillTimerId);
        }
      }
    });

    ws.on("error", err => {
      console.error("Socket error found: " + err);
    });

    ws.on("close", () => {
      clearInterval(fillTimerId);
      clearInterval(drainTimerId);
      console.error("Socket connection closed.");
    });
  });

  wss.on("close", data => {
    console.log("Server connection was closed: " + data);
  });

  wss.on("error", err => {
    console.error("Server error occurred: " + err);
  });
};

module.exports = setWssServer;
