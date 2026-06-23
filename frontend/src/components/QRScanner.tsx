import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

interface QRScannerProps {
  onScanSuccess: (decodedText: string) => void;
}

export default function QRScanner({
  onScanSuccess,
}: QRScannerProps) {

  useEffect(() => {

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
  (decodedText) => {

    onScanSuccess(decodedText);

  },
  (error) => {
    console.log(error);
  }
);

    return () => {
      scanner.clear().catch(() => {});
    };

  }, []);

  return (
    <div id="reader"></div>
  );
}