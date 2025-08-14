import React, { useRef, useState } from 'react';
import { Button, LinearProgress, Typography, Box } from '@mui/material';

interface FileUploadProps {
  onUpload: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setUploading(true);
          const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log("Upload result:", result);
    } catch (error) {
      console.error("Upload failed:", error);
    }

    setUploading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <input
        ref={inputRef}
        type="file"
        hidden
        onChange={handleFileChange}
      />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload File'}
      </Button>
      {fileName && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          {fileName}
        </Typography>
      )}
      {uploading && <LinearProgress sx={{ mt: 2, width: '100%' }} />}
    </Box>
  );
};
