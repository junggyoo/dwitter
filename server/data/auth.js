import bcrypt from 'bcrypt';

const password = bcrypt.hashSync('skscjswo', 12);

let users = [
    {
        id: '1',
        username: 'bob',
        password,
        name: 'Bob',
        email: 'bob@gmail.com',
        url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
];

export async function findbyUserName(username) {
    return users.find((user) => user.username === username);
}

export async function createUser(user) {
    const create = { ...user, id: Date.now().toString() };
    users.push(create);
    return create.id;
}
