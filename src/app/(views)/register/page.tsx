export default function Register() {
    return (
        <main>
            <h1 className="text-center">Registrar usuario</h1>
            <div className="rounded-2xl border-2 formulario">
                <form action="">
                    <label htmlFor="nombre_usuario">Nombre de usuario: </label>
                    <input type="text" name="nombre_usuario" id="nombre_usuario" required />
                    <br />
                    <label htmlFor="nombres">Nombres: </label>
                    <input type="text" name="nombres" id="nombres" required />
                    <br />
                    <label htmlFor="apellidos">Apellidos: </label>
                    <input type="text" name="apellidos" id="apellidos" required />
                    <br />
                    <label htmlFor="contraseña">Contraseña: </label>
                    <input type="password" name="contraseña" id="contraseña" required />
                    <br />
                    <label htmlFor="contraseña_repetida">Contraseña (de nuevo): </label>
                    <input type="password" name="contraseña_repetida" id="contraseña_repetida" required />
                    <label htmlFor="tipo">Tipo de usuario: </label>
                    <select name="tipo" id="tipo">
                        <option value="lector">Lector</option>
                        <option value="autor">Autor</option>
                    </select>
                    <br />
                    <button type="submit">Registrar</button>
                </form>
                <a href="/login">¿Ya tienes cuenta? ¡Inicia sesión!</a>
            </div>
        </main>
    )
}