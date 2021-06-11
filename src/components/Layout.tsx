import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
    <div className="bg-gray-50 relative flex flex-col max-w-4xl mx-auto rounded shadow pb-8 min-h-screen">
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        <header></header>
        <div className="flex-grow">{children}</div>
        <footer className="text-center flex items-center justify-center py-6">
            {/* <div>FOOTER</div> */}
        </footer>
    </div>
)

export default Layout
