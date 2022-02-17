const tabla = document.getElementById("tablaUsuarios");
const $ = (id) => document.getElementById(id);


const abrirModalAgregar =()=>{
    $('modalAgregar').style.display= 'block';
 }
const abrirModalEditar = (id) =>{
   $('modalEditar').style.display= 'block';
   const usuario = informacion.find( dat => dat.id == id)
   mostrarDatosEditar(usuario)

}

const mostrarDatosEditar = (usuario) =>{
    $('nombreEditar').value = usuario.Nombre
    $('edadEditar').value = usuario.Edad 
    $('direccionEditar').value = usuario.Direccion
    $('ciudadEditar').value = usuario.Ciudad
    $('idEditar').value = usuario.id
}


 

let informacion; 
const renderTabla = ()=>{
    fetch("https://6207a592817d170017955b8a.mockapi.io/Usuarios")
.then(response=>response.json())
.then(data =>{
  const infoTabla =  data.reduce((acc, dat) => {
    return `${acc}
  <tr>
    <td >${dat.id}</td>
    <td>${dat.Nombre}</td>
    <td>${dat.Edad}</td>
    <td>@${dat.Direccion}</td>
    <td>@${dat.Ciudad}</td>
    <td><button class="btn btn-primary" id="btnEditar" onclick='abrirModalEditar(${dat.id})'>Editar</button></td>
    <td><button class="btn btn-danger" id="btnEliminar" >Eliminar</button></td>
  </tr>
  `;
  }, '');

  tabla.innerHTML = infoTabla;
  informacion = data;
})

}
renderTabla()

const guardarDatosEditados = (usuarios)=>{
const id = $('idEditar').value

    fetch(`https://6207a592817d170017955b8a.mockapi.io/Usuarios/${id}`
    , {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nombre:$('nombreEditar').value,
          Edad: $('edadEditar').value,
          Direccion:$('direccionEditar').value,
          Ciudad:$('ciudadEditar').value,
        }), 
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
      
        renderTabla()
      
}

const actualizarDom = () =>{
    renderTabla() 
}
actualizarDom( )