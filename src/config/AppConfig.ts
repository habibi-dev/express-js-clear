import bodyParser from "body-parser";
import express, {Express} from "express";
import path from "path";

export default function AppConfig(app: Express) {
    // for parsing application/xwww-
    app.use(bodyParser.urlencoded({extended: true}));

    // for parsing application/json
    app.use(bodyParser.json());

    // Configure static file serving for large media files
    app.use(express.static('public', {
        // Enable range requests for video/audio streaming
        setHeaders: (res, filePath) => {
            const ext = path.extname(filePath).toLowerCase();
            
            // Set proper headers for media files
            if (['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv'].includes(ext)) {
                res.setHeader('Accept-Ranges', 'bytes');
                res.setHeader('Content-Type', 'video/mp4');
            } else if (['.mp3', '.wav', '.flac', '.aac', '.ogg'].includes(ext)) {
                res.setHeader('Accept-Ranges', 'bytes');
                res.setHeader('Content-Type', 'audio/mpeg');
            } else if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
                res.setHeader('Content-Type', 'image/' + ext.slice(1));
            }
        },
        // Increase max file size limit
        maxAge: '1d'
    }));
}