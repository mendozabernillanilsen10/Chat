import './ProgressGraph.css'; // Archivo CSS para los estilos personalizados

import React, {
  useEffect,
  useState,
} from 'react';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Archivo CSS para los estilos personalizados

const ProgressGraph = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
  
    fetch(`${import.meta.env.VITE_API_URL}/api/getExamResults/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos del backend:", data); // Debug log
        if (data.success) {
          setResults(
            data.results.map((result) => ({
              materia: result.Materia,
              correctas: result.Correctas,
              total: result.Correctas + result.Incorrectas,
              fecha: result.Fecha,
            }))
          );
        } else {
          console.error("Error al obtener resultados:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error al conectar con el servidor:", error);
      });
  }, []);

  return (
    <div className="progress-card">
      <div className="progress-card-header">
        <h2>Progreso en Exámenes</h2>
      </div>
      <div className="progress-card-body">
        {results.length > 0 ? (
          <BarChart width={600} height={300} data={results}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="materia" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="correctas" fill="#FF0000" name="Correctas" />
            <Bar dataKey="total" fill="#FFD700" name="Total" />
          </BarChart>
        ) : (
          <p>No hay datos de progreso disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default ProgressGraph;