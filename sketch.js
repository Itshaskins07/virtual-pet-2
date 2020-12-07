//Create variables here
var dogimage;
var dogImage2;
var dog;
var database;
var foodv;
var feedButton;
var addFoodButton;
var feedTime;
function preload()
{
  dogimage=loadImage("images/dogImg.png");
  dogImage2=loadImage("images/dogImg1.png");
	}

function setup() {
    createCanvas(1000, 700);
    database=firebase.database();
    var loc=database.ref("food");
    loc.on("value",getFoodValue,showError);
    dog=createSprite(800,200);
    dog.addImage("dog1",dogimage);
    dog.addImage("dog2",dogImage2);
    dog.scale=0.15;
    foodobj=new Food();
    feedButton=createButton("FEED THE DOG")
    feedButton.position(700,95);
    feedButton.mousePressed(updateFoodValue);
    addFoodButton=createButton("ADD THE FOOD");
    addFoodButton.position(900,95);
    addFoodButton.mousePressed(addFood);

}

function draw() {  
  background("black");
  foodobj.display();
  drawSprites();
  textSize(20);
  fill("white");
  text("food="+foodv,400,100);
  text("MAKE THE DOG HAPPY ",400,650)
  var loc=database.ref("lastfeedtime")
  loc.on("value",function(data){
   feedTime=data.val(); 
  })
  if(feedTime>=12){
text("lastFeed"+feedTime % 12+" PM",350,30);

  }
  else if(feedTime==0){
    text("lastFeed"+"12 AM",350,30);

  }
  else{
    text("lastFeed"+feedTime +" AM",350,30);
 
  }
}

function getFoodValue(data){
  foodv=data.val();
}

function showError(){
 console.log("there was an error connecting to the database"); 
}

function updateFoodValue(){
 if(foodv>0){
   foodv=foodv-1;
   dog.changeImage("dog2",dogImage2);
    var locationofchild=database.ref("/");
    locationofchild.set({
      food:foodv,
      lastfeedtime:hour()
    })
  } 
}

function addFood(){
 foodv=foodv+1;
var locationofchild=database.ref("/");
locationofchild.set({
 food:foodv 
})
}