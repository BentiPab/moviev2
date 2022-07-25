export const Cookie = {
    get: (name: string) => {
        const cookie = document.cookie.match(`(?:(?:^|.*; *)${name} *= *([^;]*).*$)|^.*$`)
        if (!cookie) {
            return
        }

        const value = cookie[1]

        if (value) {
            return decodeURIComponent(value)
        }

        return
    },
    set: (name: string, value: string, days?: number) => {
        const maxAge = days ? (days * 60 * 60 * 24) : -1
        document.cookie = `${name}=${encodeURIComponent(value)};max-age=${maxAge};domain=localhost`
    },
    delete: (name: string) => Cookie.set(name, '')
}