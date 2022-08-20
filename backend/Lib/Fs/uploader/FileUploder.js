

const fs  =  require('fs')
const uploadSetting    =require('./MulterSetting')
const path = require('path');
const Image_size  = require('image-size')
const sharp  = require('sharp')
const randomStr  = require('./../RandonString')







///////////////////////////////////////////////////////////////////////////////////VAlidator
const imageValidator  = (img__,size,width,height)=>{
        
    const image_ = img__
    let imgErr  = [];
    let imgUrl  = []

0               
    image_.forEach(img=>{
    ///  console.log(img,'===========')
        const dimensions = Image_size(img.path)///  //out put{ height: 225, width: 225, type: 'jpg' }
       // console.log(dimensions,img.size,(img.size/(1024*1024)))
        if( (img.size/(1024*1024)) > size){
            imgErr.push(img.originalname +" size is more that "+ size +" mb")
            if(imgUrl.indexOf(img.path) === -1){
                imgUrl.push(img.path)
            }
        }

        if(dimensions.width >width){
            imgErr.push(img.originalname +" width is more that "+ (width) +"mb" )
            if(imgUrl.indexOf(img.path) === -1){
                imgUrl.push(img.path)
            }
        }

        if(dimensions.height >height){
            imgErr.push(img.originalname +" heigth is more that "+ height)
            if(imgUrl.indexOf(img.path) === -1){
                imgUrl.push(img.path)
            }
        }

      
  
    })
   
    return [imgErr,imgUrl]

} 









////function to export
const FileUpload  = async( 
    router,
    url,
    $img_store_path,
    isSingle=true,
    resize_image_=false,
    resize_option = {w:false,h:false},
    validate=true,
    validate_option={s:0,w:0,h:0} 
    )=>{

      let $uploader  = uploadSetting($img_store_path).upload.single('image')
        let $uploaders  = uploadSetting($img_store_path).upload.array('image',5)
        let whichUploader  = isSingle?$uploader:$uploaders;
   
router.post(url,whichUploader ,async (req, res) => {
            const image_ = req.file?[req.file]:req.files;
           // console.log(image_,req.body,"=================>")
            imgDir  = [];
             let img_validation_pass  = imageValidator(image_,validate_option.s,validate_option.w,validate_option.h)
            //console.log(imageValidator(image_,2000,200,200))
            if(validate && img_validation_pass [0].length > 0){
                img_validation_pass[1].forEach(imgurl=>{
                    fs.unlink(imgurl,(err)=>{
                        if(err) {
                           // console.log(err)
                          return  res.json({err:["unlink error"]})
                            //process.exit()
                        }
                
                      }
                      )
                }) 

                res.json({err:img_validation_pass[0]})
              //  process.exit(0);
            }else{

                  /////////////////////////////////////////////////validation pass
                            
            image_.forEach(img=>{
                // require('../../../public')
                  let new_path  = img.path.replace(/\\/g, "\/").split('public/')[1]
                    let pathObj = {};
                    pathObj['path']  = new_path;
                 // imgDir.push({path:new_path }) 
               
 ///////////////////////////////////////////////////////////////////////////////////////////////////////
              function resizeImage(){
                 const dimension = fs.existsSync(img.path)??Image_size(img.path)///out put{ height: 225, width: 225, type: 'jpg' }
                     let ext_cont  = img.path.split(".")
                     let ext  = ext_cont[ext_cont.length-1]
                 new_path  =  new_path.match(/.+(?=\.)/)[0]
                 let added_to_new_path  = randomStr(6)
               let resize_name  = new_path+'__'+added_to_new_path+'.'+ext
              // imgDir.push({path:new_path }) 
              pathObj['path']  = resize_name
          
            setTimeout(()=>{
               sharp(img.path)
               .resize(resize_option.w,resize_option.h,'!')
               .toFile('./public/'+resize_name)
               .then( (e) => {
                  
                 fs.unlink(img.path,(err)=>{
                         if(err) {
                            return res.json({err:["unlink error"]})
                             //process.exit()
                         }
                 
                       }
                       )
                   }
               
               )  .catch(er=>{
                  return res.json({err:["Server encounter error"]})
                      // process.exit()  
               })
         
 
             },4000)
                 
              }  
              resize_image_ && resize_option.w && resize_option.h? resizeImage():null
           //////////////////////end of resizeImage function   
 
               imgDir.push(pathObj)
             })/////end of forEach
 
           return  res.json({image_,suc:'image upload done',img_dir:imgDir })

                  ///////////////////////////////////////////validation pass

            }


        })


        /**  "fieldname": "image",
            "originalname": "9fHhATdMrcjV.png",
            "encoding": "7bit",
            "mimetype": "image/png",
            "destination": "public/images",
            "filename": "3REF9cdfVDmys9rhvnmXNaTKoiQbIlMV..png",
            "path": "public\\images\\3REF9cdfVDmys9rhvnmXNaTKoiQbIlMV..png",
            "size": 1095986 */ 
}

module.exports  = FileUpload ;