import Vue from 'vue'
import videojs from 'video.js'
import ButtonComponent from './ControlButton'
import ContainerComponent from './ControlContainer'
const ButtonConstructor = Vue.extend(ButtonComponent)
const ContainerConstructor = Vue.extend(ContainerComponent)

export function createButton (options = {}) {
    const instance = new ButtonConstructor({
        propsData: options,
    })
    return instance.$mount().$el
}

export function createContainer (options = {}) {
    const instance = new ContainerConstructor({
        propsData: options,
    })
    return instance.$mount().$el
}

export class ButtonsStart extends videojs.getComponent('Component') {
    constructor (player, options = {}) {
        super(player, options)
        console.log('start', options)
    }

    createEl () {
        const domContainer = createContainer()
        const domButton = createButton({
            icon: 'play',
            circle: true,
            handleClick: this.handleClick.bind(this),
        })
        domContainer.appendChild(domButton)
        return domContainer
    }

    handleClick () {
        this.player().play()
    }
}

export class ButtonsEnd extends videojs.getComponent('Component') {
    constructor (player, options = {}, callbacks) {
        super(player, options)
        console.log('callbacks', options, callbacks)

        this.callbacks = callbacks
    }

    createEl () {
        const domContainer = createContainer()
        const domPrev = createButton({
            icon: 'skip_previous',
            handleClick: this.callbacks.handlePrev,
        })
        const domReplay = createButton({
            icon: 'replay',
            handleClick: this.callbacks.handleReplay,
        })
        const domNext = createButton({
            icon: 'skip_next',
            handleClick: this.callbacks.handleNext,
        })
        domContainer.appendChild(domPrev)
        domContainer.appendChild(domReplay)
        domContainer.appendChild(domNext)
        return domContainer
    }

    handleClick () {
        this.player().play()
    }
}
