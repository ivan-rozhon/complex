// upload component configuration
export interface UploadConfig {
    url: string;
    multiple: boolean;
    mime: string;
}

export class ImageData {
    selectedImage: string;
    clickableImage: boolean;
    linkImage: boolean;
    imageTitle: string;
    imageLink: string;

    constructor() {
        this.clickableImage = false;
        this.linkImage = false;
        this.imageTitle = '';
        this.imageLink = '';
    }
}
