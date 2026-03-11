import { createRouter, createWebHistory } from 'vue-router'
import MoviesPage from '../pages/MoviesPage.vue'
import ShowtimePage from '../pages/ShowtimePage.vue'
import SeatMapPage from '../pages/SeatMapPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'movies',
            component: MoviesPage
        },
        {
            path: '/movies/:movieId/showtimes',
            name: 'showtimes',
            component: ShowtimePage
        },
        {
            path: '/showtimes/:showtimeId/seats',
            name: 'seat-map',
            component: SeatMapPage
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage
        }
    ]
})

export default router