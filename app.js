const express = require('express');
const animales = require('./animales');

const app = express();

app.use(express.static('public'))

app.get('/', function(request, response){


    let animaTable = '';
    
    animales.forEach(animal => {

            animaTable += `<tr> 
                <td>${animal.nombre}</td>
                <td> ${animal.tipo}</td>
                <td> ${animal.edad} años</td>        
                <td>
                    <form action="/adoptar">
                        <input type="hidden" name="nombre" id="nombre">
                        <input type="hidden" name="tipo" id="tipo">
                        <input type="hidden" name="edad" id="edad">
                        <button type="submit" id='adoptar'>adoptar ${animal.nombre}</button>
                    </form>
                </td>        
            </tr>`;
    });

    response.send(`
    <table border="1" cellpadding="10">
        <tbody>
            <tr>
                <td>Nombre</td>
                <td>Tipo</td>
                <td>Edad</td>
                <td>Adoptar</td>
            </tr>
            <tr>
                ${animaTable}
            </tr>
        </tbody>
    </table>`);
});

app.get('/sumar-animal', function(request, response){
    const nombre = request.query.nombre;
    const tipo = request.query.tipo;
    const edad = parseInt(request.query.edad);

    const animal = {nombre, tipo, edad};

    animales.push(animal)
    console.log(animales);
    let animaTable = '';
    
    animales.forEach(animal => {

            animaTable += `<tr> 
                <td>${animal.nombre}</td>
                <td> ${animal.tipo}</td>
                <td> ${animal.edad} años</td>
                <td>
                    <form action="/adoptar">
                        <input type="hidden" name="nombre" id="nombre" value='${animal.nombre}'>
                        <button type="submit" id='adoptar'>adoptar ${animal.nombre}</button>
                    </form>
                </td>            
            </tr>`;
    });

    response.send(`
    <table border="1" cellpadding="10">
        <tbody>
            <tr>
                <td>Nombre</td>
                <td>Tipo</td>
                <td>Edad</td>
                <td>Adoptar</td>
            </tr>
            <tr>
                ${animaTable}
            </tr>
        </tbody>
    </table>`);
});

app.get('/adoptar', function(request, response){
    const nombreAdoptado = request.query.nombre;
    const indiceAnimal = animales.findIndex((animal)=>{
        return animal.nombre == nombreAdoptado;
        })

        if (indiceAnimal != -1){

            animales.splice(indiceAnimal, 1);
            console.log(animales);
            response.send(`El animal ${nombreAdoptado} se ha adoptado correctamente`);

            } else{
                response.send("No existe un animal con ese nombre");
            };
});


app.listen(process.env.PORT || 3000, (e) =>{
    e
    ? console.log(`Error en servidor: ${e}`)
    : console.log("Servidor andando!");
});