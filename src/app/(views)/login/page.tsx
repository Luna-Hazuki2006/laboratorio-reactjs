export default function Login() {
    return (
        <main>
            <h1 className="text-center">Registrar usuario</h1>
            <div className="rounded-2xl border-2 formulario">
                <form action="">
                    <label htmlFor="nombre_usuario">Nombre de usuario: </label>
                    <input type="text" name="nombre_usuario" id="nombre_usuario" required />
                    <br />
                    <label htmlFor="contraseña">Contraseña: </label>
                    <input type="password" name="contraseña" id="contraseña" required />
                    <br />
                    <button type="submit">Iniciar sesión</button>
                </form>
            </div>
        </main>
    )
}