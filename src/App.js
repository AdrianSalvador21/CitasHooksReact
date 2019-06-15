import React, {Fragment, useState, useEffect} from 'react';

function Cita({cita, index, eliminarCita}) {
  return (
    <div className="cita">
      <p>Mascota: <span>{cita.mascota}</span></p>
      <p>Dueño: <span>{cita.propietario}</span></p>
      <p>Fecha: <span>{cita.fecha}</span></p>
      <p>Hora: <span>{cita.hora}</span></p>
      <p>Síntomas: <span>{cita.sintomas}</span></p>
      <button type="button"
              onClick={() => eliminarCita(index)}
              className="button eliminar u-full-width">
        Eliminar X
      </button>
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
  // Cargar las citas del localStorage como state inicial
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }
  // useState retorna dos funciones
  // state actual y actualizar state
  const [citas, guardarCita] = useState(citasIniciales);

  // Agregar las nuevas citas al state
  const crearCita = cita => {
    const nuevasCitas = [...citas, cita];
    // Tomar una copia del state y agregar nuevo cliente
    // Guardar state de vuelta
    guardarCita(nuevasCitas);
    console.log(citas);
  };

  // Eliminar citas del state
  const eliminarCita = index => {
    const nuevasCitas = [...citas];
    nuevasCitas.splice(index, 1);
    guardarCita(nuevasCitas);
  };

  // Cargar efecto para guardar en el localStorage
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);


  // Cargar condicionalmente un titulo
  const titulo = Object.keys(citas).length === 0 ? 'No hay citas' : 'Administrar las citas';
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
            <h2>{titulo}</h2>

            {citas.map((cita, index) => (
              <Cita
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
