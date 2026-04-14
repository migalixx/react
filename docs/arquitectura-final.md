# Arquitectura Final  
## Integración de TypeScript con React y reducción de errores en tiempo de ejecución

---

# 1. Introducción

En esta fase final de la práctica se integraron los conceptos avanzados de TypeScript dentro de un proyecto moderno desarrollado con React.

El objetivo principal no fue únicamente construir una interfaz visual, sino demostrar cómo el tipado estático, los genéricos y los patrones de modelado permiten desarrollar aplicaciones más robustas, mantenibles y escalables que una implementación equivalente en JavaScript estándar.

Durante este módulo se desarrollaron los siguientes elementos:

- un proyecto React + TypeScript con Vite
- un componente genérico reutilizable `DataTable<T>`
- uso de tipos de utilidad (`Partial<T>`)
- integración con una librería externa (`date-fns`)
- funciones auxiliares estrictamente tipadas
- validación completa del proyecto con `npx tsc --noEmit`

---

# 2. Entorno tecnológico utilizado

El proyecto fue creado con:

```text
Vite + React + TypeScript
````

Esta combinación aporta ventajas importantes:

* entorno moderno de desarrollo
* recarga rápida (HMR)
* configuración mínima
* integración nativa con TypeScript
* compilación optimizada para producción

---

# 3. Componente genérico DataTable<T>

Uno de los elementos principales del proyecto fue la creación de un componente reutilizable de tabla de datos.

Archivo:

```text
src/components/DataTable.tsx
```

---

# 3.1 Objetivo del componente

En lugar de crear una tabla distinta para cada entidad del sistema, se diseñó un único componente capaz de representar cualquier colección de datos estructurados.

Ejemplos de reutilización:

* estudiantes
* asignaturas
* usuarios
* productos
* empleados

---

# 3.2 Uso de genéricos

El componente fue declarado como:

```ts
DataTable<T>
```

Esto permite que el tipo de las filas se defina dinámicamente según el contexto.

## Beneficios

* reutilización real del componente
* seguridad de tipos
* autocompletado inteligente
* menor duplicación de código
* mantenimiento más sencillo

---

# 3.3 Props tipadas

El componente recibe dos propiedades principales:

```ts
datos: T[]
columnas: Columna<T>[]
```

Esto garantiza que los datos y la definición visual de columnas sean coherentes entre sí.

---

# 3.4 Uso de keyof T

Las columnas se modelaron usando:

```ts
keyof T
```

Esto obliga a que cada columna apunte a una propiedad real del tipo utilizado.

## Ejemplo

Si el tipo es:

```ts
interface Estudiante {
  id: string;
  nombre: string;
  email: string;
}
```

Las columnas válidas serían:

* `id`
* `nombre`
* `email`

Y TypeScript impediría usar una propiedad inexistente como:

```ts
telefono
```

---

# 4. Uso de Partial<T> en el estado de edición

El estado temporal de edición se definió mediante:

```ts
Partial<T>
```

Esto convierte todas las propiedades del tipo en opcionales.

## Justificación técnica

Durante una edición de formulario, el usuario puede haber modificado solo algunos campos y no todos los datos al mismo tiempo.

Usar `Partial<T>` representa correctamente esa realidad temporal.

## Ventajas

* modelo de datos coherente
* mayor flexibilidad en formularios
* evita crear tipos manuales alternativos
* simplifica la gestión del estado local

---

# 5. Integración con librería externa de fechas

Se integró la librería:

```text
date-fns
```

para realizar cálculos temporales de forma fiable y mantenible.

---

# 5.1 Función utilitaria creada

Archivo:

```text
src/utils/date-utils.ts
```

Función principal:

```ts
calcularDiferenciaDias(fechaInicio: Date, fechaFin: Date): number
```

---

# 5.2 Beneficios del enfoque

## Tipado estricto

La función exige objetos `Date` como entrada y devuelve `number`.

## Encapsulación

La lógica de fechas queda aislada del componente visual.

## Reutilización

Puede utilizarse desde cualquier parte del proyecto.

## Menor riesgo de errores

Evita operaciones manuales complejas con fechas, una fuente habitual de bugs en JavaScript.

---

# 6. Análisis exhaustivo con never

En el repositorio TypeScript se mejoró la función `generarReporte()` usando:

```ts
never
```

en el bloque `default` del `switch`.

## Objetivo

Garantizar que todos los estados posibles de `EstadoMatricula` estén contemplados.

## Ventaja

Si en el futuro se añade un nuevo estado y no se implementa en el `switch`, el compilador mostrará error automáticamente.

Esto convierte una omisión lógica en un error detectado durante desarrollo.

---

# 7. Cómo TypeScript reduce errores runtime

Uno de los objetivos principales de esta práctica era demostrar cómo TypeScript disminuye fallos en ejecución respecto a JavaScript puro.

---

# 7.1 Errores evitados en props

En React tradicional es posible olvidar props o enviarlas con tipo incorrecto.

Con TypeScript, el compilador detecta inmediatamente:

* props faltantes
* props sobrantes
* tipos incorrectos
* callbacks mal definidos

---

# 7.2 Errores evitados en componentes reutilizables

En `DataTable<T>`:

* no se pueden renderizar columnas inexistentes
* no se pueden pasar datos incompatibles
* las filas tienen estructura garantizada

---

# 7.3 Errores evitados en estados de aplicación

Con `Partial<T>` y tipos explícitos se evita mutar estados con estructuras inválidas.

---

# 7.4 Errores evitados en lógica de dominio

Con uniones discriminadas y `never` se evitan estados no contemplados.

---

# 7.5 Errores evitados en utilidades

La función de fechas exige entradas válidas y retorno definido.

---

# 8. Escalabilidad del proyecto

El enfoque aplicado facilita el crecimiento futuro del sistema.

## Si mañana se añaden nuevas entidades:

* Profesor
* Departamento
* Matrícula avanzada

El componente `DataTable<T>` puede reutilizarse sin cambios estructurales.

## Si se amplía el dominio:

Nuevos estados o procesos serán validados por el compilador.

## Si crece el equipo de desarrollo:

Los contratos tipados actúan como documentación viva.

---

# 9. Comparación con JavaScript estándar

Sin TypeScript, este mismo proyecto sería más propenso a errores como:

* acceder a propiedades inexistentes
* props mal enviadas
* estados incompletos
* tablas mal configuradas
* respuestas mal interpretadas
* errores silenciosos con fechas
* omitir casos de negocio nuevos

Con TypeScript, estos problemas se detectan antes de ejecutar la aplicación.

---

# 10. Validación final del proyecto

Se ejecutó la comprobación:

```bash
npx tsc --noEmit
```

Resultado:

```text
0 errores de tipado
```

Esto garantiza consistencia estática en todo el proyecto sin necesidad de compilar la aplicación final.

---

# 11. Conclusión

La práctica ha demostrado que TypeScript aporta una mejora arquitectónica real cuando se combina con React.

La unión de:

* componentes genéricos
* tipos utilitarios
* contratos estrictos
* análisis exhaustivo
* reutilización segura
* validación estática

permite construir software más profesional, mantenible y escalable.

Más allá de añadir tipos, TypeScript actúa como una capa preventiva de calidad que reduce significativamente los errores en producción y mejora la experiencia de desarrollo.