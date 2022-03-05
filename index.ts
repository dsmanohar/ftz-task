
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
  length : 4,
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


document.getElementById("calculate")!.addEventListener('click',(event)=>{

  //find max
  let max = document.getElementById("max")! as HTMLElement;

  max.innerHTML ="Max is "+grid.getScores().reduce((aggregate: number , current : number)=>{
      if(current>aggregate)
        return current;
      return aggregate;
  },0).toString();

  max.style.display="block";

  //find sum
  let sum = document.getElementById("sum")! as HTMLElement

  sum.innerHTML="sum is "+grid.getScores().reduce((aggregate: number , current : number)=>{
      return aggregate+current;
  },0).toString();
  sum.style.display="block";
});
    


//search 
document.getElementById("search")!.addEventListener("keyup",function(this:HTMLInputElement,event:Event){ 
  
  grid.getChildren().forEach( (element: HTMLElement) => {
    element.innerHTML = element.innerText.replaceAll(" ","");
  });
  
  if(!this.value)
    return 

  grid.getChildren().forEach((element: HTMLInputElement) =>{

    let re = new RegExp(`${this.value}`, "gi");
    let array=[],index;

    while(index=re.exec(element.innerHTML) as RegExpExecArray)
        array.push(index.index);

    let outputString:string="";
    index as number; index=0; 

    while(index<element.innerHTML.length && array.length){
      if(index===array[0]){

        outputString+="<mark>"+element.innerHTML.substr(index,this.value.length)+"</mark>"
        index+=this.value.length
        array.shift()
     
      }
      else{
          outputString += element.innerHTML[index];
          index++
      }
      
    }
    while(index<element.innerHTML.length){
      outputString+=element.innerHTML[index]
      index++
    }
    element.innerHTML=outputString;
    });
});