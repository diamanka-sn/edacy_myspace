let data = []

exports.getAll = () => {
    return data;
}

exports.getById = (id) => {
    return data.find(x => x.id === id);
}

exports.create = (x) => {
    const newUser = { ...x, id: Date.now().toString() }
    data.push(newUser);
    return newUser;
}

exports.delete = (id) => {
    data = data.filter(x => x.id !== id)
}

exports.update = (id, x) => {
    const index = data.findIndex(obj => obj.id === id)
    const userUpdate = { ...x, id: id }
    if (index !== -1) {
        data[index] = userUpdate
    }

    return userUpdate;
}

exports.notExist = (login) => {
    const user = data.findIndex(x => x.login === login)
    return user === undefined
}