import { defineComponent, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { useAuth } from '../../composables/useAuth';
import { useTheme } from '../../../shared/composables/useTheme';
import SocialAuth from '../../components/SocialAuth/SocialAuth.vue';
import PasswordInput from '../../components/PasswordInput/PasswordInput.vue';

export default defineComponent({
  name: "Login",
  components: {
    FontAwesomeIcon,
    PasswordInput,
    SocialAuth,
  },
  setup() {
    const { login, isLoading } = useAuth()
    const { isDark } = useTheme();
    const email = ref()
    const password = ref('')
    const isLogin = ref(true);
    const rememberMe = ref(false);

    const handleSubmit = async () => {
      try {
        await login(email.value, password.value)
      } catch (error) {
        console.error('Error:', error);
      }
    };


    return {
      handleSubmit,
      isLogin,
      isLoading,
      rememberMe,
      email,
      isDark,
      password,
    }
  },
});