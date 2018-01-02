import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

// THIS requires react 16

export class Overlay extends React.Component {
  static propTypes = {
    render: PropTypes.func,
  }
  constructor(props) {
    super(props)
    this.container = document.createElement('div')
    document.body.appendChild(this.container)
  }

  componentWillUnmount() {
    document.body.removeChild(this.container)
  }

  render() {
    const { style, className, onClose, render, children } = this.props
    return ReactDOM.createPortal(
      <div className={className} style={style}>
        {render ? render({ onClose }) : children}
      </div>,
      this.container
    )
  }
}

const DefaultOverlay = styled(Overlay)`
  position: fixed;
  display: flex;
  background-color: ${props =>
    props.dark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.8)'};
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  align-items: center;
  justify-content: center;
`

export default DefaultOverlay
