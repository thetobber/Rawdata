import Store from '@/Store.js'
import Router from '@/Router.js'
import { observable } from 'knockout'

class List {
    constructor(params = {}) {
        this.searchParams = Store.getters.searchParams
        this.isAuthenticated = Store.getters.isAuthenticated
        this.items = params.items

        this.showNote = observable(false)
        this.note = observable('')
        this.focusedPost

        this.postMarker = document.getElementById('post-marker')
    }

    navigate(event, routeName, params = {}) {
        event.preventDefault()
        Router.setRoute(routeName, params)
    }

    displayNoteOrToggle(data, event) {
        this.focusedPost = data

        if (data.marked) {
            this.toggleMarkPost()
        } else {
            this.showNote(true)

            const { x, y } = event.srcElement.getBoundingClientRect()

            this.postMarker.style.top = `${Math.abs(y - 60)}px`
            this.postMarker.style.left = `${Math.abs(x - 260)}px`
        }
    }

    toggleMarkPost() {
        const newItems = this.items.peek().map(post => {
            if (post.id === this.focusedPost.id) {
                const marked = !post.marked
                return { ...post, marked, note: marked ? this.note() : '' }
            }

            return post
        })

        this.showNote(false)
        this.items(newItems)
        Store.dispatch('toggleMarkPost', { id: this.focusedPost.id, note: this.note() })
    }
}

const template = /* html */ `
<div id="post-marker" class="card card-list-note shadow" data-bind="visible: showNote">
    <form data-bind="submit: () => $component.toggleMarkPost()" class="p-3">
        <label class="mb-0">
            <b class="d-block mb-2">Set optional note?</b>
            <input type="text" class="form-control mb-2" placeholder="Enter optional note" data-bind="value: note">
            <button type="submit" class="btn btn-primary btn-sm mr-2">OK</button>
            <button type="button" class="btn btn-default btn-sm" data-bind="click: () => showNote(false)">Cancel</button>
        </label>
    </form>
</div>

<!-- ko foreach: items -->
<article class="card mb-3">
    <div class="card-body">
        <!-- ko if: $data.title -->
        <h5 class="card-title mb-2" data-bind="html: $data.title"></h5>
        <!-- /ko -->
        <div class="d-flex">
            <aside class="flex-shrink-1 mr-3">
                <div class="score text-center">
                    <span class="d-block badge badge-primary" data-bind="text: $data.score"></span>
                    <small class="d-block">score</small>
                </div>
            </aside>

            <div class="flex-grow-1">
                <div data-bind="html: $data.body + '...'"></div>
                <div class="mt-2 text-info font-weight-bold" data-bind="visible: $data.note, text: 'Note: ' + $data.note"></div>
            </div>

            <!-- ko if: $component.isAuthenticated() -->
            <i class="flex-shrink-1 align-self-center ml-3 text-warning fa-star fa-2x" data-bind="click: (data, event) => $component.displayNoteOrToggle(data, event), css: { fas: $data.marked, far: !$data.marked }"></i>
            <!-- /ko -->
        </div>
    </div>
    <footer class="card-footer bg-white d-flex align-items-center justify-content-between">
        <div class="text-muted">
            <span>by</span>
            <cite data-bind="text: $data.authorDisplayName"></cite>
            <span>on the <time data-bind="text: $data.creationDate"></time></span>
        </div>
        <button type="button" class="btn btn-outline-dark btn-sm" data-bind="click: (_, event) => $component.navigate(event, 'question', { id: $data.questionId })">Read
            more</button>
    </footer>
</article>
<!-- /ko -->
`

export default { viewModel: List, template }