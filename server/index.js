const app = require("express")();
const http = require("http").createServer(app);
const socketio = require("socket.io")(http);

app.get("/", (req, res) => {
  res.send("Node Server is running. Yay!!");
});

socketio.on("connection", (socket) => {
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  });
});

const PORT = process.env.PORT || 4000;
http.listen(PORT, () => console.log(`App Running on port ${PORT}`));
