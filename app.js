
document.addEventListener('DOMContentLoaded',()=>{
    const grid=document.querySelector('.grid');
    const width=10;
    let square=Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay=document.querySelector('#score');
    const btn=document.querySelector('#button');
    let timer;
    let nextRandom=0;
    let score=0
    const colors=['orange','red','purple','green','blue']

    //ShAPEs
    const L =[
        [1,width+1,width*2+1,2],
        [width,width+1,width+2,width*2+2],
        [1,width+1,width*2+1,width*2],
        [width,width*2,width*2+1,width*2+2]
    ]
    const Z =[
        [0,width,width+1,width*2+1],
        [width+1,width+2,width*2,width*2+1],
        [0,width,width+1,width*2+1],
        [width+1,width+2,width*2,width*2+1]
    ]
     const T =[
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]
    const O =[
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]

    ]
    const I=[
        [1,width+1,width*2+1,width*3+1],
        [width+0,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width+0,width+1,width+2,width+3]
        ]
    
    let pos=4 ;  
    const shapes=[L,Z,T,O,I];  

    
    let currentRotation=0;
    let random=Math.floor(Math.random()*(shapes.length))  ;
    
    let current= shapes[random][currentRotation];
    
    //rotation of shapes
    function draw(){
        current.forEach(index=>{
            square[pos +index].classList.add('shape');
          // square[pos +index].style.backgroundColor= colors(random);
            
        })
    }
    //undrawing the shape
    function undraw(){
        current.forEach(index=>{
        square[pos+index].classList.remove('shape');
//        square[pos +index].style.backgroundColor= '';

        })
    }
    //make shapes move
   // timer= setInterval(movedown,300);

    //assign functions to keyCodes 
    function control(a){
        if(a.keyCode==37){
        left();
    }else if(a.keyCode==39){
        right();
    }else if(a.keyCode==38){
        rotate();
    }
    else if(a.keyCode==40){
        movedown();
    }
}
document.addEventListener('keyup',control);

   
    function movedown(){
        undraw();
        pos+=width;
        draw();
        freeze();
    }
    //base is made solid so shapes dont sink

    function freeze(){
        if(current.some(index=>square[pos+index+width ].classList.contains('taken')))
        {
            current.forEach(index=>square[pos+index].classList.add('taken'))

            //new shape dropping
    random=nextRandom;
    nextRandom=Math.floor(Math.random()*(shapes.length))  ;
    current= shapes[random][0];
    pos=4;
    draw();
    displayShape();  
    addScore();
    gameover();
        }
    }

    function left(){
        undraw();
        const isLeft= current.some(index=>(pos+index)%width===0);

        if(!isLeft)   pos-=1;  //to ascertain left boundary

        if(current.some(index=>square[pos+index].classList.contains('taken')))
        pos+=1;

        draw();
    }
    
    function right(){
        undraw();
        const isRight= current.some(index=>(pos+index)%width===(width-1));
        if(!isRight)   pos+=1;  //to ascertain left boundary
        if(current.some(index=>square[pos+index].classList.contains('taken'))) pos-=1;
        
        draw();
    }

    function rotate(){
        undraw();
        currentRotation++;
        if(currentRotation===current.length)
        {currentRotation=0}
        current=shapes[random][currentRotation];
        draw();
    }
    //show shapes in minigrid 
    const displaySquare=document.querySelectorAll('.minigrid div')
    const displayWidth=4;
    const displayIndex=0;

    const nextShape=[
        [1,displayWidth+1,displayWidth*2+1,2] ,//L shape 
        [0,displayWidth,displayWidth+1,displayWidth*2+1],//Z
        [1,displayWidth,displayWidth+1,displayWidth+2],//T
        [0,1,displayWidth,displayWidth+1],   //O
        [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]//I
    ];

    //dislay thr shape in adv in mini grid
    function displayShape(){
        displaySquare.forEach(square=>{
            square.classList.remove('shape');
//            square.style.backgroundColor='';

        })
        nextShape[nextRandom].forEach(index=>{
            displaySquare[displayIndex+index].classList.add('shape');
  //          displaySquare[displayIndex+index].style.backgroundColor=colors[nextRandom];
        })
    }
  //adding the buttom
    btn.addEventListener('click',()=>{
        if(timer){
            clearInterval(timer)
            timer=null
        }else{
            draw();
            timer=setInterval(movedown,300);
            nextRandom=Math.floor(Math.random()*shapes.length);
            displayShape();
        }
    })
    
{ //arrayname.splice(startIndex,delCount) : splice is an inbuilt function
     //  in js to delete items from array from an index say 2 (start) to 
     // delete 2 items in array of any number of items 
     // in eg q=[a,s,d,f,g,h,j]
     //after splice(2,2) :->q=[a,s,g,h,j] 2 items from 2nd index deleted 
    // if delCount not given all items after start are deleted
// concat is used to merge two arrays
//append child is used to append child of class
}

function addScore(){
    for(let i=0;i<199;i+=width){
        const row=[i,i+1,i+2,i+3,i+4,i+5,i+6,i+7,i+8,i+9]
        if(row.every(index=>square[index].classList.contains('taken'))){
            score+=10;
            scoreDisplay.innerHTML=score;
            row.forEach(index=>{
                square[index].classList.remove('taken')
                square[index].classList.remove('shape')
    //            square[index].style.backgroundColor=''
                
            })
            const squareRemoved= square.splice(i,width);
            square=squareRemoved.concat(square)
            square.forEach(cell=>grid.appendChild(cell))
           }
        }
    }

    function gameover(){
        if(current.some(index=>square[pos+index].classList.contains('taken'))){
            scoreDisplay.innerHTML='end'

            clearInterval(timer);
        }
    }


});