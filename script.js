var opened = true;



$(document).ready(function(){
    document.cookie = "info=tutorialsPoint; expires=Mon, 27 june 2022 12:00:00 UTC;";
    $(".fa-bars").click(function(){
        if (opened){
            $(".form_container").animate({top: '-68px'});
            opened = false;
        }else{
            $(".form_container").animate({top: '0px'});
            opened = true;
        }
        });
    });





let input = document.querySelector('.task');
let submit = document.querySelector('.confirme');
let tasks = document.querySelector('.tasks');

let arrayoftasks = [];

if (localStorage.getItem("tasks")){
    arrayoftasks = JSON.parse(localStorage.getItem("tasks"))
};

addoldtasks();


submit.onclick = function (){
    if (input.value!=''){
        additemtoarray(input.value)
    };
    input.value = "";
};

function additemtoarray(tasktoadd){
    const task = {
        id : Date.now(),
        title: tasktoadd,
        completed: false
    };

    arrayoftasks.push(task);

    addtaskstopage(arrayoftasks);
    addtaskstolocalstrg(arrayoftasks);

};

function addtaskstopage(tasktoloop){
    tasks.innerHTML = "";
    arrayoftasks.forEach((task)=> {

        const twisk = document.createElement("div");
        twisk.className = 'todo';
        twisk.id = task.id.toString();
        document.getElementById('c').appendChild(twisk);

        const spino = document.createElement("span");
        if(task.completed){
            spino.className = "the_task done";
            spino.setAttribute("onclick", "makeitundone("+task.id.toString()+")")
        }else{
            spino.className = "the_task";
            spino.setAttribute("onclick", "makeitdone("+task.id.toString()+")")
        };
        spino.id = "___"+task.id.toString();
        spino.innerHTML = task.title;
        document.getElementById(task.id.toString()).appendChild(spino);

        let spinoo = document.createElement("span");
        spinoo.className = "delete";
        spinoo.id = "_"+task.id.toString();
        document.getElementById(task.id.toString()).appendChild(spinoo);

        let icon = document.createElement('i');
        icon.className = 'fa-solid fa-trash'
        icon.id = "__"+task.id.toString();
        icon.setAttribute('onclick', 'delet('+task.id.toString()+')');
        document.getElementById("_"+task.id.toString()).appendChild(icon);

    
    })
};

function addtaskstolocalstrg(array){
    window.localStorage.setItem('tasks', JSON.stringify(arrayoftasks));
    var value = "some_value";
    document.cookie="key="+value;
};

function addoldtasks(){
    if (localStorage.getItem("tasks")){
        addtaskstopage(arrayoftasks);
    }

};

function delet(id){
    const elementt = document.getElementById(id);
    elementt.remove();
    temparray = []
    for (let i=0; i<arrayoftasks.length;i++){
        if (arrayoftasks[i].id!=id){
            temparray.push(arrayoftasks[i])
        };
    };
    arrayoftasks = temparray;
    window.localStorage.setItem('tasks', JSON.stringify(arrayoftasks));
};

function makeitdone(id){
    const elm = document.getElementById("___"+id);
    elm.className = "the_task done";
    elm.setAttribute("onclick", "makeitundone("+id+")")

    for (let i=0; i<arrayoftasks.length;i++){
        if (arrayoftasks[i].id==id){
            arrayoftasks[i].completed = true
        };
    };
    window.localStorage.setItem('tasks', JSON.stringify(arrayoftasks));
}

function makeitundone(id){
    const elm = document.getElementById("___"+id);
    elm.className = "the_task";
    elm.setAttribute("onclick", "makeitdone("+id+")")

    for (let i=0; i<arrayoftasks.length;i++){
        if (arrayoftasks[i].id==id){
            arrayoftasks[i].completed = false
        };
    };
    window.localStorage.setItem('tasks', JSON.stringify(arrayoftasks));
}