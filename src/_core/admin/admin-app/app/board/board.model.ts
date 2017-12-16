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

// pages metadata interface
export interface PagesMetadata {
    schemes: {
        webSchemaMain: SchemaMetadata;
        webSchemaOther: SchemaMetadata;
        webSections: SchemaMetadata;
    };
    data: InputMetatdata;
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

// schemes metadata (structure) interface
export interface SchemaMetadata {
    name: string;
    add?: Page[];
}

// input metadata (config/metadata) interface
export interface InputMetatdata {
    [x: string]: {
        type: string;
        lagel: string;
        select?: {
            key: string;
            value: string;
        }[];
    };
}

// page content (data) interface
export interface Content {
    _metadata: {
        [x: string]: {
            [x: string]: any
        }
    };
    data: {
        [x: string]: any[];
    };
}
