import { ref } from 'vue';
import Navbar from '../../shared/components/Navbar/Navbar..vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    const title = ref('Mi Aplicación Vue');
    return { title };
  },
};