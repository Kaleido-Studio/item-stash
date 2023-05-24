import type { KVValue } from '~/server/utils/useKV';

const entriesList = ref<KVValue[]>(JSON.parse(localStorage.getItem('entries') || '[]'));
const entriesUpdatedAt = ref(localStorage.getItem('entries_updated_at'));

watch(entriesList, (entries) => {
  localStorage.setItem('entries', JSON.stringify(entries));
  //   record update time
  localStorage.setItem('entries_updated_at', new Date().toISOString());
  entriesUpdatedAt.value = localStorage.getItem('entries_updated_at');
});

const useEntries = () => {
  const loadEntries = async () => {
    const res = await useFetch('/api/entries');
    if (!res.data) {
      return false;
    }
    entriesList.value = res.data.value!;
    return true;
  };

  return { entriesList, loadEntries, entriesUpdatedAt };
};

// watch and write to local storage

export default useEntries;
