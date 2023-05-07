import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import userRoutes from '@/routes/userRoutes'

const app = express()

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(morgan('tiny'))

// Routes
app.use('/api/users', userRoutes)

export default app
