import { computed, defineComponent, ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useMotion } from "@vueuse/motion";

export default defineComponent({
  name: "PasswordInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    showStrength: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update:modelValue"],
  components: {
    FontAwesomeIcon,
  },
  setup(props, { emit }) {
    const showPassword = ref(false);
    const inputRef = ref<HTMLInputElement | null>(null)
    const isInputFocused = ref(false)


    const { target: inputTarget } = useMotion(inputRef, {
      initial: { scale: 1 },
      enter: { scale: 1 },
      focused: { scale: 1.02 },
    })
    
    
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
    const strengthScore = computed(() => {
      const password = props.modelValue
      let score = 0
      
      if (password.length >= 8) score++
      if (/[A-Z]/.test(password)) score++
      if (/[a-z]/.test(password)) score++
      if (/[0-9]/.test(password)) score++
      if (/[^A-Za-z0-9]/.test(password)) score++
      
      return score
    })
    

    const strengthConfig = computed(() => {
      const configs = {
        0: { level: 'weak', text: 'Débil', color: 'bg-red-500', icon: 'lock' },
        1: { level: 'weak', text: 'Débil', color: 'bg-red-500', icon: 'X' },
        2: { level: 'fair', text: 'Regular', color: 'bg-yellow-500', icon: 'AlertTriangle' },
        3: { level: 'good', text: 'Buena', color: 'bg-green-500', icon: 'Check' },
        4: { level: 'strong', text: 'Fuerte', color: 'bg-emerald-600', icon: 'Check' },
        5: { level: 'strong', text: 'Muy Fuerte', color: 'bg-emerald-600', icon: 'Check' }
      }
      return configs[strengthScore.value]
    })
    
    // Maneja el evento para actualizar el valor del modelo
    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement;
      emit("update:modelValue", target.value);
    };

    return {
      showPassword,
      calculateStrength,
      strengthPercentage,
      strengthConfig,
      strengthLevel,
      inputTarget,
      strengthText,
      isInputFocused,
      strengthScore,
      updateValue,
    };
  },
});
