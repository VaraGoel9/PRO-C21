var bird, bird_image;
var bg, bg_image;
var fg,fg_image;
var pipe1,pipeNorth_image;
var pipe2,pipeSouth_image;
var pipe1Group, pipe2Group;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, r;
var jumpSound,dieSound;

function preload(){
bird_image=loadImage("bird.png");
bg_image=loadImage("bg1.jpg");
fg_image=loadImage("fg1.png");
pipeNorth_image=loadImage("pipeNorth.png");
pipeSouth_image=loadImage("pipeSouth.png");
r=loadImage("unnamed.png");

jumpSound=loadSound("jump.mp3");
dieSound=loadSound("die.mp3")
 
}

function setup() {
createCanvas(windowWidth,windowHeight);

//background
bg = createSprite(width/2,height/2,width,height);
bg.addImage(bg_image);
bg.scale = 0.5;

//foot ground
fg=createSprite(width/2,height-30,width,height);
fg.addImage(fg_image);
fg.scale =1.5

//bird
bird = createSprite(230,256,10,10)
bird.addImage(bird_image);

//pipe group
pipe1Group = new Group();
pipe2Group = new Group();

//scoring
score = 0;

//restarting the game
restart = createSprite(width/2,256,10,10);
restart.addImage(r);
restart.visible=false;
restart.scale = 0.4;
}

function draw() {
  background(0,151,157);
  
  if(gameState === PLAY){
  pipe_move();

  //bird movement
if (keyDown("space")){
  bird.y = bird.y - 15;
  jumpSound.play();
  }
  else{
  bird.velocityY = 5;
  }
 
  //foot ground movement
fg.velocityX = -(5 + 3* score/10);

//repositioning foot ground
if(fg.x < width/2-300){
  fg.x = fg.width/2;
  }

  //game end
  if (bird.isTouching(pipe1Group) || bird.isTouching(pipe2Group)){
    gameState = END;
    dieSound.play();
  }
  if(bird.isTouching(fg)){
    gameState = END;
    dieSound.play();
  }

if(frameCount % 140 === 0){ 
score = score + 1;
}
}
else if(gameState === END)  {
fg.velocityX = 0;
bird.visible = false;
bird.x=30;
bird.y=256;
pipe1Group.setVelocityXEach(0);
pipe2Group.setVelocityXEach(0);
pipe1Group.setLifetimeEach(-1);
pipe2Group.setLifetimeEach(-1);
restart.visible=true;
}
  
if(mousePressedOver(restart)){
  reset();
}

drawSprites();

textSize(30);
textFont("Arial");
text("Score:" + score,width-150,30);
}

function pipe_move(){
if (frameCount % 140 === 0 ){
  pipe1 = createSprite(width,10,10,100);
  pipe1.addImage(pipeNorth_image);
  pipe1.y = Math.round(random(0,50));
  //pipe1.velocityX = -(2 + 3* score/10);
  pipe1.velocityX =-2;
  pipe1Group.add(pipe1);
  pipe1Group.setLifetimeEach(300);
 
  pipe2 = createSprite(width,522,10,100);
  pipe2.addImage(pipeSouth_image);
  pipe2.y = Math.round(random(462,512));
  //pipe2.velocityX = -(2 + 3* score/10);
  pipe2.velocityX =-2;
  pipe2Group.add(pipe2);
  pipe2Group.setLifetimeEach(300);

}

}

function reset(){
  gameState = PLAY;
  pipe1Group.destroyEach();
  pipe2Group.destroyEach();
  score = 0;
  bird.x = 230
  bird.y = 256
  bird.visible=true;
  restart.visible=false
}