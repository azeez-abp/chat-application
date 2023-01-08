
window.addEventListener('load',function(){
  const canvas  = document.getElementById("game");
  const ctx    = canvas.getContext('2d'); //canvas.getContext('webgl')3d
  canvas.width  = 500;
  canvas.height = 800

 let random =   (length,include_spacial_char=false)=> {
  var result           = '';
  let spacials  = '@$&#*'
  var characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789${include_spacial_char?spacials:''}`;
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
} 

 ///////////input/////////////////////////  
  class InputHandler{
          constructor(game){
              
             
              this.game = game;
             window.addEventListener('keyup',()=>{
              this.game.keyPress.up=false
              this.game.keyPress.down=false
              this.game.keyPress.left=false
              this.game.keyPress.right=false
             })

              window.addEventListener('keydown',(e)=>{
                  
                   if(e.code==="Space"){
                      this.game.player.shootUp()
                   }

                   if(e.key ==='ArrowUp'){
                
                      this.game.keyPress.up=true
                      this.game.keyPress.down=false
                   }
                 if(e.key ==='ArrowLeft'){
                     console.log(e.key)
                    this.game.keyPress.left=true
                    this.game.keyPress.right=false
                 }

                 if(e.key ==='ArrowRight'){
                
                  this.game.keyPress.left=false
                  this.game.keyPress.right=true
               }

                   else if(e.key ==='ArrowDown'){
                   
                      this.game.keyPress.up=false
                      this.game.keyPress.down=true
                   }
                  
              
                    
              })
             
              
          }

  } 
  //////////input////////////////////////////////

  class Projectie{
      constructor(game,x,y){
           this.game  = game
           this.x = x
           this.y  = y
           this.width = 10;
           this.height  = 10
           this.speed = 3
           this.markForDeletion = false
      }

      update(){
          this.x  +=this.speed;
          if(this.x > this.game.width*0.8) this.markForDeletion = true
      }

      draw(context) {
          context.fillStyle  = 'yellow'
          context.fillRect(this.x+this.game.player.width,this.y+30,this.width,this.height)
      }

  } 

  class Particle{

  }
  
  
////////////////Payer////////////////////////////////
  class  Player{

       constructor(game){
          this.game  = game 

          this.width = 120
          this.heigth  = 150;

          this.x  = 20;
          this.y   = 100;

          this.speedX = 0;
          this.speedY  =  0 ;
          this.maxSpeed  = 5
          this.projectiles   = []
          this.image  = document.querySelector('.player')
          this.frameX  = 0
          this.frameY  = 0
          

         


       }


        draw(context){
          //context.storkeStyle  = 'green'
         // context.stokeWidth
         context.strokeRect(this.x,this.y,this.width,this.heigth)
         context.drawImage(
          this.image,
          this.frameX*this.width-140,
          this.frameY*this.heigth+-10,
          this.width,
          this.heigth,
          this.x,
          this.y,
          this.width,
          this.heigth
          )
         
          this.projectiles.forEach(projectile=>{
              projectile.draw(context)
            })
        }


        update(){
            
            this.frameX +=1;
            if( this.frameX % 4 === 0){
              console.log(this.frameX)
              this.frameY +=1 
              this.frameX =0 
                 if(this.frameY==3){
                  this.frameY =0
                 }
            }
            
            
            if(this.game.keyPress.up  && this.y>0) {
              this.speedY -=this.maxSpeed
              this.y  = this.speedY
            }
             //console.log(this.y+this.heigth, this.y,this.heigth,this.game.heigth)
            if(this.game.keyPress.down && (this.y+this.heigth)< this.game.heigth+20){
                
              this.speedY +=this.maxSpeed
              this.y  = this.speedY
            } 

            if(this.game.keyPress.left && this.x >0 ){
                
              this.speedX -=this.maxSpeed
              this.x = this.speedX
            } 
             
            if(this.game.keyPress.right && (this.x+this.width)< this.game.width){
                
              this.speedX +=this.maxSpeed
              this.x = this.speedX
            } 



            this.projectiles.forEach(projectile=>{
              projectile.update()
            })
          this.projectiles.filter(projectile=>!projectile.markForDeletion)  
        }


        shootUp(){ 
           
             if(this.game.ammo >0){
                this.projectiles.push(new Projectie(this.game,this.x,this.y))
                this.game.ammo--
             }
            
        }

  }
//////////////////////Payer/////////////////////////////////////

  class Enemy{
    
    constructor(game){
      this.game        = game;
      this.x  = this.game.width
      this.speedX  = Math.random()*-1.5-0.5
      this.markForDeletion  = false

      this.lives   = 10
      this.name = ''
      this.frameX =0
      this.frameY =Math.floor(Math.random()*4)
      this.image  =document.querySelector('.enemy')

    }
    
  
    update(){
      this.x += this.speedX -this.game.speed
  
      if(this.frameX < 4){
         this.frameX++;
      }else{
        this.frameX = 0
      }
      //console.log(this.frameY)
   
      if(this.x + this.width < 0 || this.lives <= 0) this.markForDeletion =true
    }

    draw(context) {
      // console.log(this.image)
       context.fillStyle  = "red"
     //  context.strokeRect(this.x,this.y,this.width,this.height)
       context.drawImage(
         this.image,
         this.frameX * (this.width ),
         this.frameY* (this.height+20),
         this.width,
         this.height,
         this.x,
         this.y,
         this.width,
         this.height
 
 
 
       )
       context.fillStyle='white'
       
       context.font = "26px Helvetical"
       context.fillText(this.lives+" for "+this.name,this.x,this.y)
    }
   

    
  }

  class Angler extends Enemy{
      constructor(game){
        super(game)
        this.game  = game
        this.width  = 132
        this.height  = 100/*offset*/
        this.y  = Math.random()*(this.game.heigth*0.9 - this.height)
       
      }

    
     
    
   
     

  }

  class Layer{
     constructor(game,image,speedModifier,widthAdding=0 ){
          this.image  = image
          this.game  = game
          this.speedModifier  = speedModifier
          this.width  = 1768
          this.height = 500
          this.x  = 0
          this.y  = 0
          this.widthAdding  = widthAdding
     }

     update(){
     
       if((this.x*-1) >= this.width){
        this.x =0
       }else{
      
        this.x -=this.game.speed+this.speedModifier
        
      }
     }

     draw(context){
      let h  = Math.random()*10+4
       context.drawImage(this.image,this.x+this.widthAdding ,this.y,this.game.width*6,this.game.heigth)
       context.drawImage(this.image,this.x+this.widthAdding +this.width,this.y,this.game.width*6,this.game.heigth)
     }
  }

  class Background{
      constructor(game){
        this.game  = game
      
        this.images = document.querySelectorAll("img")
        //console.log(this.images[0])
        this.layer1 = new Layer(this.game, this.images[0],1)
        
        this.layer2 = new Layer(this.game, this.images[1],1)
        this.layer3 = new Layer(this.game, this.images[2],1)
        this.layer4 = new Layer(this.game, this.images[3],1)
        this.layer5 = new Layer(this.game, this.images[4],1)
        // console.log(
        //   this.layer1.image.width,
        //   this.layer2.image.width

        //   )
        this.layers  = [
           // this.layer1,
            this.layer2,
           // this.layer3,
          // this.layer4,
          // this.layer5
        ];

      }

      update(){
         //console.log(this.layers)
        this.layers.forEach(layer=>layer.update() )
       }

      draw(context){
          this.layers.forEach(layer=>layer.draw(context))
      }
  }
    

  class Ui{
      constructor(game){
        this.game        = game;
        this.fontSize    = 25;
        this.fontFamily  = 'Helvatical'
        this.color       =    'white'
        this.warnColor       =    'red'
      } 

      draw(context) {
        context.save();
        context.fillStyle = this.color;
        context.font  =this.fontSize+"px"
        context.fillText("Score "+this.game.score, 20,40)
        
          if(this.game.ammo < 10 ){
            context.fillStyle = this.warnColor; 
          } 

         for (let i = 0; i < this.game.ammo ; i++) {
           context.fillRect(i*8,50, 3,20)  //gun recharger
         }
         context.restore();  

         context.save();
         context.fillStyle = "tomato";
       context.fillText("Your Health "+this.game.health, 20,98)
         for (let i = 0; i < this.game.health ; i++) {
          context.fillRect(i*15,102, 6,20)  //gun recharger
        }

       
       context.restore();  
      }
  }

  /////////////////gema///////////////////////////////////
  class Game{

      constructor(width,heigth){
          this.width   = width
          this.heigth   = heigth
          this.player = new Player(this)
          this.enemies  = []
          this.input  = new InputHandler(this)
          this.ui     = new Ui(this);
          this.background  = new Background(this)
          this.enemyTimer   = 0;
          this.enemyInter  = 1000;
          this.ammo   =  20;
          this.maxAmmo  = 50;
          this.ammoTimer  = 0;
          this.ammoInterval   = 1500;
          this.gameOver  = false  
          this.score = 0;
          this.health  = 10;
          this.speed = 1
//height missing
          this.keyPress  = {
              up:false,
              down:false,
              left:false,
              right:false
          }

      }
     
     update(deltaTime){
      this.player.update()
      this.background.update()
        if(this.ammoTimer > this.ammoInterval){
           if(this.ammo < this.maxAmmo ){
            this.ammo++;
           }
          this.ammoTimer = 0; 
        }else{
          this.ammoTimer += deltaTime
        }
        this.enemies.forEach(enemy=>{
           enemy.name  = random(4)
          ///////////
          //////////////////////////////////////
           if(this.checkCollision(this.player,enemy)){
            //.log("COllide")
             this.health--
             enemy.markForDeletion  = true ////if enemy is not remove instanly, one enymy can remove 100 health
           }
           //console.log( this.player.projectiles )
          ///////////////////////////////////////////////
          this.player.projectiles.forEach(project=>{
    
             if(this.gunShotCollision(project,enemy)){
                 console.log("YEs")
                 console.log(enemy.lives)
                 enemy.lives--
                 console.log(enemy.lives)
                 project.markForDeletion = true
                 if(enemy.lives<=0){
                   enemy.markForDeletion  = true
                  this.score +=1
                  //document.querySelector(".write-content").innerHTML=this.score
                 }
             }
          })
          
          enemy.update() 
        })


        this.enemies=   this.enemies.filter(enemy=>!enemy.markForDeletion);
        if(this.enemyTimer > this.enemyInter && !this.gameOver){
                    this.enemyTimer = 0
                    this.addEnemy(); 
              }else{
                this.enemyTimer += deltaTime
              }
             

             
       
     }

     draw(context){
      this.background.draw(context)
      this.player.draw(context);
      this.ui.draw(context);
     // console.log(this.heigth)
      this.enemies.forEach(enemy=>{
        // console.log(enemy)
        enemy.draw(context)
      })

      if(this.health <=0){
        ///////////////////////////////////////////////////////////
        context.save()
        context.font  ='48px serif';
        context.fillText("Game Over ",this.width*0.5-120 ,this.heigth*0.5)
        context.restore()
        ////////////////////////////////////////////////////////////
      }  
     
      if(this.score>=50){
        ///////////////////////////////////////////////////////////
        context.save()
        context.font  ='48px serif';
        context.fillText("You Win ",this.width*0.5-120 ,this.heigth*0.5)
        context.restore()
        ////////////////////////////////////////////////////////////
      }  
     
     }

     addEnemy(){
      // this.enemies.name  = random(4)
       this.enemies.push(new Angler(this))
     }


     checkCollision(object1,object2){
  
        // console.log(object1,object2)    
      return (
             object1.x < (object2.x +object2.width)&& // obj1 -<==>+obj1 x+width
            (object1.x  + object1.width) > object2.x && // obj1 <==>obj1 more term greater
            ////////////////////////////////////////// 
            object1.y < (object2.y+object2.height)&& // y+heigth
            (object1.y+object1.heigth) > object2.y
           //////////////////////////////////////////
           );
     }

   gunShotCollision(bullet,enemy){
   return(
    (bullet.x < enemy.x+enemy.width)&&
    (bullet.x+bullet.width > enemy.x )&&
    (bullet.y < enemy.y+enemy.height)&&
    (bullet.y+bullet.height > enemy.y ) //console.log("YES4") 

   )


   }

  }
  const game  = new Game(canvas.width,canvas.height)
////////////////////game////////////////////////////////////    
  let lastTime   = 0 

function animate(timeStamp){
  const deltaTime  = timeStamp - lastTime
  lastTime  = timeStamp

  //console.log(deltaTime)
  ctx.clearRect(0,0,canvas.width,canvas.height)
  game.update(deltaTime);
  game.draw(ctx)
  requestAnimationFrame(animate) // 
}
animate(0)



/////////////////////////////////////////////
let lastT  = 0;
function loopByAnimFram(timeofanimation){
   let timeDiff  = timeofanimation - lastT;
   let frameNumerPerSec  = 1000/timeDiff ///1000ms/ timediff
   console.log("Animation stated since "+timeDiff + " miliseconds" + "make "+frameNumerPerSec+ " Frames")
   lastT  = timeofanimation
   if(timeofanimation > 2000){
    timeofanimation =0;
   }
  requestAnimationFrame(time=>{loopByAnimFram(time)} ) //requestAnimationFrame pass amination time to its callback
}
//loopByAnimFram()




let data  = {x:[22,34,5,3,5],y:[8.8,9.2,4.4,5.3,2.4]}
       ctx.fillStyle='white'
     for (let i = 0; i < data.x.length; i++) {
      console.log(data.x[i],data.y[i])
        ctx.fillRect(data.x[i],200,data.x[i],data.y[i] )  
       
     }




////////////////////////////////////////////////


})



