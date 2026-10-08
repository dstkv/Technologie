import { Ticket, TicketPage } from '../models/Ticket'
import type { TicketDTO, TicketFilters, CreateTicketDTO, UpdateTicketDTO } from '../models/Ticket'

interface PaginationView {
  next?: string
  'hydra:next'?: string
}
interface TicketCollectionDTO {
  member?: TicketDTO[]
  'hydra:member'?: TicketDTO[]
  totalItems?: number
  'hydra:totalItems'?: number
  view?: PaginationView
  'hydra:view'?: PaginationView
}

async function request(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  const headers = new Headers(options.headers)

  headers.set('Accept', 'application/json');

  const response = await fetch(`/api${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    let message = `Erreur HTTP ${response.status}`

    try {
      const error = await response.json()

      message =
        error.detail ??
        error['hydra:description'] ??
        error.message ??
        message

      if (Array.isArray(error.violations)) {
        message = error.violations
          .map(
            (violation: { propertyPath: string; message: string }) =>
              `${violation.propertyPath} : ${violation.message}`,
          )
          .join('\n')
      }
    } catch {
      // La réponse n'est pas forcément du JSON.
    }

    throw new Error(message)
  }

  return response
}

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Une erreur est survenue.'
}
export async function getTickets(page: number, filters: TicketFilters): Promise<TicketPage> {
  const params = new URLSearchParams({ page: String(page) })
  if (filters.title.trim()) params.set('title', filters.title.trim())
  if (filters.status) params.set('status', filters.status)
  if (filters.priority) params.set('priority', filters.priority)
  const response = await request(`/tickets?${params.toString()}`)
  const data: TicketDTO[] | TicketCollectionDTO = await response.json()
  if (Array.isArray(data)) {
    return new TicketPage(data.map((item) => new Ticket(item)), data.length > 0, null)
  }
  const items = data.member ?? data['hydra:member']
  if (!Array.isArray(items)) throw new Error('Format de liste API non reconnu.')
  const view = data.view ?? data['hydra:view']
  const total = data.totalItems ?? data['hydra:totalItems'] ?? null
  return new TicketPage(
    items.map((item) => new Ticket(item)),
    view ? Boolean(view.next ?? view['hydra:next']) : items.length > 0,
    total,
  )
}
export async function getTicket(id: string): Promise<Ticket> {
  const response = await request(`/tickets/${encodeURIComponent(id)}`)
  const data: TicketDTO = await response.json()
  return new Ticket(data)
}
export async function createTicket(ticket: CreateTicketDTO): Promise<void> {
  await request('/tickets', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket),
  })
}
export async function updateTicket(id: string, ticket: UpdateTicketDTO): Promise<void> {
  await request(`/tickets/${encodeURIComponent(id)}`, {
    method: 'PATCH', headers: { 'Content-Type': 'application/merge-patch+json' },
    body: JSON.stringify(ticket),
  })
}
export async function deleteTicket(id: string): Promise<void> {
  await request(`/tickets/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
