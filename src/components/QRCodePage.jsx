import React, { useEffect, useRef, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    useMediaQuery,
    useTheme,
    OutlinedInput,
    InputLabel,
    FormControl,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import qrPlaceholder from '../assets/qr_placeholder.svg';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const boxRef = useRef(null);
    const [text, setText] = useState("");
    const [vcfText, setVcfText] = useState("");
    const [qrSize, setQrSize] = useState(250);

    const handleVCFUpload = (e) => {
        const file = e?.target?.files?.[0];
        if (file) {
            if (file.name.endsWith(".vcf")) {
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
            }
            else {
                alert("Please upload a valid .vcf file.");
            }
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

    useEffect(() => {
        if (boxRef.current) {
            const width = boxRef.current.offsetWidth - 4;
            setQrSize(width);
        }
    }, [finalQRText]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: isMobile ? 'flex-start' : 'space-between',
                alignItems: 'center',
                padding: isMobile ? '5%' : '10%',
                gap: isMobile ? 4 : 0,
                height: isMobile ? 'auto' : `calc(100vh - 64px)`,
                boxSizing: 'border-box',
            }}
        >
            {/* Left Square */}
            <Box
                sx={{
                    width: isMobile ? '90vw' : '45%',
                    aspectRatio: '1 / 1',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 2,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 400,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 3,
                    }}
                >
                    <FormControl fullWidth variant="outlined">
                        <InputLabel
                            sx={{
                                color: '#333',
                                '&.Mui-focused': {
                                    color: '#333',
                                },
                            }}
                        >
                            Enter text
                        </InputLabel>
                        <OutlinedInput
                            label="Enter text"
                            sx={{
                                borderRadius: '12px',
                                fontSize: '16px',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderWidth: '1px',
                                    borderColor: '#333',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#333',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderWidth: '2px',
                                    borderColor: '#333',
                                },
                            }}
                            onChange={(e) => {
                                setText(e.target.value);
                                setVcfText("");
                            }}
                        />
                    </FormControl>


                    <Typography
                        align="center"
                        sx={{
                            fontWeight: 'bold',
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            color: '#333',
                        }}
                    >
                        OR
                    </Typography>

                    <Button
                        variant="outlined"
                        component="label"
                        fullWidth
                        sx={{
                            flex: 1,
                            py: 5,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textTransform: 'none',
                            borderWidth: '1px',
                            borderColor: '#333',
                            borderRadius: '12px',
                            backgroundColor: '#f8f8f8',
                            '&:hover': {
                                borderColor: '#333',
                            },
                        }}
                    >
                        <UploadFileIcon sx={{
                            fontSize: 32,
                            mb: 1,
                            color: '#666'
                        }} />
                        <Typography sx={{
                            color: '#666',
                            fontWeight: 500
                        }}>
                            Upload VCF File
                        </Typography>
                        <input
                            type="file"
                            hidden
                            accept=".vcf"
                            onChange={handleVCFUpload}
                        />
                    </Button>

                </Box>
            </Box>

            {/* Right Square */}
            <Box
                sx={{
                    width: isMobile ? '90vw' : '45%',
                    aspectRatio: '1 / 1',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 2,
                }}
            >
                <Box sx={{ width: '60%', mb: 2 }} >
                    {
                        finalQRText ? (
                            <QRCodeCanvas
                                value={finalQRText}
                                size={qrSize}
                                version={40}
                                marginSize={1}
                            />
                        ) : (
                            <img
                                src={qrPlaceholder}
                                alt="QR Placeholder"
                                style={{
                                    width: '100%',
                                    height: 'auto'
                                }}
                                ref={boxRef}
                            />
                        )
                    }
                </Box>

                <Button
                    variant="contained"
                    disabled={!finalQRText}
                    sx={{
                        borderRadius: 50,
                        px: 4,
                        py: 1.5,
                        width: '60%',
                        bgcolor: '#000',
                        textTransform: 'none',
                        '&:hover': {
                            bgcolor: '#262626'
                        }
                    }}
                    onClick={handleDownload}
                >
                    <SaveIcon sx={{
                        mr: 1
                    }} />
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default QRCodePage;
