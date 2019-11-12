import { Record } from './types'

class Records {
    records: Record[] = [
        {
            id: 0,
            url: '',
        },
    ]

    create (url: string): number {
        const id = this.records[this.records.length - 1].id + 1
        this.records.push({
            id,
            url,
        })
        return id
    }

    find (id: number): Record {
        return <Record> this.records.find(item => item.id === id)
    }
}

export default new Records()
