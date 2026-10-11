import { useState } from 'react'
import { PrimaryButton } from '../components/auth/primary-button'
import { useAuthStore } from '../store/use-auth-store'

export function SignUpPage() {
  const storedPhone = useAuthStore((state) => state.phone)
  const setPhone = useAuthStore((state) => state.setPhone)
  const [digits, setDigits] = useState(storedPhone)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (digits.length !== 10) {
      setValidationError('Please enter a valid 10-digit mobile number')
      return
    }

    setValidationError(null)
    setIsSubmitting(true)
    setPhone(digits, '+91')
    window.setTimeout(() => setIsSubmitting(false), 500)
  }

  return (
    <main className="min-h-svh bg-background lg:bg-background-subtle">
      <section className="min-h-svh bg-background lg:flex lg:items-center lg:justify-center lg:bg-background-subtle lg:p-xxl">
        <form
          onSubmit={handleSubmit}
          className="safe-area-screen mx-auto flex min-h-svh w-full max-w-auth flex-col bg-background lg:min-h-[680px] lg:overflow-hidden lg:rounded-xl lg:border lg:border-border-strong lg:shadow-xl"
          noValidate
        >
          <div className="flex-1 px-xl">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="mt-lg block h-6 w-6 rounded-xs focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Back"
            >
              <img src="/back.svg" alt="" className="h-6 w-6" />
            </button>

            <h1 className="mt-lg font-mulish text-2xl font-bold text-text">
              Sign Up to Fastor
            </h1>
            <p className="mt-sm font-mulish text-sm leading-subtitle text-text-secondary">
              Let us know your mobile number and we will send you an OTP for verification.
            </p>

            <label className="sr-only" htmlFor="mobile-number">
              Mobile number
            </label>
            <div className="mt-xxl flex h-12 items-center gap-md rounded-sm border border-border bg-input px-xl">
              <span className="font-mulish text-base font-bold text-text">+91</span>
              <span className="h-[13px] w-[1.5px] shrink-0 bg-accent" aria-hidden="true" />
              <span className="font-mulish text-base text-text" aria-hidden="true">
                -
              </span>
              <input
                id="mobile-number"
                value={digits}
                onChange={(event) => {
                  setDigits(event.target.value.replace(/\D/g, '').slice(0, 10))
                  if (validationError) {
                    setValidationError(null)
                  }
                }}
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="tel-national"
                autoFocus
                maxLength={10}
                placeholder="00000"
                className="min-w-0 flex-1 border-0 bg-transparent p-0 font-mulish text-base font-medium tracking-input text-text caret-transparent outline-none placeholder:text-placeholder"
              />
            </div>

            {validationError && (
              <div
                className="mt-md rounded-sm border border-danger bg-danger-bg-light px-md py-sm"
                role="alert"
              >
                <p className="font-mulish text-xs font-medium text-danger">
                  {validationError}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-sm px-xl pb-xl">
            <PrimaryButton
              label="Get OTP"
              loading={isSubmitting}
              disabled={digits.length === 0}
            />
            <p className="text-center font-mulish text-caption text-text-secondary">
              By clicking, I accept the{' '}
              <a href="#terms" className="font-medium text-text hover:underline">
                Terms &amp; Conditions
              </a>{' '}
              and{' '}
              <a href="#privacy" className="font-medium text-text hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </form>
      </section>
    </main>
  )
}
