import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../../composables/useAuth';
import NotificationModal from '../../../shared/components/NotificationModal/NotificationModal.vue';
import { useNotification } from '../../../shared/composables/useNotification';

export default defineComponent({
  name: "Login",
  components:{
    NotificationModal
  },
  setup() {
    const email = ref()
    const password = ref()
    const router = useRouter()
    const { login } = useAuth()
    const isNotificationOpen = ref(false)
    const { success, error } = useNotification()
    const onLogin = async () => {
      // isNotificationOpen.value = true
      success('Operación completada', 'Bien')

      // await login(email.value, password.value)
      // console.log(res);
      // router.push({
      //   name: 'Home'
      // })
    }
    const loginWithGoogle = () => {
      // Lógica para iniciar sesión con Google
      console.log("Iniciar sesión con Google");
    }
    const loginWithGitHub = () => {
      // Lógica para iniciar sesión con GitHub
      console.log("Iniciar sesión con GitHub");
    }
    const closeNotification = () => {
      isNotificationOpen.value = false
      // Lógica para iniciar sesión con GitHub
      console.log("Iniciar sesión con GitHub");
    }
    return {
      onLogin,
      loginWithGoogle,
      loginWithGitHub,
      email,
      password,
      isNotificationOpen,
      closeNotification,
    }
  },
});