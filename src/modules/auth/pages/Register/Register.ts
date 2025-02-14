import { defineComponent, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import SocialAuth from '../../components/SocialAuth/SocialAuth.vue';
import PasswordInput from '../../components/PasswordInput/PasswordInput.vue';
import { useAuth } from '../../composables/useAuth';

export default defineComponent({
  name: "Register",
  components: {
    SocialAuth,
    FontAwesomeIcon,
    PasswordInput,
  },
  setup() {
    const { register } = useAuth()
    const email = ref('')
    const name = ref('')
    const loading = ref(false)
    const password = ref('')
    const singup = async () => {
      console.log('register');
      await register({
        email: email.value,
        password: password.value,
        fullName: name.value
      })
    }
    return {
      email,
      password,
      name,
      singup,
      loading
    }
  },
});
