import { observable} from 'knockout'
import { Component, wrapComponent } from '../components/Component.js'
import AuthService from '../services/AuthService.js'

class Register extends Component {
    constructor(args) {
        super(args)

        this.username = observable();
        this.email = observable();
        this.password = observable();
    }

    async register() {
        const userData = {"displayName": this.username(),"email": this.email(), "password": this.password()}

        let registerResult = await AuthService.register(userData)

        if(registerResult.email !== undefined) {
            const credentials = {"email": registerResult.email, "password":this.password()}
            let signInResult = await AuthService.signIn()

            this.$store.dispatch('updateIsAuthenticated', true)
            this.$router.setRoute('home')
        }
    }

}

const template = /* html */ `
<div class="card">
    <div class="card-body">
        <form data-bind="submit: register">
            <div class="form-group">
                <label for="username">User Name</label>
                <input type="text" class="form-control" id="username" data-bind="value: username">
            </div>  
            <div class="form-group">
                <label for="email">Email address</label>
                <input type="email" class="form-control" id="email" data-bind="value: email">
                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" data-bind="value: password">
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
    </div>
</div>
`
export default wrapComponent(Register, template)