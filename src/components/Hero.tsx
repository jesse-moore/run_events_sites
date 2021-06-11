import dayjs from 'dayjs'
import { HeroImg } from './HeroImg'

interface Hero {
    dateTime: string
    name: string
    address: string
    city: string
    state: string
    heroImg: string
}

export const Hero = ({
    dateTime,
    name,
    heroImg,
    address,
    city,
    state,
}: Hero) => {
    const dateString = dayjs(dateTime).format('dddd MMMM DD, YYYY')
    return (
        <HeroImg heroImg={heroImg}>
            <div className="text-5xl font-semibold">{name}</div>
            <div className="text-xl pt-4">{dateString}</div>
            <div className="text-xl pt-4">{address}</div>
            <div className="text-xl">{`${city}, ${state}`}</div>
        </HeroImg>
    )
}
