import { ref } from 'vue';

export default function useDrawer() {
  const drawer = ref(false);
  const rail = ref(false);

  const toggleRail = (state: boolean) => {
    rail.value = state;
  };

  return {
    drawer,
    rail,
    toggleRail
  };
}