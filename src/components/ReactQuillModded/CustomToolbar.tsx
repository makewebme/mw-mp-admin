interface T_CustomToolbarProps {
  wrapperId: string
}

const CustomToolbar: React.FC<T_CustomToolbarProps> = ({ wrapperId }) => (
  <div className='ql-toolbar' id={wrapperId}>
    <span className='ql-formats' defaultValue=''>
      <select className='ql-header'>
        <option value='1' />
        <option value='2' />
        <option value='3' />
        <option value='4' />
        <option value='' />
      </select>
    </span>

    <span className='ql-formats'>
      <button className='ql-bold' />
      <button className='ql-italic' />
      <button className='ql-underline' />
      <button className='ql-strike' />
      <button className='ql-blockquote' />
    </span>

    <span className='ql-formats'>
      <button className='ql-list' value='ordered' />
      <button className='ql-list' value='bullet' />
    </span>

    <span className='ql-formats'>
      <button className='ql-link' />
      <button className='ql-image' />
      <button className='ql-video' />
    </span>
  </div>
)

export default CustomToolbar
