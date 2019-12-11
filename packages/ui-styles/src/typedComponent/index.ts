import { VueClass } from 'vue-class-component/lib/declarations'
import Vue from 'vue'
import { ofType } from 'vue-tsx-support'

export default function<props = {}, events = {}, scopedSlots = {}> (target: VueClass<Vue>) {
    return ofType<props, events, scopedSlots>().convert(target)
}
