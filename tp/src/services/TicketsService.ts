import type { TicketCollection, TicketCollectionResponse } from '../models/TicketsModel'
import { toTicketCollection } from '../models/TicketsModel'

const API_BASE_URL = 'http://localhost:1024'

export async function getTickets(
  page = 1,
): Promise<TicketCollection> {
  const response = await fetch(
    `${API_BASE_URL}/api/tickets?page=${page}`,
  )

  if (!response.ok) {
    throw new Error(
      `Impossible de charger les tickets (${response.status})`,
    )
  }

  const data: TicketCollectionResponse = await response.json()

  return toTicketCollection(data)
}