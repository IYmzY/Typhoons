
const db = firebase.firestore();

let datesAdmin = document.querySelector('.datesAdmin')
let infosAdmin = document.querySelector('.infosAdmin')
let submitAdmin = document.querySelector('.submitAdmin')

submitAdmin.addEventListener('click', () => {
    console.log(datesAdmin.value);
    db.collection("Live").add({
        date: datesAdmin.value,
        infos: infosAdmin.value,
    }).then((docRef) => {
        console.log(docRef.id);
        window.location.href = 'admin.html';
    }).catch((error) => {
        console.error("Error adding document: ", error);
    });
})

