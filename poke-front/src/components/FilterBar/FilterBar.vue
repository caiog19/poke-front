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
      const typeOptions = this.types.map(type => ({
        value: type,
        label: type,
      }));
      return [defaultOption, ...typeOptions];
    }
  },
  methods: {
    handleInput() {
      console.log("handleInput chamado:", this.search);
      this.$emit('filter-change', {
        nameOrId: this.search.trim(),
        type: this.selectedType,
      });
    },
  },
  watch: {
    selectedType(newValue) {
      console.log('selectedType mudou para:', newValue); 
      this.handleInput();
    }
  }
};
</script>

<style src="./filterbar.css"></style>