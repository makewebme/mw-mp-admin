import { Quill } from 'react-quill'
const BlockEmbed = Quill.import('blots/block/embed')
const Link = Quill.import('formats/link')


//
// Modify YouTube embed to be responsive 16:9
//

export default class EmbedResponsive extends BlockEmbed {
  static blotName = 'embed-responsive'
  static tagName = 'DIV'
  static className = 'embed-responsive'

  static create(value: any) {
    const node = super.create(value)
    node.classList.add('embed-responsive-16by9')

    const child = document.createElement('iframe')
    child.setAttribute('frameborder', '0')
    child.setAttribute('allowfullscreen', 'true')
    child.setAttribute('src', Link.sanitize(value))
    child.classList.add('embed-responsive-item')

    node.appendChild(child)

    return node
  }

  static value(domNode: any) {
    const iframe = domNode.querySelector('iframe')
    return iframe.getAttribute('src')
  }
}
