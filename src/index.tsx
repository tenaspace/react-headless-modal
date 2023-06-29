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
  style?: CSSProperties
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

export interface IContextIHeadlessModal {
  open: boolean
  isOpened?: IContextIHeadlessModal[`open`]
  onClose: () => void
  clickOutsideToClose?: boolean
  transitionDurationBackdrop: number
  setTransitionDurationBackdrop?: Dispatch<SetStateAction<IContextIHeadlessModal[`transitionDurationBackdrop`]>>
  transitionDurationPanel: number
  setTransitionDurationPanel?: Dispatch<SetStateAction<IContextIHeadlessModal[`transitionDurationPanel`]>>
}

const ContextModal = createContext<IContextIHeadlessModal>({
  open: false,
  isOpened: false,
  onClose: () => {},
  clickOutsideToClose: true,
  transitionDurationBackdrop: TRANSITION_DURATION_DEFAULT,
  transitionDurationPanel: TRANSITION_DURATION_DEFAULT,
})

export interface IHeadlessModal extends ICommon {
  children?: ReactNode
  open: IContextIHeadlessModal[`open`]
  onClose: IContextIHeadlessModal[`onClose`]
  clickOutsideToClose?: IContextIHeadlessModal[`clickOutsideToClose`]
  container?: Element | DocumentFragment
  id?: string | null | undefined
}

const Modal = ({
  children,
  as = `div`,
  className = null,
  style = {},
  open,
  onClose,
  clickOutsideToClose = true,
  container,
  id,
}: IHeadlessModal) => {
  const As = as

  const [isOpened, setIsOpened] = useState<IContextIHeadlessModal[`isOpened`]>(open)
  const [transitionDurationBackdrop, setTransitionDurationBackdrop] =
    useState<IContextIHeadlessModal[`transitionDurationBackdrop`]>(TRANSITION_DURATION_DEFAULT)
  const [transitionDurationPanel, setTransitionDurationPanel] =
    useState<IContextIHeadlessModal[`transitionDurationPanel`]>(TRANSITION_DURATION_DEFAULT)

  const isClient = useIsClient()

  const ref = useRef<HTMLElement | null>(null)

  useLockedBody(isOpened, `root`)

  const firstOpen = useRef<IContextIHeadlessModal[`open`]>(open)

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
          <As ref={ref} className={className} style={{ ...style, display: firstOpen.current ? null : `none` }}>
            {children}
          </As>
        </ContextModal.Provider>,
        container ?? document.body,
        id,
      )
    : null
}

export interface IHeadlessModalBackdrop extends ICommon, ITransition {
  children?: ReactNode
}

const Backdrop = ({
  children,
  as = `div`,
  className = null,
  style = {},
  enter = {},
  leave = {},
}: IHeadlessModalBackdrop) => {
  const As = as

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

  return isClient ? (
    <As ref={ref} className={className} style={style}>
      {children}
    </As>
  ) : null
}

export interface IHeadlessModalPanel extends ICommon, ITransition {
  children: ({ isOpened }: { isOpened?: IContextIHeadlessModal[`isOpened`] }) => ReactNode
}

const Panel = ({ children, as = `div`, className = null, style = {}, enter = {}, leave = {} }: IHeadlessModalPanel) => {
  const As = as

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
