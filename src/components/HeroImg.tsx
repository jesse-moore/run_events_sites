const assetURL = process.env.NEXT_PUBLIC_ASSETS_URL

export const HeroImg = ({ heroImg, children }) => {
    const [img] = heroImg
    if (!heroImg) {
        const opacity = 0.6
        const rgbTop = 50
        const rgbBottom = 100
        const overlayTop = `rgba(${rgbTop}, ${rgbTop}, ${rgbTop}, ${opacity})`
        const overlayBottom = `rgba(${rgbBottom}, ${rgbBottom}, ${rgbBottom}, ${opacity})`
        return (
            <div
                className="rounded-sm h-80 text-center pt-4 text-gray-200"
                style={{
                    background: `linear-gradient(${overlayTop}, ${overlayBottom})`,
                }}
            >
                {children}
            </div>
        )
    } else {
        const opacity = 0.6
        const rgb = 50
        const overlay = `rgba(${rgb}, ${rgb}, ${rgb}, ${opacity})`
        return (
            <div
                className="rounded-sm h-80 text-center pt-4 text-gray-200"
                style={{
                    background: `linear-gradient(${overlay}, ${overlay}),
				url(${assetURL}${heroImg}) center center no-repeat`,
                }}
            >
                {children}
            </div>
        )
    }
}
