import express from 'express'

import authRoutes from './auth'
import notesRoutes from './notes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/notes', notesRoutes)

export default router
