 // init all components and load database
 
 loadData();

 const tableRows = document.getElementById('tableRows');
 const btnAjouter = document.getElementById('ajouter');
 const btnModifier = document.getElementById('modifier');
 const btnSupprimer = document.getElementById('supprimer');

 hideButtons();


 // load database
 function loadData(){
  fetch('http://localhost:7000/personne/read').then(res => res.json())
    .then(function(data){
         console.log(data)
         data.forEach(personne => {
            const row = document.createElement('tr')
            row.innerHTML = `<td>${personne.id}</td>
                             <td>${personne.nom}</td>
                             <td>${personne.prenom}</td>`
            tableRows.appendChild(row);
         });
    })        
}


btnSupprimer.addEventListener('click', function(){
if(isRowSelected() == false){
     alert("Selectionnez une personne à supprimer ⛔")
     return;
}

let id = getSelectedRowId();
fetch("http://localhost:7000/personne/delete/" + id,{
         method : 'DELETE',
     })
 location.reload();
 alert("Supression Effectuée ✅")
})


btnAjouter.addEventListener('click', function(){
    btnAjouter.setAttribute('href', `../page/add.html`);
})

btnModifier.addEventListener('click', function(){
    if(isRowSelected() == false){
        alert("Selectionnez une personne à modifier ⛔")
        return;
   }
    let id = parseInt(getSelectedRowId());
    if(id==0){
        return;
    }
    btnModifier.setAttribute('href', `../page/edit.html?id=${id}`);
})

function deselectAllRows(){
     for(var i = 0; i<tableRows.children.length; i++){
         tableRows.children[i].style.color = "black";
         tableRows.children[i].style.backgroundColor = "lightgrey";
     }
     hideButtons();
}


function isRowSelected(){
     for(var i = 0; i < tableRows.children.length; i++){
         if(tableRows.children[i].style.color == "white"){
             return true
         }
     }
     return false;
}


function getSelectedRowId(){
     for(var i = 0; i < tableRows.children.length; i++){
         if(tableRows.children[i].style.color == "white"){
             return tableRows.children[i].children[0].textContent;
         }
     }
     alert("error while getting selected row id");
     return 0;
}

function hideButtons(){
    btnModifier.style.visibility = "hidden";
    btnSupprimer.style.visibility = "hidden";
}

function showButtons(){
    btnModifier.style.visibility = "visible";
    btnSupprimer.style.visibility = "visible";
}


tableRows.addEventListener('click', function(e){
     e.stopPropagation();
     deselectAllRows();  
     e.srcElement.parentElement.style.color = "white";
     e.srcElement.parentElement.style.backgroundColor = "cadetblue";
     showButtons();
 })
 
 document.addEventListener('click', function(){
    deselectAllRows();
 })
