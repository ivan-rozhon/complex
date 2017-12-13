// image media interface
export interface Image {
    name: string;
    thumbName: string;
}

// images gallery interface
export interface Gallery {
    name: string;
}

// pages interface
export interface Pages {
    _metadata: PagesMetadata;
    webSchema: {
        webSchemaMain: Page[];
        webSchemaOther: Page[];
        webSections: Section[];
    };
}

export interface PagesMetadata {
    schemes: {
        [x: string]: {
            name: string;
            add?: Page[];
        }
    };
    data: InputData;
}

// page interface
export interface Page {
    id: string;
    name: string;
    template: string;
    data: string;
    abstract?: string;
    sub?: Page[];
    options?: {
        [x: string]: string | boolean;
    }[];
}

// section interface
export interface Section {
    sectionId: string;
    name: string;
    data: string;
}

// page input interface
export interface Input {
    [x: string]: string | boolean | any[] | Input;
}

// input data (config) interface
export interface InputData {
    [x: string]: {
        type: string;
        lagel: string;
        select?: {
            key: string;
            value: string;
        }[];
    };
}
