function refreshPage(){
    window.location.reload();
} 

//get submit button here ...
var submit = document.getElementById('submit');

submit.addEventListener('click' , postData);

function postData(e) {  

    e.preventDefault();
   
    let obj ={
       Price : document.getElementById('price').value ,
       Name :  document.getElementById('name').value ,
       Category: document.getElementById('category').value
    }

    axios.post('https://crudcrud.com/api/02b70e65abac40aab17b01d662632fce/seller', obj)
    .then(res =>  {
        console.log(res) ,
        refreshPage()
    }
        
    )
    .catch(err => 
        console.log(err))
}





//show on screen
function showNewUserOnScreen(obj){

    //electronic parent
    
    const list = document.createElement('li') // list created here 
    var deletebtn = document.createElement('button'); //button created here ..
    deletebtn.className="btn btn-danger btn-sm float-right delete";
    deletebtn.textContent ='deleteProduct'; 

    //now add content & button in the list now ..
    list.textContent=obj.Price+'-'+obj.Name+'-'+obj.Category+ "  ";
    list.appendChild(deletebtn);

    if(obj.Category === "electronics"){
        let electronics = document.getElementById('e');
        electronics.appendChild(list);
    }

    if(obj.Category === "food"){
        let food = document.getElementById('f');
        food.appendChild(list);
    }

    if(obj.Category === "skincare"){
        let skincare = document.getElementById('s');
        skincare.appendChild(list);
    }
}



//add the deletFunctionality

//now add delete Functionality in it 
var deleteButton = document.getElementById('main');

deleteButton.addEventListener('click' , DeleteFun);


 function DeleteFun(e){
    
    // it will target the calss which contains delete in it 
    if(e.target.classList.contains('delete')){

        //it will target the parent element ...
        var li = e.target.parentElement;
        //remove the child ..
        deleteButton.removeChild(li);

        axios.delete('https://crudcrud.com/api/02b70e65abac40aab17b01d662632fce/seller' + e._id + " ").then(
            res => console.log(res)
            .catch(err => console.log(err))
        )
    }
 }



window.addEventListener("DOMContentLoaded",()=>{
    axios.get('https://crudcrud.com/api/02b70e65abac40aab17b01d662632fce/seller')
    .then((res)=>{
      console.log(res);
      for(var i=0;i<res.data.length;i++){
          showNewUserOnScreen(res.data[i]);
      }
    })
    .catch((err)=>{
      console.log(err);
    })
   
  })
