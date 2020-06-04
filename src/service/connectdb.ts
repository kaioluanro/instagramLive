import mongoose from 'mongoose'

async function connect() {
    try {
        mongoose.connect('mongodb+srv://diario:diarioUpload102030@cluster0-b4i5s.mongodb.net/instalive?retryWrites=true&w=majority',{
            useNewUrlParser:true
        })
    } catch (error) {
        console.error(error)
    }
}

export default connect;