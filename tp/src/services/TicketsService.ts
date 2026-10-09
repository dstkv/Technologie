import type { TicketCollection, TicketCollectionResponse } from '../models/TicketsModel'
import { toTicketCollection } from '../models/TicketsModel'
import type { TicketRequest } from '../models/TicketsModel'

const API_BASE_URL = 'http://localhost:1024'

export async function getTickets(
  ticketRequest: TicketRequest = {
    page: 1,
    title: undefined,
    status: undefined,
    priority: undefined,
    createdAfter: undefined,
    createdBefore: undefined,
    createdStrictlyAfter: undefined,
    createdStrictlyBefore: undefined,
  }
): Promise<TicketCollection> {
  const params = new URLSearchParams({ page: String(ticketRequest.page) })
  const filters = {
    title: ticketRequest.title,
    status: ticketRequest.status,
    priority: ticketRequest.priority,
    'createdAt[after]': ticketRequest.createdAfter,
    'createdAt[before]': ticketRequest.createdBefore,
    'createdAt[strictly_after]': ticketRequest.createdStrictlyAfter,
    'createdAt[strictly_before]': ticketRequest.createdStrictlyBefore,
  }

  for (const [key, value] of Object.entries(filters)) {
    if (value === undefined) continue

    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item))
    } else {
      params.set(key, value)
    }
  }

  const response = await fetch(`${API_BASE_URL}/api/tickets?${params}`)

  if (!response.ok) {
    throw new Error(
      `Impossible de charger les tickets (${response.status})`,
    )
  }

  const data: TicketCollectionResponse = await response.json()

  return toTicketCollection(data)
}