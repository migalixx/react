import { differenceInDays } from "date-fns";

/**
 * Calcula la diferencia en días entre dos fechas.
 * Devuelve un número entero.
 */
export function calcularDiferenciaDias(fechaInicio: Date, fechaFin: Date): number {
  return differenceInDays(fechaFin, fechaInicio);
}