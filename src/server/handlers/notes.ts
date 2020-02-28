import { Request, Response } from 'express'
import axios from 'axios'

export default {
  initialize: async (request: Request, response: Response) => {
    const { accessToken } = response.locals

    try {
      const { data } = await axios({
        method: 'post',
        url: 'https://api.github.com/user/repos',
        data: {
          name: 'takenotes',
          description: 'Database of notes for TakeNote',
          private: true,
          visibility: 'private',
          has_issues: false,
          has_projects: false,
          has_wiki: false,
          is_template: false,
          auto_init: false,
          allow_squash_merge: false,
          allow_rebase_merge: false,
        },
        headers: {
          Authorization: `token ${accessToken}`,
        },
      })

      response.status(200).send(data)
    } catch (error) {
      response.status(400).send({ error: error.response?.data })
    }
  },
}
