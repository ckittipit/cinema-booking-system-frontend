import api from './api'
import type { ApiResponse } from '../types/api'
import type { AdminBooking, AuditLog } from '../types/admin'

export const getAdminbookings = async (): Promise<AdminBooking[]> => { 
    const response = await api.get<ApiResponse<AdminBooking[]>>('/api/v1/admin/bookings')   
    return response.data.data
}

export const getAdminAuditLogs = async (): Promise<AuditLog[]> => { 
    const response = await api.get<ApiResponse<AuditLog[]>>('/api/v1/admin/audit-logs')
    return response.data.data
}