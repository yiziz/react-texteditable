react-texteditable
=====================

Based off of https://github.com/lovasoa/react-contenteditable

The only difference is `textContent` is being set rather than `innerHTML`

This change was done to prevent XSS

React component for a div with editable contents

## Usage
```javascript
  var TextEditable = require("react-texteditable");
  var MyComponent = React.createClass({
    getInitialState: function(){
      return {text: "<b>Hello <i>World</i></b>"};
    },

    handleChange: function(evt){
      this.setState({text: evt.target.value});
    },

    render: function(){
      return <TextEditable
                text={this.state.text} // nodeValue of the editable div
                disabled={false}       // use true to disable edition
                onChange={this.handleChange} // handle nodeValue change
              />
    }
  });
```

## Structure of this repository
 * [`lib/`](https://github.com/yiziz/react-texteditable/tree/master/lib) compiled javascript, usable directly in the browser
 * [`src/`](https://github.com/yiziz/react-texteditable/tree/master/src) source javascript. Uses JSX and ES6.
