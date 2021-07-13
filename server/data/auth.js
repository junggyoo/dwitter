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
  {
    id: '2',
    username: 'ellie',
    password,
    name: 'Ellie',
    email: 'ellie@gmail.com',
    url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
  },
];

export async function findByUserName(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(user) {
  const create = { ...user, id: Date.now().toString() };
  users.push(create);
  return create.id;
}
