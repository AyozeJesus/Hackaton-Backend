import { UserPassword } from './UserPassword'
import { UserEmail } from './UserEmail'
export class User {
  static create(id, name, lastname, email, password, activated) {
    return new User(
      id,
      name,
      lastname,
      email,
      UserPassword.fromPlain(password),
      activated,
    )
  }

  constructor(id, name, lastname, email, password, activated = false) {
    this.id = id
    this.name = name
    this.lastname = lastname
    this.email = new UserEmail(email)
    this.password = password
    this.activated = activated
  }

  isActivated() {
    return this.activated
  }

  activate() {
    this.activated = true
  }

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }

  getLastName() {
    return this.lastname
  }

  getEmail() {
    return this.email
  }

  getPassword() {
    return this.password
  }

  hasId(id) {
    return this.id === id
  }

  hasName(name) {
    return this.name === name
  }

  hasLastName(lastname) {
    return this.lastname === lastname
  }

  hasEmail(email) {
    return this.email.equals(new UserEmail(email))
  }

  hasPassword(plainPassword) {
    return this.password.compareWith(plainPassword)
  }

  update({ name, lastname, email, password }) {
    if (name !== undefined) {
      this.name = name
    }

    if (lastname !== undefined) {
      this.lastname = lastname
    }

    if (email !== undefined) {
      this.email = new UserEmail(email)
    }

    if (password !== undefined) {
      this.password = UserPassword.fromPlain(password)
    }
  }
}
