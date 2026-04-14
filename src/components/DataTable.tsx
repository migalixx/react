import { useState } from "react";

// Define cómo se describe cada columna de la tabla
export type Columna<T> = {
  key: keyof T;
  label: string;
};

// El componente exige que cada fila tenga al menos una propiedad id
interface DataTableProps<T extends { id: string | number }> {
  datos: T[];
  columnas: Columna<T>[];
}

export function DataTable<T extends { id: string | number }>({
  datos,
  columnas,
}: DataTableProps<T>) {
  const [filaEditando, setFilaEditando] = useState<Partial<T> | null>(null);

  const iniciarEdicion = (fila: T): void => {
    setFilaEditando(fila);
  };

  const cancelarEdicion = (): void => {
    setFilaEditando(null);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Tabla de datos</h2>

      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          marginBottom: "1rem",
        }}
      >
        <thead>
          <tr>
            {columnas.map((columna) => (
              <th
                key={String(columna.key)}
                style={{
                  border: "1px solid #ccc",
                  padding: "0.5rem",
                  textAlign: "left",
                }}
              >
                {columna.label}
              </th>
            ))}
            <th
              style={{
                border: "1px solid #ccc",
                padding: "0.5rem",
                textAlign: "left",
              }}
            >
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {datos.map((fila) => (
            <tr key={String(fila.id)}>
              {columnas.map((columna) => (
                <td
                  key={String(columna.key)}
                  style={{
                    border: "1px solid #ccc",
                    padding: "0.5rem",
                  }}
                >
                  {String(fila[columna.key])}
                </td>
              ))}
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "0.5rem",
                }}
              >
                <button onClick={() => iniciarEdicion(fila)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filaEditando && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            borderRadius: "8px",
          }}
        >
          <h3>Fila en edición</h3>
          <pre>{JSON.stringify(filaEditando, null, 2)}</pre>
          <button onClick={cancelarEdicion}>Cancelar edición</button>
        </div>
      )}
    </div>
  );
}