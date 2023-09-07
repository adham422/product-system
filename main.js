let title =document.getElementById("title");
let category =document.getElementById("category");
let count =document.getElementById("count");
let price =document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let submit =document.getElementById("submit");
let searchtitle =document.getElementById("search-title");
let searchcatgory =document.getElementById("search-catgory");

let mood ='create';
let tmp;
//function gettotal
//function save localstorAGE

function getTotal(){
    if(price.value!='')
    {
        total.innerHTML=((+price.value + +taxes.value + +ads.value) - +discount.value);
        total.style.backgroundColor ="#040";
    }
    else {
        total.innerHTML='';
        total.style.backgroundColor ="#a00d02";
    }
}

//function create product

if(localStorage.product !=null){
    dataPro = JSON.parse(localStorage.product)
}else {
    dataPro=[];
}

function createProduct(){
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(mood==='create'){
        if(newPro.count > 1){
            for(let j=0;j<newPro.count;j++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
        }
    }else{
        dataPro[tmp]=newPro;
        mood='create';
        submit.innerHTML='create'
        count.style.display='block';
    }
    
    localStorage.setItem('product', JSON.stringify(dataPro));
    console.log(dataPro);

    clearInputs();
    showData();
}

//function CLEAR INPUTS

function clearInputs(){
   title.value='';
   price.value='';
   ads.value='';
   taxes.value='';
   category.value='';
   total.innerHTML='';
   discount.value='';
   count.value='';
}

//function read

function showData() {
    getTotal();
    let table = '';
    for(let i=0;i<dataPro.length;i++){
        table +=`<tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="update" onclick="updatData(${i})">update</button></td>
        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
    </tr>`;
        
    }

    document.getElementById("tbody").innerHTML = table;
    let btndelete =document.getElementById("deleteAll");
    if(dataPro.length >0){
        btndelete.innerHTML=`<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
    }else {
        btndelete.innerHTML=``;
    }
}
showData();

//function delete

function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();
}

function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

function updatData(i) {
    tmp=i;
    title.value = dataPro[i].title;
    price.value =dataPro[i].price;
    category.value=dataPro[i].category;
    count.style.display="none";
    ads.value=dataPro[i].ads;
    taxes.value =dataPro[i].taxes;
    discount.value=dataPro[i].discount;
    getTotal();
    submit.innerHTML='Update';
    mood='update';
    scroll({
        top:0,
        behavior:"smooth"
    })
}

//search

let searchmode ='title';
function getsearchmode(id) {
    let search =document.getElementById("search");
    if(id =='searchtitle'){
        searchmode ='title';
        search.placeholder="search by title";
    }else{
        searchmode ='category';
        search.placeholder = "search by category";
    }
    search.focus();
    search.value='';
    showData();
}

function searchdata(value){
    let table='';
    if(searchmode  =='title'){
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].title.includes(value)){
                table +=`<tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updatData(${i})">update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
            </tr>`;
            }
        }

    }else{
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].category.includes(value)){
                table +=`<tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updatData(${i})">update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
            </tr>`;
            }
        }

    }
    document.getElementById("tbody").innerHTML = table;

}