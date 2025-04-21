import { useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  Box,
  Paper,
  Stack,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";

function App() {
  const [text, setText] = useState("");
  const [vcfText, setVcfText] = useState("");

  const handleVCFUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".vcf")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target.result.length > 4296) {
          alert("The text is too long for a QR code.");
          return;
        }
        setVcfText(e.target.result);
        setText("");
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .vcf file.");
    }
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "qr-code.png";
    link.click();
  };

  const finalQRText = vcfText || text;

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          QR Code Generator
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Enter Text"
            variant="outlined"
            multiline
            rows={4}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setVcfText("");
            }}
            fullWidth
          />

          <Button variant="outlined" component="label">
            Upload VCF File
            <input
              type="file"
              accept=".vcf"
              hidden
              onChange={handleVCFUpload}
            />
          </Button>

          {finalQRText && (
            <Box textAlign="center" mt={2}>
              <QRCodeCanvas value={finalQRText} size={250} version={40} />
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleDownload}
                >
                  Download QR Code
                </Button>
              </Box>
            </Box>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}

export default App;
