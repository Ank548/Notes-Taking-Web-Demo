const addtext = document.querySelector('.addtext');
const mainDiv = document.querySelector('#main');


addtext.addEventListener('click', () => {
    NotesAdd();
    savedata();
});

const NotesAdd = (text = '') => {
    const CDiv = document.createElement('div');
    CDiv.classList.add('note');
    CDiv.innerHTML = `
            <div class="icon">
                <i class="save fa-solid fa-floppy-disk"></i>
                <i class="trash fa-solid fa-trash"></i>
            </div>
            <div><textarea>${text}</textarea></div>
    `;
    mainDiv.appendChild(CDiv);

    const save = CDiv.querySelector('.save');
    const trash = CDiv.querySelector('.trash');

    trash.addEventListener('click', () => {
        CDiv.remove();
        savedata();
    })
    save.addEventListener('click', () => {
        savedata();
    })
    CDiv.addEventListener('focusout', () => {
        savedata();
    })
}


function savedata() {
    const Notes = document.querySelectorAll('.note textarea');
    const Data = [];
    Notes.forEach(note => {
        Data.push(note.value);
    });

    localStorage.setItem('Notes', JSON.stringify(Data));
    if (Data.length === 0) {
        localStorage.removeItem("Notes");
    }
}


(() => {
    const Data = JSON.parse(localStorage.getItem('Notes'));
    if (Data === null) {
        NotesAdd();
    }
    else {
        Data.forEach((note) => {
            NotesAdd(note);
        })
    }

    // const Notes = document.querySelectorAll('.note textarea');
    // Notes.forEach((note, index) => {
    //     note.value = Data[index];
    // })


})()