import ko from 'knockout'

// Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

// Views
import Home from 'Views/Home.js'
import SignIn from 'Views/SignIn.js'
import UserProfile from 'Views/UserProfile.js'
import Register from 'Views/Register.js'
import Question from 'Views/Question.js'
import Failure from 'Views/Failure.js'

// Components
import App from './App.js'
import Loader from 'Components/Loader.js'
import Navbar from 'Components/Navbar.js'
import ForceGraph from 'Components/ForceGraph.js'
import WordCloud from 'Components/WordCloud.js'
import Post from 'Components/Post.js'
import Prompt from 'Components/Prompt.js'

ko.components.register('so-home', Home)
ko.components.register('so-sign-in', SignIn)
ko.components.register('so-user-profile', UserProfile)
ko.components.register('so-register', Register)
ko.components.register('so-question', Question)
ko.components.register('so-failure', Failure)

ko.components.register('so-app', App)
ko.components.register('so-loader', Loader)
ko.components.register('so-navbar', Navbar)
ko.components.register('so-force-graph', ForceGraph)
ko.components.register('so-word-cloud', WordCloud)
ko.components.register('so-post', Post)
ko.components.register('so-prompt', Prompt)

ko.applyBindings()
