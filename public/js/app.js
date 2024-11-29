// Inicializar PouchDB
const db = new PouchDB('mi_primer_db_emiliano_ortiz');

// Función para obtener datos desde la API y guardarlos en PouchDB
function fetchData() {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            // Guardar los datos en la base de datos local
            db.put({
                _id: 'data',
                message: data.message
            }).then(() => {
                // Actualizar la UI con los datos almacenados
                document.getElementById('titulo').innerText = data.message;
            });
        })
        .catch(err => {
            console.error('Error al obtener datos:', err);

            // Si ocurre un error, intentar obtener los datos del cache (PouchDB)
            db.get('data').then(doc => {
                document.getElementById('titulo').innerText = doc.message;
            }).catch(error => {
                document.getElementById('titulo').innerText = 'No se pudieron cargar los datos.';
            });
        });
}

// Llamamos a la función para cargar los datos
fetchData();