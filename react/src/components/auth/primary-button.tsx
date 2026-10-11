type PrimaryButtonProps = {
  label: string
  disabled?: boolean
  loading?: boolean
}

export function PrimaryButton({
  label,
  disabled = false,
  loading = false,
}: PrimaryButtonProps) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="flex h-12 w-full items-center justify-center rounded-md bg-primary font-mulish text-base font-semibold tracking-button text-primary-foreground transition-opacity active:opacity-90 disabled:cursor-not-allowed disabled:opacity-[0.65]"
    >
      {loading ? (
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/35 border-t-primary-foreground"
          aria-label="Sending OTP"
        />
      ) : (
        label
      )}
    </button>
  )
}
