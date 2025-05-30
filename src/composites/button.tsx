import { composites } from "../core/composites.js"
import { Ref } from "../core/ref.js"
import { Button } from "../views/button.js"
import { Label } from "../views/label.js"

composites['button'] = ButtonComp

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'button': Parameters<typeof ButtonComp>[0]
    }
  }
}

function ButtonComp(data: {
  action: () => void
  style?: 'submit' | 'cancel'
  children?: any
}) {
  let children = data.children
  if (!(children instanceof Ref) && !(children instanceof Array)) {
    children = [children]
  }
  if (children instanceof Array) {
    children = children.map(child => typeof child === 'string'
      ? <Label text={child} />
      : child
    )
  }

  const background = data.style === 'submit' ? 0xffffff33 :
    data.style === 'cancel' ? 0x99000099 :
      0xffffff11

  return <Button background={background} padding={2} onClick={data.action}>
    {children}
  </Button>
}
