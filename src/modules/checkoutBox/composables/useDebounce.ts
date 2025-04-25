// useDebounce.ts
import { ref, watch } from 'vue';

/**
 * Composable que implementa debounce para un valor reactivo
 * @param value - Valor a observar
 * @param delay - Retraso en milisegundos
 */
export function useDebounceSearch<T>(value: T, delay: number = 300) {
  const debouncedValue = ref<T>(value);
  let timeout: number | null = null;

  watch(
    () => value,
    (newValue) => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
      
      timeout = window.setTimeout(() => {
        debouncedValue.value = newValue;
      }, delay);
    },
    { immediate: true }
  );

  return debouncedValue;
}