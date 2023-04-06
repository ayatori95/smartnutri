const sequence = {
    _id: 1,
    get id() { return this._id++}
}

const usuarios = {}

function salvarUsuario(usuario) {
    if (!usuario.id) usuario.id = sequence.id
    usuarios[usuario.id] = usuario
    return usuario
}

function getUsuario(id) {
    return usuarios[id] || {}
}

function getUsuarios() {
    return Object.values(usuarios)
}

module.exports = { salvarUsuario,getUsuario, getUsuarios}