import { useRouter } from 'vue-router';
import Navbar from '../../shared/components/Navbar/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    const router = useRouter();

   const navigate = (name: string) => {
      router.push({name: name});
    };

    return { navigate };
  },
};