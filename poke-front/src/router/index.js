import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView/HomeView.vue';
import PokemonDetailView from '../views/PokemonDetailView/PokemonDetailView.vue';


const routes = [
    {
        path:'/',
        name:'Home',
        component: HomeView,
    },

    {
        path: '/pokemon/:id',
        name: 'PokemonDetail',
        component: PokemonDetailView,

    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;