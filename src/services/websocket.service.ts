type MessageHandler = (payload: any) => void

class ShowtimeWebsocketService { 
    private socket: WebSocket | null = null

    connect(showtimeId: string, onMessage: MessageHandler) { 
        this.disconnect()

        const wsBaseUrl = import.meta.env.VITE_API_BASE_URL.replace('http', 'ws')
        this.socket = new WebSocket(`${wsBaseUrl}/ws?showtime_id=${showtimeId}`)

        this.socket.onmessage = (event) => { 
            try {
                const payload = JSON.parse(event.data)
                onMessage(payload)
            } catch (error) { 
                console.error('Failed to parse websocket message')
            }
        }
    }
    disconnect() { 
        if (this.socket) { 
            this.socket.close()
            this.socket = null
        }
    }
}

export const showtimeWebsocketService = new ShowtimeWebsocketService