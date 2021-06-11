import React from 'react'
import Markdown from 'markdown-to-jsx'

export const EventDescription = ({
    eventDetails,
}: {
    eventDetails: string
}) => {
    return (
        <div className="event-details relative my-8 px-4">
            <Markdown children={eventDetails} />
        </div>
    )
}
