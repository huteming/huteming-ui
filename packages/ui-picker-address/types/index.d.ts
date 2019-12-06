export interface Province {
    label: string
    value: string
}

export interface City {
    label: string
    value: string
    provinceCode: string
}

export interface Area {
    label: string
    value: string
    provinceCode: string
    cityCode: string
}
