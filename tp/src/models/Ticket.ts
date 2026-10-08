export type TicketStatus = 'open' | 'in_progress' | 'resolved'
export type TicketPriority = 'low' | 'medium' | 'high'

export interface TicketDTO {
  id?: number | string
  '@id'?: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  createdAt?: string
  updatedAt?: string
}
export interface CreateTicketDTO {
  title: string
  description: string
  priority: TicketPriority
}
export interface UpdateTicketDTO {
  status: TicketStatus
  priority: TicketPriority
}
export interface TicketFilters {
  title: string
  status: TicketStatus | ''
  priority: TicketPriority | ''
}
export const statusLabels: Record<TicketStatus, string> = {
  open: 'Ouvert', in_progress: 'En cours', resolved: 'Résolu',
}
export const priorityLabels: Record<TicketPriority, string> = {
  low: 'Faible', medium: 'Moyenne', high: 'Haute',
}
export class Ticket {
  id: string
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  createdAt: string | null
  updatedAt: string | null

  constructor(data: TicketDTO) {
    const id = data.id ?? data['@id']?.split('/').pop()
    if (id === undefined || id === '') {
      throw new Error("Le ticket reçu ne possède pas d'identifiant.")
    }
    this.id = String(id)
    this.title = data.title
    this.description = data.description
    this.status = data.status
    this.priority = data.priority
    this.createdAt = data.createdAt ?? null
    this.updatedAt = data.updatedAt ?? null
  }
}
export class TicketPage {
  constructor(
    public tickets: Ticket[],
    public hasNext: boolean,
    public total: number | null,
  ) {}
}
