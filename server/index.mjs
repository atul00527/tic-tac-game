import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

const clients = {}
let turn = "1"

let data = [
  "", "", "",
  "", "", "",
  "", "", "",
]

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];

const restartGame = () => {
  turn = "1"
  data = ["", "", "",
    "", "", "",
    "", "", ""
  ]
  io.emit("restart", "")
}
const checkWinner = () => {
  const lastTurn = turn
  let isDraw = true
  for (let pattern of winPatterns) {
    console.log(pattern)
    const v1 = data[pattern[0]]
    const v2 = data[pattern[1]]
    const v3 = data[pattern[2]]

    let lastWinner = ""
    if (v1 !== "" && v2 !== "" && v3 !== "" && v1 === v2 && v2 === v3) {
      if (v1 === "0") {
        io.emit("win", "Player 2 (O) is the winner")
        lastWinner = "2"
      } else {
        io.emit("win", "Player 1 (X) is the winner")
        lastWinner = "1"
      }
      turn = ""
      setTimeout(() => {
        restartGame()
        turn = lastWinner
        io.emit("data", { data, turn })
      }, 3000)
    }
  }

  for (let value of data) {
    if (value === "") {
      isDraw = false
      break
    }
  }

  if (isDraw) {
    io.emit("win", "match draw!!!")
    turn = ""
    setTimeout(() => {
      restartGame()
      turn = lastTurn
      io.emit("data", { data, turn })
    }, 3000)
  }
};

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

io.on("connection", (socket) => {
  console.log("a user connected")
  io.emit("data", { data, turn })
  socket.on("input", (e) => {
    if (e >= 0 && e < 9) {
      const clientId = clients[socket.id]
      if (clientId) {
        if (turn === "1" && clientId === turn) {
          data[e] = "X"
          turn = "2"
        } else if (turn === "2" && clientId === turn) {
          data[e] = "0"
          turn = "1"
        }
        checkWinner()
      }
    }

    io.emit("data", { data, turn })
  })
  socket.on("info", (userId) => {
    if (!userId || userId > 2 || userId < 0) {
      return
    }
    clients[socket.id] = userId
    console.log(clients)
  })
  socket.on("restart", (turnMsg) => {
    console.log(turnMsg)
    console.log(`reset request from ${turnMsg}`)
    if (turnMsg == turn) {
      restartGame()
      turn = turnMsg
      io.emit("data", { data, turn })
    }
  })
})

httpServer.listen(5000, (e) => {
  if (e) {
    return console.log(e)
  }
  console.log("server started on 5000")
})