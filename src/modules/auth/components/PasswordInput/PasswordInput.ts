import { computed, defineComponent, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default defineComponent({
  name: "PasswordInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    showStrength: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  components: {
    FontAwesomeIcon,
  },
  setup(props, { emit }) {
    const showPassword = ref(false);

    /**
     * Calcula el puntaje de la fortaleza de la contraseña.
     * @param password - La contraseña introducida.
     */
    const calculateStrength = (password: string): number => {
      let score = 0;

      if (password.length >= 8) score += 25;
      if (/[A-Z]/.test(password)) score += 25;
      if (/[a-z]/.test(password)) score += 25;
      if (/[0-9]/.test(password)) score += 12.5;
      if (/[^A-Za-z0-9]/.test(password)) score += 12.5;

      return score;
    };

    // Fortaleza de la contraseña en porcentaje
    const strengthPercentage = computed(() => calculateStrength(props.modelValue));

    // Nivel de fortaleza basado en el puntaje
    const strengthLevel = computed(() => {
      const strength = strengthPercentage.value;
      if (strength < 25) return "weak";
      if (strength < 50) return "fair";
      if (strength < 75) return "good";
      return "strong";
    });

    // Texto descriptivo de la fortaleza
    const strengthText = computed(() => {
      const levels = {
        weak: "Weak",
        fair: "Fair",
        good: "Good",
        strong: "Strong",
      };
      return levels[strengthLevel.value];
    });

    // Maneja el evento para actualizar el valor del modelo
    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit("update:modelValue", target.value);
    };

    return {
      showPassword,
      calculateStrength,
      strengthPercentage,
      strengthLevel,
      strengthText,
      updateValue,
    };
  },
});
