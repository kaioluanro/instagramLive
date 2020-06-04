import express from 'express'
import cors from 'cors'

import {randomBytes} from "crypto";

import {StartLive,EndLive,MyComment,Login,Comments,BeatAndView} from './controller/LiveController'
import {Idgenerate} from './service/schema/idCreate'

class Routes {
    public express: express.Application


    public constructor(){
        this.express = express()
        

        this.middlewares()
        this.routes()
    }

    private middlewares():void{
        this.express.use(express.json())
        this.express.use(cors())
    }

    private routes ():void{

        this.express.get('/idfind/:idUniq', async(req, res)=>{
            const idUniq = req.params.idUniq
            if(idUniq.length === 8){
                const listIdsUser = await Idgenerate.find()
                const findId = await listIdsUser.filter(item=> item.id === idUniq)
                
                const isTrue = {
                    id:findId[0].id,
                    isExists:findId[0].id===idUniq
                }
                
                return res.json(isTrue)
             }else{
                return res.status(404).json({idExists:false})
             }
        })

        this.express.get('/ids/:pass', async(req, res)=>{
            if(req.params.pass === 'idcreate123'){
                const listIdsUser = await Idgenerate.find()

                return res.json({listIdsUser}) 
            }
        })

        this.express.post('/ids/:pass', async(req,res)=>{
            if(req.params.pass === 'idcreate123'){

                const idUniq = {
                    name: req.body.name,
                    id: randomBytes(4).toString('hex')
                }

                const newId = new Idgenerate(idUniq)
                await newId.save()
                
                return res.json({id:idUniq.id})
            }else{
                return res.status(400).send('Você não tem permição para fazer essa ação!!')
            }
        })

        this.express.delete('/ids/:id',async(req,res)=>{
            await Idgenerate.findByIdAndDelete(req.params.id)

            return res.send()
        })

        //relative the Live
        this.express.post('/login', (req, res)=>{
            Login(req.body.username,req.body.password).then(callback=>{
                return res.json({perfil:callback})
            }).catch(err => res.send(400))
        })
        this.express.post('/startlive', (req, res)=>{
             StartLive().then(call=>{
                return res.json({dataLive:call})
             })
        })
        this.express.get('/endlive/:broad_id', (req, res)=>{
            EndLive(req.params.broad_id)

            return res.send()
        })
        this.express.post('/mycomment', (req, res)=>{
            MyComment(req.body.mycomment, req.body.broadcastId)

            return res.send()
        })
        this.express.get('/comments/:broad_id', (req, res)=>{
            Comments(req.params.broad_id)
        })
        this.express.get('/beatandview/:broad_id', (req, res)=>{
            BeatAndView(req.params.broad_id)
        })
    }
}

export default new Routes().express