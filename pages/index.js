import { useEffect, useState } from 'react'
import Head from 'next/head'

function PaymentRequestChecker () {
  const [paymentRequestSupported, setPaymentRequestSupported] = useState({})
  const checkPaymentRequest = () => {
    const paymentRequest = !!("PaymentRequest" in window)
    setPaymentRequestSupported({ state: paymentRequest ? "granted": "denied" })
  }
  useEffect(() => {
    checkPaymentRequest()
  }, [])
  return (
    <tr>
      <th scope="row">5</th>
      <td><mark>{paymentRequestSupported.state}</mark></td>
      <td>PaymentRequest</td>
      <td>
        <code>!!(PaymentRequest in window)</code>
      </td>
    </tr>
  )
}

function LocalStorageChecker () {
  const [localStorageSupported, setLocalStorageSupported] = useState({})
  const checkLocalStorage = () => {
    const localStorageSupported = !!("localStorage" in window)
    setLocalStorageSupported({ state: localStorageSupported ? "granted": "denied" })
  }
  useEffect(() => {
    checkLocalStorage()
  }, [])
  return (
    <tr>
      <th scope="row">6</th>
      <td><mark>{localStorageSupported.state}</mark></td>
      <td>localStorage</td>
      <td>
        <code>!!(localStorage in window)</code>
      </td>
    </tr>
  )
}

function ServiceWorkerChecker () {
  const [isServiceWorkerSupported, setIsServiceWorkerSupported] = useState({})
  const checkServiceWorker = () => {
    const isServiceWorker = !!("serviceWorker" in navigator)
    setIsServiceWorkerSupported({ state: isServiceWorker ? "granted": "denied" })
  }
  useEffect(() => {
    checkServiceWorker()
  }, [])
  return (
    <tr>
      <th scope="row">4</th>
      <td><mark>{isServiceWorkerSupported.state}</mark></td>
      <td>serviceWorker</td>
      <td>
        <code>!!(serviceWorker in navigator)</code>
      </td>
    </tr>
  )
}

function CryptoChecker () {
  const [isCryptoSupported, setIsCryptoSupported] = useState({})
  const checkCrypto = () => {
    const isCryptoEnabled = !!("Crypto" in window)
    setIsCryptoSupported({ state: isCryptoEnabled ? "granted": "denied" })
  }
  useEffect(() => {
    checkCrypto()
  }, [])
  return (
    <tr>
      <th scope="row">3</th>
      <td><mark>{isCryptoSupported.state}</mark></td>
      <td>Crypto</td>
      <td>
        <code>!!(Crypto in window)</code>
      </td>
    </tr>
  )
}

function CookiesChecker () {
  const [cookiesPermission, setCookiesPermission] = useState({})
  const checkCookies = () => {
    const isCookieEnabled = navigator.cookieEnabled;
    setCookiesPermission({ state: isCookieEnabled ? "granted": "denied" })
  }
  useEffect(() => {
    checkCookies()
  }, [])
  return (
    <tr>
      <th scope="row">1</th>
      <td><mark>{cookiesPermission.state}</mark></td>
      <td>Cookies</td>
      <td>
        <code>navigator.cookieEnabled</code>
      </td>
    </tr>
  )
}

function BarcodeDetectorChecker () {
  const [isBarcodeDetectorSupported, setIsBarcodeDetectorSupported] = useState({})
  const checkBarcodeDetector = () => {
    const isBarcodeDetectorEnabled = !!("BarcodeDetector" in window)
    setIsBarcodeDetectorSupported({ state: isBarcodeDetectorEnabled ? "granted": "denied" })
  }
  useEffect(() => {
    checkBarcodeDetector()
  }, [])
  return (
    <tr>
      <th scope="row">2</th>
      <td><mark>{isBarcodeDetectorSupported.state}</mark></td>
      <td>BarcodeDetector</td>
      <td>
        <code>!!(BarcodeDetector in window)</code>
      </td>
    </tr>
  )
}

const permissionsNames = [
  "geolocation",
  "notifications",
  "push",
  "midi",
  "camera",
  "microphone",
  "speaker",
  "device-info",
  "background-fetch",
  "background-sync",
  "bluetooth",
  "persistent-storage",
  "ambient-light-sensor",
  "accelerometer",
  "gyroscope",
  "magnetometer",
  "clipboard",
  "display-capture",
  "nfc"
]
function PermissionsChecker () {
  const [permissions, setPermissions] = useState([])
  const getAllPermissions = async () => {
    const allPermissions = []
    await Promise.all(
      permissionsNames.map(async permissionName => {
          try {
            let permission
            switch (permissionName) {
              case 'push':
                // Not necessary but right now Chrome only supports push messages with  notifications
                permission = await navigator.permissions.query({name: permissionName, userVisibleOnly: true})
                break
              default:
                permission = await navigator.permissions.query({name: permissionName})
            }
            allPermissions.push({permissionName, state: permission.state})
          }
          catch(e){
            allPermissions.push({permissionName, state: 'error', errorMessage: e.toString()})
          }
      })
    )

    setPermissions(allPermissions)
  }

  useEffect(() => {
    getAllPermissions()
  }, [])

  return (
    <table>
      <thead>
        <tr>
          <th>
            #
          </th>
          <th>
            state
          </th>
          <th>
            name
          </th>
          <th>
            error
          </th>
        </tr>
      </thead>
      <tbody>
        {permissions.map((item, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>
              {item.state === "granted" &&
                <mark>
                  granted
                </mark>
              }
              {item.state === "error" &&
                <mark>
                  error
                </mark>
              }
              {item.state === "prompt" &&
                <mark>
                  prompt
                </mark>
              }
              {item.state === "denied" &&
                <mark>
                  denied
                </mark>
              }
            </td>
            <td>
              {item.permissionName}
            </td>
            <td>
              {item.errorMessage}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default function HomePage() {
  return (
    <>
      <Head>
        <title>web-api-checker</title>
        <meta name="description" content="web-api-checker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@1.*/css/pico.min.css" />
      </Head>

      <main className="container">
        <table>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">State</th>
              <th scope="col">Name</th>
              <th scope="col">Code</th>
            </tr>
          </thead>
          <tbody>
            <CookiesChecker />
            <BarcodeDetectorChecker />
            <CryptoChecker/>
            <ServiceWorkerChecker/>
            <PaymentRequestChecker/>
            <LocalStorageChecker />
          </tbody>
        </table>
        <p>Check permissions with <code>navigator.permissions.query</code></p>
        <PermissionsChecker/>
      </main>
    </>
  )
}
