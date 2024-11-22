import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: "Register",
  setup() {
    const email = ref()
    const name = ref()
    const password = ref()
    const register = () => {
      console.log('register');
    }
    return {
      email,
      password,
      name,
      register
    }
  },
});