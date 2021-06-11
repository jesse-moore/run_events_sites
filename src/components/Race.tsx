import React, { MouseEventHandler, useState } from 'react'
import { Map } from './Map'
import { EventQuery } from '../graphql/event'
import { Legend } from './Legend'

type Races = EventQuery['eventBySlug']['races']

export const Race = ({ races }: { races: Races }) => {
    const racesSorted = races
        .filter((race) => race.route.route.features.length > 0)
        .sort((a, b) => (a.name > b.name ? -1 : 1))
    const [activeRaceID, setActiveRaceID] = useState<string>(racesSorted[0].id)
    const activeRace = races.find((race) => race.id === activeRaceID)
    return (
        <div className="relative">
            <div className="text-2xl ml-2 mb-2">Races</div>
            <div className="flex flex-row ml-2">
                {racesSorted.map((race) => (
                    <RaceButton
                        name={race.name}
                        isActive={race.id === activeRaceID}
                        onClick={() => setActiveRaceID(race.id)}
                        key={race.id}
                    />
                ))}
            </div>
            <Map route={activeRace.route} />
        </div>
    )
}

const RaceButton = ({
    name,
    isActive,
    onClick,
}: {
    name: string
    isActive: boolean
    onClick: MouseEventHandler<HTMLButtonElement>
}) => {
    const baseClass =
        'py-1 px-2 w-16 min-w-max mr-2 rounded-md text-sm font-semibold focus:outline-none text-center hover:bg-blue-400 hover:border-transparent active:bg-blue-500 shadow'
    const activeClass = ' bg-blue-400'
    const inActiveClass = ' bg-blueGray-300'
    return (
        <button
            className={`${baseClass}${isActive ? activeClass : inActiveClass}`}
            onClick={onClick}
        >
            {name}
        </button>
    )
}
