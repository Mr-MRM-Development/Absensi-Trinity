function generateQR() {
            var name = document.getElementById("name").value;
            var email = document.getElementById("email").value;
            var password = document.getElementById("password").value;

            if (name === "" || email === "" || password === "" || !email.includes("@")) {
                alert("Harap isi semua data atau data kurang valid!");
                return;
            }

            var data = `Nama: ${name}\nEmail: ${email}\nPassword: ${password}`;

            // Hapus QR Code sebelumnya jika ada
            document.getElementById("qrCode").innerHTML = "";

            // Buat QR Code baru
            new QRCode(document.getElementById("qrCode"), {
                text: data,
                width: 200,
                height: 200
            });
        }

