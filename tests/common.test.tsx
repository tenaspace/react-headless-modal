import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

// import { HeadlessModal } from '../src'

describe('Common render', () => {
  it('renders without crashing', () => {
    // const [open, setOpen] = React.useState(false)

    // const handleOpen = () => setOpen(true)

    // const handleClose = () => setOpen(false)

    render(
      <>
        {/* <button onClick={handleOpen}>Open Modal</button>

        <HeadlessModal open={open} onClose={handleClose} style={{ position: `relative`, zIndex: 1055 }}>
          <HeadlessModal.Backdrop
            style={{
              position: `fixed`,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: `rgb(0 0 0 / 0.25)`,
              transitionProperty: `opacity`,
              transitionDuration: `0.2s`,
            }}
            enter={{
              style: {
                opacity: 1,
              },
            }}
            leave={{
              style: {
                opacity: 0,
              },
            }}
          />
          <div
            style={{
              position: `fixed`,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              overflowX: `hidden`,
              overflowY: `auto`,
            }}
          >
            <div
              style={{
                display: `flex`,
                alignItems: `center`,
                justifyContent: `center`,
                minHeight: `100%`,
                padding: `20px`,
              }}
            >
              <HeadlessModal.Panel
                style={{
                  overflow: `hidden`,
                  maxWidth: `448px`,
                  width: `100%`,
                  marginLeft: `auto`,
                  marginRight: `auto`,
                  borderRadius: `16px`,
                  padding: `24px`,
                  backgroundColor: `white`,
                  boxShadow: `rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px`,
                  transitionProperty: `opacity, transform`,
                  transitionDuration: `0.3s`,
                }}
                enter={{
                  style: {
                    opacity: 1,
                    transform: `scale(1)`,
                  },
                }}
                leave={{
                  style: {
                    opacity: 0,
                    transform: `scale(0.95)`,
                  },
                }}
              >
                {({ isOpened }) =>
                  isOpened ? (
                    <div>
                      <h3 style={{ fontWeight: 700, marginBottom: `12px` }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit
                      </h3>
                      <p>
                        Et consequatur, ea inventore, quam modi eius facilis vitae neque saepe enim dolorum voluptatibus
                        nulla rerum pariatur doloribus nihil consectetur maxime qui!
                      </p>
                      <button style={{ marginBottom: `12px` }} onClick={handleClose}>
                        Close
                      </button>
                    </div>
                  ) : null
                }
              </HeadlessModal.Panel>
            </div>
          </div>
        </HeadlessModal> */}
      </>,
    )
  })
})
