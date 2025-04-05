<template>
    <div class="filter-bar">
        <input tye="text" placeholder="Digite o nome ou o número" v-model="search" @input="handleinput" />


        <select v-model="selectedType" @change="handleTypeChange">
            <option value="">Todos os tipos</option>
            <option v-for="type in types" :key="type" :value="type">
                {{ type }}
            </option>

        </select>
    </div>
</template>

<script>
export default {
    name: 'FilterBar',
    props: {
        types:{
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
    methods: {
        handleInput() {
            this.$emit('filter-change', {
                nameOrId: this.search.trim(),
                type: this.selectedType,
            });
        },
        handleTypeChange(){
            this.handleInput();
        },
    },
};

</script>

<style src="./filterbar.css"></style>