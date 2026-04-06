const GOOGLE_OAUTH_URL =
  import.meta.env.VITE_OAUTH_GOOGLE_URL ?? 'http://localhost:8080/oauth2/authorization/google'

export default function GoogleLoginButton() {
  function handleClick() {
    window.location.href = GOOGLE_OAUTH_URL
  }

  return (
    <button type="button" className="btn-google" onClick={handleClick}>
      <span className="google-icon">G</span>
      Continue with Google
    </button>
  )
}
