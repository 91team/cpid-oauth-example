function listenSignals(server) {
  const signals = {
    SIGHUP: 1,
    SIGINT: 2,
    SIGTERM: 15,
  }

  const shutdown = (signal, value) => {
    console.log("shutdown!")
    process.exit(128 + value)
    // server.close(() => {
    //   console.log(`server stopped by ${signal} with value ${value}`)
    //   process.exit(128 + value)
    // })
  }

  Object.keys(signals).forEach((signal) => {
    process.on(signal, () => {
      console.log(`process received a ${signal} signal`)
      shutdown(signal, signals[signal])
    })
  })
}

module.exports.listen = listenSignals
