export interface Ticket {
    id: number
    title: string
    description: string
    status: 'open' | 'in_progress' | 'resolved'
    priority: 'low' | 'medium' | 'high'
    created_at: string
    updated_at: string
}