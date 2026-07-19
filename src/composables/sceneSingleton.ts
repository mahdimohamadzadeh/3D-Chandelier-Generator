import { useThreeJS, type ThreeJSContext } from './3D.config'

let context: ThreeJSContext | null = null

export function getOrCreateScene(el: HTMLElement, width: number, height: number): ThreeJSContext {
    if (context) return context
    context = useThreeJS(el, width, height)
    return context
}

export function hasScene(): boolean {
    return context !== null
}