import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class FileTypesService {
    types = {
        "3gp": "video/3gpp",
        "7z": "application/x-7z-compressed",
        "avi": "video/x-msvideo",
        "bmp": "image/x-ms-bmp",
        "csv": "text/csv",
        "doc": "application/msword",
        "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "epub": "application/epub+zip",
        "gif": "image/gif",
        "htm": "text/html",
        "html": "text/html",
        "ico": "image/vnd.microsoft.icon",
        "iges": "model/iges",
        "igs": "model/iges",
        "jpe": "image/jpeg",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "json": "application/json",
        "md": "text/markdown",
        "mesh": "model/mesh",
        "mkv": "video/x-matroska",
        "mov": "video/quicktime",
        "mp2": "audio/mpeg",
        "mp2a": "audio/mpeg",
        "mp3": "audio/mpeg",
        "mp4": "video/mp4",
        "mp4a": "audio/mp4",
        "mpeg": "video/mpeg",
        "mpg": "video/mpeg",
        "mpg4": "video/mp4",
        "msi": "application/x-msdownload",
        "obj": "application/octet-stream",
        "odb": "application/vnd.oasis.opendocument.database",
        "odc": "application/vnd.oasis.opendocument.chart",
        "odf": "application/vnd.oasis.opendocument.formula",
        "odft": "application/vnd.oasis.opendocument.formula-template",
        "odg": "application/vnd.oasis.opendocument.graphics",
        "odi": "application/vnd.oasis.opendocument.image",
        "odp": "application/vnd.oasis.opendocument.presentation",
        "ods": "application/vnd.oasis.opendocument.spreadsheet",
        "odt": "application/vnd.oasis.opendocument.text",
        "pdf": "application/pdf",
        "png": "image/png",
        "ppt": "application/vnd.ms-powerpoint",
        "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "psd": "image/x-photoshop",
        "rar": "application/rar",
        "stl": "application/sla",
        "tex": "text/x-tex",
        "tif": "image/tiff",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "webm": "video/webm",
        "xls": "application/vnd.ms-excel",
        "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "xml": "application/xml",
        "xsl": "application/xml",
        "zip": "application/zip"
    };

    applications = {
        "image": ["png", "tif", "tiff", "jpg", "bmp", "jpeg", "jpe"],
        "video": ["mp4", "mpg", "mpeg", "avi", "webm", "mkv", "mpg4", "mov", "3gp"],
        "pdf": ["pdf"],
        "model": ["stl", "obj"],
        "sliced": ["gcode", "pwmo"]
    };

    constructor() {
    }

    getMimeType(extension: string): string {
        return this.types[extension];
    }

    getMimeTypeFromFilename(filename: string): string {
        return this.getMimeType(this.getFileExtension(filename));
    }

    getFileExtension(filename: string): string {
        const re = /(?:\.([^.]+))?$/;
        return re.exec(filename)[1].toLowerCase();
    }

    getApplication(extension: string): string {
        for (const key in this.applications) {
            if (this.applications[key].includes(extension)) {
                return key;
            }
        }

        return undefined;
    }

    getApplicationFromName(filename: string): string {
        return this.getApplication(this.getFileExtension(filename));
    }
}
