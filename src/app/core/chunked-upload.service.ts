import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ChunkedUploadService {
    public static async chunkedUpload(
        file: File | string | ArrayBuffer,
        filename: string,
        http: HttpClient,
        url: string,
        type: string,
        progress?: { current: number; total: number },
        headers?: HttpHeaders
    ): Promise<any> {
        // console.log(file, url);
        let upload: File;

        if (file instanceof ArrayBuffer) {
            const blob = new Blob([file]);
            upload = new File([blob], filename);
        } else if ("string" === typeof file || file instanceof String) {
            const blob = new Blob([file], {type: "text/plain"});
            upload = new File([blob], filename);
        } else if (file instanceof File) {
            upload = file;
        } else {
            throw Error("ChunkedUploadService: Unknown file type");
        }

        // console.log(upload);
        if (headers === undefined) {
            headers = new HttpHeaders();
        }

        // console.log(headers);

        const timestamp = Date.now().toString();
        const chunkSize = 5000000;
        const totalChunks = Math.ceil(upload.size / chunkSize);

        // console.log(timestamp, chunkSize, totalChunks);

        if (progress !== undefined && progress !== null) {
            progress.total = totalChunks;
        }

        for (let start = 0; start < upload.size; start += chunkSize) {
            const chunkNo = Math.ceil(start / chunkSize);

            if (progress !== undefined && progress !== null) {
                progress.current = chunkNo;
            }

            const fd = new FormData();
            fd.append("chunk", chunkNo.toString());
            fd.append("totalChunks", totalChunks.toString());
            fd.append("timestamp", timestamp);
            fd.append("filename", upload.name);
            fd.append("type", type);
            fd.append("file", upload.slice(start, start + chunkSize));

            // console.log("Schleife", chunkNo, start, start + chunkSize, fd);

            await http.post<any>(url, fd,
                {
                    responseType: "text" as any,
                    // eslint-disable-next-line object-shorthand
                    headers: headers,
                    observe: "events",
                    reportProgress: true
                }
            ).toPromise().then();
        }
    }
}
