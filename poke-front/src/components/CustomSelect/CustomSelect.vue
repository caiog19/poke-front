<template>
  <div class="custom-select">
    <div class="custom-select__trigger" @click="toggleDropdown" tabindex="0" @keydown.enter="toggleDropdown" @keydown.space.prevent="toggleDropdown">
      <span>{{ selectedLabel }}</span>
      <div class="arrow"></div>
    </div>
    <div v-if="isOpen" class="custom-options">
      <div
        v-for="(option, index) in options"
        :key="option.value || index"
        class="custom-option"
        :class="{ selected: option.value === modelValue }"
        @click="selectOption(option)"
        tabindex="0"
        @keydown.enter="selectOption(option)"
        @keydown.space.prevent="selectOption(option)"
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
      default: () => [],
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
      const defaultLabel = this.options.find(opt => opt.value === '')?.label || 'Selecione...';
      return selected ? selected.label : defaultLabel;
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
      if (this.isOpen && this.$el && !this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside, true);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }
};
</script>

<style src="./customselect.css" scoped></style>