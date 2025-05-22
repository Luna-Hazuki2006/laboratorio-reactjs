import { createStyleRegistry } from "styled-jsx"

export default function Header() {
    return (
        <header className="bg-black flex items-center justify-between mr-10 ml-10 mt-10 mb-10">
            <p>Inicio</p>
            <button className="border-2 rounded-md pr-5 pl-5 pt-2 pb-2">Iniciar sesión</button>
        </header>
    )
}