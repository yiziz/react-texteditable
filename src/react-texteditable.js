import React, { PropTypes } from 'react'

// IE8 Polyfill for .textContent
if (Object.defineProperty
  && Object.getOwnPropertyDescriptor
  && Object.getOwnPropertyDescriptor(Element.prototype, "textContent")
  && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
  (function() {
    var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText")
    Object.defineProperty(Element.prototype, "textContent", {
      get: function() {
        return innerText.get.call(this)
      },
      set: function(s) {
        return innerText.set.call(this, s)
      }
    })
  })()
}

export default class TextEditable extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    tagName: PropTypes.string,
    children: PropTypes.node,
    onBlur: PropTypes.func,
    disabled: PropTypes.bool,
  }

  constructor() {
    super()
    this.emitChange = this.emitChange.bind(this)
  }

  render() {
    const { tagName, ...props } = this.props

    return React.createElement(
      tagName || 'div',
      {
        ...props,
        ref: (e) => this.htmlEl = e,
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        contentEditable: !this.props.disabled,
      },
      this.props.children)
  }

  shouldComponentUpdate(nextProps) {
    // We need not rerender if the change of props simply reflects the user's
    // edits. Rerendering in this case would make the cursor/caret jump.
    return (
      // Rerender if there is no element yet... (somehow?)
      !this.htmlEl
      // ...or if html really changed... (programmatically, not by user edit)
      || (nextProps.text !== this.htmlEl.textContent
        && nextProps.text !== this.props.text)
      // ...or if editing is enabled or disabled.
      || this.props.disabled !== nextProps.disabled
    )
  }

  componentDidMount() {
    const { text } = this.props
    this.htmlEl.textContent = text
  }

  componentDidUpdate() {
    if (this.htmlEl && this.props.text !== this.htmlEl.textContent) {
      // Perhaps React (whose VDOM gets outdated because we often prevent
      // rerendering) did not update the DOM. So we update it manually now.
      this.htmlEl.textContent = this.props.text
    }
  }

  emitChange(evt) {
    if (!this.htmlEl) return
    const textContent = this.htmlEl.textContent
    if (this.props.onChange && textContent !== this.lastTextContent) {
      evt.target = { value: textContent }
      this.props.onChange(evt)
    }
    this.lastTextContent = textContent
  }
}
