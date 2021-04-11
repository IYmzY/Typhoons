import firebaseConfig from './firebaseConfig.js'

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore();

let deconnexionButton = document.querySelector('.deconnexionButton')

deconnexionButton.addEventListener('click', () => {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        window.location.href = 'login.html'
    }).catch((error) => {
        // An error happened.
    });
});

const updateAdmin = () => {
    let tableAdmin = document.querySelector('.tableAdmin')
    db.collection("Live").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            tableAdmin.innerHTML += `
            <tr>
              <td>${doc.data().date}</td>
              <td>${doc.data().infos}</td>
              <td>
                <button class="btn btn-danger deleteAdmin" data-id="${doc.id}" type="button">delete</button>
              </td>
              <td>
                <button class="btn btn-success editAdmin" data-id="${doc.id}" type="button">EDIT</button>
             </td>
            </tr>`
            deleteButtons()
            editButtons()
        })
    })
    const deleteButtons = () => {
        let deleteButton = document.querySelectorAll(".deleteAdmin")
        for (let y = 0; y < deleteButton.length; y++) {
            deleteButton[y].addEventListener('click', () => {
                db.collection('Live').doc(`${deleteButton[y].dataset.id}`).delete().then(() => {
                    document.location.reload()
                }).catch((error) => {
                    console.error(' ERROR DELETE', error);
                })

            })

        }
    }
    const editButtons = () => {
        let editButton = document.querySelectorAll('.editAdmin')
        for (let y = 0; y < editButton.length; y++) {
            editButton[y].addEventListener('click', () => {
                db.collection('Live').doc(`${editButton[y].dataset.id}`).get().then((doc) => {
                    let formulaireEditAdmin = document.querySelector('.formulaireEditAdmin')
                    let editDateAdmin = document.querySelector('.editDateAdmin')
                    let editInfosAdmin = document.querySelector('.editInfosAdmin')
                    let editButtonAdmin = document.querySelector('.editButtonAdmin')
                    formulaireEditAdmin.style.display = 'flex'
                    editDateAdmin.value = doc.data().date;
                    editInfosAdmin.value = doc.data().infos;
                    editButtonAdmin.addEventListener("click", () => {
                        db.collection('Live').doc(`${editButton[y].dataset.id}`).set({
                            date: editDateAdmin.value,
                            infos: editInfosAdmin.value,
                        }).then(() => {
                            document.location.reload()
                        })

                    })


                })

            })

        }
    }
}



updateAdmin()



