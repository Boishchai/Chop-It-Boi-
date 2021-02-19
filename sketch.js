var theGoodGroup, theBadGroup
var chopper, chopperImage, fruit, fruit1, fruit2, fruit3, fruit4, microbe, microbeImage
var gameOver, gameOverImage
var chopperSound, gameOverSound
var cross1, cross2, cross3, cross4
var score = 0;
var PLAY = 1;
var END = 0;
var n

gameState = PLAY;

function preload()
{
  chopperImage = loadImage("sword.png");
  chopperSound = loadSound("knifeSwooshSound.mp3");
  microbeImage = loadImage("alien1.png", "alien2.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
}

function setup()
{
  createCanvas(400,400);
  
  chopper = createSprite(100,200,10,10);
  chopper.addImage(chopperImage);
  chopper.scale=0.7;
  
  theBadGroup = createGroup();
  theGoodGroup = createGroup();
  //cross1 = ellipse(380,20,20,20);
  
  gameOver = createSprite(200,200,10,10);
  gameOver.addImage(gameOverImage);
  gameOver.visible = false;
}


function draw()
{
  background("Chartreuse");
  
  if(gameState===PLAY)
    { 
      Fruits();
      
      Microbes();
      
      
      chopper.x = World.mouseX;
      chopper.y = World.mouseY;
      
      
      
      if(theGoodGroup.isTouching(chopper))
        {
          chopperSound.play();
          theGoodGroup.destroyEach();
          score=score+3;
        }
    
      else 
        { if(theBadGroup.isTouching(chopper))
            {
              gameState = END;
              gameOverSound.play();
            }
        }
    }
    else
      {
        if(gameState === END)
          {
              gameOver.visible = true;
              theGoodGroup.destroyEach();
              theBadGroup.destroyEach();
              chopper.destroy();

              
          }
      }
      drawSprites();
      
      stroke("black");
      
      text("S C 0 R E : "+ score, 170, 50);
}


function Fruits()
{
  if(World.frameCount%80===0)
    {
      fruit = createSprite(400,200,20,20);
      fruit.scale=0.2;
      
      n = Math.round(random(1,4));
      
      if(n===1)
        {
          fruit.addImage(fruit1);
        }
      else if(n===2)
        {
          fruit.addImage(fruit2);
        }
      else if(n===3)
        {
          fruit.addImage(fruit3);
        }
      else
        {
          fruit.addImage(fruit4);
        }
      
      fruit.y = Math.round(random(50,350));
      
      fruit.velocityX=-8;
      fruit.lifeTime=50;
      
      theGoodGroup.add(fruit);
    }
   
}

function Microbes()
{
  if(World.frameCount%200===0)
    {
      microbe = createSprite(400,200,20,20);
      microbe.addImage("moving",microbeImage);
      microbe.y=Math.round(random(100,300));
      microbe.velocityX=-8;
      microbe.lifeTime=50;
      
      theBadGroup.add(microbe);
    }
  
    
}
