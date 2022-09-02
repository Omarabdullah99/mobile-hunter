function phoneLoader(searchText,dataLimit){
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res=>res.json())
    .then(pdatas=> showPhoneLoader(pdatas.data,dataLimit))
}

const showPhoneLoader=(pdatas,dataLimit)=>{
    const molideContainer=document.getElementById('mobile-container')
    const modalId=document.getElementById('defaultModal')

    //load dewer por chole jabe
    molideContainer.textContent='';

    //display 10 phone and show all button show and block
    const showAll=document.getElementById('showAll')
    if( dataLimit && pdatas.length >10){
        pdatas=pdatas.slice(0,10)
        showAll.classList.remove('hidden')

    }
    else{
        showAll.classList.add('hidden')
    }
    

    //no phone message show
    const noPhone=document.getElementById('noPhone')
    if(pdatas.length ===0){
        noPhone.classList.remove('hidden')

    }
    else{
        noPhone.classList.add('hidden')
    }

   //display all phone 
   pdatas.forEach(phone=>{
    console.log(phone)
    const phoneDiv=document.createElement('div')
    phoneDiv.classList.add('singlePhone')
    phoneDiv.innerHTML=`
    <div class="card">
            <img src="${phone.image}" alt="hereimg">
            <div class="card-body">
                <h5 class="text-lg font-bold">Brand: ${phone.brand}</h5>
                <h5 class="text-lg font-bold">Phone Title: ${phone.phone_name}</h5>
                <button onclick="btnDetails('${phone.slug}')" class="bg-blue-500 block mt-5  text-white font-bold py-2 px-4 rounded" >
                Show Details
               </button>

              
                
    `
    molideContainer.appendChild(phoneDiv)

   })
  

   //stop loading
   toggleLoader(false)
}

//process search. This function include btn-search and btn show all
const processSearch=(dataLimit)=>{
    //start loader
    //loader function parameter
    toggleLoader(true)
    const searchField=document.getElementById('searchPhone');
    //searchText ta phoneLoader er parameter hisabe jabe
    const searchText=searchField.value;
    phoneLoader(searchText,dataLimit)
    // searchField.value=''


}

//search function
document.getElementById('btn-search').addEventListener('click',function(){
    processSearch(10)
})

//search field e inter korle data show hobe, tahole search field er niche button e click na korle hobe
document.getElementById('searchPhone').addEventListener('keypress',function(e){
    if(e.key=== 'Enter'){
        processSearch(10)
    }
})

//loader function
const toggleLoader=isLoading=>{
    const loaderSection=document.getElementById('loading')
    if(isLoading){
        loaderSection.classList.remove('hidden')
    }
    else{
        loaderSection.classList.add('hidden')
    }
}

//show all button function
document.getElementById('btnShowAll').addEventListener('click',function(){
    processSearch();
})

//phnone er button details function

const btnDetails=(id)=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(buttondatas=> finalBtnDetails(buttondatas.data))

    
}
const finalBtnDetails=(detailsData)=>{
    const phoneDetails=document.getElementById('phoneDetails');
    phoneDetails.textContent=''
    const phoneDetailsDiv=document.createElement('div')

    phoneDetailsDiv.innerHTML=`
    <img src="${detailsData.image}" alt="">
    <h3 class="text-lg font-bold">Brand:${detailsData.brand}</h3>
    <h3 class="text-lg font-bold">Name:${detailsData.name}</h3>
    <h3 class="text-lg font-bold">ChipSet:${detailsData.mainFeatures.chipSet}</h3>
    <h3 class="text-lg font-bold">DisplaySize:${detailsData.mainFeatures.displaySize}</h3>
    <h3 class="text-lg font-bold">Memory:${detailsData.mainFeatures.memory}</h3>
    <h3 class="text-lg font-bold">Sensors:${detailsData.mainFeatures.sensors}</h3>
    <h3 class="text-lg font-bold">RelesDate:${detailsData.releaseDate}</h3>


    
    

    `
    phoneDetails.appendChild(phoneDetailsDiv)

}

//click korar age jate auto loade na hoy a joono aita comment kora
// phoneLoader('')