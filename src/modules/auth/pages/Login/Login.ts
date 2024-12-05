import { defineComponent, ref } from 'vue';
import { useAuth } from '../../composables/useAuth';

export default defineComponent({
  name: "Login",
  components:{
  },
  setup() {
    const { login } = useAuth()
    const email = ref()
    const password = ref()
    const onLogin = async () => {
      await login(email.value, password.value)
    }
    const loginWithGoogle = () => {
      // Lógica para iniciar sesión con Google
      console.log("Iniciar sesión con Google");
    }
    const loginWithGitHub = () => {
      // Lógica para iniciar sesión con GitHub
      console.log("Iniciar sesión con GitHub");
    }
    
    return {
      onLogin,
      loginWithGoogle,
      loginWithGitHub,
      email,
      password,
    }
  },
});