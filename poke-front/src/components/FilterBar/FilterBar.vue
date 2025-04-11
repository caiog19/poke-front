<template>
  <div class="filter-bar">
    <input type="text" placeholder="Digite o nome ou o número" v-model="search" @input="handleInput" />
    <CustomSelect :options="computedOptions" v-model="selectedType" />
  </div>
</template>

<script>
import CustomSelect from '../CustomSelect/CustomSelect.vue';

export default {
  name: 'FilterBar',
  components: { CustomSelect },
  props: {
    types: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      search: '',
      selectedType: '',
    };
  },
  computed: {
    computedOptions() {
      const defaultOption = { value: '', label: 'Todos os tipos' };
      const typeData = Array.isArray(this.types?.results) ? this.types.results : Array.isArray(this.types) ? this.types : [];
      const typeOptions = typeData.map(type => ({
        value: type.name || type,
        label: (type.name || type).charAt(0).toUpperCase() + (type.name || type).slice(1),
      }));
      return [defaultOption, ...typeOptions];
    }
  },

  methods: {
    handleInput() {
      this.$emit('filter-change', {
        nameOrId: this.search.trim(),
        type: this.selectedType,
      });
    },
  },
  watch: {
    selectedType() {
      this.handleInput();
    }
  }
};
</script>

<style src="./filterbar.css" scoped></style>