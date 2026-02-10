import './DynamicIcon.css'

const iconModules = import.meta.glob('../assets/icons/*.png', {
  eager: true,
  import: 'default',
})

const normalize = (value) =>
  value?.toLowerCase().replace(/\s+/g, '') || 'default'

const getIconSrc = (name) => {
  const key = `../assets/icons/${normalize(name)}.png`
  return iconModules[key] || iconModules['../assets/icons/default.png']
}

const DynamicIcon = ({ name, className = '', alt = 'icon' }) => {
  return (
    <img
      src={getIconSrc(name)}
      alt={alt}
      className={`dynamic-icon ${className}`}
      draggable={false}
    />
  )
}

export default DynamicIcon
