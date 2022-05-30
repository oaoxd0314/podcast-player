import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import EpisodeView from '../pages/EpisodeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomeView,
        },
        {
            path: "/episode/:epid",
            name: "episode",
            component: EpisodeView,
        }
    ]
})

export default router
