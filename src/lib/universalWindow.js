const windowMock = {
  location: {
    href: '',
    reload: () => null,
  },
  localStorage: {
    setItem: () => null,
    getItem: () => null,
    removeItem: () => null,
  },
  innerWidth: null,
  addEventListener: () => null,
}

const universalWindow = typeof window === 'undefined' ? windowMock : window

export default universalWindow
