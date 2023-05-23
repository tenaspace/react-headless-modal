# @tenaspace/react-headless-modal

This is an unstyled React component helping you to easy to make the Modal with your style.

## Demo

See the [DEMO](https://react-package.tenaspace.com/react-headless-modal)

## Installation

```shell
yarn add @tenaspace/react-headless-modal
```

or via npm

```shell
npm install @tenaspace/react-headless-modal
```

## Usage

Example using with Tailwind CSS

<details open>

```tsx
import { useState } from 'react'
import { HeadlessModal } from '@tenaspace/react-headless-modal'

const App = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <>
      <button onClick={handleOpen}>Open Modal</button>

      <HeadlessModal open={open} onClose={handleClose} className={`relative z-[1055]`}>
        <HeadlessModal.Backdrop
          className={`fixed inset-0 bg-black/25 transition-opacity duration-200`}
          enter={{
            className: `opacity-100 ease-out`,
          }}
          leave={{
            className: `opacity-0 ease-in`,
          }}
        />
        <div className={`fixed inset-0 overflow-y-auto overflow-x-hidden`}>
          <div className={`flex min-h-full items-center justify-center p-4`}>
            <HeadlessModal.Panel
              className={`mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition duration-300`}
              enter={{
                className: `scale-100 opacity-100 ease-out`,
              }}
              leave={{
                className: `scale-95 opacity-0 ease-in`,
              }}
            >
              {({ isOpened }) => isOpened ? ( // This props will render/remove the Panel's content when the Modal open/close. If you don't want your Panel's content re-rendered, remove this props with the condition check.
                <div className={`space-y-3`}>
                  <h3 className={`text-xl font-bold`}>Lorem ipsum dolor sit amet</h3>
                  <p>
                    Consectetur adipisicing elit. Atque accusantium natus quidem dolore error dicta, quaerat nihil
                    cupiditate assumenda magnam eum, quibusdam ipsam quo beatae fugit illo labore velit repellendus?
                  </p>
                  <button onClick={handleClose} className={`rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium`}>
                    Close
                  </button>
                </div>
              ) : null}
            </HeadlessModal.Panel>
          </div>
        </div>
      </HeadlessModal>
    </>
  )
}

export default App
```

</details>

Example using with Style inline

<details>

```tsx
import { useState } from 'react'
import { HeadlessModal } from '@tenaspace/react-headless-modal'

const App = () => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  return (
    <>
      <button onClick={handleOpen}>Open Modal</button>

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
                isOpened ? ( // This props will render/remove the Panel's content when the Modal open/close. If you don't want your Panel's content re-rendered, remove this props with the condition check.
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
      </HeadlessModal>
    </>
  )
}

export default App
```

</details>

## Props

| Name             | Mandatory | Type                | Default value | Component              | Note                                                                                                                                                                                                        |
| ---------------- | --------- | --------------------------------------------- | ------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| open | required  | boolean | false | HeadlessModal | The state of the Modal |
| onClose | required | () => void | () => {} | HeadlessModal | Function handle to close the Modal |
| clickOutsideToClose | optional | boolean | true | HeadlessModal | Enable / Disable closing the Modal when clicking outside the Modal panel |
| container | optional | Element / DocumentFragment | document.body | HeadlessModal | The Modal will be rendered with the parent is `<body>` by default. You can choose the place where you want the Modal rendered by setting the Element to this props |
| id | optional | string / null / undefined | undefined | HeadlessModal | A unique string or number to be used as the Modal's key |
| enter | optional | { className?: string / null; style?: React.CSSProperties } | {} | HeadlessModal.Backdrop, HeadlessModal.Panel | The CSS will be shown when the Modal is on open (You can set the CSS using class or style inline) |
| leave | optional | { className?: string / null; style?: React.CSSProperties } | {} | HeadlessModal.Backdrop, HeadlessModal.Panel | The CSS will be shown when the Modal is on close (You can set the CSS using class or style inline) |
| as | optional | React.ElementType | div | All | Set the tag HTML like whatever you want |
| className | optional | string | null | All |  |
| style | optional | React.CSSProperties | {} | All |  |
