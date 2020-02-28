import { Request, Response, NextFunction } from 'express'
import axios from 'axios'

const checkIfNoteExists = async (request: Request, response: Response, next: NextFunction) => {
  const { accessToken } = response.locals

  try {
    await axios({
      method: 'get',
      url: 'https://api.github.com/user/repos/takenotes',
      headers: {
        Authorization: `token ${accessToken}`,
      },
    })

    response.status(304).send({ message: 'Nothing to modify', status: 304 })
  } catch (error) {
    if (error?.response?.status === 404) {
      next()
    } else {
      // console.log(error)
      response.status(400).send({ error: error.message })
    }
  }
}

export default checkIfNoteExists
