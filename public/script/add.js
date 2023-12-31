const btnAjouter = document.getElementById("ajouter");
const btnAnuller = document.getElementById("anuller");

btnAjouter.addEventListener('click', function(){
    if(txtName.value == '' || txtAge.value == ''){
         alert("Vous devez remplir tous les champs ❌");
         return;
    }
        fetch("http://localhost:7000/personne/add",{
             method : 'POST',
             body:JSON.stringify({
                 name : txtName.value,
                 age : txtAge.value
             }), 
             headers:{
                 "Content-type":"application/json; charset=UTF-8"
             }
         })

    btnAjouter.setAttribute('href','../page/personne.html');

    alert("Enregistrement Effectuée ✅");
         
    })


btnAnuller.addEventListener('click', function(){
    btnAnuller.setAttribute('href','../page/personne.html');
})