export type TicketStatus = 'open' | 'in_progress' | 'resolved';
export type TicketPriority = 'low' | 'medium' | 'high';

export interface Ticket {
  id: number
  title: string
  description: string
  status: TicketStatus
  priority: TicketPriority
  createdAt: string
}

export interface TicketCollection {
  tickets: Ticket[]
  totalItems: number
  pagination: {
    first?: string
    last?: string
    next?: string
    previous?: string
  }
}

export interface TicketCollectionResponse {
  member: Ticket[]
  totalItems: number
  view?: {
    first?: string
    last?: string
    next?: string
    previous?: string
  }
}

export interface TicketFilter {
  status?: TicketStatus
  priority?: TicketPriority
  createdAfter?: string
  createdBefore?: string
}

export function toTicket(data: Ticket): Ticket {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    status: data.status,
    priority: data.priority,
    createdAt: data.createdAt,
  }
}

export function toTicketCollection(
  data: TicketCollectionResponse,
): TicketCollection {
  return {
    tickets: data.member.map(toTicket),
    totalItems: data.totalItems,
    pagination: {
      first: data.view?.first,
      last: data.view?.last,
      next: data.view?.next,
      previous: data.view?.previous,
    },
  }
}