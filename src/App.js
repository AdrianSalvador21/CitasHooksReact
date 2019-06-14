import React, {Fragment, useState} from 'react';

function Cita({cita}) {
  return (
    <div className="cita">
      <p>Mascota: <span>{cita.mascota}</span></p>
      <p>Dueño: <span>{cita.propietario}</span></p>
      <p>Fecha: <span>{cita.fecha}</span></p>
      <p>Hora: <span>{cita.hora}</span></p>
      <p>Síntomas: <span>{cita.sintomas}</span></p>
    </div>
  )
}


function Formulario({crearCita}) {

  const initialState = {
    mascota : '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  };

  const [cita, actualizarCita] = useState(initialState);

  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value
    });
  };


  const enviarCita = e => {
    e.preventDefault();
    // Pasar la cita hacia el componente principla
    crearCita(cita);

    // Reiniciar el state (reiniciar el form)
    actualizarCita(initialState);
  };


  return (
    <Fragment>
      <h2>Crear Cita</h2>

      <form
         onSubmit={enviarCita}
      >
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={actualizarState}
          value={cita.mascota}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={actualizarState}
          value={cita.propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          className="u-full-width"
          name="fecha"
          onChange={actualizarState}
          value={cita.fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          className="u-full-width"
          name="hora"
          onChange={actualizarState}
          value={cita.hora}
        />

        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={cita.sintomas}
        ></textarea>

        <button type="submit" className="button-primary u-full-width">Agregar</button>
      </form>
    </Fragment>
  );
}

function App() {
  // useState retorna dos funciones
  // state actual y actualizar state
  const [citas, guardarCita] = useState([]);

  // Agregar las nuevas citas al state
  const crearCita = cita => {
    // Tomar una copia del state y agregar nuevo cliente
    const nuevasCitas = [...citas, cita];
    // Guardar state de vuelta
    guardarCita(nuevasCitas);
    console.log(citas);
  };

  return(
    <Fragment>
      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            {citas.map((cita, index) => (
              <Cita
                key={index}
                index={index}
                cita={cita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
