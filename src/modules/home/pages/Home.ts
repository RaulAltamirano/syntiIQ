import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "Home",
  setup() {
    const router = useRouter();

    const navigate = (name: string) => {
      router.push({name});
    };

    return { navigate };
  },
});