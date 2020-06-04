import app from './routes'
import database from './service/connectdb'
import {config} from 'dotenv'

config()
app.listen(process.env.PORT , ()=>{
    database()
    console.log('Server listening on port 3333!')
})