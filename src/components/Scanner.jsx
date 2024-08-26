import { useState } from "react"
import useScanDetection from "use-scan-detection"

const Scanner = () => {
    
    const [barcodeScane, setBarcodeScan] = useState("No barcode scanned")

  return (
    <div>Scanner</div>
  )
}

export default Scanner