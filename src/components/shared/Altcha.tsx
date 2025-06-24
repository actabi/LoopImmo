import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'

// Importing altcha package will introduce a new element <altcha-widget>
import 'altcha'

interface AltchaProps {
  onStateChange?: (ev: Event | CustomEvent) => void
}

const Altcha = forwardRef<{ value: string | null }, AltchaProps>(({ onStateChange }, ref) => {
  const widgetRef = useRef<AltchaWidget & AltchaWidgetMethods & HTMLElement>(null)
  const [value, setValue] = useState<string | null>(null)

  useImperativeHandle(ref, () => {
    return {
      get value() {
        return value
      }
    }
  }, [value])

  useEffect(() => {
    const handleStateChange = (ev: Event | CustomEvent) => {
      if ('detail' in ev) {
        setValue(ev.detail.payload || null)
        onStateChange?.(ev)
      }
    }

    const { current } = widgetRef

    if (current) {
      current.addEventListener('statechange', handleStateChange)
      return () => current.removeEventListener('statechange', handleStateChange)
    }
  }, [onStateChange])

  /* Configure your `challengeurl` and remove the `test` attribute, see docs: https://altcha.org/docs/v2/widget-integration/  */
  return (
    <altcha-widget
      ref={widgetRef}
      className="w-full border-2 border-gray-200 rounded-xl bg-white"
      style={{
        '--altcha-max-width': '100%',
        // Couleurs principales
        '--altcha-color-text': '#374151', // Gris foncé pour le texte
        '--altcha-color-base': '#ffffff', // Fond blanc
        '--altcha-color-border': '#e5e7eb', // Bordure grise claire
        '--altcha-color-border-hover': '#d1d5db', // Bordure au survol
        '--altcha-color-checkbox': '#10b981', // Vert comme vos boutons
        '--altcha-color-checkbox-checkmark': '#ffffff', // Coche blanche
        
        // Bordures et rayons
        '--altcha-border-radius': '12px', // Coins arrondis comme vos éléments
        '--altcha-border-width': '1px',
        
        // Espacement
        '--altcha-padding': '16px',
        '--altcha-gap': '12px',
        
        // Typography
        '--altcha-font-size': '14px',
        '--altcha-font-weight': '500',
        '--altcha-font-family': 'inherit',
        
        // États
        '--altcha-color-verified': '#10b981', // Vert de succès
        '--altcha-color-verifying': '#f59e0b', // Orange de chargement
        '--altcha-color-error': '#ef4444', // Rouge d'erreur
        
        // Ombres pour correspondre à vos cartes
        '--altcha-box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        '--altcha-box-shadow-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        
        // Footer
        '--altcha-color-footer': '#9ca3af', // Gris plus clair pour le footer
        '--altcha-font-size-footer': '12px',
        
        // Animation
        '--altcha-transition': 'all 0.2s ease-in-out',
      }}
      test
    ></altcha-widget>
  )
})

export default Altcha
