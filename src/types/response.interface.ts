export interface I_BaseResponseSuccess<T = undefined> {
    statusCode: number;
    message: string;
    data?: T;
}

export interface I_BaseResponseError {
    response: {
        data: I_BaseResponseSuccess;
    };
}
