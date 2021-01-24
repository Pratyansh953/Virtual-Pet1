var dog, happyDog;
var database;
var food, foodStock;
var text;

function preload(){
  dog.loadImage("dogImg.png");
  happyDog.loadImage("dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database= firebase.database();
  dog= createSprite(300,250);
  dog.addImage= "dogImg.png";
  happyDog= createSprite(300,250);
  happyDog.addImage= "dogImg1.png";
  text= createSprite(100,200);
  foodStock= database.ref('Food');
  foodStock.on("value", function readStock(data){
    food= data.val();
  });
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(food);
    dog.addImage(happyDog);
  }
  drawSprites();
  text= Text("Food remaining:"+food);
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food: x
  })
}