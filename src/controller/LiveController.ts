import {IgApiClient, LiveEntity} from 'instagram-private-api';
const ig = new IgApiClient()


export async function Login(username, password){
    let profile
    ig.state.generateDevice(username);
    await ig.account.login(username, password);
    await ig.account.currentUser().then(callback=>{
        profile = {
            username:callback.full_name,
            photoPerfil:callback.profile_pic_url
        }
    })

    return profile
}

export async function StartLive(){
  
    const {broadcast_id,upload_url} = await ig.live.create({
        previewHeight: 1280,
        previewWidth: 720,
    })
    
    const {stream_key, stream_url} = LiveEntity.getUrlAndKey({broadcast_id,upload_url})
    console.log(`Start your stream on ${stream_url}. \n
    Your Key is: ${stream_key}`)

    const startInfor = await ig.live.start(broadcast_id)
    console.log(startInfor)

    
    return {
        broadcast_id,
        stream_url,
        stream_key,
        startInfor
    }
}

export async function Comments(broadcastId){

    let lastCommentTs = await printComments(broadcastId, 0)

    await ig.live.unmuteComment(broadcastId);

    lastCommentTs = await printComments(broadcastId,lastCommentTs)

}

export async function MyComment(comment, broadcastId){
    await ig.live.comment(broadcastId, comment)
}

export async function EndLive(broadcastId){
    await ig.live.endBroadcast(broadcastId)
}

async function printComments(broadcastId,lastCommentTs) {
    const {comments} = await ig.live.getComment({broadcastId ,lastCommentTs})

    if(comments.length > 0){
        comments.forEach(comment => console.log(`${comment.user.username}: ${comment.text}`))
        return comments[comments.length - 1].created_at
    }else{
        return lastCommentTs
    }
}

export async function BeatAndView(broadcastId){
    await ig.live.heartbeatAndGetViewerCount(broadcastId).then(callback =>{
        console.log(callback)
        return callback
    }).catch(err=>{
        console.log(`Error Count Live person = ${err}`)
    })
}