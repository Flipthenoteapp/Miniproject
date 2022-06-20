// Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);
        let confirmDel = confirm("Delete this note?");
        if (confirmDel == true) {
            let notes = localStorage.getItem("notes");
            if (notes == null) {
                notesObj = [];
            } else {
                notesObj = JSON.parse(notes);
            }
    
            notesObj.splice(index, 1);
            localStorage.setItem("notes", JSON.stringify(notesObj));
            showNotes();
        }
      
    }