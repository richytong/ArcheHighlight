require('rubico/global')
const kebabize = require("./kebabize")

const React = (function () {
  const createElement = (type, props, ...children) => {
    if (typeof type == 'function') {
      return type({ ...props, children })
    }

    if (typeof type == 'string') {
      const sprops = props == null ? '' : pipe(props, [
        props => {
          if ('className' in props) {
            return pipe(props, [
              omit(['className']),
              set('class', props.className),
            ])
          }
          return props
        },

        omit([
          'key',
          'ref',
          'dangerouslySetInnerHTML',
        ]),
        filter(value => typeof value != 'function'),
        filter(value => value != null),

        props => {
          if ('style' in props) {
            const { style } = props
            const pairs = []
            for (const key in style) {
              const val = style[key]
              pairs.push(`${kebabize(key)}: ${val};`)
            }
            return { ...props, style: pairs.join(' ') }
          }
          return props
        },
        props => {
          const pairs = []
          for (const key in props) {
            const val = props[key]
            if (typeof val == 'boolean') {
              if (val == true) {
                pairs.push(key)
              }
            } else {
              pairs.push(`${key}="${val}"`)
            }
          }
          return pairs.join(' ')
        },
      ])

      if (children == null) {
        if ('dangerouslySetInnerHTML' in props) {
          return `<${type}${sprops == '' ? '' : ` ${sprops}`}>${props.dangerouslySetInnerHTML.__html}</${type}>`
        }
        return `<${type}${sprops == '' ? '' : ` ${sprops}`}></${type}>`
      }

      if (Array.isArray(children)) {
        const children1 = children.flat(Infinity)
        if (props != null && 'dangerouslySetInnerHTML' in props) {
          children1.push(props.dangerouslySetInnerHTML.__html)
        }
        return `<${type}${sprops == '' ? '' : ` ${sprops}`}>${children1.join('')}</${type}>`
      }

      if (typeof children == 'string') {
        return `<${type}${sprops == '' ? '' : ` ${sprops}`}>${children}</${type}>`
      }

      throw new TypeError('children must be array or string')
    }

    throw new TypeError('type must be string or function')
  }

  const state = []
  let index = 0

  const useState = initialState => {
    const localIndex = index
    if (typeof state[localIndex] == 'undefined') {
      state[localIndex] = initialState
    }

    index++
    return [state[localIndex], newState => (state[localIndex] = newState)]
  }

  const useReducer = function (reducer, initialState, init) {
    const [state, setState] = useState(init == null ? initialState : init(initialState))
    const dispatch = function (action) {
      const newState = reducer(state, action)
      setState(newState)
    }
    return [state, dispatch]
  }

  const useEffect = f => {}

  const useRef = ref => ({ current: ref })

  const useCallback = cb => {}


  return { createElement, useState, useEffect, useRef, useCallback, useReducer }

})()

module.exports = React
