import { ref } from 'vue';
import logo from '../../../../assets/logo.svg'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useRouter } from 'vue-router';


export default {
  name: 'Navbar',
  components: {
    FontAwesomeIcon,
  },
  setup() {
    const router = useRouter()
    const wishlistCount = ref(1)
    const cartCount = ref(1)
    const userName = ref("Juan")
    const showDropdown = ref(false)
    const cartAnimation = ref(false);
    const wishlistAnimation = ref(false);
    const isScrolled = ref()
    const userAvatar = ref()

    const navigateTo = (name: string) => {
      showDropdown.value = false;
      // router.push({ name });
      router.push({
        name: name
      })
    };
    const onLogout = ()=>{
      router.push({name: 'Login'})
    }



    return {
      logo,
      wishlistCount,
      cartCount,
      userName,
      onLogout,
      showDropdown,
      cartAnimation,
      wishlistAnimation,
      navigateTo,
      isScrolled,
      userAvatar,
    }
  },
};
