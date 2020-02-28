import { Request, Response, NextFunction } from 'express'

const checkAuth = async (request: Request, response: Response, next: NextFunction) => {
  const accessToken = request.cookies?.accessTokenGH

  if (accessToken) {
    response.locals.accessToken = accessToken

    next()
  } else {
    response.status(304).send({ message: 'Nothing to modify', status: 304 })
  }
}

export default checkAuth
