import React, {
  CSSProperties,
  Dispatch,
  ElementType,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useEventListener, useIsClient, useLockedBody, useOnClickOutside } from './hooks'
import { createPortal } from 'react-dom'

const TRANSITION_DURATION_DEFAULT = 10

interface IStyleAndClassName {
  className?: string | null
  style?: CSSProperties | null
}

interface ITransition {
  enter?: IStyleAndClassName
  leave?: IStyleAndClassName
}

interface ICommon extends IStyleAndClassName {
  as?: ElementType
}

const handleAnimate = (
  ref: MutableRefObject<HTMLElement | null>,
  transition?: {
    remove?: IStyleAndClassName
    add?: IStyleAndClassName
  },
) => {
  if (ref && ref.current) {
    const { remove, add } = transition ?? {}
    const removeClassList = remove?.className ? remove.className.split(` `) : []
    const addClassList = add?.className ? add.className.split(` `) : []
    ref.current.classList.remove(...removeClassList)
    ref.current.classList.add(...addClassList)
    const removeStyle = remove?.style ?? {}
    const addStyle = add?.style ?? {}
    Object.assign(ref.current.style, removeStyle)
    Object.assign(ref.current.style, addStyle)
  }
}

const getTransitionDuration = (ref: MutableRefObject<HTMLElement | null>) => {
  if (typeof window !== `undefined`) {
    if (ref && ref.current) {
      return parseFloat(window.getComputedStyle(ref.current).transitionDuration) * 1000
    }
  }
  return 0
}

interface IContextModal {
  open: boolean
  isOpened?: boolean
  onClose: () => void
  clickOutsideToClose?: boolean
  transitionDurationBackdrop: number
  setTransitionDurationBackdrop?: Dispatch<SetStateAction<number>>
  transitionDurationPanel: number
  setTransitionDurationPanel?: Dispatch<SetStateAction<number>>
}

const ContextModal = createContext<IContextModal>({
  open: false,
  isOpened: false,
  onClose: () => {},
  clickOutsideToClose: true,
  transitionDurationBackdrop: TRANSITION_DURATION_DEFAULT,
  transitionDurationPanel: TRANSITION_DURATION_DEFAULT,
})

interface IModal extends ICommon {
  children?: ReactNode
  open: boolean
  onClose: () => void
  clickOutsideToClose?: boolean
  container?: Element | DocumentFragment
  id?: string | null | undefined
}

const Modal = ({
  children,
  as = `div`,
  className = null,
  style = null,
  open,
  onClose,
  clickOutsideToClose = true,
  container,
  id,
}: IModal) => {
  const [isOpened, setIsOpened] = useState(open)
  const [transitionDurationBackdrop, setTransitionDurationBackdrop] = useState(TRANSITION_DURATION_DEFAULT)
  const [transitionDurationPanel, setTransitionDurationPanel] = useState(TRANSITION_DURATION_DEFAULT)

  const isClient = useIsClient()

  const ref = useRef<HTMLElement | null>(null)

  useLockedBody(isOpened, `root`)

  const firstOpen = useRef(open)

  useEffect(() => {
    if (isClient) {
      if (open) {
        if (ref && ref.current) {
          setIsOpened(true)
          ref.current.style.display = ``
        }
      } else {
        const timeout = setTimeout(
          () => {
            if (ref && ref.current) {
              setIsOpened(false)
              ref.current.style.display = `none`
            }
          },
          transitionDurationBackdrop >= transitionDurationPanel ? transitionDurationBackdrop : transitionDurationPanel,
        )
        return () => {
          clearTimeout(timeout)
        }
      }
    }
  }, [isClient, ref, open, transitionDurationBackdrop, transitionDurationPanel])

  useEventListener(`keydown`, (event) => {
    if (event.defaultPrevented) {
      return // Do nothing if the event was already processed
    }
    switch (event.key) {
      case `Esc`: // IE/Edge specific value
      case `Escape`:
        onClose()
        break
      default:
        return
    }
  })

  const firstStyle: CSSProperties | null = !firstOpen.current ? { display: `none` } : null

  const As = as

  return isClient
    ? createPortal(
        <ContextModal.Provider
          value={{
            open,
            isOpened,
            onClose,
            clickOutsideToClose,
            transitionDurationBackdrop,
            setTransitionDurationBackdrop,
            transitionDurationPanel,
            setTransitionDurationPanel,
          }}
        >
          <As ref={ref} className={className} style={{ ...style, ...firstStyle }}>
            {children}
          </As>
        </ContextModal.Provider>,
        container ?? document.body,
        id,
      )
    : null
}

interface IBackdrop extends ICommon, ITransition {
  children?: ReactNode
}

const Backdrop = ({ children, as = `div`, className = null, style = null, enter = {}, leave = {} }: IBackdrop) => {
  const { open, setTransitionDurationBackdrop } = useContext(ContextModal)

  const isClient = useIsClient()

  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isClient) {
      setTransitionDurationBackdrop && setTransitionDurationBackdrop(getTransitionDuration(ref))
    }
  }, [isClient, ref, setTransitionDurationBackdrop])

  useEffect(() => {
    if (isClient) {
      if (open) {
        const timeout = setTimeout(() => {
          handleAnimate(ref, {
            remove: leave,
            add: enter,
          })
        }, TRANSITION_DURATION_DEFAULT)
        return () => {
          clearTimeout(timeout)
        }
      } else {
        handleAnimate(ref, {
          remove: enter,
          add: leave,
        })
      }
    }
  }, [isClient, ref, open, enter, leave])

  const As = as

  return isClient ? (
    <As ref={ref} className={className} style={style}>
      {children}
    </As>
  ) : null
}

interface IPanel extends ICommon, ITransition {
  children: ({ isOpened }: { isOpened?: boolean }) => ReactNode
}

const Panel = ({ children, as = `div`, className = null, style = null, enter = {}, leave = {} }: IPanel) => {
  const { open, isOpened, onClose, clickOutsideToClose, setTransitionDurationPanel } = useContext(ContextModal)

  const isClient = useIsClient()

  const ref = useRef<HTMLElement | null>(null)

  useOnClickOutside(ref, clickOutsideToClose ? onClose : () => {})

  useEffect(() => {
    if (isClient) {
      setTransitionDurationPanel && setTransitionDurationPanel(getTransitionDuration(ref))
    }
  }, [isClient, ref, setTransitionDurationPanel])

  useEffect(() => {
    if (isClient) {
      if (open) {
        const timeout = setTimeout(() => {
          handleAnimate(ref, {
            remove: leave,
            add: enter,
          })
        }, TRANSITION_DURATION_DEFAULT)
        return () => {
          clearTimeout(timeout)
        }
      } else {
        handleAnimate(ref, {
          remove: enter,
          add: leave,
        })
      }
    }
  }, [isClient, ref, open, enter, leave])

  const As = as

  return isClient ? (
    <As ref={ref} className={className} style={style}>
      {children({ isOpened })}
    </As>
  ) : null
}

export const HeadlessModal = Object.assign(Modal, {
  Backdrop,
  Panel,
})
