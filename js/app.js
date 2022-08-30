const loadProducts = (searchText , limitation) => {
   const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
   fetch(url)
   .then(res => res.json())
   .then(data =>displayProducts(data.data, limitation)); 
}

const displayProducts = (products, limitation) => {
   const mainContainer = document.getElementById("main-container");
   mainContainer.innerHTML = ``; 
   const NotFound = document.getElementById('noFoundText'); 
   if(products.length < 1){
         NotFound.classList.remove('d-none'); 
   }else{
      NotFound.classList.add('d-none'); 
   }
   const showBtn = document.getElementById('showAllBtn'); 
   if(limitation <= 10 && products.length > 10){
      products = products.slice(0,10);
      showBtn.classList.remove('d-none'); 
   }else{
      showBtn.classList.add('d-none'); 
      products = products; 
   }
   products.forEach(product => {
      const card = document.createElement('div'); 
      card.classList.add("col-12","g-2","col-sm-6","col-md-4", "col-lg-3"); 
      card.innerHTML=`
      <div>
      <div class="card">
      <img src="${product.image}" class="card-img-top img" alt="">
      <div class="card-body">
        <h5 class="card-title">${product.phone_name}</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <button class="btn btn-primary d-block mx-auto text-center" onclick="loadUniqueProdcut('${product.slug}')" data-bs-toggle="modal" data-bs-target="#productModal">show details</button>
      </div>
    </div>
      </div>
      `;      
      mainContainer.appendChild(card);       
   }); 
   toggleSpinner(false); 
}

const processControl = (limitation)=> {
   const searchField = document.getElementById("searchField"); 
   const searchKeyWord =searchField.value; 
   toggleSpinner(true);       
   loadProducts(searchKeyWord, limitation); 
}

document.getElementById('searchBtn').addEventListener('click', function(){
      
      processControl(10);  
         
}); 

document.getElementById('showAllBtn').addEventListener('click', function(){
          processControl(); 
})

document.getElementById('searchField').addEventListener('keypress', function(event){
   if(event.key === 'Enter'){
      processControl(10); 
   }
})

const toggleSpinner = isload => {
   const spinner = document.getElementById('spinner'); 
   if(isload){
      spinner.classList.remove('d-none'); 
   }else{
      spinner.classList.add('d-none'); 
   }
}




const loadUniqueProdcut = async id => {
   const url =`https://openapi.programming-hero.com/api/phone/${id}`; 
   const res = await fetch(url); 
   const data =await res.json(); 
   displayProductOnModal(data.data); 
}


const displayProductOnModal = product => {
   const productTitle = document.getElementById('productTitle'); 
   productTitle.innerText = product.name; 
   const modalBody = document.getElementById('modal-body'); 
   modalBody.innerHTML =`
      <h3 class="text-center text-capitalize fw-bold text-warning" >Product Details: </h3>
      <p class="fw-bold">Storage: ${product?.mainFeatures ? product.mainFeatures?.storage : "No Storage Sefecify"}</p>
      <p class="fw-bold">Chipset: ${product?.mainFeatures ? product.mainFeatures?.chipSet : "No Storage Sefecify"}</p>
      <p class="fw-bold">displaySize: ${product?.mainFeatures ? product.mainFeatures?.displaySize : "displaySize not Sefecify"}</p>
      <p class="fw-bold">Release Date: ${product?.releaseDate}</p>
      <h4 class="text-center text-capitalize fw-bold text-warning">sensors available:</h4>
      <ul id="sensors"></ul>
   `; 
   const ul = document.getElementById('sensors');
   const sensors = product?.mainFeatures?.sensors; 
   sensors.forEach(sensor => {
      const li = document.createElement('li'); 
      li.innerText =  sensor; 
      ul.appendChild(li); 
   })
   console.log(product); 
}
