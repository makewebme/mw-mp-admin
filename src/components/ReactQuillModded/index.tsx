import { useRef, useMemo, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import CustomToolbar from './CustomToolbar'
import EmbedResponsive from './myBlots/EmbedResponsive'


// Embeded video 16:9
Quill.register(EmbedResponsive)


interface T_ReactQuillModdedProps {
  wrapperId: string
  [k: string]: any
}

const ReactQuillModded: React.FC<T_ReactQuillModdedProps> = ({ wrapperId, ...restProps }) => {
  const reactQuillRef = useRef(null)
  const randomInternalId = useRef(Math.random().toString().slice(2,-1))

  // Modules
  const modules = useMemo(() => ({
    toolbar: {
      container: '#' + wrapperId + randomInternalId.current,
    },

    keyboard: {
      bindings: {
        linebreak: {
          key: 13,

          handler: (range: any) => {
            const quill = (reactQuillRef.current! as any)
            quill.editor.clipboard.dangerouslyPasteHTML(range.index, '<p><br/></p>')
            setTimeout(() => quill.editor.selection.setRange({ index: range.index + 1, length: 0 }), 0)
          },
        },
      },
    },

    clipboard: {
      matchVisual: false,
    },
  }), [ wrapperId ])

  // Formats
  const formats = useMemo(() => ([
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'breaker',
    'link', 'image', 'video',
  ]), [])


  return <>
    <CustomToolbar wrapperId={wrapperId + randomInternalId.current} />

    <ReactQuill
      {...restProps as Quill}
      ref={reactQuillRef}
      theme='snow'
      preserveWhitespace={true}
      modules={modules}
      formats={formats}
    />
  </>
}

export default ReactQuillModded
