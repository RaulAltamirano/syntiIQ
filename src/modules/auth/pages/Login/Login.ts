import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "Login",
  setup() {
    const email = ref()
    const password = ref()
    const router = useRouter()
    const login = () => {
        // Lógica para iniciar sesión con email y contraseña
        console.log("Iniciando sesión con:", email, password);
        router.push({
            name: 'Home'
        })
      }
      const loginWithGoogle =() => {
        // Lógica para iniciar sesión con Google
        console.log("Iniciar sesión con Google");
      }
      const loginWithGitHub =() => {
        // Lógica para iniciar sesión con GitHub
        console.log("Iniciar sesión con GitHub");
      }
  return {
    login,
    loginWithGoogle,
    loginWithGitHub,
    email,
    password,
  }
  },
});