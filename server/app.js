    import express from 'express'
    import cors from 'cors'
    import color from 'colors'
    import dotenv from 'dotenv'
    import connectdb from './config/connectDb.js'
    import router from './routes/userRoute.js'
    import adminrouter from './routes/adminRoute.js'
    import path from 'path'

    const app = express()
    const _dirname = path.dirname('')
    const buildpath = path.join(_dirname, '../client/build')
    app.use(express.static(buildpath))
    
    dotenv.config()
    app.use(cors())
    app.use(express.json())




    connectdb()

    app.use('/api', router);

    app.use('/api', adminrouter);


    const PORT = process.env.PORT || 8080
    app.listen(PORT,()=>{
        console.log(`Server is running on PORT ${PORT}`.bgWhite)
    })