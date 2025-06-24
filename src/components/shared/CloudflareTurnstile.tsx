import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'

interface TurnstileProps {
  onSuccess?: (token: string) => void
  onError?: () => void
  onExpired?: () => void
}

const CloudflareTurnstile = forwardRef<{ value: string | null }, TurnstileProps>(
  ({ onSuccess, onError, onExpired }, ref) => {
    const widgetRef = useRef<HTMLDivElement>(null)
    const [value, setValue] = useState<string | null>(null)
    const [widgetId, setWidgetId] = useState<string | null>(null)

    useImperativeHandle(ref, () => {
      return {
        get value() {
          return value
        }
      }
    }, [value])

    useEffect(() => {
      // Charger le script Cloudflare Turnstile
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      
      script.onload = () => {
        if (widgetRef.current && window.turnstile) {
          const id = window.turnstile.render(widgetRef.current, {
            sitekey: '0x4AAAAABiERNubU16D6CAE', // Votre clé du site
            callback: (token: string) => {
              setValue(token)
              onSuccess?.(token)
            },
            'error-callback': () => {
              setValue(null)
              onError?.()
            },
            'expired-callback': () => {
              setValue(null)
              onExpired?.()
            },
            theme: 'light',
            size: 'normal'
          })
          setWidgetId(id)
        }
      }

      document.head.appendChild(script)

      return () => {
        // Nettoyage
        if (widgetId && window.turnstile) {
          window.turnstile.remove(widgetId)
        }
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      }
    }, [onSuccess, onError, onExpired])

    return (
      <div 
        ref={widgetRef}
        className="w-full flex justify-center"
        style={{
          minHeight: '65px', // Hauteur minimale pour éviter le saut de layout
        }}
      />
    )
  }
)

CloudflareTurnstile.displayName = 'CloudflareTurnstile'

export default CloudflareTurnstile