import {IgApiClient, LiveEntity} from 'instagram-private-api';
const ig = new IgApiClient()


export async function Login(username: String, password: String){
    console.log(`Login on Instragram -> ${username} e ${password}`)
}

export async function StartLive(){
    // basic login-procedure

    console.log('Configuration Live')

    console.log('Start Live')

    console.log('URL e KEY')

    return {
        broadcastId:'broadcast123',
        stream_url:'Stream',
        stream_key:'stream'
    }
}

export async function MyComment(comment:String, broadcastId:String){
    console.log(`My comment -> ${comment}\n
    BroadCastId -> ${broadcastId}`)
}

export async function EndLive(broadcastId:String){
    console.log(`End Live -> ${broadcastId}`)
}
