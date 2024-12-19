import { defineComponent, ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import SocialAuth from '../../components/SocialAuth/SocialAuth.vue';
import PasswordInput from '../../components/PasswordInput/PasswordInput.vue';

export default defineComponent({
  name: "Register",
  components:{
    SocialAuth,
    FontAwesomeIcon,
    PasswordInput,
  },
  setup() {
    const email = ref()
    const name = ref()
    const loading = ref(false)
    const password = ref('')
    const register = () => {
      console.log('register');
    }
    return {
      email,
      password,
      name,
      register,
      loading
    }
  },
});
