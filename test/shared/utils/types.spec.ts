import {
  CreateUserParams,
  CreateUserProfileParams,
  UpdateUserParams,
  UpdateUserProfileParams,
} from '../../../src/shared/utils/types';

describe('Types', () => {
  describe('CreateUserParams', () => {
    it('should have a username and password field', () => {
      const params: CreateUserParams = {
        username: 'testuser',
        password: 'testpassword',
      };
      expect(params).toHaveProperty('username');
      expect(params).toHaveProperty('password');
    });
  });

  describe('UpdateUserParams', () => {
    it('should have a username and password field', () => {
      const params: UpdateUserParams = {
        username: 'testuser',
        password: 'testpassword',
      };
      expect(params).toHaveProperty('username');
      expect(params).toHaveProperty('password');
    });
  });

  describe('CreateUserProfileParams', () => {
    it('should have a firstName and lastName field', () => {
      const params: CreateUserProfileParams = {
        firstName: 'John',
        lastName: 'Doe',
      };
      expect(params).toHaveProperty('firstName');
      expect(params).toHaveProperty('lastName');
    });

    it('should have an optional email field', () => {
      const params: CreateUserProfileParams = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      };
      expect(params).toHaveProperty('email');
    });

    it('should have an optional birthDate field', () => {
      const params: CreateUserProfileParams = {
        firstName: 'John',
        lastName: 'Doe',
        birthDate: new Date('1990-01-01'),
      };
      expect(params).toHaveProperty('birthDate');
    });
  });

  describe('UpdateUserProfileParams', () => {
    it('should have a firstName, lastName, and email field', () => {
      const params: UpdateUserProfileParams = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        birthDate: new Date('1990-01-01'),
      };
      expect(params).toHaveProperty('firstName');
      expect(params).toHaveProperty('lastName');
      expect(params).toHaveProperty('email');
    });

    it('should have a birthDate field', () => {
      const params: UpdateUserProfileParams = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        birthDate: new Date('1990-01-01'),
      };
      expect(params).toHaveProperty('birthDate');
    });
  });
});
