import express from 'express'
import mongoose from 'mongoose'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()
    this.database()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
  }

  private database (): void {
    mongoose.connect('mongodb://localhost:27017/arch')
  }

  private routes (): void {
    this.express.get('/', (req, res) => {
      res.send('Hello, World!')
    })
  }
}

export default new App().express
