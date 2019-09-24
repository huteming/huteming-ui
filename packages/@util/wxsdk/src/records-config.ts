class Records {
    records: { id: number, url: string }[] = []

    constructor () {
        this.records = [
            {
                id: 0,
                url: '',
            },
        ]
    }

    create (url: string): number {
        const id = this.records[this.records.length - 1].id + 1
        this.records.push({
            id,
            url,
        })
        return id
    }

    find (id: number): { id: number, url: string } {
        return this.records.find(item => item.id === id) || { id: 0, url: '' }
    }
}

export default new Records()
