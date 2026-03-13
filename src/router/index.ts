import { createRouter, createWebHistory } from 'vue-router'
import MoviesPage from '../pages/MoviesPage.vue'
import ShowtimePage from '../pages/ShowtimePage.vue'
import SeatMapPage from '../pages/SeatMapPage.vue'
import NotFoundPage from '../pages/NotFoundPage.vue'

import AdminBookingsPage from '../pages/AdminBookingsPage.vue'
import AdminAuditLogsPage from '../pages/AdminAuditLogsPage.vue'

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
            path: '/admin/bookings',
            name: 'admin-bookings',
            component: AdminBookingsPage
        },{
            path: '/admin/audit-logs',
            name: 'nadmin-audit-logs',
            component: AdminAuditLogsPage
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundPage
        },
    ]
})

export default router