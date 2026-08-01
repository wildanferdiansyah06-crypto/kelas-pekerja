import '@testing-library/jest-dom'

jest.mock('next-auth/react', () => ({
  useSession: () => ({ data: null, status: 'unauthenticated' }),
  SessionProvider: ({ children }) => children,
  signOut: jest.fn(),
  signIn: jest.fn(),
}));

jest.mock('nanoid', () => ({
  nanoid: () => 'test-id',
  urlAlphabet: '1234567890abcdef',
}));

jest.mock('@/src/sanity/lib/client', () => ({
  client: {
    fetch: jest.fn().mockRejectedValue(new Error('Sanity unavailable in test')),
  },
}));


