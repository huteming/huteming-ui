
import { Component } from 'vue-property-decorator'
import Vue, { ComponentOptions } from 'vue'
import { VueClass } from 'vue-class-component/lib/declarations'

export default function<V extends Vue> (options: ComponentOptions<V> = {}) {
  return function<VC extends VueClass<V>> (target: VC) {
    // target.registName = options.name || target.name

    return Component(options)(target)
  }
}
