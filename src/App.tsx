import "./App.css";
import { DataTable } from "./components/DataTable";
import { calcularDiferenciaDias } from "./utils/date-utils";

interface Estudiante {
  id: string;
  nombre: string;
  email: string;
  curso: number;
}

const estudiantes: Estudiante[] = [
  {
    id: "EST-001",
    nombre: "Ana López",
    email: "ana@universidad.es",
    curso: 1,
  },
  {
    id: "EST-002",
    nombre: "Carlos Ruiz",
    email: "carlos@universidad.es",
    curso: 2,
  },
  {
    id: "EST-003",
    nombre: "Lucía Pérez",
    email: "lucia@universidad.es",
    curso: 3,
  },
];

function App() {
  const fechaInicio = new Date("2026-01-10");
  const fechaFin = new Date("2026-01-25");
  const diferenciaDias = calcularDiferenciaDias(fechaInicio, fechaFin);

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <h1>Gestión universitaria</h1>

      <p>
        Diferencia entre fechas de ejemplo: <strong>{diferenciaDias}</strong> días
      </p>

      <DataTable
        datos={estudiantes}
        columnas={[
          { key: "nombre", label: "Nombre" },
          { key: "email", label: "Email" },
          { key: "curso", label: "Curso" },
        ]}
      />
    </div>
  );
}

export default App;