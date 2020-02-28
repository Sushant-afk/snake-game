
var block = 20;
var w0,h0,c,d;
var can,score = 0;
var direction = 1;
var tails = [];
var ix = 3*block,iy = 3*block;
var lastTailX = [],lastTailY = [];
var tx,ty;
function Tail()
{
    this.tx = tx;this.ty = ty;
    this.show = function(d)
    {
        fill(d);
        stroke('#ffffff');
        rect(this.tx,this.ty,block,block,4);
    }
}
function Food()
{
    this.xc = Math.round(rand(18))*block;
    this.yc = Math.round(rand(18))*block;
    this.len = block;
    this.displayfood = function()
    {
        fill("yellow");
        rect(this.xc,this.yc,this.len,this.len);
    }
    this.eaten = function()
    {
        this.xc = Math.round(rand(19))*block;
        this.yc = Math.round(rand(19))*block;
    }
}

function ifEaten()
{
    if(tails[0].tx == fruit.xc && tails[0].ty == fruit.yc)
    {
      fruit.eaten();
      tails.push(new Tail());
      score+=5;
    }
}

function setup()
{
    w0 = 400;h0 = 400;
    can = createCanvas(w0,h0);
    can.position(5,5);
    buttonUp = createButton("⬆️");
    buttonRight = createButton("➡️");
    buttonDown  = createButton("⬇️");
    buttonLeft = createButton("⬅️");
    buttonUp.position(w0/2-20,440);
    buttonDown.position(w0/2-20,550);
    buttonRight.position(w0/2+80,495);
    buttonLeft.position(w0/2-120,495);
    can.style("border-style","solid");
    can.style("border-color","white");
    fruit = new Food();
    tails[0] = new Tail(ix,iy);
    
    mover = createVector(ix,iy);
    changeX = createVector(block,0);
    changeY = createVector(0,block);
  
   tails.push(new Tail());
   tails.push(new Tail());
  
     c = color(100,0,100);
     d = color(200,0,200);
    
    setFrameRate(5);
}
function moveRight()
{
  if(direction!=3)direction = 1;
}
function moveUp()
{
  if(direction!=2)direction = 0;
}
function moveDown()
{
  if(direction!=0)direction = 2;
}
function moveLeft()
{
  if(direction!=1)direction = 3;
}

function ifDead()
{
  for(l=1;l<tails.length;l++)
  if(tails[0].tx == tails[l].tx&&tails[0].ty == tails[l].ty)
  {
   alert("GAME OVER!😛😛");
   alert("score:"+score+"\Length:"+score/5);
   noloop();
  }
}

function draw()
{
    background("#000000");
    
    for(num2 = 1;num2<tails.length;num2++)
    {
        tails[num2].tx = lastTailX[num2-1];
        tails[num2].ty = lastTailY[num2-1];
    }
    
    ifEaten();
    fruit.displayfood();
    
    buttonRight.mousePressed(moveRight);
    buttonUp.mousePressed(moveUp);
    buttonLeft.mousePressed(moveLeft);
    buttonDown.mousePressed(moveDown);
    
    if(direction == 0)mover.sub(changeY);
    if(direction == 1)mover.add(changeX);
    if(direction == 2)mover.add(changeY);
    if(direction == 3)mover.sub(changeX);
    
    if(mover.x>=400)mover.x = 0;
    if(mover.y>=400)mover.y = 0;
    if(mover.x<0)mover.x = 400;
    if(mover.y<0)mover.y = 400;
    
    tails[0].tx = mover.x;
    tails[0].ty = mover.y;
    
    for(num = 0;num<tails.length;num++)
    {
        lastTailX[num] = tails[num].tx;
        lastTailY[num] = tails[num].ty;
    }
    tails[0].show(c);
    
    for(count=1;count<tails.length;count++)
     tails[count].show(d);
    
    ifDead();
    stroke(0);
    textSize(15);
    text("score:",15,396);
    text(score,60,396);
}

function rand(n)
{
  return Math.random()*n;
}