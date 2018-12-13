class AuthService {
    constructor() {
        this.baseUrl = '/api'
    }

    async register(user) {
        const response = await fetch(`${this.baseUrl}/register`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' }
        })

        console.log(response)

        return await response.json()
    }

    async signIn(credentials) {
        const response = await fetch(`${this.baseUrl}/oauth`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' }
        })

        const token = await response.text()
        localStorage.setItem('token', token)

        return token
    }

    signOut() {
        localStorage.removeItem('token')
    }
}

export default new AuthService()