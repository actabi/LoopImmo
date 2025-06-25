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
      language="fr"
      ref={widgetRef}
      style={{
        '--altcha-max-width': '100%',
        // Couleurs principales
        '--altcha-color-text': '#374151', // Gris foncé pour le texte
        '--altcha-color-base': '#ffffff', // Fond blanc
        '--altcha-color-border': '#e5e7eb', // Bordure grise claire
        
        // Bordures et rayons
        '--altcha-border-radius': '12px', // Coins arrondis comme vos éléments
        '--altcha-border-width': '1px',
      }}
      test
      hidefooter
    ></altcha-widget>
  )
})

export default Altcha
