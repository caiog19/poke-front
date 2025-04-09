<template>
    <div class="custom-select">
      <div class="custom-select__trigger" @click="toggleDropdown">
        <span>{{ selectedLabel }}</span>
        <div class="arrow"></div>
      </div>
      <div v-if="isOpen" class="custom-options">
        <div 
          v-for="option in options" 
          :key="option.value"
          class="custom-option"
          :class="{ selected: option.value === modelValue }"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CustomSelect',
    props: {
      options: {
        type: Array,
        required: true,
      },
      modelValue: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      return {
        isOpen: false,
      };
    },
    computed: {
      selectedLabel() {
        const selected = this.options.find(opt => opt.value === this.modelValue);
        return selected ? selected.label : 'Todos os tipos';
      }
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
      selectOption(option) {
        this.$emit('update:modelValue', option.value);
        this.isOpen = false;
      },
      handleClickOutside(event) {
        if (!this.$el.contains(event.target)) {
          this.isOpen = false;
        }
      }
    },
    mounted() {
      document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
      document.removeEventListener('click', this.handleClickOutside);
    }
  };
  </script>
  
  <style src="./customselect.css"></style>
  