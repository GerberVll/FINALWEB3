import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [completada, setCompletada] = useState(false);
  const [fechaVencimiento, setFechaVencimiento] = useState('');
  const [prioridad, setPrioridad] = useState('media');
  const [asignadoA, setAsignadoA] = useState('');
  const [categoria, setCategoria] = useState('');
  const [costoProyecto, setCostoProyecto] = useState('');
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      titulo,
      descripcion,
      completada,
      fecha_vencimiento: fechaVencimiento,
      prioridad,
      asignado_a: asignadoA,
      categoria,
      costo_proyecto: parseFloat(costoProyecto),
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/projects/${editProjectId}`, projectData);
        setIsEditing(false);
        setEditProjectId(null);
      } else {
        await axios.post('http://localhost:5000/api/projects', projectData);
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error("Error creating or updating project:", error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const editProject = (project) => {
    setTitulo(project.titulo);
    setDescripcion(project.descripcion);
    setCompletada(project.completada);
    setFechaVencimiento(project.fecha_vencimiento);
    setPrioridad(project.prioridad);
    setAsignadoA(project.asignado_a);
    setCategoria(project.categoria);
    setCostoProyecto(project.costo_proyecto);
    setIsEditing(true);
    setEditProjectId(project.id);
  };

  const resetForm = () => {
    setTitulo('');
    setDescripcion('');
    setCompletada(false);
    setFechaVencimiento('');
    setPrioridad('media');
    setAsignadoA('');
    setCategoria('');
    setCostoProyecto('');
    setIsEditing(false);
    setEditProjectId(null);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Aplicación de Proyectos</h1>
      
      <div className="card mb-4">
        <div className="card-header">
          <h2>{isEditing ? "Editar proyecto" : "Agregar nuevo proyecto"}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                placeholder="Fecha de vencimiento"
                value={fechaVencimiento}
                onChange={(e) => setFechaVencimiento(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <select className="form-select" value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Asignado a"
                value={asignadoA}
                onChange={(e) => setAsignadoA(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Categoría"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="Costo del proyecto"
                value={costoProyecto}
                onChange={(e) => setCostoProyecto(e.target.value)}
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary me-2">
                {isEditing ? "Actualizar" : "Crear"}
              </button>
              {isEditing && (
                <button type="button" onClick={resetForm} className="btn btn-secondary">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <h2>Lista de proyectos</h2>
      <ul className="list-group">
        {projects.map((project) => (
          <li key={project.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{project.titulo}</strong> - {project.descripcion} - ${project.costo_proyecto} - {project.completada ? "Completada" : "Incompleta"}
            </div>
            <div>
              <button onClick={() => editProject(project)} className="btn btn-warning btn-sm me-2">Editar</button>
              <button onClick={() => deleteProject(project.id)} className="btn btn-danger btn-sm">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;




