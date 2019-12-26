// alert('Working dude!')
let textInput = document.getElementById('textarea');
let noteList = document.getElementById('note-list');
let addBtn = document.getElementsByClassName('add-note')[0];
let ids = 0;
let notesArrey = [];
textInput.addEventListener('focus', () => {
	addBtn.classList.add('pulse')
})
textInput.addEventListener('blur', () => {
	addBtn.classList.remove('pulse')
})
// Editar Settings
const clearNote =  () => {
	textInput.value = "";
	textInput.focus()
	 M.toast({html: 'Cleared Input!'});
		  setTimeout(() => {
		  	M.Toast.dismissAll()
		  }, 1000)
}
const copyNote = () => {
	let a = textInput.value;
	if (a === "") {
 M.toast({html: 'Nothing to copy!'});
		  setTimeout(() => {
		  	M.Toast.dismissAll()
		  }, 1000)

		}
		else {
			 textInput.select();
  		 textInput.setSelectionRange(0, 99999); /*For mobile devices*/
		  /* Copy the text inside the text field */
 		 document.execCommand("copy");
					}
}
const addNote = () => {
	let a = textInput.value;
	if (a === "" ) {
		 M.toast({html: 'Please enter a Note!'});
		  setTimeout(() => {
		  	M.Toast.dismissAll()
		  }, 2000)
	}
	else if (a.length > 500) {
		M.toast({html: 'Charecter limit Reached!'});
		  setTimeout(() => {
		  	M.Toast.dismissAll()
		  }, 2000)
	}
	else  {
		noteList.innerHTML += `
		<li id="${ids+1}" class="flow-text note-item" onmouseover="delHover(${ids+1})" onmouseout="delOut(${ids+1})">
			${a}
		 <a class="btn-floating waves-effect waves-light right close-button  btn ${ids+1}" onclick="deleteNote(${ids+1})" ><i class="material-icons">delete</i></a>
		</li>
		`;
		    // Storing Dat In Localstorage
  		 notesArrey.push({"id": `${ids+1}`, "contant": `${a}`});  
  		 localStorage.setItem('notesArrey', JSON.stringify(notesArrey));
  		 ids += 1;
		textInput.value = "";
		textInput.focus()
		 M.toast({html: 'Note Added!'});
		  setTimeout(() => {
		  	M.Toast.dismissAll()
		  }, 1000)
			}
		}

	// note-list Settings
	const deleteNote = (e) => {
		document.getElementById(e).remove();
	for (let i =0; i < notesArrey.length; i++) {
      if (notesArrey[i].id == e) {
      	notesArrey.splice(i,1);
       localStorage.removeItem('notesArrey');
      localStorage.setItem('notesArrey', JSON.stringify(notesArrey));
          break;
      }
  }
     	  M.toast({html: 'Deleted note!'});
		  setTimeout(() => {
		  	M.Toast.dismissAll()
		  }, 1000)
	}
	const delHover = (e) => {
		let a= document.getElementsByClassName(e)[0];
		a.classList.add('pulse');
	}
	const delOut = (e) => {
		let a= document.getElementsByClassName(e)[0];
		a.classList.remove('pulse');
	}


	const loadTasks = () => {
    let addedNotes = JSON.parse(localStorage.getItem('notesArrey'));
    ids = notesArrey.length
     for (let i =0; i < addedNotes.length; i++) {
        console.log(addedNotes[i])
        notesArrey.push({"id": `${addedNotes[i].id}`, "contant": `${addedNotes[i].contant}`}); 
      noteList.innerHTML += `
      <li id="${addedNotes[i].id}" class="flow-text note-item" onmouseover="delHover(${addedNotes[i].id})" onmouseout="delOut(${addedNotes[i].id})">
			${addedNotes[i].contant}
		 <a class="btn-floating waves-effect waves-light right close-button  btn ${addedNotes[i].id}" onclick="deleteNote(${addedNotes[i].id})" ><i class="material-icons">delete</i></a>
		</li>
     `;
     }
  }

     window.addEventListener('load', () => {
      // console.log('page is fully loaded');
      loadTasks();
    });
    
      
  window.onload = () => {
'use strict';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('./sw.js');
}
}