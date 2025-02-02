function onScanSuccess(decodedText, decodedResult) {
            document.getElementById("result").innerText = "Hasil Scan: " + decodedText;

            let lines = decodedText.split("\n");
            let name = lines[0].replace("Nama: ", "").trim();
            let email = lines[1].replace("Email: ", "").trim();

            document.getElementById("name").value = name;
            document.getElementById("email").value = email;
        }

        function onScanError(errorMessage) {
            console.warn(errorMessage);
        }

        let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader", { fps: 10, qrbox: 250 });

        html5QrcodeScanner.render(onScanSuccess,
             onScanError
        );

        function submitAbsensi() {
            let name = document.getElementById("name").value;
            let email = document.getElementById("email").value;

            if (name === "" || email === "") {
            				  let speech = new SpeechSynthesisUtterance(`Silakan scan QR Code terlebih dahulu!`);
                speech.lang = "id-ID"; // Bahasa Indonesia
                speech.rate = 1; // Kecepatan normal
                window.speechSynthesis.speak(speech);
                alert("Silakan scan QR Code terlebih dahulu!");
                return;
            }

            let tableBody = document.getElementById("absensiBody");
            let rowCount = tableBody.rows.length + 1;
            let currentTime = new Date().toLocaleString(); // Format waktu absen

            let newRow = tableBody.insertRow();
            newRow.insertCell(0).innerText = rowCount;
            newRow.insertCell(1).innerText = name;
            newRow.insertCell(2).innerText = email;
            newRow.insertCell(3).innerText = currentTime;

            // Menggunakan Text-to-Speech untuk mengucapkan "Selamat datang, [Nama]"
            let speech = new SpeechSynthesisUtterance(`Selamat datang di Trinity Development, ${name}`);
            speech.lang = "id-ID"; // Bahasa Indonesia
            speech.rate = 1; // Kecepatan normal
            window.speechSynthesis.speak(speech);

            alert("Absensi berhasil!\nNama: " + name + "\nEmail: " + email);

            // Kosongkan input setelah absen
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
        }

function downloadTable() {
    let tableHTML = `
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Tabel Absensi Trinity</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; }
                h1 { color: blue; }
                table { width: 80%; margin: auto; border-collapse: collapse; }
                th, td { border: 1px solid black; padding: 8px; text-align: center; }
                th { background-color: #ddd; }
            </style>
        </head>
        <body>
            <h1>Tabel Absensi Trinity</h1>
            ${document.getElementById("absensiTable").outerHTML}
        </body>
        </html>
    `;

    let blob = new Blob([tableHTML], { type: "text/html" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "absensi.html";
    link.click();
}