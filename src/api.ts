import axios from 'axios';
import { MessageResponse } from './types';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8901'
});

export function sendMessage(text: string, params: Record<string, number>): Promise<MessageResponse> {
    return API.post('/message', {
        text,
        params
    }, { headers: { "Content-Type": "application/json" } });
}

