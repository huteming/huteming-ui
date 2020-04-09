import { VueClass } from 'vue-class-component/lib/declarations'
import Vue from 'vue'
import { ofType as of } from 'vue-tsx-support'

export function ofType<props = {}, events = {}, scopedSlots = {}> (target: VueClass<Vue>) {
  return of<props, events, scopedSlots>().convert(target)
}
