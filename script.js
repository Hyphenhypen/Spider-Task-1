const board = document.getElementById('board');
const imageInput = document.getElementById('imageInput');
const originalImage = document.getElementById('original_image');
const countSteps = document.getElementById('countSteps');
const randomButton = document.getElementById('randomButton');
const previousImages = document.getElementById('previousImages');
board.style.display = 'grid';
board.style.gridTemplateColumns = `repeat(3, 1fr)`;
board.style.gridTemplateRows = `repeat(3, 1fr)`;

let imageUrl = '10.jpg';
let solved = false;
let started = false;
let count = 0;
class Puzzle{
    constructor(id, position){
        this.id = id;
        this.backgroundPosition = position;
    }
};

let items = [];
items.push(new Puzzle(1, "top 0vmin left 0vmin"));
items.push(new Puzzle(2, "top 0vmin left -23.33vmin"));
items.push(new Puzzle(3, "top 0vmin left -46.66vmin"));
items.push(new Puzzle(4, "top -23.33vmin left 0vmin"));
items.push(new Puzzle(5, "top -23.33vmin left -23.33vmin"));
items.push(new Puzzle(6, "top -23.33vmin left -46.66vmin"));
items.push(new Puzzle(7, "top -46.66vmin left 0vmin"));
items.push(new Puzzle(8, "top -46.66vmin left -23.33vmin"));
items.push(new Puzzle(9, "top -46.66vmin left -46.66vmin"));

let docItems = createGrid(items, imageUrl);


imageInput.addEventListener('change', (e)=>{
    const file = e.target.files[0];
    imageUrl = URL.createObjectURL(file);
    board.innerHTML = "";
    items = [];
    items.push(new Puzzle(1, "top 0vmin left 0vmin"));
    items.push(new Puzzle(2, "top 0vmin left -23.33vmin"));
    items.push(new Puzzle(3, "top 0vmin left -46.66vmin"));
    items.push(new Puzzle(4, "top -23.33vmin left 0vmin"));
    items.push(new Puzzle(5, "top -23.33vmin left -23.33vmin"));
    items.push(new Puzzle(6, "top -23.33vmin left -46.66vmin"));
    items.push(new Puzzle(7, "top -46.66vmin left 0vmin"));
    items.push(new Puzzle(8, "top -46.66vmin left -23.33vmin"));
    items.push(new Puzzle(9, "top -46.66vmin left -46.66vmin"));
    docItems = createGrid(items, imageUrl);
    started = false;
    return true;
});

randomButton.addEventListener('click', (e)=>{
    randamise(items);
    board.innerHTML=""
    docItems = createGrid(items, imageUrl);
    return true;
})

function createGrid(items, imageUrl){
    console.log(imageUrl);
    let docItems = [];
    items.forEach((item) =>{
        const element = document.createElement('div');
        element.id = item.id;
        element.classList.add('grid-item');
        element.style.backgroundImage = `url(${imageUrl})`;
        originalImage.style.backgroundImage = `url(${imageUrl})`;
        element.style.backgroundPosition = item.backgroundPosition;
        element.style.backgroundSize = '70vmin 70vmin';
        if(item.id == 9){
            element.style.background = 'grey';
        }
        board.appendChild(element);
        docItems.push(element);
    });
    return docItems;
}

let check = [[1, 3], [0, 2, 4], [1, 5], [0, 4, 6], [1, 3, 5, 7], [2, 4, 8], [3, 7], [6, 4, 8], [5, 7]];
function eligible(index1, index2){
    let x = check[index2];
    console.log(x);
    for(let i=0; i<x.length; i++){
        if(x[i] === index1){
            console.log(index1);
            console.log(x[i]);
            return true;
        }
    }
    return false;
}

function randamise(items){
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
    return items;
}

function swap(items, index1, index2){
    if(eligible(index1, index2)){
        [items[index1], items[index2]] = [items[index2], items[index1]];
        count++;
        countSteps.innerHTML = count;
        started = true;
    }
    return items;
}

function isSolved(items){
   for(let i=0; i<docItems.length; i++){
     if(items[i].id != (i+1)){
        return false;
     }
   }
   return true;
}

function main(){
    requestAnimationFrame(main);
    // setTimeout(solved(items), 10000);
    if (isSolved(items) && started) {
        alert("solved")
        solved = false;
        started = false;
    }
}
requestAnimationFrame(main);

board.addEventListener('click', (e)=>{
    target = e.target;
    emptyItem = document.getElementById('9');

    let index1 = docItems.indexOf(target);
    let index2 = docItems.indexOf(emptyItem);
    items = swap(items, index1, index2);
    board.innerHTML = "";
    docItems = createGrid(items, imageUrl);
    
    return true;
});
