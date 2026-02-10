import Image from "next/image"
import Nav from "./nav"

function Header() {
    return (
        <header className="p-2 md:p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Form In Line" width={32} height={32} className="dark:invert" />
                <h1 className="font-bold text-xl">Form In Line</h1>
            </div>
            <Nav />
        </header>
    )
}

export default Header