import express from 'express'
import * as dotenv from 'dotenv'

import notesHandler from '../handlers/notes'
import mockNotesHandler from '../handlers/mock/mockNotes'
import checkAuth from '../middleware/checkAuth'
import checkIfNotesExist from '../middleware/checkIfNotesExist'

const router = express.Router()
dotenv.config()

const isTest = process.env.TEST_ENV

if (!isTest) {
  // Real routes
  router.post('/initialize', checkAuth, checkIfNotesExist, notesHandler.initialize)
} else {
  // Mocked routes for Cypress end-to-end tests
  router.post('/initialize', mockNotesHandler.initialize)
}

export default router
