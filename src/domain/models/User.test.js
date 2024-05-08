import { describe, expect, it } from 'vitest'
import { User } from './User'

describe('User class', () => {
  it('should create a user instance with valid parameters', () => {
    const user = User.create(
      'user_id',
      'John',
      'Doe',
      'john@example.com',
      'password123',
      true,
    )

    expect(user).toBeInstanceOf(User)
    expect(user.getId()).toEqual('user_id')
    expect(user.getName()).toEqual('John')
    expect(user.getLastName()).toEqual('Doe')
    expect(user.isActivated()).toBe(true)
    expect(user.hasId('user_id')).toBe(true)
    expect(user.hasName('John')).toBe(true)
    expect(user.hasLastName('Doe')).toBe(true)
    expect(user.hasEmail('john@example.com')).toBe(true)
    expect(user.hasPassword('password123')).toBe(true)
    expect(user.isActivated()).toBe(true)
  })
})
