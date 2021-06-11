import { QueryEventBySlugArgs, EventQuery } from '../graphql/event'

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN

export const fetchEvent = async (
    slug: QueryEventBySlugArgs['slug']
): Promise<EventQuery> => {
    const query = `query Event($slug: String!) {
		eventBySlug(slug: $slug) {
			id
			name
			dateTime
			address
			city
			state
			eventDetails
			heroImg
			races {
				id
				name
				distance
				route {
					points
					route
					routeStartMarker
					routeEndMarker
				}
			}
		} 
	}`

    const res = await fetch(`http://${apiDomain}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({ query, variables: { slug } }),
    })
    const { data } = await res.json()
    return data as EventQuery
}
