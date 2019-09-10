class Records {
    constructor () {
        this.records = [
            {
                id: 0,
                url: '',
            },
        ]
    }

    create (url) {
        const id = this.records[this.records.length - 1].id + 1
        this.records.push({
            id,
            url,
        })
        return id
    }

    find (id) {
        return this.records.find(item => item.id === id)
    }
}

export default new Records()
