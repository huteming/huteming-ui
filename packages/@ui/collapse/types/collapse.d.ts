import Vue from 'vue'

export default interface TmCollapse extends Vue {
    activeNames: string[] | number[]
    change (name: string | number): void
}
