# @tenaspace/react-headless-modal

This is an unstyled React component helping you to easy to make the Modal with your style.

## Demo

Coming soon...

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

      <HeadlessModal
        open={open}
        onClose={handleClose}
        className={`relative z-[1055]`}
      >
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
              {() => (
                <div className={`space-y-3`}>
                  <h3 className={`text-xl font-bold`}>Lorem ipsum dolor sit amet</h3>
                  <p>
                    Consectetur adipisicing elit. Atque accusantium natus quidem dolore error dicta, quaerat nihil
                    cupiditate assumenda magnam eum, quibusdam ipsam quo beatae fugit illo labore velit repellendus?
                  </p>
                  <button onClick={handleClose} className={`rounded bg-gray-100 px-4 py-2 text-sm font-medium`}>
                    close
                  </button>
                </div>
              )}
            </HeadlessModal.Panel>
          </div>
        </div>
      </HeadlessModal>
    </>
  )
}

export default App
```

## Props

Coming soon...

## Transition

Coming soon...
