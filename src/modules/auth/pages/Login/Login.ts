import { defineComponent, ref } from 'vue';
import { useAuth } from '../../composables/useAuth';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: "Login",
  components:{
  },
  setup() {
    const { login, isLoading } = useAuth()
    const router = useRouter();
const route = useRoute();
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
    const afterLogin = () => {
      const redirectPath = route.query.redirect as string;
      router.push(redirectPath || { name: 'Dashboard' });
    };
    
    return {
      afterLogin,
      onLogin,
      loginWithGoogle,
      loginWithGitHub,
      email,
      isLoading,
      password,
    }
  },
});