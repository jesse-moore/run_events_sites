import { fetchEvent } from '../graphql/fetch'
import Layout from '../components/Layout'
import { GetServerSideProps } from 'next'
import { EventQuery } from '../graphql/event'
import { Hero } from '../components/Hero'
import { EventDescription } from '../components/EventDescription'
import { Race } from '../components/Race'

const IndexPage = ({ eventBySlug }: EventQuery) => {
    const { name, eventDetails, races } = eventBySlug
    const hasRoutes =
        races.length > 0 &&
        races.find((race) => race.route.route.features.length > 0)
    return (
        <Layout title={name}>
            <Hero {...eventBySlug} />
            <EventDescription eventDetails={eventDetails} />
            {hasRoutes && <Race races={races} />}
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const parts = context.req.headers.host.split('.')
    const localhost = parts[parts.length - 1].match(/localhost/)
    if (!localhost && parts.length > 3) {
        return {
            redirect: {
                permanent: false,
                destination: 'http://rmap.site',
            },
            props: {},
        }
    }
    const sub = parts[0]

    const { eventBySlug } = await fetchEvent(sub)
    if (!eventBySlug) {
        return {
            redirect: {
                permanent: false,
                destination: 'http://rmap.site',
            },
            props: {},
        }
    }
    // Pass data to the page via props
    return { props: { eventBySlug } }
}

export default IndexPage
