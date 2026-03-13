//แยกไว้เพื่อให้สามารถปรับแต่งการเรียก API ได้ง่ายขึ้นในอนาคต เช่น การเพิ่ม Interceptors หรือการจัดการ Error แบบรวมศูนย์
import axios from 'axios'
import { auth } from './firebase'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use(async (config) => { 
    const user = auth.currentUser

    if (user) { 
        const token = await user.getIdToken()
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

export default api