
interface Grid{
  counter : number,
  map : Map<HTMLInputElement,number>,
  length : number,
  getInputBoxes : Function,
  getScores: Function,
  getChildren: Function
}

let grid : Grid = {
  counter : 0,
  map : new Map(),
  length : 3,
  getInputBoxes : () => Array.from(document.querySelectorAll("input[type=checkbox]")).splice(1,) as HTMLInputElement[] ,

  getScores : function(){ return Array.from(this.map.values()) } ,

  getChildren : () => Array.from(document.querySelectorAll("tr:not(:first-child)>:nth-child(even)")) as HTMLInputElement[]
}


grid.getInputBoxes().forEach((elem : HTMLInputElement) => {

  elem.addEventListener('click',function(this: HTMLInputElement,event :Event){
    
    if(this.checked){
      grid.counter+=1;
      grid.map.set(this,parseInt(this.parentElement!.parentElement!.children[2].innerHTML));
    }
    
    else{
      grid.counter-=1;
      grid.map.delete(this);
    }

    let checkBox = document.getElementById("main-check-box") as HTMLInputElement;
    if(grid.counter===grid.length)
      checkBox.checked=true;
    else
      checkBox.checked=false;
  });
});

document.getElementById("main-check-box")!.addEventListener('click',function(this:HTMLInputElement,event:Event){
    
  if(this.checked){
      grid.getInputBoxes().forEach((element:HTMLInputElement) => {
      if(!element.checked){
        element.checked=true;
        grid.counter+=1;
        grid.map.set(element,parseInt(element.parentElement!.parentElement!.children[2].innerHTML));
        }
    });
  }

  else{
    grid.getInputBoxes().forEach((element:HTMLInputElement)=> element.checked=false); 
    grid.map=new Map();
    grid.counter=0;
  }
    
});


//find max
document.getElementById("max")!.addEventListener('click',(event)=>{
    let max = event.target as HTMLElement;

    max.innerHTML = grid.getScores().reduce((aggregate: number , current : number)=>{
        if(current>aggregate)
          return current;
        return aggregate;
    },0).toString();
})

//find sum
document.getElementById("sum")!.addEventListener('click',(event)=>{
  let sum = event.target as HTMLElement

  sum.innerHTML=grid.getScores().reduce((aggregate: number , current : number)=>{
      return aggregate+current;
  },0).toString()

})


//search 
document.getElementById("search")!.addEventListener("keyup",function(this:HTMLInputElement,event:Event){ 
  
  grid.getChildren().forEach( (element: HTMLElement) => {
    element.innerHTML = element.innerText.replaceAll(" ","");
  });

  let element=grid.getChildren()[0]
    let re = new RegExp(`${this.value}`, "g");
    console.log(element.innerHTML.search(re));
    /*grid.getChildren().forEach((element) => {
        let re = new RegExp(`${this.value}`, "g");
        element.innerHTML.search(re)
    });*/
});