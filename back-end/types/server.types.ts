export interface IResponse {
    status:'OK' | 'ERROR' | 'NOT FOUND'
};
export interface ErrorResponsePayload extends IResponse {
    status:'ERROR',
    message:string
}
export interface NotFoundResponsePayload extends IResponse {
    status:'NOT FOUND'
    message:'Resource not found'
}