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
                transitionTimingFunction: `cubic-bezier(0, 0, 0.2, 1)`,
              },
            }}
            leave={{
              style: {
                opacity: 0,
                transitionTimingFunction: `cubic-bezier(0.4, 0, 1, 1)`,
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
                    transitionTimingFunction: `cubic-bezier(0, 0, 0.2, 1)`,
                  },
                }}
                leave={{
                  style: {
                    opacity: 0,
                    transform: `scale(0.95)`,
                    transitionTimingFunction: `cubic-bezier(0.4, 0, 1, 1)`,
                  },
                }}
              >
                {({ isOpened }) =>
                  isOpened ? (
                    <div>
                      <h3
                        style={{
                          fontWeight: 700,
                          margin: `0 0 12px 0`,
                          fontSize: `20px`,
                          lineHeight: `28px`,
                        }}
                      >
                        Lorem ipsum dolor sit amet
                      </h3>
                      <p style={{ margin: `0 0 12px 0` }}>
                        Consectetur adipisicing elit. Atque accusantium natus quidem dolore error dicta, quaerat nihil
                        cupiditate assumenda magnam eum, quibusdam ipsam quo beatae fugit illo labore velit repellendus?
                      </p>
                      <button
                        style={{
                          cursor: `pointer`,
                          borderWidth: 0,
                          borderRadius: `8px`,
                          padding: `8px 16px`,
                          fontSize: `14px`,
                          lineHeight: `20px`,
                          fontWeight: 500,
                          backgroundColor: `rgb(243 244 246 / 1)`,
                        }}
                        onClick={handleClose}
                      >
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
